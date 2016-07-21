import axios from 'axios';

class GeneralApi {

  static find(table, id) {
    return axios.get(`/general/${table}/${id}`,
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

  static findAll(table) {
    return axios.get(`/general/${table}`,
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

  static insert(table, doc) {
    return axios.post(`/general/${table}`,
      { doc },
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

  static update(table, doc) {
    return axios.patch(`/general/${table}/${doc.id}`,
      { doc },
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

  static delete(table,id) {
    return axios.delete(`/general/${table}/${id}`,
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }


}

export default GeneralApi;
