import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Course } from '../models/course';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-schedule',
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  
  addedCourses: Course[] = [];
  
  constructor(private scheduleService: ScheduleService) {}

  //Laddar kurser vid start
  ngOnInit() {
    this.loadCourses();
  }

  //Hämtar en kopierad lista med tillagda kurser från ScheduleService.
  loadCourses() {
    this.addedCourses = this.scheduleService.getCourses();
  }

}
