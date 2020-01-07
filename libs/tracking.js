/* global ga */

import $SDK from 'jquery';

export default function (props) {

  // eslint-disable-next-line camelcase
  const log_SessionID = window.sessionStorage.getItem('sdk-session-id');
  const source = window.sessionStorage.getItem('sdk-utm-source') || '';
  const campaign = window.sessionStorage.getItem('sdk-utm-campaign') || '';
  const medium = window.sessionStorage.getItem('sdk-utm-medium') || '';
  const term = window.sessionStorage.getItem('sdk-utm-term') || '';
  const content = window.sessionStorage.getItem('sdk-utm-content') || '';
  const logUrl = document.location.href;

  const {
    category,
    event,
    value
  } = props || {};

  if (category && event && value) {
    try {
      ga('SDK.send', {
        hitType: 'event',
        eventCategory: category,
        eventAction: event,
        eventLabel: value
      });
    } catch (e) {
      console.log('The Glenlivet eCards: GA is not available.');
    }
  }

  const dataToSend = {
    log_URL: logUrl,
    log_SessionID,
    log_UTMSource: source,
    log_UTMCampaign: campaign,
    log_UTMMedium: medium,
    log_UTMTerm: term,
    log_UTMContent: content
  };

  const merged = Object.assign({}, props, dataToSend );

  $SDK
    .ajax({
      method: 'POST',
      url: 'https://debraindev.com/tracking/track.php',
      data: {
        project_name: 'TheGlenlivetECards',
        event_name: `${event}-${value}`,
        project_variant: 'TGEC',
        params_object: JSON.stringify(merged),
        action_label: JSON.stringify(value)
      }
    })
    .fail( (xhr, status, msg) => {
      console.log(`error msg: ${msg}`);
    });

}
