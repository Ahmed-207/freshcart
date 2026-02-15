import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeDataRes } from '../models/change-data-res.interface';
import { ChangeData, ChangePass } from '../models/change-data.interface';
import { environment } from '../../../../environments/environment.development';
import { ChLogPassRes } from '../models/ch-log-pass.interface';

@Injectable({
  providedIn: 'root',
})
export class ChangeUserDataService {

  private readonly httpClient = inject(HttpClient);

  requestChangeData(userData:ChangeData):Observable<ChangeDataRes>{
    return this.httpClient.put<ChangeDataRes>(environment.base_url + 'users/updateMe/', userData);
  }

  requestChangeLoggedPass(passData:ChangePass):Observable<ChLogPassRes>{
    return this.httpClient.put<ChLogPassRes>(environment.base_url + 'users/changeMyPassword', passData);
  }

  
}
