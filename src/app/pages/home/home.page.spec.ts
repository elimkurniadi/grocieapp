import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { SharedModule } from '@shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import localeId from '@angular/common/locales/id';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { JwtAuthModule } from 'src/app/jwt-auth.module';
import { HTTP } from '@ionic-native/http/ngx';

registerLocaleData(localeId, 'id');

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        HttpClientModule,
        SharedModule,
        RouterTestingModule,
        JwtAuthModule,
      ],
      providers: [
        HTTP,
        {
          provide: LOCALE_ID,
          deps: [TranslateService],
          useFactory: (translateService: any) => translateService.lang,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
