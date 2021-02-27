import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inbox-detail',
  templateUrl: './inbox-detail.component.html',
  styleUrls: ['./inbox-detail.component.scss'],
})
export class InboxDetailComponent implements OnInit {
  @Input() inbox: any;

  constructor(private modalCtrl:ModalController) {}

  ngOnInit() {

  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
