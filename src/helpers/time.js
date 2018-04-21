import whelp from './base'
import moment from 'moment'

export default {
  
  duration_format: function (value, type='seconds') {
    let duration = moment.duration(value, type)
    let days     = duration.days()
    let hours    = duration.hours()
    let minutes  = duration.minutes()
    let seconds  = duration.seconds()
    let format   = []
    if (days > 0) { format.push(days + ' ' + (days === 1 ? 'day' : 'days')) }
    if (hours > 0) { format.push(hours + ' ' + (hours === 1 ? 'hour' : 'hours')) }
    if (minutes > 0) { format.push(minutes + ' ' + (minutes === 1 ? 'minute' : 'minutes')) }
    if (seconds > 0) { format.push(seconds + ' ' + (seconds === 1 ? 'second' : 'seconds')) }
    return format.join(' ')
  }
}
