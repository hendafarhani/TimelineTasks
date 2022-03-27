import { Action } from "@ngrx/store";

export enum WeekDataActionTypes {
    SET_WEEK_LIST = '[WEEK_DATA] Set week List',
    GET_WEEK_LIST = '[WEEK_DATA] Get week List',

    SET_MIN_WEEK_NUMBER = '[WEEK_DATA] Set min week number',
    GET_MIN_WEEK_NUMBER = '[WEEK_DATA] Get min week number',

    SET_MIN_START_DATE = '[WEEK_DATA] Set min start date',
    GET_MIN_START_DATE = '[WEEK_DATA] Get min start date',

    SET_MAX_WEEK_NUMBER = '[WEEK_DATA] Set max week number',
    GET_MAX_WEEK_NUMBER = '[WEEK_DATA] Get max week number',

    SET_MAX_START_DATE = '[WEEK_DATA] Set max start date',
    GET_MAX_START_DATE = '[WEEK_DATA] Get max start date',
}

export class SetWeekList implements Action {
    readonly type = WeekDataActionTypes.SET_WEEK_LIST.toString();
    constructor(public payload: Map<number, string[]>) {
    }
}

export class GetWeekList implements Action {
    readonly type = WeekDataActionTypes.GET_WEEK_LIST.toString();

    constructor(public payload: any) {
    }
}

export class SetMinWeekNumber implements Action {
    readonly type = WeekDataActionTypes.SET_MIN_WEEK_NUMBER.toString();
    constructor(public payload: number) {
    }
}

export class GetMinWeekNumber implements Action {
    readonly type = WeekDataActionTypes.GET_MIN_WEEK_NUMBER.toString();
    constructor(public payload: any) {
    }
}

export class SetMinStartDate implements Action {
    readonly type = WeekDataActionTypes.SET_MIN_START_DATE.toString();
    constructor(public payload: Date) {
    }
}

export class GetMinStartDate implements Action {
    readonly type = WeekDataActionTypes.GET_MIN_START_DATE.toString();
    constructor(public payload: any) {
    }
}

export class SetMaxWeekNumber implements Action {
    readonly type = WeekDataActionTypes.SET_MAX_WEEK_NUMBER.toString();
    constructor(public payload: number) {
    }
}

export class GetMaxWeekNumber implements Action {
    readonly type = WeekDataActionTypes.GET_MAX_WEEK_NUMBER.toString();
    constructor(public payload: any) {
    }
}

export class SetMaxStartDate implements Action {
    readonly type = WeekDataActionTypes.SET_MAX_START_DATE.toString();
    constructor(public payload: Date) {
    }
}

export class GetMaxStartDate implements Action {
    readonly type = WeekDataActionTypes.GET_MAX_START_DATE.toString();
    constructor(public payload: any) {
    }
}

export type WeekDataAction =
    | SetWeekList
    | GetWeekList
    | SetMinWeekNumber
    | GetMinWeekNumber
    | SetMinStartDate
    | GetMinStartDate
    | SetMaxWeekNumber
    | GetMaxWeekNumber
    | SetMaxStartDate
    | GetMaxStartDate


