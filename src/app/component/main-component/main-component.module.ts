import { StudentCourseComponent } from './../student-course/student-course.component';
import { CourseListComponent } from './../course/course-list/course-list.component';
import { AddCourseComponent } from './../course/add-course/add-course.component';
import { CourseComponent } from './../course/course.component';
import { DegreeProgramListComponent } from './../degree-program/degree-program-list/degree-program-list.component';
import { AddDegreeProgramComponent } from './../degree-program/add-degree-program/add-degree-program.component';
import { DegreeProgramComponent } from './../degree-program/degree-program.component';
import { DepartmentListComponent } from './../department//department-list/department-list.component';
import { AddDepartmentComponent } from './../department/add-department/add-department.component';
import { DepartmentComponent } from './../department/department.component';
import { FacultyListComponent } from './../faculty/facultylist/faculty-list/faculty-list.component';
import { StudentComponent } from './../student/student.component';
import { StudentListComponent } from './../student/student-list/student-list.component';
import { StudentAddComponent } from './../student/student-add/student-add.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FacultyComponent } from '../faculty/faculty.component';
import { MainComponentRoutingModule } from '../main-component-routing/main-component-routing.module';
import { MainResultComponent } from '../result/main-result/main-result.component';
import { AddFacultyComponent } from '../faculty/addFaculty/add-faculty/add-faculty.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import {PickListModule} from 'primeng/picklist';
import { ModalModule } from 'ngx-bootstrap';
import { LectureComponent } from '../lecture/lecture.component';
import { AddLectureComponent } from '../lecture/add-lecture/add-lecture.component';
import { LectureListComponent } from '../lecture/lecture-list/lecture-list.component';






@NgModule({
  declarations: [
    FacultyComponent,
    MainResultComponent,
    AddFacultyComponent,
    FacultyListComponent,
    DepartmentComponent,
    AddDepartmentComponent,
    DepartmentListComponent,   
    StudentComponent,
    StudentListComponent,
    StudentAddComponent,
    DegreeProgramComponent,
    AddDegreeProgramComponent,
    DegreeProgramListComponent,    
    LectureComponent,
    AddLectureComponent,
    LectureListComponent,
    CourseComponent,
    AddCourseComponent,
    CourseListComponent,
    StudentCourseComponent



  ],
  imports: [

    CommonModule,
    MainComponentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    PickListModule,
    DropdownModule,
    ModalModule.forRoot(),

    // BrowserAnimationsModule

  ],
  entryComponents: [
    AddFacultyComponent
  ],
})
export class MainComponentModule { }
