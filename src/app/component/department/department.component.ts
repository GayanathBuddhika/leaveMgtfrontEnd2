import { DepartmentService } from './../../service/department.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  // --- for modal
  modalRef: BsModalRef;
  // --- Subscription 
  private subscription: Subscription = new Subscription();
  constructor(
    private modalService: BsModalService,
    private departmentService: DepartmentService
  ) { }


  ngOnInit() {

    // --- add subscribe methode to the subscription object
    this.subscription.add(
      this.departmentService.get_ngxModal_add_$().subscribe(data => {
        if (data) {
          this.modalRef.hide();
          this.departmentService._set_ngxModal_add(false)
        }

      })
    );
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
}
