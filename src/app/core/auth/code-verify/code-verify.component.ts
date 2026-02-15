import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-code-verify',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './code-verify.component.html',
  styleUrl: './code-verify.component.css',
})
export class CodeVerifyComponent implements OnInit{

  private readonly authService = inject(AuthenticationService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  verifyCodeForm:WritableSignal<FormGroup> = signal({} as FormGroup);
  isLoading:WritableSignal<boolean>= signal(false);

  ngOnInit(): void {
    this.initializeCodeForm();
      
  }

  initializeCodeForm():void{
    this.verifyCodeForm.set(this.formBuilder.group({
      resetCode : [null, [Validators.required, Validators.pattern(/^\d{6}$/)]]
    }))
  }

  onVerifyCodeSubmit():void{
    if(this.verifyCodeForm().valid){
      this.isLoading.set(true);
      this.verifyCodeForm().get('resetCode')?.value.toString();
      this.authService.verifyCodeReq(this.verifyCodeForm().value).pipe(finalize(()=>{
        this.isLoading.set(false);
      })).subscribe({
        next:()=>{
          this.verifyCodeForm().reset();
          setTimeout(()=>{
            this.router.navigate(['/resetpass']);
          },2000);
        }
      })
    }
  }


}
