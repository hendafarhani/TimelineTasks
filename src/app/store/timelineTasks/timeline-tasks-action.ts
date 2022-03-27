import { Action } from "@ngrx/store";

export enum TimelineTasksActionTypes {
    LOAD_TIMELINE_TASKS = '[TIMELINE_TASKS] Load timeline tasks',
    LOAD_TIMELINE_TASKS_SUCCESS = '[TIMELINE_TASKS] Load timeline tasks Success',
    LOAD_TIMELINE_TASKS_FAILURE = '[TIMELINE_TASKS] Load timeline tasks Failure',

    UPDATE_CARD = '[TIMELINE_TASKS] Update card',
    UPDATE_CARD_SUCCESS = '[TIMELINE_TASKS] Update card Success',
    UPDATE_CARD_FAILURE = '[TIMELINE_TASKS] Update card Failure',

    DELETE_CARD = '[TIMELINE_TASKS] Delete card',
    DELETE_CARD_SUCCESS = '[TIMELINE_TASKS] Delete card Success'
}

export class LoadTimelineTasksAction implements Action {
    readonly type = TimelineTasksActionTypes.LOAD_TIMELINE_TASKS.toString();
    constructor(public payload?: any) {
    }
}

export class LoadTimelineTasksSuccessAction implements Action {
    readonly type = TimelineTasksActionTypes.LOAD_TIMELINE_TASKS_SUCCESS.toString();
    constructor(public payload: Map<number, any[]>) {
    }
}

export class LoadTimelineTasksFailureAction implements Action {
    readonly type = TimelineTasksActionTypes.LOAD_TIMELINE_TASKS_FAILURE.toString();
    constructor(public payload: Error) { }
}

export class UpdateCard implements Action {
    readonly type = TimelineTasksActionTypes.UPDATE_CARD.toString();
    constructor(public payload: any) { }
}

export class UpdateCardSuccess implements Action {
    readonly type = TimelineTasksActionTypes.UPDATE_CARD_SUCCESS.toString();
    constructor(public payload: Map<number, any[]>) { }
}

export class UpdateCardFailure implements Action {
    readonly type = TimelineTasksActionTypes.UPDATE_CARD_FAILURE.toString();
    constructor(public payload: Error) { }
}

export class DeleteCard implements Action {
    readonly type = TimelineTasksActionTypes.DELETE_CARD.toString();
    constructor(public payload: any) { }
}

export class DeleteCardSuccess implements Action {
    readonly type = TimelineTasksActionTypes.DELETE_CARD_SUCCESS.toString();
    constructor(public payload: any) { }
}

export type TimelineTasksAction =
    | LoadTimelineTasksAction
    | LoadTimelineTasksSuccessAction
    | LoadTimelineTasksFailureAction
    | UpdateCard
    | UpdateCardSuccess
    | UpdateCardFailure
    | DeleteCard
    | DeleteCardSuccess;
