import { HttpClient } from '@angular/common/http';
import { Lecture } from './../model/Lecture';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LectureServiceService {
  private _ngxModal_add = new BehaviorSubject<boolean>(false);
  private _ngxModal_edit = new BehaviorSubject<boolean>(false);

  public _addLectureToList = new Subject<Lecture>();
  public _editLectureToList = new Subject<Lecture>();

  constructor(private http: HttpClient) { }


  getAllLectures() {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });

    return this.http.get<any>("http://localhost:8080/Lecture/findAllLecture/");
  }
  getAllLecturesByDepId(depId: string) {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });

    return this.http.get<any>("http://localhost:8080/Lecture/findAllLectureByDepId/"+ depId);
  }

  addLecture(lecture: Lecture) {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });

    return this.http.post<any>("http://localhost:8080/Lecture/addLectuer/", lecture);
  }
  
   deleteLectuer(lectuerId: string) {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });    
    return this.http.post<any>("http://localhost:8080/Lecture/deleteLecture/"+ lectuerId,{});
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
