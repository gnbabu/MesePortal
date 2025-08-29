import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { IPermissionsResponse, IUser } from '../models/core.models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpService: HttpService) {}

  getUserById(userId: number): Observable<IUser> {
    return this.httpService.get<IUser>(`Users/${userId}`, {});
  }

  getUserRolesandPermissions(userId: number): Observable<IPermissionsResponse> {
    debugger;
    return this.httpService.get<IPermissionsResponse>(
      `Users/${userId}/permissions`,
      {}
    );
  }
}
