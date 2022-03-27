import { Action } from "@ngrx/store";
import { NoteLabel } from "src/app/models/note-label";

export enum FilterDataActionTypes {

    INITIALIZE_WEEK_NUMBER = '[FILTER_DATA] Set week number',
    GET_WEEK_NUMBER = '[FILTER_DATA] Get week number',
    UPDATE_WEEK_NUMBER = '[FILTER_DATA] Update week number',
    UPDATE_WEEK_NUMBER_SUCCESS = '[FILTER_DATA] Update week number success',
    UPDATE_WEEK_NUMBER_FAILURE = '[FILTER_DATA] Update week number failure',

    SET_SELECTED_NOTE_LABEL = '[FILTER_DATA] Set selected note label',
    GET_SELECTED_NOTE_LABEL = '[FILTER_DATA] Get selected note label',

    LOAD_NOTE_LABELS_LIST_SUCCESS = '[FILTER_DATA] Load note labels list Success',
    LOAD_NOTE_LABELS_LIST_FAILURE = '[FILTER_DATA] Load note labels list Failure',

}


export class InitializeWeekNumber implements Action {
    readonly type = FilterDataActionTypes.INITIALIZE_WEEK_NUMBER.toString();
    constructor(public payload: number) {
    }
}

export class GetWeekNumber implements Action {
    readonly type = FilterDataActionTypes.GET_WEEK_NUMBER.toString();
    constructor(public payload: any) {
    }
}

export class UpdateWeekNumber implements Action {
    readonly type = FilterDataActionTypes.UPDATE_WEEK_NUMBER.toString();
    constructor(public payload: number) {
    }
}

export class UpdateWeekNumberSuccess implements Action {
    readonly type = FilterDataActionTypes.UPDATE_WEEK_NUMBER_SUCCESS.toString();
    constructor(public payload: number) {
    }
}

export class UpdateWeekNumberFailure implements Action {
    readonly type = FilterDataActionTypes.UPDATE_WEEK_NUMBER_FAILURE.toString();
    constructor(public payload: Error) {
    }
}

export class SetSelectedNoteLabel implements Action {
    readonly type = FilterDataActionTypes.SET_SELECTED_NOTE_LABEL.toString();
    constructor(public payload: number) {
    }
}

export class GetSelectedNoteLabel implements Action {
    readonly type = FilterDataActionTypes.GET_SELECTED_NOTE_LABEL.toString();
    constructor(public payload: number) {
    }
}

export class LoadNoteLabelsListSuccess implements Action {
    readonly type = FilterDataActionTypes.LOAD_NOTE_LABELS_LIST_SUCCESS.toString();
    constructor(public payload: NoteLabel[]) {
    }
}

export type FilterDataAction =
    InitializeWeekNumber |
    GetWeekNumber |
    UpdateWeekNumberSuccess |
    UpdateWeekNumberFailure |
    SetSelectedNoteLabel |
    GetSelectedNoteLabel |
    LoadNoteLabelsListSuccess 

