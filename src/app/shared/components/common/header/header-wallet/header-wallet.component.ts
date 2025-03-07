import { Component } from '@angular/core';

@Component({
  selector: 'header-wallet',
  imports: [],
  templateUrl: './header-wallet.component.html',
  styleUrl: './header-wallet.component.css'
})
export class HeaderWalletComponent {
  currency: string = 'USD';
  totalWalletAmount:number = 1235.52;
}
