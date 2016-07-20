import axios from 'axios';

const extractData = (response) => {
  return response.data;
}

class MailChimp {

  static API_KEY = '03c3ec2707ce6e2e8bbc17c5a8443fff-us12';
  static API_URL = 'https://us12.api.mailchimp.com/3.0';

  static getLists() {
    return axios.get(
      `${MailChimp.API_URL}/lists`,
      {
        headers: { 'Authorization': `user ${MailChimp.API_KEY}` }
      }
    ).then((r)=>r.data);
  }

  static getList(listId) {
    return axios.get(
      `${MailChimp.API_URL}/lists/${listId}`,
      {
        headers: { 'Authorization': `user ${MailChimp.API_KEY}` }
      }
    ).then((r)=>r.data);
  }

  static getMembers(listId){
    return axios.get(
      `${MailChimp.API_URL}/lists/${listId}/members`,
      {
        headers: { 'Authorization': `user ${MailChimp.API_KEY}` }
      }
    ).then((r)=>r.data);

  }

  static postMember(listId, member) {
    console.log(`${MailChimp.API_URL}/lists/${listId}/members`);
    const newMember={
      ...member,
      status: 'subscribed'
    };
    console.log(newMember);
    return axios.post(`${MailChimp.API_URL}/lists/${listId}/members`,
      newMember,
      { headers: { 'Authorization': `user ${MailChimp.API_KEY}` } }
    ).then((r)=>r.data);

  }

}


export default MailChimp;
