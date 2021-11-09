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
    const link = 'https://wa.me/628179889090?text=Hii Grocie. Dapatkah Anda membantu saya untuk memberikan informasi lebih lanjut mengenai';
    this.browserSrv.openBrowser({ url: link });
  }
}
