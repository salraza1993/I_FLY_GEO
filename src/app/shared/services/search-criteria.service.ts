import { inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from './localStorage.service';
import { SearchCriteriaDataType } from '../models/SearchCriteria.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchCriteriaService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly SEARCH_CRITERIA_KEY = 'search-criteria';

  searchCriteria = signal<SearchCriteriaDataType | null>(null);

  getSearchCriteria(sessionId: string | null): SearchCriteriaDataType | null {
    const keyParams = `${sessionId}-${this.SEARCH_CRITERIA_KEY}`;
    const data = sessionId ? JSON.parse(this.localStorageService.getItem(keyParams) || '{}') : null;
    this.searchCriteria.set(data?.searchCriteria);
    return data?.searchCriteria;
  }

}
