import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { Event } from 'src/app/core/models/event.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponent implements OnInit{
  @Input() event$: Observable<Event>;
  public url:string;
  public safeRef: SafeResourceUrl;
  public subs = new Subscription()
  constructor(public sanitizer: DomSanitizer) {
  }
  ngOnInit() {
    this.subs.add(this.event$.subscribe(res => {
      this.safeRef = this.sanitizer.bypassSecurityTrustResourceUrl(res.location.url)
    }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
