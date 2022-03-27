import { NoteLabel } from "src/app/models/note-label";
import { FilterDataAction, FilterDataActionTypes } from "./filter-data.action";

export interface FilterDataState {
    weekNumber: number;
    selectedNoteLabels: NoteLabel[];
    noteLabelsList: NoteLabel[];
    error: Error;
}

const initialState: FilterDataState = {
    weekNumber: undefined,
    selectedNoteLabels: [],
    noteLabelsList: [],
    error: undefined
};

export function filterDataReducer(
    state: FilterDataState = initialState,
    action: FilterDataAction
) {
    switch (action.type) {
        case FilterDataActionTypes.INITIALIZE_WEEK_NUMBER:
            return {
                ...state,
                weekNumber: action.payload,
            };
        case FilterDataActionTypes.UPDATE_WEEK_NUMBER_SUCCESS:
            return {
                ...state,
                weekNumber: action.payload,
            };
        case FilterDataActionTypes.UPDATE_WEEK_NUMBER_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case FilterDataActionTypes.SET_SELECTED_NOTE_LABEL:
            return {
                ...state,
                selectedNoteLabels: action.payload ? [state.noteLabelsList.find((noteLabel) => {
                    return noteLabel.id == action.payload;
                })] : state.noteLabelsList
            };
        case FilterDataActionTypes.LOAD_NOTE_LABELS_LIST_SUCCESS:
            return {
                ...state,
                noteLabelsList: action.payload,
            };
        default:
            return state;
    }
}