import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlide, IonSlides } from '@ionic/angular';
import { BrowserService } from '@shared/services/browser.service';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
const { Storage } = Plugins;

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  constructor(private router: Router) {}
  @ViewChild(IonSlides) slides: IonSlides;
  ngOnInit() {}

  //next swipe
  next(){
    this.slides.slideNext();
  }

  //getStartedButton
  getStarted(){
    this.slides.slidePrev();
  }

  async start() {
    await Storage.set({key: INTRO_KEY, value: 'true'});
    this.router.navigateByUrl('/login', { replaceUrl:true });
  }
}
