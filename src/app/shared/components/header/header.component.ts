import { Component} from '@angular/core';
import { GlobalSearchComponent } from "./global-search/global-search.component";
import { HeaderProfileComponent } from "./header-profile/header-profile.component";
import { HeaderWalletComponent } from "./header-wallet/header-wallet.component";
import { NotificationComponent } from "./notification/notification.component";
import { ClientLogoComponent } from '../client-logo/client-logo.component';

@Component({
  selector: 'main-header',
  imports: [GlobalSearchComponent, HeaderProfileComponent, HeaderWalletComponent, NotificationComponent, ClientLogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  // encapsulation: ViewEncapsulation.None,
  host: {
    class: 'main-header'
  }
})
export class HeaderComponent {
}
