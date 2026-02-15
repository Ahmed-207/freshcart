import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-email-verify',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './email-verify.component.html',
  styleUrl: './email-verify.component.css',
})
export class EmailVerifyComponent implements OnInit {

  private readonly authService = inject(AuthenticationService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  emailVerifyForm: WritableSignal<FormGroup> = signal({} as FormGroup);
  subscriptionRef!: Subscription;
  isLoading: WritableSignal<Boolean> = signal(false);

  ngOnInit(): void {

    this.initializeForgotPassEmail();

  }

  initializeForgotPassEmail(): void {
    this.emailVerifyForm.set(this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    }))
  }

  onVerifyEmailSubmit(): void {
    if (this.emailVerifyForm().valid) {
      this.isLoading.set(true);
      this.subscriptionRef = this.authService.forgotPasswordReq(this.emailVerifyForm().value).pipe(finalize(() => {
        this.isLoading.set(false);
      })).subscribe({
        next: () => {
          this.emailVerifyForm().reset();
          setTimeout(() => {
            this.router.navigate(['/codeverify'])
          }, 2000);
        }
      })
    }
  }

}
