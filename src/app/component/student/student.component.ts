import { StudentService } from './../../service/student.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

    // --- for modal
    modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    
    this.studentService.get_ngxModal_add_$().subscribe(data =>{
      if(data){
        this.modalRef.hide();
        this.studentService._set_ngxModal_add(false);
      }
    
    })

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

}
