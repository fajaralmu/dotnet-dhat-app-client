import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { doItLater } from './../../utils/events';
 

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, AfterViewInit {
  @Input() message: string = 'Alert !';
  @Input() confirmAlert: boolean=false;
  @Output() yesClicked: EventEmitter<any>  = new EventEmitter ();
  @Output() noClicked: EventEmitter<any>  = new EventEmitter ();

  @ViewChild('yesButton') yesButton: ElementRef<HTMLElement>|undefined;

  marginTop:string = '-400px';

  constructor() { }
  
  ngAfterViewInit(): void {
    if (this.yesButton) {
      this.yesButton.nativeElement.focus();
    }
  }

  ngOnInit(): void {
   doItLater(()=>{
     this.marginTop = '30vh';
   }, 10);
  }
  yesClick(): void {
    this.marginTop = '-400px'; 
    doItLater(()=>{
      if (this.yesClicked)
      this.yesClicked.emit();
    }, 300)
  }
  noClick(): void {
    this.marginTop = '-400px'; 
    doItLater(()=>{
      if (this.noClicked)
      this.noClicked.emit();
    }, 300);
  }


}
