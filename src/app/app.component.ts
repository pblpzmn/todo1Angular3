import { Info } from './info';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  infoArr: Array<Info> = [];
  infoArrOriginal: Array<Info> = [];
  arrContId =1;
  strike: boolean = false;
  filtered = false;
  constructor(private http: HttpClient){
    this.callService(http);
  }
  receiveEvent(value){
    console.log("receiving");
    if ("remove"===value.action){
      console.log("removing")
      this.infoArr = this.infoArr.filter( infoArr => infoArr.id !==value.id );
      this.infoArrOriginal = this.infoArr;//guarda
    }
  }

  setInfo(event : Event){
    console.log("enter");
    this.infoArr.push({description: event.target.value, id: this.arrContId++,  selected: false  } );
    event.target.value = "";
    this.filtered = false;
  }
  strikeAll(){
    if (this.strike===false){
      this.strike = true;
    }else{
      this.strike = false;
    }
    this.infoArr.forEach(element => {
    element.selected = this.strike;
    });
  }
  callService(http){
    let url='https://gist.githubusercontent.com/jdjuan/165053e6cb479a840c88e3e94b33e724/raw/4542ef950b2b32fbe2eea0b3df0338ffe67eae12/todo.json';
    //let url='http://gist.githubusercontent.com/jdjuan/165053e6cb479a840c88e3e94b33e724/raw/4542ef950b2b32fbe2eea0b3df0338ffe67eae12/todo.json';//usar esta localmente
    http.get<any>(url).subscribe(data => {
      data.forEach(element => {
        this.infoArr.push({description: element, id: this.arrContId++, selected: false } );
      });
    });
    this.infoArrOriginal = this.infoArr;//guarda
  }
  showAll(){
    console.log("all");
    this.infoArr = this.infoArrOriginal;
    this.filtered = false;
  }
  showActive(){
    console.log("active");
    if (this.filtered === false){
      this.infoArrOriginal = this.infoArr;//guarda
    }else{
      this.infoArr = this.infoArrOriginal;//recupera
    }
    this.infoArr = this.infoArr.filter( infoArr => infoArr.selected !==true );
    this.filtered = true;
  }

  showCompleted(){
    console.log("completed");
    if (this.filtered === false){
      this.infoArrOriginal = this.infoArr;//guarda
    }else{
      this.infoArr = this.infoArrOriginal;//recupera
    }
    this.infoArr = this.infoArr.filter( infoArr => infoArr.selected ===true );
    this.filtered = true;
  }
  clearCompleted(){
    if (this.filtered === false){
      this.infoArrOriginal = this.infoArr;//guarda
    }else{
      this.infoArr = this.infoArrOriginal;//recupera
    }
    this.infoArr = this.infoArr.filter( infoArr => infoArr.selected !==true );
    this.infoArrOriginal = this.infoArr;//guarda
  }
}