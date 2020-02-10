import { LectureServiceService } from './../../service/lecture-service.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss']
})
export class LectureComponent implements OnInit {
  modalRef: BsModalRef
  constructor(
    private modalService: BsModalService,
    private lectureService: LectureServiceService
  ) { }

  ngOnInit() {
    this.lectureService.get_ngxModal_add_$().subscribe(data => {
      if (data) {
        this.modalRef.hide();
        this.lectureService._set_ngxModal_add(false)
      }

    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }


}
