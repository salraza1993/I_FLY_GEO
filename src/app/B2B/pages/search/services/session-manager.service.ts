
import { LocalStorageService } from '@/shared/services/localStorage.service';
import { inject, Injectable, signal, computed, effect } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {
  private SESSION_KEY = 'sessions-list';
  private LocalStorage = inject(LocalStorageService);
  protected sessionList = signal<{ [key: string]: string }>({});
  public SESSION_DURATION_MINUTES = 10;
  public activeSessionId = signal<string | null>(null);
  public sessionTimeLeft = signal<{ minutes: number, seconds: number }>({ minutes: 0, seconds: 0 }); // in min:sec
  private timer: any = null;

  constructor() {
    this.initializeSession();
    this.autoDeleteExpiredSessions(); // Clean up expired sessions on service init
  }

  /**
   * Create a new session, set all related keys, and return its ID.
   */
  public createSessionWithData(data: any): string {
    const token = this.createSession();
    this.setSessionData(token, data);
    this.activeSessionId.set(token);
    this.startSessionTimer(token);
    return token;
  }

  /**
   * Set all related localStorage keys for a session
   */
  public setSessionData(token: string, data: any) {
    this.setLocalStorage(token, 'flight-search', { someObj: 'OK value' });
    this.setLocalStorage(token, 'flight-offer', { someObj: 'OK value' });
    this.setLocalStorage(token, 'flight-seat-map', { someObj: 'OK value' });
    this.setLocalStorage(token, 'search-criteria', data);
  }
  /**
   * Get the session end time as a Date object
   */
  public getSessionEnd(sessionId: string): Date | null {
    const allSessions = this.getAllSessions();
    if (!allSessions[sessionId]) return null;
    const sessionTime = DateTime.fromFormat(allSessions[sessionId], "yyyy-MM-dd'T'HH:mm:ss");
    if (!sessionTime.isValid) return null;
    return sessionTime.plus({ minutes: this.SESSION_DURATION_MINUTES }).toJSDate();
  }

  /**
   * Refresh (update) the session timestamp to keep it alive
   */
  public refreshSession(token: string, updateTimestamp: boolean = true) {
    let allSessions = this.getAllSessions();
    if (updateTimestamp) {
      const now = DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm:ss");
      if (allSessions[token]) {
        allSessions[token] = now;
        this.LocalStorage.setItem(this.SESSION_KEY, JSON.stringify(allSessions));
        this.sessionList.set(allSessions);
      }
    }
  }

  /**
   * Start a timer to update session time left and refresh session timestamp
   */
  public startSessionTimer(token: string) {
    if (this.timer) clearInterval(this.timer);
    this.updateSessionTimeLeft(token);
    this.timer = setInterval(() => {
      this.refreshSession(token, false); // don't update timestamp, just check time left
      this.updateSessionTimeLeft(token);
    }, 1000); // every second
  }

  private updateSessionTimeLeft(token: string) {
    const { minutes, seconds, expired } = this.getSessionTimeLeft(token);
    this.sessionTimeLeft.set({ minutes, seconds });
    if (expired) {
      this.deleteSession(token);
      this.activeSessionId.set(null);
      if (this.timer) clearInterval(this.timer);
    }
  }

  /**
   * Get time left for a session in minutes and seconds
   */
  public getSessionTimeLeft(sessionId: string): { minutes: number, seconds: number, expired: boolean } {
    const allSessions = this.getAllSessions();
    if (!allSessions[sessionId]) return { minutes: 0, seconds: 0, expired: true };
    const sessionTime = DateTime.fromFormat(allSessions[sessionId], "yyyy-MM-dd'T'HH:mm:ss");
    const now = DateTime.now();
    const diff = now.diff(sessionTime, ['minutes', 'seconds']);
    const totalSeconds = Math.max(0, Math.floor(this.SESSION_DURATION_MINUTES * 60 - diff.as('seconds')));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { minutes, seconds, expired: totalSeconds <= 0 };
  }

  /**
   * Create a new session and return its ID. If token is provided, update its time.
   */
  public createSession(token: string | null = null): string {
    this.autoDeleteExpiredSessions(); // Clean up expired sessions before creating new one
    if (!token) token = this.makeToken(10);
    const now = DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm:ss");
    let allSessionsRaw = this.LocalStorage.getItem(this.SESSION_KEY);
    let allSessions: { [key: string]: string } = allSessionsRaw ? JSON.parse(allSessionsRaw) : {};
    allSessions[token] = now;
    this.LocalStorage.setItem(this.SESSION_KEY, JSON.stringify(allSessions));
    this.sessionList.set(allSessions);
    return token;
  }

  /**
   * Check if a session is valid (not expired)
   */
  public isSessionValid(sessionId: string): boolean {
    const allSessions = this.getAllSessions();
    if (!allSessions[sessionId]) return false;
    const sessionTime = DateTime.fromFormat(allSessions[sessionId], "yyyy-MM-dd'T'HH:mm:ss");
    const now = DateTime.now();
    const diff = now.diff(sessionTime, 'minutes').minutes;
    if (diff > this.SESSION_DURATION_MINUTES) {
      this.deleteSession(sessionId);
      return false;
    }
    return true;
  }

  /**
   * Delete a session by ID
   */
  public deleteSession(sessionId: string): void {
    let allSessions = this.getAllSessions();
    delete allSessions[sessionId];
    this.LocalStorage.setItem(this.SESSION_KEY, JSON.stringify(allSessions));
    this.sessionList.set(allSessions);
    // Remove all related keys
    this.removeLocalStorage(sessionId, 'flight-search');
    this.removeLocalStorage(sessionId, 'flight-offer');
    this.removeLocalStorage(sessionId, 'flight-seat-map');
    this.removeLocalStorage(sessionId, 'search-criteria');
  }

  /**
   * Remove all expired sessions
   */
  public autoDeleteExpiredSessions(): void {
    let allSessions = this.getAllSessions();
    const now = DateTime.now();
    Object.keys(allSessions).forEach(sessionId => {
      const sessionTime = DateTime.fromFormat(allSessions[sessionId], "yyyy-MM-dd'T'HH:mm:ss");
      const diff = now.diff(sessionTime, 'minutes').minutes;
      if (diff > this.SESSION_DURATION_MINUTES) {
        this.deleteSession(sessionId);
      }
    });
    this.LocalStorage.setItem(this.SESSION_KEY, JSON.stringify(allSessions));
    this.sessionList.set(allSessions);
  }

  /**
   * Get all sessions as an object
   */
  public getAllSessions(): { [key: string]: string } {
    let allSessionsRaw = this.LocalStorage.getItem(this.SESSION_KEY);
    return allSessionsRaw ? JSON.parse(allSessionsRaw) : {};
  }

  private initializeSession(): void {
    const sessionData = this.LocalStorage.getItem(this.SESSION_KEY);
    if (sessionData) {
      this.sessionList.set(JSON.parse(sessionData));
    } else {
      this.LocalStorage.setItem(this.SESSION_KEY, JSON.stringify({}));
    }
  }

  private makeToken(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    let attempts = 0;
    const maxAttempts = 10;

    do {
      token = '';
      for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      attempts++;
    } while (this.getAllSessions()[token] && attempts < maxAttempts);

    return token;
  }

  private setLocalStorage(token: string | null, name: string, ArrayOrObject: object | any[]) {
    let storageName = token == null ? name : token + '-' + name;
    let cvalue: object | any[] | string = ArrayOrObject;
    if (typeof cvalue != 'string') {
      cvalue = JSON.stringify(cvalue);
    }
    try {
      this.LocalStorage.setItem(storageName, cvalue);
    } catch (error) {
      console.error('localStorage Error', 'SET', 'Cannot save');
    }
  }

  private removeLocalStorage(token: string | null, name: string) {
    let storageName = token == null ? name : token + '-' + name;
    this.LocalStorage.removeItem(storageName);
    return true;
  }
}

