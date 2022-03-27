import { TimelineTasksAction, TimelineTasksActionTypes } from "./timeline-tasks-action";

export interface TimelineState {
    tasksList: Map<number, any[]>;
    loading: boolean;
    error: Error
}

const initialState: TimelineState = {
    tasksList: new Map(),
    loading: false,
    error: undefined
};

export function timelineTasksReducer(
    state: TimelineState = initialState,
    action: TimelineTasksAction
) {
    switch (action.type) {
        case TimelineTasksActionTypes.LOAD_TIMELINE_TASKS:
            return {
                ...state,
                loading: true,
            };
        case TimelineTasksActionTypes.LOAD_TIMELINE_TASKS_SUCCESS:
            return {
                ...state,
                tasksList: action.payload,
                loading: false,
            };
        case TimelineTasksActionTypes.LOAD_TIMELINE_TASKS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case TimelineTasksActionTypes.UPDATE_CARD:
            return {
                ...state,
                loading: true,
            };
        case TimelineTasksActionTypes.UPDATE_CARD_SUCCESS:
            return {
                ...state,
                tasksList: action.payload,
                loading: false,
            };
        case TimelineTasksActionTypes.UPDATE_CARD_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case TimelineTasksActionTypes.DELETE_CARD_SUCCESS:
            return {
                ...state,
                tasksList: action.payload
            };
        default:
            return state;
    }
}