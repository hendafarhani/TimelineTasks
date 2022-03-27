import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { forkJoin, of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { NoteCard } from "src/app/models/note-card";
import { NotesHttpService } from "src/app/services/notes-http.service";
import { DateUtils } from "src/app/utils/date-utils";
import { NotesUtils } from "src/app/utils/notes-utils";
import { AppState } from "../app-reducer";
import { InitializeWeekNumber, LoadNoteLabelsListSuccess, SetSelectedNoteLabel } from "../filter/filter-data.action";
import { SetMaxStartDate, SetMaxWeekNumber, SetMinStartDate, SetMinWeekNumber, SetWeekList } from "../week/week-data-action";
import { DeleteCard, DeleteCardSuccess, LoadTimelineTasksAction, LoadTimelineTasksFailureAction, LoadTimelineTasksSuccessAction, TimelineTasksActionTypes, UpdateCard, UpdateCardFailure, UpdateCardSuccess } from "./timeline-tasks-action";

@Injectable()
export class TimelineTasksEffectsService {


	@Effect() loadTimelineTasks$ = this.actions$.pipe(
		ofType<LoadTimelineTasksAction>(TimelineTasksActionTypes.LOAD_TIMELINE_TASKS),
		switchMap(() =>
			forkJoin([
				this.notesHttpService.getNoteLabels(),
				this.notesHttpService.getNotes().pipe(map(res => {
					return NotesUtils.createCardNotesList(this.datePipe, res)
				}
				))
			])
		),
		switchMap(([noteLabelsList, { noteCardsList, minWeekNumber, minStartDate, maxWeekNumber, maxStartDate }]) => {
			const { tasksPerLabelList, weeksMap } = NotesUtils.createDaysPerWeeksListAndTasksPerLabelList(this.datePipe, noteCardsList, noteLabelsList, minWeekNumber, minStartDate, maxStartDate);
			return [
				new LoadTimelineTasksSuccessAction(tasksPerLabelList),
				new SetWeekList(weeksMap),
				new InitializeWeekNumber(minWeekNumber),
				new SetMinWeekNumber(minWeekNumber),
				new SetMinStartDate(new Date(minStartDate)),
				new SetMaxWeekNumber(maxWeekNumber),
				new SetMaxStartDate(new Date(maxStartDate)),
				new LoadNoteLabelsListSuccess(noteLabelsList),
				new SetSelectedNoteLabel(undefined)
			];
		}),
		catchError((error) => of(new LoadTimelineTasksFailureAction(error)))
	);


	@Effect() updateCard$ =
		this.actions$.pipe(
			ofType<UpdateCard>(TimelineTasksActionTypes.UPDATE_CARD),
			switchMap(action =>
				of(action).pipe(
					withLatestFrom(
						this.store.select((store: AppState) => store.timelineTasks.tasksList),
						this.store.select((store: AppState) => store.weekData.minWeekNumber),
					),
					map(([action, tasksList, minWeekNumber]) => {
						const card: NoteCard = { ...action.payload.card };

						if (action.payload.isChangeStartDate) {
							if (NotesUtils.isMaxStackedNotesExceeded(this.datePipe, tasksList, card, minWeekNumber)) {
								return new UpdateCardFailure(new Error("Sorry! You can not add more than three notes in one day."));
							}

							if (action.payload.isChangeDuration) {
								// If both start date and duration are changed 
								// => Update the start date first, then the duration and after the end date.  

								let tasksListResult = NotesUtils.moveCardToNewStartDate(this.datePipe, card, tasksList, minWeekNumber, false);
								tasksListResult = NotesUtils.updateCardEndDateBasedOnDuration(card, tasksListResult, minWeekNumber);
								return new UpdateCardSuccess(tasksListResult);
							} else {
								const endDate = new Date(card.endDate);
								const startDate = new Date(card.startDate);
								const calculatedDuration = DateUtils.calcBusinessDays(endDate, startDate);

								if (calculatedDuration == -1) {
									return new UpdateCardFailure(new Error("Sorry! End date: " + this.datePipe.transform(endDate, 'MM-dd-y') + " must be greater than the start date chosen: " + this.datePipe.transform(startDate, 'MM-dd-y')));
								}
								// If start date changes => End date is fixed so duration will be changed
								// and card must be moved to the corresponding start date.
								const tasksListResult = NotesUtils.moveCardToNewStartDate(this.datePipe, card, tasksList, minWeekNumber, true);
								return new UpdateCardSuccess(tasksListResult);
							}
						} else {
							if (action.payload.isChangeDuration) {
								// If duration changes => End Date would change and card's extending also
								const tasksListResult = NotesUtils.updateCardEndDateBasedOnDuration(card, tasksList, minWeekNumber);
								return new UpdateCardSuccess(tasksListResult);
							} else {
								const tasksListResult = NotesUtils.updateCard(card, tasksList, minWeekNumber);
								return new UpdateCardSuccess(tasksListResult);
							}
						}
					})
				)))

	@Effect() deleteCard$ = this.actions$.pipe(
		ofType<DeleteCard>(TimelineTasksActionTypes.DELETE_CARD),
		switchMap(action =>
			of(action).pipe(
				withLatestFrom(
					this.store.select((store: AppState) => store.timelineTasks.tasksList),
					this.store.select((store: AppState) => store.weekData.minWeekNumber),
				),
				map(([action, tasksList, minWeekNumber]) => {
					return new DeleteCardSuccess(NotesUtils.removeCard(tasksList, action.payload, minWeekNumber));
				}))))

	constructor(
		private actions$: Actions,
		private notesHttpService: NotesHttpService,
		public datePipe: DatePipe,
		private store: Store
	) { }
}
