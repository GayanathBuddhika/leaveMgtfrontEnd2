import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from 'app/model/Student';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private _ngxModal_add = new BehaviorSubject<boolean>(false);
  private _ngxModal_edit = new BehaviorSubject<boolean>(false);

  public _addStudentToList = new Subject<Student>();
  public _editStudentToList = new Subject<Student>();
  constructor(private http: HttpClient) { }


   getAllStudentByDepId(depId: string) {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });

    return this.http.get<any>("http://localhost:8080/student/findAllstudentByDepId/"+ depId);
  }
  getAllStudent() {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });

    return this.http.get<any>("http://localhost:8080/student/findAllstudent/");
  }

  addStudentCourse(studentList: Student[], courseId: string){
    let parameters = new HttpParams();
    parameters = parameters.set('courseId', courseId);
    
    return this.http.post<any>("http://localhost:8080/student/assingStudentToCourse/",studentList,{params: parameters});
  }

  addStudent(studednt: Student){
    return this.http.post<any>("http://localhost:8080/student/addStudent/",studednt );
  }
  deleteStudent(studedntId: string){
    return this.http.post<any>("http://localhost:8080/student/deleteStudent/" + studedntId, {});
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
