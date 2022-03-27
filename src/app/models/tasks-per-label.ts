import { NoteCard } from "./note-card";
import { NoteLabel } from "./note-label";

export class TasksPerLabel {

    noteLabel: NoteLabel;
    cardsWeeksList: Map<string, NoteCard>[];

    constructor(noteLabel: NoteLabel) {
        this.noteLabel = noteLabel;
        this.cardsWeeksList = [];
    }
}
