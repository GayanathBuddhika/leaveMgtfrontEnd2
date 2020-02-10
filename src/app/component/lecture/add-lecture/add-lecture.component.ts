import { DepartmentService } from './../../../service/department.service';
import { LectureServiceService } from './../../../service/lecture-service.service';
import { Lecture } from './../../../model/Lecture';
import { Department } from 'app/model/Department';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.scss']
})
export class AddLectureComponent implements OnInit {
  //---for reactive form
  lectureform: FormGroup;
  lectureList: Lecture[];
  lectureForSave: Lecture;
  departmentList: Department[] = [];
  @Input() onSelectedLecture: Lecture;
  @Input() edit: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private lectureService: LectureServiceService,
    private departmentService: DepartmentService
  ) { }


  ngOnInit() {
    this.getAllDepartment();

    this.lectureform = this.formBuilder.group({
      department: ["", Validators.required],
      registrationNumber: ["", Validators.required],
      name: ["", Validators.required],
    });

  }

  ngAfterViewInit() {
    if (this.edit) {
      this.lectureform.get('department').patchValue(this.onSelectedLecture.department);
      this.lectureform.get('registrationNumber').patchValue(this.onSelectedLecture.registrationNumber);
      this.lectureform.get('name').patchValue(this.onSelectedLecture.name);


    }

  }

  getAllDepartment() {

    this.departmentService.getAllDepartments().subscribe(data => {
      this.departmentList = data;
      console.log(this.departmentList);
    }, err => {
      console.log(err);
    })
  }

  saveLecture() {
    console.log("LECTURE", this.lectureform.value);
    this.lectureForSave = this.lectureform.value;
    if (this.edit) {
      this.lectureForSave.id = this.onSelectedLecture.id;
      this.lectureForSave.edit = this.edit;
    }
    this.lectureService.addLecture(this.lectureForSave).subscribe(data => {
      console.log("success", data);

      if (this.edit) {
        console.log("success_ in edit", data);
        if (data.action === "saved") {
          this.lectureService._editLectureToList.next(data.lecture);
          this.lectureService._set_ngxModal_edit(true);
        }


      } else {
        //--- set saved degreeProgram data to the addDegreeProgram, if data properly saved 
        if (data.action === "saved") {
          this.lectureService._addLectureToList.next(data.lecture);
          this.lectureService._set_ngxModal_add(true);
          this.lectureService._set_ngxModal_add(true);
        }
      }


    }, err => {
      console.log("error", err);
    })
  }

}
