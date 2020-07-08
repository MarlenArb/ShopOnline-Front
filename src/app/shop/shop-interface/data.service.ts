import { Injectable, EventEmitter } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataService {

  name$ = new EventEmitter<String>();
  constructor() { }
}
