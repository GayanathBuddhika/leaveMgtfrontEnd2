import { StudentService } from './../../../service/student.service';
import { DepartmentService } from './../../../service/department.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from 'app/model/Department';
import { Student } from 'app/model/Student';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent implements OnInit {
 //---for reactive form
 studentForm : FormGroup;
 studentForSave: Student;
 departmentList: Department[]=[];
 @Input() selectedStudednt: Student;
 @Input() edit: Boolean= false;
  constructor(
    private formBuilder: FormBuilder,
    private departmentSertvice: DepartmentService,
    private studedntService: StudentService
  ) { }

  ngOnInit() {
    this.getAllDepartment();
    this.studentForm = this.formBuilder.group({
      epNumber: ["", Validators.required],
      registrationNumber:["",Validators.required],
      batch:["",Validators.required],
      studentName:["", Validators.required],
      degreeProYear:["", Validators.required],
      department: ["", Validators.required],
     
    });

  }
    // --- set the selected employee value to the form input when edit value is true
    ngAfterViewInit() {
      if (this.edit) {
        this.studentForm.get('epNumber').patchValue(this.selectedStudednt.epNumber);
        this.studentForm.get('registrationNumber').patchValue(this.selectedStudednt.registrationNumber);
        this.studentForm.get('batch').patchValue(this.selectedStudednt.batch);
        this.studentForm.get('studentName').patchValue(this.selectedStudednt.studentName);
        this.studentForm.get('degreeProYear').patchValue(this.selectedStudednt.degreeProYear);
        this.studentForm.get('department').patchValue(this.selectedStudednt.department);
  
      }
    }

  getAllDepartment(){
    this.departmentSertvice.getAllDepartments().subscribe(data =>{
      this.departmentList= data;

    },err=>{
      console.log(err);
    })
  }

  savestudent() {
    console.log("faculty", this.studentForm.value);
    this.studentForSave = this.studentForm.value;
    if(this.edit){
      this.studentForSave.id= this.selectedStudednt.id;
      this.studentForSave.edit = this.edit;
    }




    this.studedntService.addStudent(this.studentForSave).subscribe(data =>{


      if(this.edit){
        if(data.action === "saved"){          
          console.log("saved student ", data.student);
          this.studedntService._editStudentToList.next(data.student);
          this.studedntService._set_ngxModal_edit(true);
  
        }
      }else{
        if(data.action === "saved"){      
        this.studedntService._addStudentToList.next(data.student);
        this.studedntService._set_ngxModal_add(true);
        }
      }
      
      console.log("save student ", data);
    },err =>{
      console.log(err);
    })
    // if(this.edit){
    //   this.departmentForSave.id = this.selecttedDepartment.id;
    //   //this.faculty.ai = this.selecttedFaculty.ai;
    //   this.departmentForSave.edit = this.edit;
    // }
    // this.departmentService.addDepartment(this.departmentForSave).subscribe(data => {
    //   console.log("success", data);

    //   if(this.edit){
    //     console.log("success_ in edit", data);
    //     if(data.action === "saved"){
    //       this.departmentService._editDepartmentToList.next(data.department);
    //       this.departmentService._set_ngxModal_edit(true);
    //     }
        

    //   }else{
    //           //--- set saved faculty data to the addFacultylist, if data properly saved 
    //     if(data.action === "saved"){
    //       this.departmentService._addDepartmentToList.next(data.department);
    //       this.departmentService._set_ngxModal_add(true);
    //     }
    //   }
    
    
    // }, err => {
    //   console.log("error", err);
    // })
  }

}
