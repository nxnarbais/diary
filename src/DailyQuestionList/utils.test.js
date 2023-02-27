const { getNumberOfDays, getMarkedDates, findNoteWithDate } = require('./utils');

test('getNumberOfDays', () => {
    expect(getNumberOfDays("02/15/2023", "02/18/2023")).toBe(3);
    expect(getNumberOfDays("01/01/2023", "02/01/2023")).toBe(31);
    expect(getNumberOfDays("01/01/2023", "01/01/2023")).toBe(0);
    expect(getNumberOfDays("01/01/2023", "01/01/2024")).toBe(365);
});

test('getMarkedDates', () => {
    expect(JSON.stringify(getMarkedDates())).toBe(JSON.stringify({}))
    const questionNotes = [
        {
            id: '123',
            date: 1676422800000,
            question: 'what is this?',
            answer: 'that'
        },
        {
            id: '987',
            date: 1675990800000,
            question: 'why no that?',
            answer: 'you\'re right'
        }
    ]
    expect(JSON.stringify(getMarkedDates(questionNotes))).toBe(JSON.stringify({"2023-02-15":{"marked":true},"2023-02-10":{"marked":true}}))
})

test('findNoteWithDate', () => {
    const questionNotes = [
        {
            id: '123',
            date: 1676422800000,
            question: 'what is this?',
            answer: 'that'
        },
        {
            id: '987',
            date: 1675990800000,
            question: 'why no that?',
            answer: 'you\'re right'
        }
    ]
    expect(JSON.stringify(
        findNoteWithDate(questionNotes, new Date(1675990800000))
    )).toBe(JSON.stringify(
        questionNotes[1]
    ))
    expect(findNoteWithDate(questionNotes, new Date())).toBe(undefined)
})