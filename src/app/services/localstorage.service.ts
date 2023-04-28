import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  public behaviorSubject: BehaviorSubject<any>;
  public subjectObservable: Observable<any>;

  constructor() {
    this.behaviorSubject = new BehaviorSubject<any>({});
    this.subjectObservable = this.behaviorSubject.asObservable();
  }

  public change(params: any): Observable<any> {
    this.behaviorSubject.next(params);
    return this.subjectObservable;
  }

  getLocalStorage(key: string): any {
    return localStorage.getItem(key);
  }

  setLocalStorage(key: string, data: any) {
    localStorage.setItem(key, data);
  }

  public getUser(key: string) {
    const localStorageData = this.getLocalStorage(key);
    const data = JSON.parse(localStorageData);
    return data?.username ? data.username : '';
  }
}
