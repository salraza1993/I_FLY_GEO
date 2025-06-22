import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { TooltipWrapperComponent } from "../../tooltip-wrapper/tooltip-wrapper.component";
import { ClickOutsideDirective } from '../../../../core/directives/click-outside.directive';
import { CurrencyService } from '../../../services/currency.service';

@Component({
  selector: 'header-wallet',
  imports: [TooltipWrapperComponent, ClickOutsideDirective, CommonModule],
  templateUrl: './header-wallet.component.html',
  styleUrl: './header-wallet.component.css'
})
export class HeaderWalletComponent implements OnInit {
  private CurrencyService = inject(CurrencyService);
  public currency = signal('');
  public totalWalletAmount: number = 1235.52;

  public showTooltip = signal(false);
  public tooltipContent = signal([
    { label: 'Cash Balance', value: 1672.24 },
    { label: 'Credit Limit', value: 3636.36 },
    { label: 'Available Balance', value: 34022.00 },
  ])

  public showTooltipHandler(value: boolean): void {
    this.showTooltip.update(() => value);
  }

  ngOnInit(): void {
    this.currency.set(this.CurrencyService.getSelectedCurrencyCode());
  }
}
