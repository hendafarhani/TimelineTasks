import { DatePipe } from '@angular/common';
import { NoteCard } from '../models/note-card';
import { DateUtils } from '../utils/date-utils';

export class NotesUtils {

    public static createCardNotesList(datePipe: DatePipe, notesList: any[]) {
        let noteCardsList: NoteCard[] = [];
        let minWeekNumber: number;
        let minStartDate: number;
        let maxWeekNumber: number;
        let maxStartDate: number;
        notesList["notes"].forEach((note, index) => {
            const startDate = new Date(note.startDate * 1000);
            let noteCard = new NoteCard()
                .setId(note.id)
                .setLabels(note.labels)
                .setStartDate(note.startDate * 1000)
                .setEndDate(note.endDate * 1000)
                .setSummary(note.summary)
                .setTitle(note.title)
                .setWeekNumber(parseInt(datePipe.transform(startDate, 'w')))
                .setDuration(DateUtils.calcBusinessDays(new Date(note.endDate), new Date(note.startDate)))
                .setStartDateFormatted(DateUtils.getDateFormatted(startDate.getDate(), startDate.getMonth() + 1));
            noteCardsList.push(noteCard);
            minWeekNumber = index == 0 ? noteCard.weekNumber :
                (noteCard.weekNumber < minWeekNumber ? noteCard.weekNumber : minWeekNumber);
            minStartDate = index == 0 ? noteCard.startDate :
                (noteCard.startDate < minStartDate ? noteCard.startDate : minStartDate);

            maxWeekNumber = index == 0 ? noteCard.weekNumber :
                (noteCard.weekNumber > maxWeekNumber ? noteCard.weekNumber : maxWeekNumber);
            maxStartDate = index == 0 ? noteCard.startDate :
                (noteCard.startDate > maxStartDate ? noteCard.startDate : maxStartDate);
        });
        return { noteCardsList, minWeekNumber, minStartDate, maxWeekNumber, maxStartDate };
    }

    public static createDaysPerWeeksListAndTasksPerLabelList(datePipe: DatePipe, noteCardsList, noteLabels, minWeekNumber, minStartDate, maxStartDate) {
        let weeksMap = new Map();
        let tasksPerLabelList = NotesUtils.initializeTaskPerLabelList(noteLabels);
        let keys = [...tasksPerLabelList.keys()];
        let weeksList = DateUtils.getWeeksNumberBetweenTwoDates(minStartDate, maxStartDate, datePipe);
        keys.forEach((key) => {
            weeksList.forEach((weekYear, index) => {
                let weekYearList = weekYear.split("-");
                const [week, year] = [parseInt(weekYearList[0]), parseInt(weekYearList[1])];
                weeksMap.set(week, []);
                tasksPerLabelList.get(key).push(new Map());
                const date = DateUtils.getStartDateFromWeekNumber(week, year);
                const daysPerWeekList = DateUtils.getDaysPerWeek(date);
                daysPerWeekList.forEach((day) => {
                    weeksMap.get(week).push(day);
                    tasksPerLabelList.get(key)[index].set(day, undefined);
                })
            });
            NotesUtils.addNoteCardRelatedToLabel(tasksPerLabelList, noteCardsList, key, minWeekNumber);
        });
        return { tasksPerLabelList, weeksMap };
    }

    public static moveCardToNewStartDate(datePipe: DatePipe, noteCard: NoteCard, tasksList: Map<number, any[]>, minWeekNumber, updateDuration: boolean) {
        const startDate = new Date(noteCard.startDate);
        const tasksListResult = new Map(tasksList);

        // Remove card from the old start date
        let cardsPerDayList = [...tasksListResult.get(noteCard.label)[noteCard.weekNumber - minWeekNumber].get(noteCard.startDateFormatted)];
        cardsPerDayList = cardsPerDayList.filter((element) => {
            return element.id != noteCard.id;
        });
        tasksListResult.get(noteCard.label)[noteCard.weekNumber - minWeekNumber].set(noteCard.startDateFormatted, cardsPerDayList);

        // Before adding card to its new start date => update card data
        const startDateFormatted = DateUtils.getDateFormatted(startDate.getDate(), startDate.getMonth() + 1);
        const weekNumber = parseInt(datePipe.transform(startDate, 'w'));

        noteCard.startDateFormatted = startDateFormatted;
        noteCard.weekNumber = weekNumber;
        if (updateDuration) {
            noteCard.duration = DateUtils.calcBusinessDays(new Date(noteCard.endDate), new Date(noteCard.startDate));
        }

        // Add card to its new start date
        if (tasksListResult.get(noteCard.label)[weekNumber - minWeekNumber].get(startDateFormatted) == undefined) {
            tasksListResult.get(noteCard.label)[weekNumber - minWeekNumber].set(startDateFormatted, [noteCard]);
        } else {
            tasksListResult.get(noteCard.label)[weekNumber - minWeekNumber].get(startDateFormatted).push(noteCard)
        }
        return tasksListResult;
    }

