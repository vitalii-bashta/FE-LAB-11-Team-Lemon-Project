import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit,OnDestroy {
  @Input() arrayOfPhotos:Array<string>
  public position:string = 'center center';
  public repeat:string = 'no-repeat';
  constructor() {}
  ngOnInit() {
  }
  ngOnDestroy() {
  }
}
