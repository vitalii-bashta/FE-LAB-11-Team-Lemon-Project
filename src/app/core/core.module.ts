import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandler } from '@angular/core';

import { HttpServiceEvents } from './services/http-events.service';
import { HttpServiceUsers } from './services/http-users.service';
import { GlobalErrorHandler } from './services/error.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    HttpServiceEvents,
    HttpServiceUsers,
    [{provide: ErrorHandler, useClass: GlobalErrorHandler}]
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
