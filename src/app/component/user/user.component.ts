import { UserService } from './../../service/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
 modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private userService: UserService
  ) { }

  ngOnInit() {
       this.userService.get_ngxModal_add_$().subscribe(data =>{
      if(data){
        this.modalRef.hide();
        this.userService._set_ngxModal_add(false);
      }
    
    })
  }

    openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

}
