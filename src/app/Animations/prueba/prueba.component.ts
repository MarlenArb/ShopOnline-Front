import { Component, OnInit } from '@angular/core';
import { myAnimations } from '../animations';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css'],
  animations: [myAnimations]
})
export class PruebaComponent implements OnInit {

  show : boolean = true;
  imgPosition = 'void';
  position : string;

  constructor() { }

  ngOnInit() { }

  get stateName(){
    return this.show ? 'show' : 'hide';
  }


  toggle(){
    this.show = !this.show;
  }

  changePosition(newPosition: string){
    this.position = newPosition;
  }

  logger($event){
    console.log(this.position + " animation: " + $event.phaseName);
    
  }

}
