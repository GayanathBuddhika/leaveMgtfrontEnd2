import { FacultyService } from 'app/service/faculty.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {
  // --- for modal
  modalRef: BsModalRef;
   // --- Subscription 
   private subscription: Subscription = new Subscription();
  constructor(
    private modalService: BsModalService,
    private facultyService: FacultyService
  ) { }

  ngOnInit() {
    console.log("create ************");
      // --- add subscribe methode to the subscription object
      this.subscription.add(
        this.facultyService.get_ngxModal_add_$().subscribe(data =>{
          if(data){
            this.modalRef.hide();
            this.facultyService._set_ngxModal_add(false)
          }
          
        })
      );
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template,{class: 'modal-lg'});
  }

}
