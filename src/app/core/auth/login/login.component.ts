import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite/flowbite.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { finalize, Subscription } from 'rxjs';
import { Constants } from '../../constants/constants';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  providers: [MessageService],
  selector: 'app-login',
  imports: [ReactiveFormsModule, ToastModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private readonly messageService = inject(MessageService);
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  loginForm!: FormGroup;
  subscriptionRef: Subscription = new Subscription();
  isLoading: WritableSignal<boolean> = signal<boolean>(false);

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message, life: 2000 });
  }
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: 2000 });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
  navigateToEmailVerify(): void {
    this.router.navigate(['/forgotpassword']);
  }

  ngOnInit(): void {
    this.initializeLoginForm();
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  initializeLoginForm(): void {

    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    })

  }



  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.subscriptionRef.unsubscribe();

      this.subscriptionRef = this.authenticationService.postLoginData(this.loginForm.value).pipe(finalize(() => {
        this.isLoading.set(false);
      })).subscribe({
        next: (res) => {
          console.log(res);
          this.showSuccess(res.message);
          this.loginForm.reset();
          localStorage.setItem(Constants.userToken, res.token);
          window.setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        }
      });

    }
  }


}

