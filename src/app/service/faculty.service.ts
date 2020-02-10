import { Faculty } from './../model/Faculty';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private _ngxModal_add = new BehaviorSubject<boolean>(false);
  private _ngxModal_edit = new BehaviorSubject<boolean>(false);

  public _addFacultyToList = new Subject<Faculty>();
  public _editFacultyToList = new Subject<Faculty>();

  constructor(private http: HttpClient) { }

  getAllFaculty() {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });

    return this.http.get<any>("http://localhost:8080/faculty/findAllFaculty/");
  }

  addFaculty(faculty: Faculty) {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });

    return this.http.post<any>("http://localhost:8080/faculty/addFaculty/", faculty);
  }
  
   deleteFaculty(facultyId: string) {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });    
    return this.http.post<any>("http://localhost:8080/faculty/deleteFaculty/"+ facultyId,{});
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
