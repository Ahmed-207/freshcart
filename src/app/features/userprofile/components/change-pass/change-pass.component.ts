import { Component } from '@angular/core';
import { inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeUserDataService } from '../../services/change-user-data.service';
import { Constants } from '../../../../core/constants/constants';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  providers: [MessageService],
  selector: 'app-change-pass',
  imports: [FloatLabelModule, InputTextModule, ReactiveFormsModule, ToastModule,TranslatePipe],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.css',
})
export class ChangePassComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly changeDataService = inject(ChangeUserDataService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  changePassForm: WritableSignal<FormGroup> = signal({} as FormGroup);
  flag: WritableSignal<boolean> = signal(false);
  userName: WritableSignal<string> = signal(' ');

  ngOnInit(): void {


    this.changePassFormInitialize();

  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message, life: 2000 });
  }
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: 2000 });
  }

  changePassFormInitialize(): void {
    this.changePassForm.set(this.formBuilder.group({
      currentPassword: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      rePassword: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    }, { validators: this.validateConfirmPassword }))
  }


  validateConfirmPassword(g: AbstractControl) {

    let gPassword = g.get('password')?.value;
    let gRePassword = g.get('rePassword')?.value;

    return gPassword === gRePassword ? null : { mismatch: true }

  }

  onChangePassSubmit(): void {

    if (this.changePassForm().valid) {

      this.changeDataService.requestChangeLoggedPass(this.changePassForm().value).pipe(finalize(() => {
        this.changePassForm().reset();
      })).subscribe({
        next: (res) => {
          this.showSuccess(res.message);
          localStorage.setItem(Constants.userToken, res.token);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        error: (err: HttpErrorResponse) => {
          this.showError(err.message);
        }
      });

    }

  }
}
