import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import {enableProdMode} from '@angular/core';

import { CoreModule } from 'src/app/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpServiceEvents } from './core/services/http-service.events';
import { HttpServiceUsers } from './core/services/http-service.users';
import { GlobalErrorHandler } from './core/services/error.service';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [
    HttpServiceEvents,
    HttpServiceUsers,
    [{provide: ErrorHandler, useClass: GlobalErrorHandler}]

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
