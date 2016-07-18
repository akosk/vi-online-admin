import axios from 'axios';

class FilterApi {

  static saveFilter(filter) {
    return axios.post(`/filters`,
      { filter },
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

  static getAllFilters() {
    return axios.get(`/filters`,
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

  static deleteFilter(id) {
    return axios.delete(`/filters/${id}`,
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

}

export default FilterApi;
