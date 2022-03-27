export class NoteCard {

    id: number;
    title: string;
    summary?: string;
    labels: number[];
    label: number;
    weekNumber: number;
    startDate: number;
    endDate: number;
    duration: number;
    startDateFormatted: string;

    setId(id: number) {
        this.id = id;
        return this;
    }

    setTitle(title: string) {
        this.title = title;
        return this;
    }

    setSummary(summary: string) {
        this.summary = summary;
        return this;
    }

    setLabels(labels: number[]) {
        this.labels = [...labels];
        return this;
    }

    setLabel(label: number) {
        this.label = label;
        return this;
    }

    setWeekNumber(weekNumber: number) {
        this.weekNumber = weekNumber;
        return this;
    }

    setStartDate(startDate: number) {
        this.startDate = startDate;
        return this;
    }

    setEndDate(endDate: number) {
        this.endDate = endDate;
        return this;
    }

    setDuration(duration: number) {
        this.duration = duration;
        return this;
    }

    setStartDateFormatted(startDateFormatted: string) {
        this.startDateFormatted = startDateFormatted;
        return this;
    }
}
