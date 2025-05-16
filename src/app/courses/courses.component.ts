import { CommonModule } from '@angular/common';                       //Importerar CommonModule för ngFor.
import { Component } from '@angular/core';
import { Course } from '../models/course';                            //Interface av kurser.
import { CourseService } from '../services/course.service';
import { FormsModule } from '@angular/forms';
import { ScheduleService } from '../services/schedule.service';

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
  subjects: string[] = [];
  selectedSubject: string = "";

  //Ger min komponent tillgång till mina services.
  constructor(
    private courseService: CourseService,
    private scheduleService: ScheduleService
  ) { }

  //Anropar metoden i CourseService
  ngOnInit() {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = courses;

      //Hämta alla ämnen från datan
      const subjects = this.courses.map(course => course.subject);
      this.subjects = [...new Set(subjects)];   //Undviker dubletter
    })
  }

  applyFilters(): void {
    this.filteredCourses = this.courses.filter((course) => {
      //Filtrera på kurskod eller kursnamn i sökrutan.
      const filterByText =
        course.courseCode.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        course.courseName.toLowerCase().includes(this.filterValue.toLowerCase());

      //Filtrera på valt ämne
      const filterBySubject = this.selectedSubject === "" || course.subject === this.selectedSubject;

      return filterByText && filterBySubject
    });
  }

  //Sorteringsmetoder
  //Sorteringsriktning, true = stigande. Används för att växla mellan stigande och fallande.
  sortDirection = {
    courseCode: true,
    courseName: true,
    points: true,
    subject: true
  }

  sortCode(): void {
    const direction = this.sortDirection.courseCode;
    this.filteredCourses.sort((a, b) =>
      //Använder localCompare för att jämföra strängar och ta hänsyn till språk.
      //En ternär operator väljer stigande eller fallande beroende på om direction är true eller false.
      direction ? a.courseCode.localeCompare(b.courseCode) : b.courseCode.localeCompare(a.courseCode)
    );
    //Byter riktning för nästa gång man klickar.
    this.sortDirection.courseCode = !direction;
  }

  sortName(): void {
    const direction = this.sortDirection.courseName;
    this.filteredCourses.sort((a, b) =>
      direction ? a.courseName.localeCompare(b.courseName) : b.courseName.localeCompare(a.courseName)
    );
    this.sortDirection.courseName = !direction;
  }

  sortPoints(): void {
    const direction = this.sortDirection.points;
    this.filteredCourses.sort((a, b) =>
      direction ? a.points - b.points : b.points - a.points
    );
    this.sortDirection.points = !direction;
  }

  sortSubject(): void {
    const direction = this.sortDirection.subject;
    this.filteredCourses.sort((a, b) =>
      direction ? a.subject.localeCompare(b.subject) : b.subject.localeCompare(a.subject)
    );
    this.sortDirection.subject = !direction;
  }

  //Metod som rensar val, filtrering, sortering
  clearChoices(): void {
    this.filterValue = "";
    this.selectedSubject = "";

    this.sortDirection = {
      courseCode: true,
      courseName: true,
      points: true,
      subject: true
    };

    //Kopierar courses och gör en ny array. För att undvika att ändringar i filteredCourses påverkar courses. 
    this.filteredCourses = [...this.courses];
  }

  //Metod som lägger til kurser med hjälp av min ScheduleService.
  addCourse(course: Course) {
    console.log("Lägger till kurs:", course);
    this.scheduleService.addCourse(course);
  }

}
