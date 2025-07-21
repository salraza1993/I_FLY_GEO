import { Component, computed, effect, inject, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionManagerService } from '../../services/session-manager.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'session-counter',
  standalone: true,
  templateUrl: './session-counter.component.html',
})

export class SessionCounterComponent implements OnDestroy {
  private route = inject(ActivatedRoute);
  private sessionManager = inject(SessionManagerService);
  public minutesLeft = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private sessionId: string | null = null;

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
