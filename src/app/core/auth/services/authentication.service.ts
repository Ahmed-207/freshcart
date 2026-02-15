import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AuthResponse, ForgotPassEmail, ResetPassRes, User, UserData, VerifyCodeRes } from '../models/auth-response.interface';
import { jwtDecode } from "jwt-decode";
import { Constants } from '../../constants/constants';
import { Router } from '@angular/router';
import { VerifyEmail } from '../models/verify-email.interface';
import { VerifyCode } from '../models/verify-code.interface';
import { ResetPass } from '../models/reset-pass.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  currentUser:WritableSignal<any> = signal<any>(null);

  constructor(@Inject(PLATFORM_ID) private plat_id: object) {
    this.getUserData();
  }

  getUserData() {
    if (isPlatformBrowser(this.plat_id)) {
      const token = localStorage.getItem(Constants.userToken);
      if (token) {
        try {
          const decoded = jwtDecode(token);
          this.currentUser.set(decoded); // Update the signal
        } catch (e) {
          this.currentUser.set(null);
        }
      }
    }
  }

  postAccountData(userData: UserData): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(environment.base_url + 'auth/signup', userData);
  }

  postLoginData(userData: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(environment.base_url + 'auth/signin', userData);
  }

  // decodeUserData(): UserDataDecoded {

  //   if (isPlatformBrowser(this.plat_id)) {
  //     if (localStorage.getItem(Constants.userToken)!) {
  //       const userDataReturn : UserDataDecoded = jwtDecode(localStorage.getItem(Constants.userToken)!);
  //       return userDataReturn;
  //     }
  //   }
  //   return {} as UserDataDecoded;
  // }

  signOutUser(): void {
    localStorage.removeItem(Constants.userToken);

    this.router.navigate(['/login']);

  }

  forgotPasswordReq(userEmail: ForgotPassEmail): Observable<VerifyEmail> {
    return this.httpClient.post<VerifyEmail>(environment.base_url + 'auth/forgotPasswords', userEmail);
  }

  verifyCodeReq(code: VerifyCode): Observable<VerifyCodeRes> {
    return this.httpClient.post<VerifyCodeRes>(environment.base_url + 'auth/verifyResetCode', code);
  }

  resetPassReq(userDataNewPass: ResetPass): Observable<ResetPassRes> {
    return this.httpClient.put<ResetPassRes>(environment.base_url + 'auth/resetPassword', userDataNewPass);
  }

}
