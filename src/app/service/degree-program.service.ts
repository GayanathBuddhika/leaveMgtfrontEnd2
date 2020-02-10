import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { DegreeProgram } from 'app/model/DegreeProgram';

@Injectable({
  providedIn: 'root'
})
export class DegreeProgramService {
  private _ngxModal_add = new BehaviorSubject<boolean>(false);
  private _ngxModal_edit = new BehaviorSubject<boolean>(false);

  public _addDegreeProgramToList = new Subject<DegreeProgram>();
  public _editDegreeProgramToList = new Subject<DegreeProgram>();

  constructor(private http: HttpClient) { }


  getAllDegreeprogram() {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });

    return this.http.get<any>("http://localhost:8080/degreeProgram/findAllDegreeProgram/");
  }

  getDegreeByDepartmentId(depId: string){
    return this.http.get<any>("http://localhost:8080/degreeProgram/findAllDegreeProgramByDepId/"+depId);
  }

  addDegreeProgram(degreeProgram: DegreeProgram) {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });

    return this.http.post<any>("http://localhost:8080/degreeProgram/addDegreeProgram/", degreeProgram);
  }
  
   deleteDegreeProgram(degreeProgramId: string) {
    //const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });    
    return this.http.post<any>("http://localhost:8080/degreeProgram/deleteDegreeProgram/"+ degreeProgramId,{});
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
