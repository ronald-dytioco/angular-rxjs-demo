import { IActivity } from './../types/activity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export default class ActivityService {
  private apiUrl = 'https://www.boredapi.com/api/activity';

  constructor(private http: HttpClient) {}

  getActivities(): Observable<IActivity[]> {
    // Make an array of http.get() Observables, 10 items
    const obsArray: Observable<IActivity>[] = Array(10).fill(
      this.http.get<IActivity[]>(this.apiUrl)
    );

    // return Observable<IActivity[]> array
    return forkJoin(obsArray);
  }

  getActivity(key: string | number): Observable<IActivity> {
    // return Observable<IActivity>
    return this.http.get<IActivity>(this.apiUrl, { params: { key } });
  }
}
