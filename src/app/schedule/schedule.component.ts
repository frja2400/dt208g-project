import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Course } from '../models/course';
import { ScheduleService } from '../services/schedule.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-schedule',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  //Properties
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus', 'remove'];
  dataSource = new MatTableDataSource<Course>();
  filterValue: string = '';

  constructor(private scheduleService: ScheduleService) { }

  //Laddar kurser vid start
  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    const courses = this.scheduleService.getCourses();
    this.dataSource.data = courses;
  }

  removeCourse(course: Course) {
    this.scheduleService.removeCourse(course);
    this.loadCourses();
  }

  removeAll(): void {
    const confirmed = window.confirm("Är du säker på att du vill radera alla kurser?");
    if (confirmed) {
      this.scheduleService.removeAll();
      this.loadCourses();
    }
  }

  getTotalPoints(): number {
    return this.dataSource.filteredData.reduce((sum, course) => sum + course.points, 0);
  }

}
