import { GDSC_CLUB_ROOT_URL } from './constants.js';
import { loadWholeStream } from './utils.js';

export async function getPastEvents() {
  const response = await fetch(GDSC_CLUB_ROOT_URL, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  }).then(response => response.body).then(body => loadWholeStream(body));
  const pastEvents = new DOMParser().parseFromString(response.join(''), 'text/html').querySelector('#past-events');
  if (pastEvents === null) {
    return [];
  }
  return htmlEventsToArrayOfEvents(pastEvents);
}

export async function getUpcommingEvents() {
  const response = await fetch(GDSC_CLUB_ROOT_URL, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  }).then(response => response.body).then(body => loadWholeStream(body));
  const upcomingEvents = new DOMParser().parseFromString(response.join(''), 'text/html').querySelector('#upcoming-events');
  if (upcomingEvents.querySelector('strong').textContent.includes('There are no upcoming events')) {
    return [];
  }
  return htmlEventsToArrayOfEvents(upcomingEvents);
}

const htmlEventsToArrayOfEvents = (htmlEvents) => {
  const eventsTitles = [];
  const eventsUrls = [];
  for (const event of Array.from(htmlEvents.querySelectorAll('a'))) {
    eventsTitles.push(event.title);
    eventsUrls.push(event.href.replace(window.location.href, 'https://gdsc.community.dev/'));
  }
  const eventsImagesUrls = Array.from(htmlEvents.querySelectorAll('img')).map(image => image.src);
  const eventsDates = Array.from(htmlEvents.querySelectorAll('.vertical-box--event-date')).map(date => date.innerText.trim());
  const eventsTypes = Array.from(htmlEvents.querySelectorAll('.vertical-box--event-type')).map(type => type.innerText.trim());
  const parsedEvents = [];
  for (let i = 0; i < eventsTitles.length; i++) {
    parsedEvents.push({
      title: eventsTitles[i],
      url: eventsUrls[i],
      imageUrl: eventsImagesUrls[i],
      date: eventsDates[i],
      type: eventsTypes[i]
    });
  }
  return parsedEvents;
}