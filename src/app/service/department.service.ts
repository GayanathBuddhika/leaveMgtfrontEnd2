import { HttpClient } from '@angular/common/http';
import { Department } from './../model/Department';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private _ngxModal_add = new BehaviorSubject<boolean>(false);
  private _ngxModal_edit = new BehaviorSubject<boolean>(false);

  public _addDepartmentToList = new Subject<Department>();
  public _editDepartmentToList = new Subject<Department>();

  constructor(private http: HttpClient) { }


  getAllDepartments() {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });

    return this.http.get<any>("http://localhost:8080/department/findAllDepartment/");
  }

  addDepartment(department: Department) {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });

    return this.http.post<any>("http://localhost:8080/department/addDepartment/", department);
  }
  
   deleteDepartment(departmentId: string) {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });    
    return this.http.post<any>("http://localhost:8080/department/deleteDepartment/"+ departmentId,{});
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
