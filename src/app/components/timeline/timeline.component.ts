import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TimelineTasksFacadeService } from 'src/app/facades/timelineTasks/timeline-tasks-facade.service';
import { ErrorDialogComponent } from 'src/app/sharedComponents/error-dialog/error-dialog.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  error$: Observable<Error>;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private dialog: MatDialog, private timelineTasksFacade: TimelineTasksFacadeService) { }

  ngOnInit(): void {
    this.timelineTasksFacade.loadTimelineTasks();
    this.error$ = this.timelineTasksFacade.error$;
    this.isLoading$ = this.timelineTasksFacade.isLoading$;
    this.subscribeToErrorEvent();
  }

  subscribeToErrorEvent() {
    this.error$.pipe(takeUntil(this.destroyed$),
      filter(error => error != undefined))
      .subscribe((data) => {
        let dialogRef = this.dialog.open(ErrorDialogComponent, {
          height: '200px',
          width: '300px'
        });
        dialogRef.componentInstance.closed.subscribe(() => {
          dialogRef.close();
        });
      })

  }


  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
