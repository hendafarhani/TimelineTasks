import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FilterDataFacadeService } from 'src/app/facades/filter/filter-data-facade.service';
import { NoteLabel } from 'src/app/models/note-label';

@Component({
  selector: 'app-timeline-header',
  templateUrl: './timeline-header.component.html',
  styleUrls: ['./timeline-header.component.scss']
})
export class TimelineHeaderComponent implements OnInit {

  toggleControl = new FormControl(false);

  weekNumber$: Observable<number>;
  selectedNoteLabels$: Observable<NoteLabel[]>;
  noteLabels$: Observable<NoteLabel[]>;
  isIncrementWeekNumberDisabled$: Observable<boolean>;
  isDecrementWeekNumberDisabled$: Observable<boolean>;

  constructor(private filterDataFacadeService: FilterDataFacadeService
  ) { }

  ngOnInit(): void {
    this.weekNumber$ = this.filterDataFacadeService.weekNumber$;
    this.selectedNoteLabels$ = this.filterDataFacadeService.selectNoteLabels$;
    this.noteLabels$ = this.filterDataFacadeService.noteLabels$;
    this.isIncrementWeekNumberDisabled$ = this.filterDataFacadeService.isIncrementWeekNumberDisabled$;
    this.isDecrementWeekNumberDisabled$ = this.filterDataFacadeService.isDecrementWeekNumberDisabled$;
  }

  public incrementDayOfWeek(isIncremented: boolean) {
    this.filterDataFacadeService.updateDayOfWeek(isIncremented ? 1 : -1);
  }

  public onSelectLabel(event) {
    this.filterDataFacadeService.setSelectedNoteLabel(event.value);
  }

}
