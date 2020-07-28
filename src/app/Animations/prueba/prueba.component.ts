import { Component, OnInit } from '@angular/core';
import { myAnimations } from '../animations';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css'],
  animations: [myAnimations]
})
export class PruebaComponent implements OnInit {

  show : boolean = false;

  constructor() { }

  ngOnInit() { }

  get stateName(){
    return this.show ? 'show' : 'hide';
  }

  toggle(){
    this.show = !this.show;
  }

}
