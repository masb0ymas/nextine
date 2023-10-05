import dayjs from 'dayjs'
import 'dayjs/locale/id'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(LocalizedFormat)

export default function combineTimeAndDate(time: Date, date: Date) {
  if (!(date instanceof Date)) return undefined
  if (!(time instanceof Date)) return date

  const hour = dayjs(time).hour()
  const minute = dayjs(time).minute()
  const dateAndTime = dayjs(date).hour(hour).minute(minute)

  // return dateAndTime.$d;
  return dateAndTime
}

export const formatDate = (date: Date) =>
  dayjs(date).locale('id').format('DD-MM-YYYY')

export const formatDateTime = (date: Date) =>
  dayjs(date).locale('id').format('DD MMMM YYYY HH:mm:ss')

export const formatDateText = (date: Date) =>
  dayjs(date).locale('id').format('DD MMMM YYYY')
