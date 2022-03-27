import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NoteCard } from 'src/app/models/note-card';
import { AppState } from 'src/app/store/app-reducer';
import { DeleteCard, LoadTimelineTasksAction, UpdateCard } from '../../store/timelineTasks/timeline-tasks-action';
import { getCardsPerLabelAndDay as getCardsPerLabelAndDay, timelineTasksQuery } from '../../store/timelineTasks/timeline-tasks.selector';

@Injectable({
  providedIn: 'root'
})
export class TimelineTasksFacadeService {

  constructor(private store: Store<AppState>) { }

  timeLineTasks$ = this.store.pipe(select(timelineTasksQuery.loadTimelineTasks));
  isLoading$ = this.store.pipe(select(timelineTasksQuery.isLoading));
  error$ = this.store.pipe(select(timelineTasksQuery.error));

  loadTimelineTasks() {
    this.store.dispatch(new LoadTimelineTasksAction());
  }

  getCardsPerLabelAndDay(labelId: number, key: string) {
    return this.store.select(getCardsPerLabelAndDay, { labelId, key });
  }

  updateCard(payload: any) {
    this.store.dispatch(new UpdateCard(payload));
  }

  deleteCard(payload: NoteCard) {
    this.store.dispatch(new DeleteCard(payload));
  }
}
