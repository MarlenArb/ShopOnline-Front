import { Injectable, EventEmitter } from '@angular/core';
import { Shop } from '../shop';

@Injectable({providedIn: 'root'})
export class DataService {

  tienda$ = new EventEmitter<Shop>();
  constructor() { }
}