    public static updateCardEndDateBasedOnDuration(noteCard: NoteCard, tasksList: Map<number, any[]>, minWeekNumber) {
        const tasksListResult = new Map(tasksList);
        let cardsPerDayList = [...tasksListResult.get(noteCard.label)[noteCard.weekNumber - minWeekNumber].get(noteCard.startDateFormatted)];
        const index = cardsPerDayList.findIndex((element) => {
            return element.id == noteCard.id
        });
        noteCard.endDate = DateUtils.getEndDateTimeInMilliseconds(noteCard.startDate, noteCard.duration - 1);
        cardsPerDayList[index] = noteCard;
        tasksListResult.get(noteCard.label)[noteCard.weekNumber - minWeekNumber].set(noteCard.startDateFormatted, cardsPerDayList);
        return tasksListResult;
    }

    public static updateCard(card: NoteCard, tasksList: Map<number, any[]>, minWeekNumber) {
        let noteCard = { ...card };
        const tasksListResult = new Map(tasksList);
        let cardsPerDayList = [...tasksListResult.get(noteCard.label)[noteCard.weekNumber - minWeekNumber].get(noteCard.startDateFormatted)];
        const index = cardsPerDayList.findIndex((element) => {
            return element.id == noteCard.id
        });
        cardsPerDayList[index] = noteCard;
        tasksListResult.get(noteCard.label)[noteCard.weekNumber - minWeekNumber].set(noteCard.startDateFormatted, cardsPerDayList);
        return tasksListResult;
    }

    public static isMaxStackedNotesExceeded(datePipe: DatePipe, tasksListResult: Map<number, any[]>, noteCard: NoteCard, minWeekNumber: number) {
        const startDate = new Date(noteCard.startDate);
        const startDateFormatted = DateUtils.getDateFormatted(startDate.getDate(), startDate.getMonth() + 1);
        const weekNumber = parseInt(datePipe.transform(startDate, 'w'));
        if (tasksListResult.get(noteCard.label)[weekNumber - minWeekNumber].get(startDateFormatted) == undefined) {
            return false;
        }
        return tasksListResult.get(noteCard.label)[weekNumber - minWeekNumber].get(startDateFormatted).length == 3;
    }

    public static addNoteCardRelatedToLabel(tasksPerLabelList, noteCardsList, key, minWeekNumber) {
        noteCardsList.map((noteCard: NoteCard) => {
            noteCard.labels.map((label) => {
                if (key === label) {
                    const card = {
                        ...noteCard,
                        label: label
                    }
                    if (tasksPerLabelList.get(key)[noteCard.weekNumber - minWeekNumber].get(noteCard.startDateFormatted) == undefined) {
                        tasksPerLabelList.get(key)[noteCard.weekNumber - minWeekNumber].set(noteCard.startDateFormatted, [card]);
                    } else {
                        tasksPerLabelList.get(key)[noteCard.weekNumber - minWeekNumber].get(noteCard.startDateFormatted).push(card)
                    }
                }
            })
        })
    }

    public static initializeTaskPerLabelList(noteLabels) {
        const tasksPerLabelList = new Map();
        noteLabels.map((noteLabel) => {
            tasksPerLabelList.set(noteLabel.id, []);
        })
        return tasksPerLabelList;
    }

    public static removeCard(tasksList, noteCard, minWeekNumber) {
        const tasksListResult = new Map(tasksList);
        // Remove card 
        let cardsPerDayList = [...tasksListResult.get(noteCard.label)[noteCard.weekNumber - minWeekNumber].get(noteCard.startDateFormatted)];
        cardsPerDayList = cardsPerDayList.filter((element) => {
            return element.id != noteCard.id;
        });
        tasksListResult.get(noteCard.label)[noteCard.weekNumber - minWeekNumber].set(noteCard.startDateFormatted, cardsPerDayList);
        return tasksListResult;
    }
}
