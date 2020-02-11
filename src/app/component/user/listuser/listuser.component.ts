import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { UserService } from './../../../service/user.service';
import { User } from './../../../model/User';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {
  modalRefOfUserList: BsModalRef;
  headers: any[];
  userList: User[] = [];
  selectedUser: User;

  constructor(
    private userService: UserService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {

    this.getAllUser();
    this.headers =
      [
        { field: 'no', header: 'No' },
        { field: 'employeeId', header: 'User Id' },
        { field: 'firstName', header: 'Frist Name' },
        { field: 'lastName', header: 'Last Name' },
        { field: 'email', header: 'Email' },
        { field: 'phoneNo', header: 'Phone Number' },
        { field: 'address', header: 'Address' },
        { field: 'edit', header: 'Edit' },
        { field: 'delete', header: 'Delete' }

      ];


    this.userService.get_ngxModal_edit_$().subscribe(data => {
      if (data) {
        this.modalRefOfUserList.hide()
        this.userService._set_ngxModal_edit(false)
      }
    })

    this.userService._editUserToList.subscribe(data => {
      let index = this.userList.findIndex(user => user.id === data.id)
      this.userList[index] = data;

    })

    this.userService._addUserToList.subscribe(data => {
      let st = [...this.userList];
      st.unshift(data);

      this.userList = st;

      console.log("#######", this.userList);


    })
  }

  getAllUser() {

    this.userService.getAlluser().subscribe(data => {
      this.userList = data;
      console.log("all users ", this.userList);
    }, err => {
      console.log(err);
    })
  }

  update(user, addUserTemplate: TemplateRef<any>) {
    this.selectedUser = user;
    this.openModal(addUserTemplate);
  }

  delete(user: User) {

    this.userService.deleteUser(user.id).subscribe(data => {
      let index = this.userList.indexOf(user);
      this.userList = this.userList.filter((val, i) => i != index);
    }, err => {
      console.log(err);
    })

  }

  openModal(template: TemplateRef<any>) {
    this.modalRefOfUserList = this.modalService.show(template, { class: 'modal-lg' });
  }

}
