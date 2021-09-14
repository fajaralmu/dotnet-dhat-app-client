import { Component, OnInit } from '@angular/core';
import { doItLater } from './../../utils/events';

@Component({
  selector: 'div[app-loading]',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  dots:number = 0;
  constructor() { }

  label = ():string => {
    return "Loading" + (". ").repeat(this.dots);
  }

  ngOnInit(): void {
    this.tick();
  }

  tick = () => {
    if (this.dots > 10) {
      this.dots = 0;
    }
    doItLater(()=>{
      this.dots++;
      this.tick();
    }, 100);
  }

}
