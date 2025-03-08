import { Component, inject, OnInit, signal } from '@angular/core';
import { LocalStorageService } from '../../../../../core/services/localStorage.service';
import { dropDownMenu } from '../../../../animations/dropdownList.animation';
import { ClickOutsideDirective } from '../../../../../core/directives/click-outside.directive';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'header-profile',
  imports: [ClickOutsideDirective, CommonModule, RouterModule],
  templateUrl: './header-profile.component.html',
  providers: [LocalStorageService],
  animations: [dropDownMenu],
  styleUrl: './header-profile.component.css',
  host: {
    'class': 'profile-short-card dropdown-container'
  }
})
export class HeaderProfileComponent implements OnInit {
  public userProfile = signal<any | null>(null);
  private localStorage = inject(LocalStorageService);
  public userDropdownList = signal([
    { label: 'My Profile', icon: 'user', path: 'my-profile' },
    { label: 'Change Password', icon: 'lock', path: 'change-password' },
    { label: 'Settings', icon: 'gear', path: 'settings' },
    { label: 'Logout', icon: 'arrow-right-from-bracket', class: 'logout' },
  ]);
  public showDropdown = signal(false);

  public dropdownToggler(value: boolean): void {
    this.showDropdown.update(() => value);
  }
  public redirect(label: String):void {}
  ngOnInit(): void {
    this.userProfile.set(this.localStorage.getInnerItem('appSettings', 'user'));
  }
}
