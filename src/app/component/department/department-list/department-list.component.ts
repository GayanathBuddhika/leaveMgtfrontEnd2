import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DepartmentService } from './../../../service/department.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Department } from 'app/model/Department';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  modalRefOfDepartmentList: BsModalRef;
  headers: any[];
  departmentList: Department[] = [];
  onSelectedDepartment: Department;
  constructor(
    private departmentService: DepartmentService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {

    this.getAllDepartment();
    // -- for primeNG table
    this.headers =
      [
        { field: 'no', header: 'No' },
        { field: 'name', header: 'Name' },
        { field: 'faculty', header: 'Faculty Name' },
        { field: 'edit', header: 'Edit' },
        { field: 'delete', header: 'Delete' }

      ];

    this.departmentService.get_ngxModal_edit_$().subscribe(data => {
      if (data) {
        this.modalRefOfDepartmentList.hide();
      }
    })

    this.departmentService._addDepartmentToList.subscribe(data => {
      console.log("*********");
      let depList = [...this.departmentList];
      depList.unshift(data);
      this.departmentList = depList;
      console.log("*********", this.departmentList);
    })

    this.departmentService._editDepartmentToList.subscribe(data => {
      let index = this.departmentList.findIndex(department => department.id === data.id);
      this.departmentList[index] = data;
    })
  }

  getAllDepartment() {
    this.departmentService.getAllDepartments().subscribe(data => {
      console.log("department  ", data);
      this.departmentList = data;
    })
  }

  update(Department: Department, template: TemplateRef<any>) {
    console.log("update  ", Department);
    this.onSelectedDepartment = Department;
    this.openModal(template);
  }

  delete(department: Department) {
    this.departmentService.deleteDepartment(department.id).subscribe(data => {
      let index = this.departmentList.indexOf(department);
      // let index = this.departmentList.indexOf();
      // this.facultyList.splice(index, 0);
      this.departmentList = this.departmentList.filter((val, i) => i != index);
      console.log("data", data);
    }, err => {
      console.log("err", err);
    })
    console.log("delete  ", department);
  }


  openModal(template: TemplateRef<any>) {
    this.modalRefOfDepartmentList = this.modalService.show(template, { class: 'modal-lg' });
  }

}
