import moment from 'moment'

export const unixTimeFormat = time => (moment(time).format('YYYY-MM-DD HH:mm'))

export const unixDateFormat = time => (moment(time).format('YYYY-MM-DD'))
