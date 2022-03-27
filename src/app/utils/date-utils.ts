
export class DateUtils {


    public static getStartDateFromWeekNumber(w, y) {
        var d = (1 + (w - 1) * 7);
        return new Date(y, 0, d + 1);
    }

    public static getEndDateTimeInMilliseconds(startDateInMilliseconds: number, duration: number) {
        return new Date(startDateInMilliseconds + duration * 24 * 60 * 60 * 1000).getTime();
    }

    // public static getDurationBetweenTwoDates(endDate: number, startDate: number) {
    //     return (endDate - startDate) / (1000 * 60 * 60 * 24) == 0? 1: (endDate - startDate) / (1000 * 60 * 60 * 24);
    // }

    public static getDateFormatted(day, month) {
        return day + '.' + month;
    }

    public static getWeeksNumberBetweenTwoDates(startDate: number, endDate: number, datePipe) {
        let weeksList = [];
        const addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
        //Sunday check
        let currentDate = new Date(startDate);
        if (currentDate.getDay() > 0) {
            currentDate.setDate(currentDate.getDate() - currentDate.getDay());
        }

        while (currentDate <= new Date(endDate)) {
            weeksList.push(parseInt(datePipe.transform(currentDate, 'w')) + '-' + currentDate.getFullYear());
            currentDate = addDays.call(currentDate, 7);
        }
        return weeksList;
    };

    public static getDaysPerWeek(date) {
        let daysPerWeekList = [];
        for (let j = 1; j < 6; j++) {
            daysPerWeekList.push(this.getDateFormatted(date.getDate() + j, date.getMonth() + 1));
        }
        return daysPerWeekList;
    }

    public static calcBusinessDays(endDate, startDate) {
        if (endDate < startDate) {
            return -1;
        }
        let count = 0;
        const curDate = new Date(startDate.getTime());
        while (curDate <= endDate) {
            const dayOfWeek = curDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
            curDate.setDate(curDate.getDate() + 1);
        }
        return count == 0 ? 1 : count;
    }

}
