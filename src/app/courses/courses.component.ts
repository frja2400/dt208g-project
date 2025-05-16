import { CommonModule } from '@angular/common';                       //Importerar CommonModule för ngFor.
import { Component, ViewChild } from '@angular/core';
import { Course } from '../models/course';                            //Interface av kurser.
import { CourseService } from '../services/course.service';
import { FormsModule } from '@angular/forms';
import { ScheduleService } from '../services/schedule.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-courses',
  //Importerar Agular Material-moduler
  imports: [CommonModule, FormsModule, MatTableModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  //Properties
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus', 'add'];    //Tabeller som ska visas i Angular Material-tabellen
  dataSource = new MatTableDataSource<Course>();                                                        //Hanterar sortering, filtrering och paginering
  subjects: string[] = [];                                                                              //Lista över ämnen som hämtas till drop down-menyn
  filterValue: string = "";
  selectedSubject: string = "";

  //Deklarerar referenser till sortering och paginering som kopplas med <mat-sort> och <mat-paginator> i HTML.
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //Injicerar mina två services.
  constructor(
    private courseService: CourseService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    //Hämtar kurser från CourseService och lägg till i dataSource.
    this.courseService.getCourses().subscribe((courses) => {
      this.dataSource.data = courses;     

      //Mappa alla ämnen, addera i subjects och använder Set för att ta bort dubletter.
      const subjects = courses.map(course => course.subject);
      this.subjects = [...new Set(subjects)];

      //Koppla AM-paginator och sortering till dataSource.
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      //Anpassad filterfunktion som kombinerar text + ämne
      this.dataSource.filterPredicate = (data: Course, filter: string) => {
        const searchObj = JSON.parse(filter);
        const searchText = searchObj.text;
        const selectedSubject = searchObj.subject;

        const matchText =
          data.courseCode.toLowerCase().includes(searchText) ||
          data.courseName.toLowerCase().includes(searchText);

        const matchSubject = selectedSubject === '' || data.subject === selectedSubject;

        return matchText && matchSubject;
      };
    });
  }

  applyFilters(): void {
    //Skapar filterobjekt baserat på sökord och valt ämne.
    const filterObj = {
      text: this.filterValue.trim().toLowerCase(),
      subject: this.selectedSubject
    };

    this.dataSource.filter = JSON.stringify(filterObj);

    //När filtrering görs - hoppa tillbaka till första sidan.
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearChoices(): void {
    this.filterValue = '';
    this.selectedSubject = '';
    this.applyFilters();
  }

  addCourse(course: Course) {
    console.log("Lägger till kurs:", course);
    this.scheduleService.addCourse(course);
  }
}
