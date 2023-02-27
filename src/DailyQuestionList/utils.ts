import { IDailyQuestionNote } from "../interfaces";

const CNAME = 'DailyQuestionList/utils'
const DEBUG = false

export const getNumberOfDays = (start: string, end: string) => {
    const date1 = new Date(start);
    const date2 = new Date(end);
    const oneDay = 1000 * 60 * 60 * 24; // One day in milliseconds
    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay); // Calculating the no. of days between two dates
    return diffInDays;
}

export const getMarkedDates = (notes: IDailyQuestionNote[] | undefined) => {
    if (!notes) {
        return {}
    }
    const markedDates = {}
    notes.forEach(note => {
        const date = new Date(note.date)
        markedDates[date.toISOString().split("T")[0]] = { marked: true }
    })
    DEBUG && console.debug({ CNAME, fn: 'findNoteWithDate', markedDates, notesDate: notes.map(note => note.date)});
    return markedDates
}

export const findNoteWithDate = (notes: IDailyQuestionNote[] | undefined, date: Date) => {
    if (!notes) {
        return undefined
    }
    const dateTime = date.getTime()
    const res = notes.find((note: IDailyQuestionNote) => note.date == dateTime)
    DEBUG && console.debug({ CNAME, fn: 'findNoteWithDate', date, foundNote: res});
    return res
}