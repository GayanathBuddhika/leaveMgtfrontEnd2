import { CourseService } from './../../service/course.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.courseService.get_ngxModal_add_$().subscribe(data => {
      if (data) {
        this.modalRef.hide();
        this.courseService._set_ngxModal_add(false)
      }

    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

}
