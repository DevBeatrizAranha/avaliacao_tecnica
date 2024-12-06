import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource = new BehaviorSubject<any>(null);  
  data$ = this.dataSource.asObservable();  

  constructor() {}


  setData(data: any) {
    this.dataSource.next(data);  
  }

  
  getData() {
    return this.dataSource.getValue();  
  }
}
