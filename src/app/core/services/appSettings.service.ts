import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettingsDataTypes } from '../../types/appSettingInterface';
@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private readonly APP_SETTINGS_URL = 'assets/static-json/appSettingConfig.json';
  constructor(private http: HttpClient) { }

  public initializeAppSetting(): Observable<AppSettingsDataTypes> {
    return this.http.get<AppSettingsDataTypes>(this.APP_SETTINGS_URL);
  }
}
