import { SessionManagerService } from '@/B2B/pages/search/services/session-manager.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewContainerRef, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTime, Duration } from 'luxon';

@Component({
  selector: 'app-session-counter, session-counter',
  imports: [CommonModule],
  templateUrl: './session-counter.component.html',
  styleUrl: './session-counter.component.css',
  host: {
    class: 'session-counter-wrapper',
    '[class.normal]': 'manageStages() === "normal"',
    '[class.warning]': 'manageStages() === "warning"',
    '[class.danger]': 'manageStages() === "danger"',
  },
})
export class SessionCounterComponent implements OnDestroy {
  private route = inject(ActivatedRoute);
  private sessionManager = inject(SessionManagerService);
  initiatedTime = signal<number>(20);
  timeLeft =  signal<number>(this.initiatedTime());
  public minutesLeft = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private viewContainerRef = inject(ViewContainerRef);
  private sessionId: string | null = null;

  manageStages = computed<string>(() => {
    const remaining = this.minutesLeft();
    const total = this.initiatedTime();
    const third = Math.round(total / 3);

    if (remaining <= third) return 'danger';
    if (remaining < third * 2) return 'warning';
    return 'normal';
  });

  constructor() {
    // Get sessionId from query params
    const sessionId = this.route.snapshot.queryParamMap.get('session');
    if (typeof sessionId === 'string' && sessionId.length > 0) {
      this.sessionId = sessionId;
      // Set the active session ID in the session manager
      (this.sessionManager.activeSessionId as { set: (id: string) => void }).set(sessionId);
      this.updateCounter(sessionId);
      // Refresh session and update counter every minute
      this.intervalId = setInterval(() => {
        if (typeof this.sessionManager.refreshSession === 'function') {
          this.sessionManager.refreshSession(sessionId);
        }
        this.updateCounter(sessionId);
      }, 1000 * 60);
    }
  }

  private updateCounter(sessionId: string) {
    // Defensive: getSessionMinutesLeft may not exist or may return undefined
    if (typeof this.sessionManager.getSessionTimeLeft === 'function') {
      const minutes = this.sessionManager.getSessionTimeLeft(sessionId);
      this.minutesLeft.set(typeof minutes === 'number' ? minutes : 0);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  // Formating the time left in mm:ss format
  formatTime(totalSeconds: number): string {
    return Duration.fromObject({ seconds: totalSeconds }).toFormat('mm:ss');
  }

  public sessionTimeLeft() {
    if (!this.sessionId || typeof this.sessionManager.getSessionEnd !== 'function') {
      return { minutes: 0, seconds: 0 };
    }
    const sessionEnd: Date | null = this.sessionManager.getSessionEnd(this.sessionId);
    if (!sessionEnd) return { minutes: 0, seconds: 0 };
    const now = new Date();
    let diff = Math.max(0, sessionEnd.getTime() - now.getTime());
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { minutes, seconds };
  }

  public getSessionEnd(sessionId: string): Date | null {
    const allSessions = this.sessionManager.getAllSessions();
    if (!allSessions[sessionId]) return null;
    const sessionTime = DateTime.fromFormat(allSessions[sessionId], "yyyy-MM-dd'T'HH:mm:ss");
    if (!sessionTime.isValid) return null;
    return sessionTime.plus({ minutes: this.sessionManager.SESSION_DURATION_MINUTES }).toJSDate();
  }
}
