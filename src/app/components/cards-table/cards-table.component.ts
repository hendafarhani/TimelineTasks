import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterDataFacadeService } from 'src/app/facades/filter/filter-data-facade.service';
import { TimelineTasksFacadeService } from 'src/app/facades/timelineTasks/timeline-tasks-facade.service';
import { WeekDataFacadeService } from 'src/app/facades/week/week-data-facade.service';
import { NoteCard } from 'src/app/models/note-card';
import { NoteLabel } from 'src/app/models/note-label';

@Component({
  selector: 'app-cards-table',
  templateUrl: './cards-table.component.html',
  styleUrls: ['./cards-table.component.scss']
})
export class CardsTableComponent implements OnInit {

  selectedNoteLabelsList$: Observable<NoteLabel[]>;

  daysListPerWeek$: Observable<string[]>;
  cardsPerLabelAndWeek$: Observable<NoteCard[]>;
  cardsPerLabelAndWeek2$: Observable<NoteCard[]>;

  constructor(private weekDataFacade: WeekDataFacadeService,
    private filterDataFacade: FilterDataFacadeService,
    private timelineTasksFacade: TimelineTasksFacadeService) {
  }

  ngOnInit(): void {
    this.selectedNoteLabelsList$ = this.filterDataFacade.selectNoteLabels$;
    this.daysListPerWeek$ = this.weekDataFacade.daysListPerWeek$;
    this.cardsPerLabelAndWeek$ = this.timelineTasksFacade.getCardsPerLabelAndDay(1, "13.1");
    this.cardsPerLabelAndWeek2$ = this.timelineTasksFacade.getCardsPerLabelAndDay(1, "4.1");
  }


}
