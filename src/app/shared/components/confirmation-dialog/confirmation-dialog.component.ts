import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  message: string;
  closed = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    this.closed.emit(false);

  }

  confirm() {
    this.closed.emit(true);
  }
}
