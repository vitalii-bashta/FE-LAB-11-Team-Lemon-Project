import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() user$;
  constructor() { }

  ngOnInit() {
  }

}
