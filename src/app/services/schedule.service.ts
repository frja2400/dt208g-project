import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  //Properties
  private addedCourse: Course[] = [];

  //Ladda kurser direkt som är sparade i localStorage
  constructor() {
    this.loadFromLocalStorage();
  }

  //Returnerar en kopia av tillagda kurser för att skydda originaldata.
  getCourses(): Course[] {
    return [...this.addedCourse];
  }

  //Lägger till en kurs till schemat om den inte finns och sparar i localStorage.
  addCourse(course: Course): void {
    if (!this.addedCourse.find(c => c.courseCode === course.courseCode)) {
      this.addedCourse.push(course);
      this.saveToLocalStorage();
    }
  }

  //Raderar kurs från schemat och uppdaterar och sparar localStorage
  removeCourse(course: Course): void {
    this.addedCourse = this.addedCourse.filter(c => c.courseCode !== course.courseCode);
    this.saveToLocalStorage();
  }

  //Raderar alla kurser från ramschemat
  removeAll(): void {
    this.addedCourse = [];
    this.saveToLocalStorage();
  }

  //Sparar schemat till localStorage
  private saveToLocalStorage(): void {
    try {
      //Gör om till sträng och lagrar
      localStorage.setItem('addedCourses', JSON.stringify(this.addedCourse));
    } catch (error) {
      console.error('Kunde inte spara kurser till localStorage:', error);
    }
  }

  //Läser in schemat från localStorage vid start.
  private loadFromLocalStorage(): void {
    try {
      const data = localStorage.getItem('addedCourses');
      //Om data finns omvandla tillbaka till array med kurser.
      if (data) {
        this.addedCourse = JSON.parse(data);
      }
    } catch (error) {
      console.error('Kunde inte läsa kurser från localStorage:', error);
    }
  }
}
