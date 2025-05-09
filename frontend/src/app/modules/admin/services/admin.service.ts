import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/service/storage/storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get(BASIC_URL + "api/admin/users", {
      headers:this.createAuthorizationHeader()
    })
  }

  postTasks(taskDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + "api/admin/task", taskDTO, {
      headers:this.createAuthorizationHeader()
    })
  }

  updateTasks(id: number, taskDTO: any): Observable<any> {
    return this.http.put(BASIC_URL + "api/admin/task/" + id, taskDTO, {
      headers:this.createAuthorizationHeader()
    })
  }

  deleteTasks(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + "api/admin/task/" + id, {
      headers:this.createAuthorizationHeader()
    })  
  }

  getAllUser(): Observable<any> {
    return this.http.get(BASIC_URL + "api/admin/tasks", {
      headers:this.createAuthorizationHeader()
    })
  }

  getAllTasks(): Observable<any> {
    return this.http.get(BASIC_URL + "api/admin/tasks", {
      headers:this.createAuthorizationHeader()
    })
  }

  getTaskById(id:number): Observable<any> {
    return this.http.get(BASIC_URL + "api/admin/task/" + id, {
      headers:this.createAuthorizationHeader()
    })
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    );
  }
}
