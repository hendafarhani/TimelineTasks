import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TimelineTasksFacadeService } from 'src/app/facades/timelineTasks/timeline-tasks-facade.service';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  @Output()
  closed = new EventEmitter<any>();

  error$: Observable<Error>;

  constructor(private timelineTasksFacade: TimelineTasksFacadeService) { }

  ngOnInit(): void {
    this.error$ = this.timelineTasksFacade.error$;
  }

  close() {
    this.closed.emit();
  }
}
