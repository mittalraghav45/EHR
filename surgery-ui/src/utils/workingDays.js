import dayjs from "dayjs";

// Two weeks
const numDays = 14
const displayDateFormat = "ddd D MMM YYYY"
const persistDateFormat = "DD/MM/YYYY"

// One appointment per hour for this prototype.
export const appointmentTimes = [
    "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm"
]

// Working days are any day but Sunday.
export function getWorkingDays() {
    const dates = []
    const now = dayjs()
    for (var i = 0; i < numDays; i++) {
        const day = now.add(i, "days")
        if (day.day() !== 0) {
            const date = {
                persisted: day.format(persistDateFormat),
                display: day.format(displayDateFormat),
                selected: false
            }
            dates.push(date)
        }
    }
    return dates;
}

export function displayDate(persistDate) {
    const date = dayjs(persistDate, persistDateFormat)
    return date.format(displayDateFormat)
}

export function today()  {
    return dayjs().format(persistDateFormat)
}