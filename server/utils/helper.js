const moment = require('moment-timezone');

// Convert the date string to a Date object in Asia/Kolkata timezone
const dateStringToDate = (dateString) => {
    return moment.tz(dateString, 'DD-MM-YYYY', 'Asia/Kolkata').toDate();
}



module.exports = {
    dateStringToDate
}
