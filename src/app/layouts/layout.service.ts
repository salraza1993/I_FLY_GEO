import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PageLayoutEnum } from '@sharedEnums/PageLayoutEnum';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private layoutSubject = new Subject<PageLayoutEnum>();
  public layout$ = this.layoutSubject.asObservable();

  setLayout(value: PageLayoutEnum): void {
    this.layoutSubject.next(value);
  }
}
