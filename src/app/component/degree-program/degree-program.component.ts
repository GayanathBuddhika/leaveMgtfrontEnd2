import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { DegreeProgramService } from 'app/service/degree-program.service';

@Component({
  selector: 'app-degree-program',
  templateUrl: './degree-program.component.html',
  styleUrls: ['./degree-program.component.scss']
})
export class DegreeProgramComponent implements OnInit {

  modalRef: BsModalRef

  constructor(
    private modalService: BsModalService,
    private degreeProgramService: DegreeProgramService
  ) { }

  ngOnInit() {

    // --- add subscribe methode to the subscription object

    this.degreeProgramService.get_ngxModal_add_$().subscribe(data => {
      if (data) {
        this.modalRef.hide();
        this.degreeProgramService._set_ngxModal_add(false)
      }

    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }



  }
