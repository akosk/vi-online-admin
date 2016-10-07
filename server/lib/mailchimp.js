import axios from 'axios';
import log from '../lib/nodelogger';

const extractData = (response) => {
  return response.data;
};

class MailChimp {

  static API_KEY = '';

  static url(path) {
    log.debug(`MailChimp ${path}`);
    const dc = MailChimp.API_KEY.split('-')[1];
    return `https://${dc}.api.mailchimp.com/3.0${path}`;
  }

  static headers() {
    return { 'Authorization': `user ${MailChimp.API_KEY}` };
  }

  static getLists() {
    return axios.get(
      MailChimp.url(`/lists`),
      { headers: MailChimp.headers() }
    ).then((r)=>r.data);
  }

  static getList(listId) {
    return axios.get(
      MailChimp.url(`/lists/${listId}`),
      { headers: MailChimp.headers() }
    ).then((r)=>r.data);
  }

  static getMembers(listId) {
    return axios.get(
      MailChimp.url(`/lists/${listId}/members`),
      { headers: MailChimp.headers() }
    ).then((r)=>r.data);
  }

  static postMember(listId, member) {
    const newMember = {
      ...member,
      status: 'subscribed'
    };
    return axios.post(MailChimp.url(`/lists/${listId}/members`),
      newMember,
      { headers: MailChimp.headers() }
    ).then((r)=>r.data);

  }

  static postMembers(listId, members) {

    const operations = members.map((m)=> {
      return {
        method: 'POST',
        path: `/lists/${listId}/members`,
        body: JSON.stringify({
          ...m,
          status: 'subscribed'
        })
      };
    });

    log.debug('Operations', operations);
    const data = {
      operations: operations
    };
    log.debug('Data', data);
    return axios.post(MailChimp.url(`/batches`),
      data,
      { headers: MailChimp.headers() }
    ).then((r)=>r.data);

  }

  static getSegments(listId) {
    return axios.get(
      MailChimp.url(`/lists/${listId}/segments`),
      { headers: MailChimp.headers() }
    ).then((r)=>r.data);
  }

  static postSegment(listId, segment) {
    return axios.post(MailChimp.url(`/lists/${listId}/segments`),
      {
        ...segment,
        static_segment: segment.static_segment || []
      },
      { headers: MailChimp.headers() }
    ).then((r)=>r.data);

  }

  static deleteSegment(listId, segmentId) {
    return axios.delete(MailChimp.url(`/lists/${listId}/segments/${segmentId}`),
      { headers: MailChimp.headers() }
    ).then((r)=>r.data);
  }

  static postMemberToSegment(listId, segmentId, member) {
    const newMember = {
      email_address: member.email_address,
      status: member.status
    };
    return axios.post(MailChimp.url(`/lists/${listId}/segments/${segmentId}/members`),
      newMember,
      { headers: MailChimp.headers() }
    ).then((r)=>r.data);
  }

  static getSegmentMembers(listId, segmentId) {
    return axios.get(
      MailChimp.url(`/lists/${listId}/segments/${segmentId}/members`),
      { headers: MailChimp.headers() }
    ).then((r)=>r.data);

  }

}

export default MailChimp;
