const axios = require('axios');
const zipcodes = require('zipcodes');

const MEETUP_KEY = process.env.Meetup_Api_Key;

const getEvents = (zip, callback) => {

  let { latitude, longitude } = getCoordinates(zip);

  axios.get(`https://api.meetup.com/find/upcoming_events?key=${MEETUP_KEY}&lat=${latitude}&lon=${longitude}&sign=true&photo-host=public&topic_category=292&page=20`)
  .then(res => {
    let events = [];
    res.data.events.forEach(event => {
      events.push({
        name: event.name,
        link: event.link,
        local_date: event.local_date,
        local_time: event.local_time,
        city: event.venue ? event.venue.city : undefined,
        city: event.venue ? event.venue.state : undefined,
        city: event.group ? event.group.name : undefined
      });
    });
    callback(events);
  })
  .catch(err => console.error(err));
};

const getCoordinates = (zip) => {
  console.log(zip)
  const location = zipcodes.lookup(zip);
  return {
    latitude: location.latitude,
    longitude: location.longitude
  };
};

module.exports = { getEvents };