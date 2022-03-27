import { WeekDataAction, WeekDataActionTypes } from "./week-data-action";

export interface WeekDataState {
    minWeekNumber: number;
    minStartDate: Date;
    maxWeekNumber: number;
    maxStartDate: Date;
    weeksList: Map<number, string[]>;
}

const initialState: WeekDataState = {
    minWeekNumber: 0,
    minStartDate: undefined,
    maxWeekNumber: 0,
    maxStartDate: undefined,
    weeksList: new Map()
};

export function weekDataReducer(
    state: WeekDataState = initialState,
    action: WeekDataAction
) {
    switch (action.type) {
        case WeekDataActionTypes.SET_WEEK_LIST:
            return {
                ...state,
                weeksList: action.payload,
            };
        case WeekDataActionTypes.SET_MIN_WEEK_NUMBER:
            return {
                ...state,
                minWeekNumber: action.payload,
            };
        case WeekDataActionTypes.SET_MIN_START_DATE:
            return {
                ...state,
                minStartDate: action.payload,
            };
        case WeekDataActionTypes.SET_MAX_WEEK_NUMBER:
            return {
                ...state,
                maxWeekNumber: action.payload,
            };
        case WeekDataActionTypes.SET_MAX_START_DATE:
            return {
                ...state,
                maxStartDate: action.payload,
            };
        default:
            return state;
    }
}