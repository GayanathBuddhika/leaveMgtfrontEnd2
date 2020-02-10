import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FacultyService } from 'app/service/faculty.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Faculty } from 'app/model/Faculty';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.scss']
})
export class FacultyListComponent implements OnInit {
  modalRefOfFacultyList: BsModalRef;
  headers: any[];
  facultyList: Faculty[] = [];
  onSelectedFaculty: Faculty;
  constructor(
    private facultyService: FacultyService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getAllFaculty();
    // -- for primeNG table
    this.headers =
      [
        { field: 'no', header: 'No' },
        { field: 'name', header: 'Name' },
        { field: 'edit', header: 'Edit' },
        { field: 'delete', header: 'Delete' }

      ];

      this.facultyService.get_ngxModal_edit_$().subscribe(data => {
        if (data) {
          this.modalRefOfFacultyList.hide();
        }
      })

    this.facultyService._addFacultyToList.subscribe(data => {
      console.log("*********aaaa");
      let facList = [...this.facultyList];
      facList.unshift(data);
      this.facultyList = facList;
      console.log("*********aaaa",this.facultyList);
    })

    this.facultyService._editFacultyToList.subscribe(data => {
      let index = this.facultyList.findIndex(faculty => faculty.id === data.id);
      this.facultyList[index] = data;
    })
  }

  getAllFaculty() {
    this.facultyService.getAllFaculty().subscribe(data => {
      this.facultyList = data;
      console.log("faculty list ", this.facultyList);
    }, err => {
      console.log("err", err);
    })
  }
  update(faculty: Faculty, template: TemplateRef<any>) {
    console.log("update  ", faculty);
    this.onSelectedFaculty = faculty;
    this.openModal(template);
  }

  delete(faculty: Faculty) {
    this.facultyService.deleteFaculty(faculty.id).subscribe(data => {

      let index = this.facultyList.indexOf(faculty);
     // this.facultyList.splice(index, 0);
      this.facultyList = this.facultyList.filter((val, i) => i != index);
      console.log("data", data);
    }, err => {
      console.log("err", err);
    })
    console.log("delete  ", faculty);
  }

  
  openModal(template: TemplateRef<any>){
    this.modalRefOfFacultyList = this.modalService.show(template,{class: 'modal-lg'});
  }
}
