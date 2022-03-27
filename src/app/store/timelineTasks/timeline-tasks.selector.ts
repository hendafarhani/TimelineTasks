import { createSelector } from "@ngrx/store";
import { AppState } from "../app-reducer";
import { FilterDataState } from "../filter/filter-data.reducer";
import { WeekDataState } from "../week/week-data-reducer";
import { TimelineState } from "./timeline-tasks-reducer";

const selectTimelineTasksState = (state: AppState) => state.timelineTasks
const selectWeekDataState = (state: AppState) => state.weekData;
const selectFilterDataState = (state: AppState) => state.filterData;

export const loadTimelineTasks = createSelector(
    selectTimelineTasksState,
    (timelineTasks: TimelineState) => timelineTasks.tasksList
);

export const isLoading = createSelector(
    selectTimelineTasksState,
    (timelineTasks: TimelineState) => timelineTasks.loading
);

export const error = createSelector(
    selectTimelineTasksState,
    (timelineTasks: TimelineState) => timelineTasks.error
);

export const getCardsPerLabelAndDay = createSelector(
    selectTimelineTasksState,
    selectWeekDataState,
    selectFilterDataState,
    (timelineTasks: TimelineState, weekData: WeekDataState, filterData: FilterDataState, props) => {
        return timelineTasks.tasksList.get(props.labelId)[filterData.weekNumber - weekData.minWeekNumber].get(props.key);
    }
);

export const timelineTasksQuery = {
    loadTimelineTasks,
    getCardsPerLabelAndDay,
    isLoading,
    error
}

