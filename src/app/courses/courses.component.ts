import { CommonModule } from '@angular/common'; //Importerar CommonModule för ngFor
import { Component } from '@angular/core';
import { Course } from '../models/course';      //Interface av kurser
import { CourseService } from '../services/course.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  //Properties
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  filterValue: string = "";

  //Skapar instans av CourseService
  constructor(private courseService: CourseService) {}

  //Anropar metoden i CourseService
  ngOnInit() {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = courses;
    })
  }

  applyFilter(): void {
    this.filteredCourses = this.courses.filter((course) =>
      //Filtrera på antingen kurskod eller kursnamn.
      course.courseCode.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      course.courseName.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

}
