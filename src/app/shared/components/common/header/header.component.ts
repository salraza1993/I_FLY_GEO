import { Component } from '@angular/core';
import { HeaderLogoComponent } from "./header-logo/header-logo.component";
import { GlobalSearchComponent } from "./global-search/global-search.component";
import { HeaderProfileComponent } from "./header-profile/header-profile.component";
import { HeaderWalletComponent } from "./header-wallet/header-wallet.component";
import { NotificationComponent } from "./notification/notification.component";

@Component({
  selector: 'main-header',
  imports: [HeaderLogoComponent, GlobalSearchComponent, HeaderProfileComponent, HeaderWalletComponent, NotificationComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  host: {
    class: 'main-header'
  }
})
export class HeaderComponent {

}
