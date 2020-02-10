import { CourseService } from './../../../service/course.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { DegreeCourse } from 'app/model/DegreeCourse';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  modalRefOfCourseList: BsModalRef;
  headers: any[];
  degreeCourseList: DegreeCourse[] = [];
   onSelectedDegreeCourse: DegreeCourse;
  constructor(private courseService : CourseService,
    private modalService: BsModalService) { }
  
  ngOnInit() {

    this.getAllDepCourseByDepId();

    this.headers =
    [
      { field: 'no', header: 'No' },
      { field: 'name', header: 'Name' },
      { field: 'courseCode', header: 'Course Code' },
      { field: 'courseName', header: 'Course Name' },
      { field: 'department', header: 'Department' },
      { field: 'lecture', header: 'Lecture Name' },
      { field: 'edit', header: 'Edit' },
      { field: 'delete', header: 'Delete' }

    ];

    this.courseService.get_ngxModal_edit_$().subscribe(data => {
      if (data) {
        this.modalRefOfCourseList.hide();
      }
    })

    this.courseService._addCourseToList.subscribe(data => {
      console.log("*********");
      let courseList = [...this.degreeCourseList];
      courseList.unshift(data);
      this.degreeCourseList = courseList;
      console.log("*********",this.degreeCourseList);
    })

    this.courseService._editCourseToList.subscribe(data => {
      let index = this.degreeCourseList.findIndex(degreeCourse => degreeCourse.id === data.id);
      this.degreeCourseList[index] = data;
    })
  }

  getAllDepCourseByDepId(){
   this.courseService.getAllDepCourse("10").subscribe(data =>{
   this.degreeCourseList = data;
     console.log("dep Course", data);
   },err =>{
     console.log(err);
   });
  }

  update(degreeCourse: DegreeCourse, template: TemplateRef<any>) {
    console.log("update  ",degreeCourse);
    this.onSelectedDegreeCourse = degreeCourse;
    this.openModal(template);
  }

  delete(degreeCourse: DegreeCourse) {
    this.courseService.deleteCourse(degreeCourse.id).subscribe(data => {
      let index = this.degreeCourseList.indexOf(degreeCourse);
      // let index = this.departmentList.indexOf();
      // this.facultyList.splice(index, 0);
      this.degreeCourseList = this.degreeCourseList.filter((val, i) => i != index);
      console.log("data", data);
    }, err => {
      console.log("err", err);
    })
    console.log("delete  ", degreeCourse);
  }


  openModal(template: TemplateRef<any>) {
    this.modalRefOfCourseList = this.modalService.show(template, { class: 'modal-lg' });
  }

}
