import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/service/storage/storage.service'

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    );
  }

  getAllEmployeeTasks(): Observable<any> {
    return this.http.get(BASIC_URL + "api/employee/tasks", {
      headers:this.createAuthorizationHeader()
    })
  }

  updateTaskStatus(id: number, taskStatus: any): Observable<any> {
    return this.http.put(BASIC_URL + "api/employee/task/" + id, taskStatus, {
      headers:this.createAuthorizationHeader()
    })
  }

  getTaskById(id:number): Observable<any> {
    return this.http.get(BASIC_URL + "api/employee/task/" + id, {
      headers:this.createAuthorizationHeader()
    })
  }
}
