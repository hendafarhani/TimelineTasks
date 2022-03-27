import { createSelector } from "@ngrx/store";
import { AppState } from "../app-reducer";
import { WeekDataState } from "../week/week-data-reducer";
import { FilterDataState } from "./filter-data.reducer";


const selectFilterDataState = (state: AppState) => state.filterData;
const selectWeekDataState = (state: AppState) => state.weekData;

export const getNoteLabelsList = createSelector(
    selectFilterDataState,
    (filterData: FilterDataState) => filterData.noteLabelsList

);

export const getWeekNumber = createSelector(
    selectFilterDataState,
    (filterData: FilterDataState) => filterData.weekNumber
);

export const getSelectedNoteLabels = createSelector(
    selectFilterDataState,
    (filterData: FilterDataState) => filterData.selectedNoteLabels
);

export const isIncrementWeekNumberDisabled = createSelector(
    selectFilterDataState,
    selectWeekDataState,
    (filterData: FilterDataState, weekData: WeekDataState) => {
        return filterData.weekNumber == weekData.maxWeekNumber;
    }
);

export const isDecrementWeekNumberDisabled = createSelector(
    selectFilterDataState,
    selectWeekDataState,
    (filterData: FilterDataState, weekData: WeekDataState) => {
        return filterData.weekNumber == weekData.minWeekNumber;
    }
);

export const filterDataQuery = {
    getNoteLabelsList,
    getWeekNumber,
    getSelectedNoteLabels,
    isIncrementWeekNumberDisabled,
    isDecrementWeekNumberDisabled,
}