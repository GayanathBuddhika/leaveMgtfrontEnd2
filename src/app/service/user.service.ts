import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { User } from './../model/User';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _ngxModal_add = new BehaviorSubject<boolean>(false);
  private _ngxModal_edit = new BehaviorSubject<boolean>(false);

  public _addUserToList = new Subject<User>();
  public _editUserToList = new Subject<User>();
  constructor(
    private http: HttpClient
  ) { }


  //  getAllStudentByDepId(depId: string) {
  //   //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });

  //   return this.http.get<any>("http://localhost:8080/student/findAllstudentByDepId/"+ depId);
  // }
  getAlluser() {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });

    return this.http.get<any>('http://localhost:8080/user/findAll/');
  }

  // addStudentCourse(studentList: Student[], courseId: string){
  //   let parameters = new HttpParams();
  //   parameters = parameters.set('courseId', courseId);

  //   return this.http.post<any>("http://localhost:8080/student/assingStudentToCourse/",studentList,{params: parameters});
  // }

  addUser(user: User) {
    return this.http.post<any>("http://localhost:8080/user/addUser/", user);
  }

  deleteUser(userId: string) {
    return this.http.post<any>("http://localhost:8080/user/deleteUser/" + userId, {});
  }



  _set_ngxModal_add(value: boolean) {
    this._ngxModal_add.next(value);
  }

  get_ngxModal_add_$(): Observable<boolean> {
    return this._ngxModal_add.asObservable();
  }

  _set_ngxModal_edit(value: boolean) {
    this._ngxModal_edit.next(value);
  }

  get_ngxModal_edit_$(): Observable<boolean> {
    return this._ngxModal_edit.asObservable();
  }

}
