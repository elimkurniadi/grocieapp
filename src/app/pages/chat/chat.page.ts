import { Component, OnInit } from '@angular/core';
import { BrowserService } from '@shared/services/browser.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  constructor(private browserSrv: BrowserService) {}

  ngOnInit() {}

  goToChat() {
    const link = 'https://wa.me/628123045670?text=Halo saya ingin bertanya';
    this.browserSrv.openBrowser({ url: link });
  }
}
