import { NgModule, LOCALE_ID, Injectable, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import localeId from '@angular/common/locales/id';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRequestInterceptor } from '@shared/interceptors/http-request.interceptor';
import { HttpErrorInterceptor } from '@shared/interceptors/http-error.interceptor';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { registerLocaleData } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import * as Sentry from '@sentry/browser';
import { environment } from '@env/environment';
import { JwtAuthModule } from './jwt-auth.module';
import { HTTP } from '@ionic-native/http/ngx';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

registerLocaleData(localeId, 'id');

// Sentry.init({
//   dsn: "https://4c7b0222a0b84d6d965a0a5287163271@sentry.macroad.co.id/29",
//   environment: environment.flag.toString()
// });

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    console.error(error);
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({ eventId });
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    JwtAuthModule,
    FontAwesomeModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    {
      provide: LOCALE_ID,
      deps: [TranslateService],
      useFactory: (translateService: any) => translateService.lang,
    },
    { provide: ErrorHandler, useClass: SentryErrorHandler },
    AndroidPermissions,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
