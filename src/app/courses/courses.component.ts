import { CommonModule } from '@angular/common'; //Importerar CommonModule för ngFor
import { Component } from '@angular/core';
import { Course } from '../models/course';      //Interface av kurser
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  //Properties
  courses: Course[] = [];

  //Skapar instans av CourseService
  constructor(private courseService: CourseService) {}

  //Anropar metoden i CourseService
  ngOnInit() {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
    })
  }
}
