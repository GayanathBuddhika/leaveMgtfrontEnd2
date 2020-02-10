import { HttpClient, HttpParams } from '@angular/common/http';
import { Course } from './../model/Course';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { DegreeCourse } from 'app/model/DegreeCourse';


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private _ngxModal_add = new BehaviorSubject<boolean>(false);
  private _ngxModal_edit = new BehaviorSubject<boolean>(false);

  public _addCourseToList = new Subject<DegreeCourse>();
  public _editCourseToList = new Subject<DegreeCourse>();
  constructor(private http: HttpClient) { }

  getAllCourse() {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });

    return this.http.get<any>("http://localhost:8080/course/findAllcourse/");
  }
  getAllDepCourse(depId: string) {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });

    return this.http.get<any>("http://localhost:8080/course/findAllDepCourseByDepId/"+ depId);
  }

  addCourse(course : Course, degreeId: string, lectureId: string) {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });
    let parameters = new HttpParams();
    parameters = parameters.set('degreeProgramId', degreeId).set('lecturId',lectureId)

    return this.http.post<any>("http://localhost:8080/course/addCourse/",course,{params:parameters} );
  }

   deleteCourse(degreeCourseId: string) {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });    
    return this.http.post<any>("http://localhost:8080/course/deleteDegreeCourse/"+ degreeCourseId,{});
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
