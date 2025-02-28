import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PageLayoutEnum } from '../shared/enums/PageLayoutEnum';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  // private layout = signal<PageLayoutEnum>('Hello')
  // public currentLayout$ = this.layout()
  // constructor() { }

  private layoutSubject = new Subject<PageLayoutEnum>();
  public layout$ = this.layoutSubject.asObservable();

  setLayout(value: PageLayoutEnum): void {
    this.layoutSubject.next(value);
  }

}
