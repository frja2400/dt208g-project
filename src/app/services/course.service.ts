import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';  //Importerar mitt interface
import { Observable } from 'rxjs';          //Importerar observables

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  //Properties
  private courseURL = '/miun_courses.json';

  constructor(private http: HttpClient) { }

  //Returnerar en observable (liknar promise) med en lista av objekt enligt mitt interface.
  getCourses(): Observable<Course[]> {
    //Skickar ett get-anrop till min json-fil.
    return this.http.get<Course[]>(this.courseURL);
  }
}
