import { Component, Input, OnInit } from '@angular/core';
import { Bundling } from '@shared/models';

@Component({
  selector: 'app-home-bundling',
  templateUrl: './home-bundling.component.html',
  styleUrls: ['./home-bundling.component.scss'],
})
export class HomeBundlingComponent implements OnInit {
  @Input() bundling: Bundling;

  constructor() {}

  ngOnInit() {}
}
