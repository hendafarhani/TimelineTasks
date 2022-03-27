import { Component, EventEmitter, NgZone, OnInit, ViewChild } from '@angular/core';
import { NoteCard } from 'src/app/models/note-card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { TimelineTasksFacadeService } from 'src/app/facades/timelineTasks/timeline-tasks-facade.service';
import { Observable } from 'rxjs';
import { WeekDataFacadeService } from 'src/app/facades/week/week-data-facade.service';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.scss']
})
export class CardDialogComponent implements OnInit {

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  card: NoteCard;
  innerCard: NoteCard;
  formGroup: FormGroup;
  isChangeStartDate: boolean;
  isChangeDuration: boolean;

  minStartDate$: Observable<Date>;
  maxStartDate$: Observable<Date>;
  
  closed = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    private _ngZone: NgZone,
    private timelineTasksFacade: TimelineTasksFacadeService,
    private weekDataFacadeService: WeekDataFacadeService) { }

  ngOnInit(): void {

    this.minStartDate$ = this.weekDataFacadeService.minStartDate$;
    this.maxStartDate$ = this.weekDataFacadeService.maxStartDate$;

    this.innerCard = new NoteCard()
      .setId(this.card.id)
      .setTitle(this.card.title)
      .setSummary(this.card.summary)
      .setLabels(this.card.labels)
      .setLabel(this.card.label)
      .setWeekNumber(this.card.weekNumber)
      .setStartDate(this.card.startDate)
      .setEndDate(this.card.endDate)
      .setDuration(this.card.duration)
      .setStartDateFormatted(this.card.startDateFormatted);
   
      this.formGroup = this.fb.group({
      title: [this.innerCard.title, [Validators.required]],
      summary: [this.innerCard.summary, [Validators.required, Validators.maxLength(250)]],
      startDate: [new Date(this.innerCard.startDate), [Validators.required]],
      duration: [this.innerCard.duration, [Validators.required, Validators.min(1)]],
    });
  
    this.subscribeToFieldUpdate('title');
    this.subscribeToFieldUpdate('summary');
    this.subscribeToFieldUpdate('startDate');
    this.subscribeToFieldUpdate('duration');
  }

  triggerResize() {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onSubmit() {
    this.timelineTasksFacade.updateCard(
      {
        card: this.innerCard,
        isChangeStartDate: this.isChangeStartDate,
        isChangeDuration: this.isChangeDuration
      });
    this.closed.emit();
  }

  onCancel() {
    this.closed.emit();
  }

  subscribeToFieldUpdate(fieldName: string) {
    this.formGroup.get(fieldName).valueChanges
      .subscribe(value => {
        switch (fieldName) {
          case 'startDate':
            this.isChangeStartDate = true;
            this.innerCard['startDate'] = (value as Date).getTime();
            break;
          case 'duration':
            this.isChangeDuration = true;
            this.innerCard['duration'] = value;
            break;
          default:
            this.innerCard[fieldName] = value;
            break;
        }
      });
  }

  weekendsDatesFilter = (d: Date): boolean => {
    if (d != undefined) {
      const day = d.getDay();
      /* Prevent Saturday and Sunday for select. */
      return day !== 0 && day !== 6;
    }
  }
}
