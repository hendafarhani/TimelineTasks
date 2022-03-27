import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { filterDataReducer, FilterDataState } from "./filter/filter-data.reducer";
import { TimelineState, timelineTasksReducer } from "./timelineTasks/timeline-tasks-reducer";
import { weekDataReducer, WeekDataState } from "./week/week-data-reducer";

export interface AppState {

    readonly timelineTasks: TimelineState;
    readonly weekData: WeekDataState;
    readonly filterData: FilterDataState;
}

export const appReducers: ActionReducerMap<AppState> = {
    timelineTasks: timelineTasksReducer,
    weekData: weekDataReducer,
    filterData: filterDataReducer
};

export function logger(
    reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
    return (state: AppState, action: any) => {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<AppState>[] = [logger];
