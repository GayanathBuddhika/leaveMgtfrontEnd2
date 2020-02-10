import { DegreeProgram } from './../../../model/DegreeProgram';
import { DegreeProgramService } from 'app/service/degree-program.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';


@Component({
  selector: 'app-degree-program-list',
  templateUrl: './degree-program-list.component.html',
  styleUrls: ['./degree-program-list.component.scss']
})
export class DegreeProgramListComponent implements OnInit {
  modalRefOfDegreeProgramList: BsModalRef;
  headers: any[];
  degreeProgramList: DegreeProgram[] = [];
  onSelectedDegreeProgram: DegreeProgram;
  constructor(
    private degreeProgramService: DegreeProgramService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    
    this.getAllDegreeProgram();
    // -- for primeNG table
    this.headers =
      [
        { field: 'no', header: 'No' },
        { field: 'name', header: 'Name' },
        { field: 'department', header: 'Department Name' },
        { field: 'edit', header: 'Edit' },
        { field: 'delete', header: 'Delete' }

      ];

    this.degreeProgramService.get_ngxModal_edit_$().subscribe(data => {
      if (data) {
        this.modalRefOfDegreeProgramList.hide();
      }
    })

    this.degreeProgramService._addDegreeProgramToList.subscribe(data => {
      console.log("*********");
      let degreeList = [...this.degreeProgramList];
      degreeList.unshift(data);
      this.degreeProgramList = degreeList;
      console.log("*********", this.degreeProgramList);
    })

    this.degreeProgramService._editDegreeProgramToList.subscribe(data => {
      let index = this.degreeProgramList.findIndex(department => department.id === data.id);
      this.degreeProgramList[index] = data;
    })
  }

  getAllDegreeProgram() {
    this.degreeProgramService.getAllDegreeprogram().subscribe(data => {
      console.log("degreeProgram  ", data);
      this.degreeProgramList = data;
    })
  }

  update(DegreeProgram: DegreeProgram, template: TemplateRef<any>) {
    console.log("update  ", DegreeProgram);
    this.onSelectedDegreeProgram = DegreeProgram;
    this.openModal(template);
  }

  delete(degreeProgram: DegreeProgram) {
    this.degreeProgramService.deleteDegreeProgram(degreeProgram.id).subscribe(data => {
      let index = this.degreeProgramList.indexOf(degreeProgram);
      // let index = this.departmentList.indexOf();
      // this.facultyList.splice(index, 0);
      this.degreeProgramList = this.degreeProgramList.filter((val, i) => i != index);
      console.log("data", data);
    }, err => {
      console.log("err", err);
    })
    console.log("delete  ", degreeProgram);
  }


  openModal(template: TemplateRef<any>) {
    this.modalRefOfDegreeProgramList = this.modalService.show(template, { class: 'modal-lg' });
  }

}
