import { Student } from 'app/model/Student';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { StudentService } from './../../../service/student.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  
    // --- for modal
  modalRefOfStudentList: BsModalRef;
  headers: any[];
  studentList: Student[]=[];
  selectedStudednt: Student; 
   

  constructor(
    private studentService: StudentService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this.getAllStudent();
    this.headers =
    [
      { field: 'no', header: 'No' },
      {field: 'epNumber', header: 'EP Number'},
      {field: 'registrationNumber', header: 'Registrations Number'},
      { field: 'student', header: 'student Name' },    
      {field: 'batch', header: 'Batch'},
      {field: 'degreeProYear', header: 'Degree_Pro Year'},  
      { field: 'edit', header: 'Edit' },
      { field: 'delete', header: 'Delete' }

    ];
  
  this.studentService.get_ngxModal_edit_$().subscribe(data =>{
    if(data){
      this.modalRefOfStudentList.hide()
      this.studentService._set_ngxModal_edit(false)
    }
  })

  this.studentService._editStudentToList.subscribe(data =>{
  let index = this.studentList.findIndex(student => student.id === data.id)
  this.studentList[index] = data;

  })

  this.studentService._addStudentToList.subscribe(data =>{
    let st = [...this.studentList];
    st.unshift(data);

    this.studentList = st;


  })

  }


  getAllStudent(){
    this.studentService.getAllStudent().subscribe(data =>{
      this.studentList = data;
      console.log("student ", this.studentList);
    }, err =>{
      console.log(err)
    })
  }

  update(student, addStudedntTemplate : TemplateRef<any>){
    this.selectedStudednt = student;
    this.openModal(addStudedntTemplate);
  }

  delete(student : Student){

    this.studentService.deleteStudent(student.id).subscribe(data =>{
      let index = this.studentList.indexOf(student);
      this.studentList = this.studentList.filter((val, i) => i != index);
    },err =>{
      console.log(err);
    })

  }

  openModal(template: TemplateRef<any>) {
    this.modalRefOfStudentList = this.modalService.show(template, { class: 'modal-lg' });
  }

}
