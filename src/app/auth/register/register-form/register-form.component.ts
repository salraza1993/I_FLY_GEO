import { Component, signal, WritableSignal } from '@angular/core';
import { COMMON_IMPORTS } from '../../../shared/helpers/common-imports';
import { showPasswordToggler } from '../../helpers/CommonFunction';
import { CheckboxComponent } from '../../../shared/components/common/elements/checkbox/checkbox.component';

@Component({
  selector: 'register-form',
  imports: [...COMMON_IMPORTS, CheckboxComponent],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css', '../../styles/auth-form-styles.css']
})
export class RegisterFormComponent {
  public tncAgreement = signal<boolean>(false);
  public showPassword: WritableSignal<boolean> = signal(false);
  protected showPasswordHandler(): void {
    showPasswordToggler(this.showPassword, this.showPassword());
  }

}
