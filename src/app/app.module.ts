import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { AudioManagement } from '@ionic-native/audio-management/ngx';
import { Autostart } from '@ionic-native/autostart/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse,BackgroundGeolocationEvents } from '@ionic-native/background-geolocation/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    AndroidPermissions,
    SplashScreen,
    Contacts,
    AudioManagement,
    Autostart,
    BackgroundMode,
    BackgroundGeolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
