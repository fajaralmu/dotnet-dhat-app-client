import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() header: string = 'Header';   
  @Input() footer: string = 'Footer';
  @Input() width: string = 'auto';
  constructor() { }

  ngOnInit(): void {
  }

}
