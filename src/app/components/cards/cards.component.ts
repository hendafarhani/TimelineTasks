import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TimelineTasksFacadeService } from 'src/app/facades/timelineTasks/timeline-tasks-facade.service';
import { NoteCard } from 'src/app/models/note-card';
import { ConfirmationDialogComponent } from 'src/app/sharedComponents/confirmation-dialog/confirmation-dialog.component';
import { CardDialogComponent } from '../card-dialog/card-dialog.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input()
  labelId: number;

  @Input()
  day: string;

  hoverId: number;
  dialogRef;
  cardsPerLabelAndWeek$: Observable<NoteCard[]>;

  constructor(private dialog: MatDialog, private timelineTasksFacade: TimelineTasksFacadeService) { }

  ngOnInit(): void {
    this.cardsPerLabelAndWeek$ = this.timelineTasksFacade.getCardsPerLabelAndDay(this.labelId, this.day);
  }

  OnMatCardClickEvent(card) {
    if (card) {
      let dialogRef = this.dialog.open(CardDialogComponent, {
        height: '450px',
        width: '600px'
      });
      dialogRef.componentInstance.card = card;
      dialogRef.componentInstance.closed.subscribe(() => {
        dialogRef.close();
      });
    }
  }

  toggleHover(id) {
    this.hoverId = id;
  }

  removeHover() {
    this.hoverId = undefined;
  }

  delete(event, noteCard) {
    event.stopPropagation();
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '200px',
      width: '500px'
    });
    dialogRef.componentInstance.message = "Are you sure you want to delete this note?";
    dialogRef.componentInstance.closed.subscribe((isConfirmed: boolean) => {
      dialogRef.close();
      if (isConfirmed) {
        this.timelineTasksFacade.deleteCard(noteCard);
      }
    });
  }

  drop(event) {
    console.log(event);
  }
}
