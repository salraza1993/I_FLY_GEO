  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  @Injectable({
    providedIn: 'root',
  })
  export class AppSettingsService {
    private APP_SETTINGS = 'assets/static-json/appSettingConfig.json';
    constructor(private http: HttpClient) {}

    public initializeAppSetting(): Observable<any> {
      return this.http.get(this.APP_SETTINGS);
    }
  }
