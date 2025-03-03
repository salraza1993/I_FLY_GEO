import { Component, signal, WritableSignal } from '@angular/core';
import { COMMON_IMPORTS } from '../../../shared/helpers/common-imports';
import { showPasswordToggler } from '../../helpers/CommonFunction';

@Component({
  selector: 'register-form',
  imports: [...COMMON_IMPORTS],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css', '../../styles/auth-form-styles.css']
})
export class RegisterFormComponent {
  public showPassword: WritableSignal<boolean> = signal(false);
  protected showPasswordHandler(): void {
    showPasswordToggler(this.showPassword, this.showPassword());
  }

}
