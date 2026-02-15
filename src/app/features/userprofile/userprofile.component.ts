import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthenticationService } from '../../core/auth/services/authentication.service';
import { ChangeUserDataService } from './services/change-user-data.service';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  providers: [MessageService],
  selector: 'app-userprofile',
  imports: [FloatLabelModule, InputTextModule, ReactiveFormsModule, ToastModule, RouterLink,TranslatePipe],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css',
})
export class UserprofileComponent implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthenticationService);
  private readonly changeDataService = inject(ChangeUserDataService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  changeDataForm: WritableSignal<FormGroup> = signal({} as FormGroup);
  flag: WritableSignal<boolean> = signal(false);
  userName = computed(() => this.authService.currentUser()?.name || 'Guest');

  ngOnInit(): void {


    this.changeDataFormInitialize();

  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message, life: 2000 });
  }
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: 2000 });
  }

  changeDataFormInitialize(): void {
    this.changeDataForm.set(this.formBuilder.group({
      name: [{ value: this.userName(), disabled: true }, [Validators.required, Validators.pattern(/^.{3,9}$/)]],
      email: [{ value: null, disabled: true }, [Validators.required, Validators.email]],
      phone: [{ value: null, disabled: true }, [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]]
    }))
  }


  toggleButton(): void {
    this.flag.set(!this.flag());
    this.changeDataForm().enable();
  }


  onChangeDataSubmit(): void {

    if (this.changeDataForm().valid) {

      this.changeDataService.requestChangeData(this.changeDataForm().value).pipe(finalize(() => {
        this.changeDataForm().reset();
      })).subscribe({
        next: (res) => {
          console.log(res);
          this.showSuccess(res.message);
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
/*

---- logic for showing user data from decode -------

  private readonly authService = inject(AuthenticationService);

  userName!:WritableSignal<string>;
  userMail!:WritableSignal<string>;
  userPhone!:WritableSignal<number>;


  getUserOldData():void{
    this.authService.decodeUserData();
    this.userName.set(this.authService.userData.name);
    this.userMail.set(this.authService.userData.email);
    this.userPhone.set(this.authService.userData.phone);
  }


*/