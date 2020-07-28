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
  showContainer: boolean = true;
  imgPosition = 'void';
  position : string;

  cats: string[] = ['Gato 1', 'Gato 2', 'Gato 3'];

  constructor() { }

  ngOnInit() { }

  get stateName(){
    return this.show ? 'show' : 'hide';
  }

  get containerState(){
    return this.showContainer ? 'show' : 'hide';
  }



  toggle2(){
    this.showContainer = !this.showContainer;
    console.log(this.showContainer);
    console.log(this.containerState);
    
    
  }

  changePosition(newPosition: string){
    this.position = newPosition;
  }

  logger($event){
    console.log(this.position + " animation: " + $event.phaseName);
    
  }

}
