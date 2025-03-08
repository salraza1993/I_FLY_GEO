import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import { CurrencyDropdown } from '../../shared/models/Common.interface';

interface CurrencyInterface {
  code: string,
  name: string,
  country: string,
  countryCode: string,
  flag: string
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private CURRENCY_JSON_PATH: string = '/src/assets/static-json/currency-list.json';
  private http = inject(HttpClient);
  private localStorage = inject(LocalStorageService);

  private preferredCurrency = signal<{} | null>(null);
  private preferredCurrencyCode = signal<string>('AED');

  public getSelectedCurrency = signal(this.preferredCurrency());
  public getSelectedCurrencyCode = signal(this.preferredCurrencyCode()).asReadonly();


  constructor() {
    this.getCurrencyList();
    this.initializeSelectedCurrency();
  }

  private initializeSelectedCurrency(): void {
    const userPreferences = this.localStorage.getInnerItem('appSettings', 'preferences');
    const currencies = this.localStorage.getInnerItem('appSettings', 'currencies');
    this.preferredCurrencyCode.set(userPreferences.selectedCurrency);
    this.preferredCurrency.set(currencies);
  }

  public getCurrencyList(): Observable<CurrencyDropdown | any> {
    return this.http.get(this.CURRENCY_JSON_PATH);
  }

  public setCurrencyInLocalStorage(item: CurrencyDropdown | undefined):void {
    this.localStorage.setInnerItem('appSettings', 'currencies', item);
  }
}
