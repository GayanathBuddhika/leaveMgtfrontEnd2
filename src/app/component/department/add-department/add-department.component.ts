import { FacultyService } from './../../../service/faculty.service';
import { Faculty } from './../../../model/Faculty';
import { DepartmentService } from './../../../service/department.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Department } from 'app/model/Department';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  //---for reactive form
  departmentForm: FormGroup;
  facultyList: Faculty[];
  departmentForSave : Department;
  @Input() selecttedDepartment: Department;
  @Input() edit: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private facultyService: FacultyService
  ) { }

  ngOnInit() {

    this.getAllFaculty();
    this.departmentForm = this.formBuilder.group({
      // name: ["", [Validators.required, Validators.minLength(2)]],
      // description: [""],
      // address: ["", Validators.required],
      // email: ["", [Validators.required, Validators.email]],
      // website: [""],
      // phone: ["", [Validators.required]],
      // image: [""],
      // smsApiKey: [""],
      // isEnabled: ["1", Validators.required],
      // businessType: ["", Validators.required],
      // branchName: ["", Validators.required],
      // departmentName: ["Administration"],
      // subscriptionType:["",Validators.required],
      // startDate:[new Date().toJSON(),Validators.required],
      // selectedSurveyType:[this.selectedSurveyType,Validators.required]
      faculty: ["", Validators.required],
      name: ["", [Validators.required, Validators.minLength(2)]],
    });


  }

  // --- set the selected employee value to the form input when edit value is true
  ngAfterViewInit() {
    if (this.edit) {
      this.departmentForm.get('name').patchValue(this.selecttedDepartment.name);

    }

  }

  getAllFaculty() {

    this.facultyService.getAllFaculty().subscribe(data => {
      this.facultyList = data;
      console.log(this.facultyList);
    }, err => {
      console.log(err);
    })
  }

  onSelectFaculty(faculty: Faculty) {

    console.log("selected faculty", faculty);

  }


  saveFaculty() {
    console.log("faculty", this.departmentForm.value);
    this.departmentForSave = this.departmentForm.value;
    if(this.edit){
      this.departmentForSave.id = this.selecttedDepartment.id;
      //this.faculty.ai = this.selecttedFaculty.ai;
      this.departmentForSave.edit = this.edit;
    }
    this.departmentService.addDepartment(this.departmentForSave).subscribe(data => {
      console.log("success", data);

      if(this.edit){
        console.log("success_ in edit", data);
        if(data.action === "saved"){
          this.departmentService._editDepartmentToList.next(data.department);
          this.departmentService._set_ngxModal_edit(true);
        }
        

      }else{
              //--- set saved faculty data to the addFacultylist, if data properly saved 
        if(data.action === "saved"){
          this.departmentService._addDepartmentToList.next(data.department);
          this.departmentService._set_ngxModal_add(true);
        }
      }
    
    
    }, err => {
      console.log("error", err);
    })
  }

}
