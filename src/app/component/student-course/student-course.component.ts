import { DegreeCourse } from './../../model/DegreeCourse';
import { Student } from './../../model/Student';

import { StudentService } from './../../service/student.service';
import { CourseService } from './../../service/course.service';
import { Component, OnInit } from '@angular/core';
import { Course } from 'app/model/Course';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.scss']
})
export class StudentCourseComponent implements OnInit {
  sourseStudent: Student[];
  targetStudent: Student[];
 // studentList: Student[];
  courseList: Course[];
   selectedCourse: DegreeCourse;

  constructor(
    private courseService : CourseService,
    private studentService:StudentService ) { }

  ngOnInit() {
    this.getAllStudentByDepId();
    this.getCoursByDepartmentId();
    this.targetStudent = [];
  }

  getCoursByDepartmentId(){

   this.courseService.getAllDepCourse("10").subscribe(data =>{
     this.courseList= data;
     console.log("course ", data);
   },err =>{
     console.log(err);
   })    
  }

  getAllStudentByDepId(){

    this.studentService.getAllStudentByDepId("10").subscribe(data =>{
      this.sourseStudent = data;
      console.log("student", data);
    },err =>{
      console.log(err);
    })
    
  }

  onChange(course: DegreeCourse){
    console.log("course 3333333", course);
    this.selectedCourse = course;
  }
  assingStudent(){
    this.studentService.addStudentCourse(this.targetStudent,this.selectedCourse.course.id).subscribe(data =>{
      console.log("****************",data);
    },err =>{
      console.log(err);
    })
  }
}
