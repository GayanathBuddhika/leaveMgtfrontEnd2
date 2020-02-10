import { Faculty } from './../../../../model/Faculty';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacultyService } from 'app/service/faculty.service';

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.scss']
})
export class AddFacultyComponent implements OnInit {
  //---for reactive form
  facultyForm: FormGroup;
  faculty: Faculty;
  @Input() selecttedFaculty: Faculty;
  @Input() edit: Boolean =  false;

  constructor(
    private formBuilder: FormBuilder,
    private facultyService: FacultyService
  ) { }

  ngOnInit() {
    this.facultyForm = this.formBuilder.group({
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
      name: ["", [Validators.required, Validators.minLength(2)]],
    });

  }

    // --- set the selected employee value to the form input when edit value is true
    ngAfterViewInit() {
      if (this.edit) {
        this.facultyForm.get('name').patchValue(this.selecttedFaculty.name);
       
      }
  
    }

  saveFaculty() {
    console.log("faculty", this.facultyForm.value);
    this.faculty = this.facultyForm.value;
    if(this.edit){
      this.faculty.id = this.selecttedFaculty.id;
      //this.faculty.ai = this.selecttedFaculty.ai;
      this.faculty.edit = this.edit;
    }
    this.facultyService.addFaculty(this.faculty).subscribe(data => {
      console.log("success", data);

      if(this.edit){
        console.log("success_ in edit", data);
        if(data.action === "saved"){
          this.facultyService._editFacultyToList.next(data.faculty);
          this.facultyService._set_ngxModal_edit(true);
        }
        

      }else{
              //--- set saved faculty data to the addFacultylist, if data properly saved 
        if(data.action === "saved"){
          this.facultyService._addFacultyToList.next(data.faculty);
          this.facultyService._set_ngxModal_add(true);
        }
      }
    
    
    }, err => {
      console.log("error", err);
    })
  }

}
