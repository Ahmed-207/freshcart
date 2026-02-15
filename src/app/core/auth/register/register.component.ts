import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { ReactiveFormsModule, Validators, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  providers:[MessageService],
  selector: 'app-register',
  imports: [ReactiveFormsModule, ToastModule, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  private readonly messageService = inject(MessageService);
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  subscriptionRef : Subscription = new Subscription();
  registerForm!:FormGroup;
  errorMessageSignUp: WritableSignal<string> = signal<string>('');
  isLoading: WritableSignal<boolean> = signal<boolean>(false);

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'success', detail: message , life: 2000});
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message, life: 2000 });
  }

  ngOnInit(): void {
    this.initializeRegisterForm();
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  initializeRegisterForm():void{

    this.registerForm = this.formBuilder.group({
      name : [null,[Validators.required, Validators.pattern(/^.{3,9}$/)]],
      email : [null,[Validators.required, Validators.email]],
      password : [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      rePassword : [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      phone : [null,[Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
    }, { validators: this.validateConfirmPassword })
    
  }

  validateConfirmPassword(g: AbstractControl) {

    let gPassword = g.get('password')?.value;
    let gRePassword = g.get('rePassword')?.value;

    return gPassword === gRePassword ? null : { mismatch: true }

  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.subscriptionRef.unsubscribe();
      this.subscriptionRef = this.authenticationService.postAccountData(this.registerForm.value).pipe(finalize(() => {
        this.isLoading.set(false);
      })).subscribe({
        next: (res) => {
          console.log(res);
          this.errorMessageSignUp.set('');
          this.registerForm.reset();
          this.showSuccess(res.message);
          window.setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      })

    }else{

      this.showFirstError();

    }

  }

  showFirstError():void{
    const controls = this.registerForm.controls;

    for (const control in controls) {

      const controlItem = controls[control];

      if(controlItem.invalid){
        controlItem.markAsTouched();
        break;
      }



    }
  }


}
