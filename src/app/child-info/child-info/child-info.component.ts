import { Info } from './../../info';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-child-info',
  templateUrl: './child-info.component.html',
  styleUrls: ['./child-info.component.css']
})
export class ChildInfoComponent implements OnInit {

  @Input() infoChild: Info;
  @Output() out = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  selected(event){
    console.log("selected");
    if (this.infoChild.selected === true){
      this.infoChild.selected = false;
    } else {
      this.infoChild.selected = true;
    }
  }

  delete(){
    console.log("delete");
    this.out.emit({id:this.infoChild.id, action:"remove" });
  }
}
