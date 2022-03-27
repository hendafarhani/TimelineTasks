import { createSelector } from '@ngrx/store';
import { AppState } from '../app-reducer';
import { FilterDataState } from '../filter/filter-data.reducer';
import { WeekDataState } from './week-data-reducer';

const selectWeekDataState = (state: AppState) => state.weekData;
const selectFilterDataState = (state: AppState) => state.filterData;

export const loadWeeksList = createSelector(
    selectWeekDataState,
    (weekData: WeekDataState) => weekData.weeksList
);

export const loadMinWeekNumber = createSelector(
    selectWeekDataState,
    (weekData: WeekDataState) => weekData.minWeekNumber
);

export const loadMinStartDate = createSelector(
    selectWeekDataState,
    (weekData: WeekDataState) => weekData.minStartDate
);

export const loadMaxWeekNumber = createSelector(
    selectWeekDataState,
    (weekData: WeekDataState) => weekData.maxWeekNumber
);

export const loadMaxStartDate = createSelector(
    selectWeekDataState,
    (weekData: WeekDataState) => weekData.maxStartDate
);

export const getDaysListPerWeek = createSelector(
    selectWeekDataState,
    selectFilterDataState,
    (weekData: WeekDataState, filterData: FilterDataState) => {
        return weekData.weeksList.get(filterData.weekNumber)
    }
);

export const weekDataQuery = {
    loadWeeksList,
    loadMinWeekNumber,
    loadMinStartDate,
    loadMaxWeekNumber,
    getDaysListPerWeek,
    loadMaxStartDate
}



