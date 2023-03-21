interface Day {
  datetime: Date;
  description: string;
}

function getDateTimeFromDaySchedule (daySchedule: string, day: Date): Date {
  const timeOfdayIndicator = daySchedule.includes('午前') ? 'AM' : 'PM';
  const time = daySchedule.match(/\d{1,2}:\d{2}/g)[0];
  const timeString = `${time} ${timeOfdayIndicator}`;
  const datetime = new Date(Date.parse(`${day.toDateString()} ${timeString} UTC`));
  const japanOffset = 9 * 60;
  datetime.setMinutes(datetime.getMinutes() - japanOffset);
  return datetime;
}

function replaceAllWhiteSpaceWithOneSpace (str: string): string {
  return str.replace(/\s+/g, ' ');
}

function parseTvTokyoTimetableData (dailySchedule: string[][], startDate: Date): Day[] {
  const parsedDays = [];
  for (let i = 0; i < dailySchedule.length; i++) {
    const day = dailySchedule[i];
    const dayDate = new Date(startDate);
    dayDate.setDate(dayDate.getDate() + i);
    for (let j = 0; j < day.length; j++) {
      const daySchedule = day[j];
      const datetime = getDateTimeFromDaySchedule(daySchedule, dayDate);
      const description = replaceAllWhiteSpaceWithOneSpace(daySchedule);
      parsedDays.push({
        datetime,
        description,
      });
    }
  }
  return parsedDays;
}

export { parseTvTokyoTimetableData };
