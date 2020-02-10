import { LectureServiceService } from './../../../service/lecture-service.service';
import { Lecture } from './../../../model/Lecture';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-lecture-list',
  templateUrl: './lecture-list.component.html',
  styleUrls: ['./lecture-list.component.scss']
})
export class LectureListComponent implements OnInit {
  modalRefOfLectureList: BsModalRef;
  headers: any[];
  lectureList: Lecture[] = [];
  onSelectedLecture: Lecture;
  constructor(
    private lectureService: LectureServiceService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getAllLecture();
    // -- for primeNG table
    this.headers =
      [
        { field: 'no', header: 'No' },
        { field: 'registrationNumber', header: 'Re No' },
        { field: 'name', header: 'Name' },
        { field: 'department', header: 'Department Name' },
        { field: 'edit', header: 'Edit' },
        { field: 'delete', header: 'Delete' }

      ];

    this.lectureService.get_ngxModal_edit_$().subscribe(data => {
      if (data) {
        this.modalRefOfLectureList.hide();
      }
    })

    this.lectureService._addLectureToList.subscribe(data => {
      console.log("*********");
      let lecList = [...this.lectureList];
      lecList.unshift(data);
      this.lectureList = lecList;
      console.log("*********", this.lectureList);
    })

    this.lectureService._editLectureToList.subscribe(data => {
      let index = this.lectureList.findIndex(lecture => lecture.id === data.id);
      this.lectureList[index] = data;
    })

  }

  getAllLecture() {
    this.lectureService.getAllLectures().subscribe(data => {
      console.log("lecture  ", data);
      this.lectureList = data;
    })
  }

  update(lecture: Lecture, template: TemplateRef<any>) {
    console.log("update  ", lecture);
    this.onSelectedLecture = lecture;
    this.openModal(template);
  }

  delete(lecture: Lecture) {
    this.lectureService.deleteLectuer(lecture.id).subscribe(data => {
      let index = this.lectureList.indexOf(lecture);
      // let index = this.departmentList.indexOf();
      // this.facultyList.splice(index, 0);
      this.lectureList = this.lectureList.filter((val, i) => i != index);
      console.log("data", data);
    }, err => {
      console.log("err", err);
    })
    console.log("delete  ", lecture);
  }


  openModal(template: TemplateRef<any>) {
    this.modalRefOfLectureList= this.modalService.show(template, { class: 'modal-lg' });
  }

}
