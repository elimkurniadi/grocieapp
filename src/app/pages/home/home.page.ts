import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { Router } from '@angular/router';
import { AuthService, ExampleService, GlobalService } from '@shared/services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  selectedLanguage: any = 'id';
  ctr = 0;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private authSrv: AuthService,
    private gs: GlobalService,
    private exampleSrv: ExampleService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.exampleSrv.getData().subscribe((res) => {
      console.log('result', res);
    });
  }

  selectLang(lang) {
    this.selectedLanguage = lang;
    this.translate.setLanguage(lang);
  }
}
