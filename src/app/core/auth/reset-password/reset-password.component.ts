import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Constants } from '../../constants/constants';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit{

  private readonly authService = inject(AuthenticationService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  resetPassForm: WritableSignal<FormGroup> = signal({} as FormGroup);
  isLoading:WritableSignal<boolean> = signal(false);


  ngOnInit(): void {
      this.initializeResetPassForm();
  }
  
  initializeResetPassForm():void{
    this.resetPassForm.set(this.formBuilder.group({
      email : [null, [Validators.required, Validators.email]],
      newPassword : [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    }))
  }

  onResetPassSubmit():void{
    if(this.resetPassForm().valid){
      this.isLoading.set(true);
      this.authService.resetPassReq(this.resetPassForm().value).pipe(finalize(()=>{
        this.isLoading.set(false);
      })).subscribe({
        next: (res)=>{
          localStorage.setItem(Constants.userToken, res.token);
          this.resetPassForm().reset();
          setTimeout(()=>{
            this.router.navigate(['/home']);
          })
        }
      })
    }
  }

}
