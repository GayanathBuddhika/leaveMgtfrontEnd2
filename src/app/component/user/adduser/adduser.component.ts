import { DashboardRoutingModule } from './../../../dashboard/dashboard-routing/dashboard-routing.module';
import { DepartmentService } from './../../../service/department.service';
import { UserService } from './../../../service/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './../../../model/User';
import { Component, OnInit, Input } from '@angular/core';
import { Department } from 'app/model/Department';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  //---for reactive form
  userForm: FormGroup;
  userForSave: User;
  userList: User[] = [];
  departmentList: Department[] = [];


  @Input() selectedUser: User;
  @Input() edit: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private userSertvice: UserService,
    private departmentService: DepartmentService

  ) { }

  ngOnInit() {
    this.getAllDepartment();
    this.userForm = this.formBuilder.group({
      employeeId: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      phoneNo: ["", Validators.required],
      address: ["", Validators.required],
      department: ["", Validators.required],

    });


  }

  // --- set the selected employee value to the form input when edit value is true
  ngAfterViewInit() {

    console.log("selected user", this.selectedUser)
    if (this.edit) {
      this.userForm.get('department').patchValue(this.selectedUser.department);
      this.userForm.get('firstName').patchValue(this.selectedUser.firstName);
      this.userForm.get('lastName').patchValue(this.selectedUser.lastName);
      this.userForm.get('email').patchValue(this.selectedUser.email);
      this.userForm.get('phoneNo').patchValue(this.selectedUser.phoneNo);
      this.userForm.get('employeeId').patchValue(this.selectedUser.employeeId);
      this.userForm.get('address').patchValue(this.selectedUser.address);  
     

    }
  }

  getAllDepartment() {
    this.departmentService.getAllDepartments().subscribe(data => {
      this.departmentList = data;
      console.log("555555", data);

    }, err => {
      console.log(err);
    })
  }

  saveUser() {
    console.log("22222222", this.userForm.value);
    this.userForSave = this.userForm.value;
    console.log("3333333", this.userForSave);
    //console.log("44444", this.userForSave.edit);

    if (this.edit) {
      this.userForSave.id = this.selectedUser.id;
      this.userForSave.edit = this.edit;
    }else{
      this.userForSave.edit = this.edit;
    }

    this.userSertvice.addUser(this.userForSave).subscribe(data => {
      console.log("user save ", data)

      if (this.edit) {
        if (data.action === "saved") {
          console.log("1111", data);
          this.userSertvice._editUserToList.next(data.user);
          this.userSertvice._set_ngxModal_edit(true);
        }

      } else {
        if (data.action === "saved") {
          this.userSertvice._addUserToList.next(data.user);
          this.userSertvice._set_ngxModal_add(true);
        }
      }
    }, err => {
      console.log(err);
    })
  }
  // savestudent() {
  //   console.log("faculty", this.studentForm.value);
  //   this.studentForSave = this.studentForm.value;
  //   if(this.edit){
  //     this.studentForSave.id= this.selectedStudednt.id;
  //     this.studentForSave.edit = this.edit;
  //   }
  //   this.studedntService.addStudent(this.studentForSave).subscribe(data =>{
  //     if(this.edit){
  //       if(data.action === "saved"){          
  //         console.log("saved student ", data.student);
  //         this.studedntService._editStudentToList.next(data.student);
  //         this.studedntService._set_ngxModal_edit(true);

  //       }
  //     }else{
  //       if(data.action === "saved"){      
  //       this.studedntService._addStudentToList.next(data.student);
  //       this.studedntService._set_ngxModal_add(true);
  //       }
  //     }

  //     console.log("save student ", data);
  //   },err =>{
  //     console.log(err);
  //   })
  //   // if(this.edit){
  //   //   this.departmentForSave.id = this.selecttedDepartment.id;
  //   //   //this.faculty.ai = this.selecttedFaculty.ai;
  //   //   this.departmentForSave.edit = this.edit;
  //   // }
  //   // this.departmentService.addDepartment(this.departmentForSave).subscribe(data => {
  //   //   console.log("success", data);

  //   //   if(this.edit){
  //   //     console.log("success_ in edit", data);
  //   //     if(data.action === "saved"){
  //   //       this.departmentService._editDepartmentToList.next(data.department);
  //   //       this.departmentService._set_ngxModal_edit(true);
  //   //     }


  //   //   }else{
  //   //           //--- set saved faculty data to the addFacultylist, if data properly saved 
  //   //     if(data.action === "saved"){
  //   //       this.departmentService._addDepartmentToList.next(data.department);
  //   //       this.departmentService._set_ngxModal_add(true);
  //   //     }
  //   //   }


  //   // }, err => {
  //   //   console.log("error", err);
  //   // })
  // }

}
