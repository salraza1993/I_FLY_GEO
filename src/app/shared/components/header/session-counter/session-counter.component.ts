import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewContainerRef, signal, computed } from '@angular/core';
import { Duration } from 'luxon';

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
export class SessionCounterComponent implements OnInit, OnDestroy {
  initiatedTime = signal<number>(600);
  timeLeft =  signal<number>(this.initiatedTime());
  private intervalId?: any;
  private viewContainerRef = inject(ViewContainerRef);

  manageStages = computed<string>(() => {
    let stage = 'normal';
    if (this.timeLeft() >= (this.initiatedTime() / 2)) {
      stage = 'normal';
    } else if (this.timeLeft() >= (this.initiatedTime() / 3)) {
      stage = 'warning';
    } else {
      stage = 'danger';
    }
    return stage;
  });

  ngOnInit() :void {
    this.intervalId = setInterval(() => {
      this.timeLeft.update((time) => time - 1);

      if (this.timeLeft() <= 0) {
        this.destroySelf();
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private destroySelf(): void {
    clearInterval(this.intervalId);
    // Remove the component from the view
    this.viewContainerRef.element.nativeElement.remove();
  }

  // Formating the time left in mm:ss format
  formatTime(totalSeconds: number): string {
    return Duration.fromObject({ seconds: totalSeconds }).toFormat('mm:ss');
  }
}
