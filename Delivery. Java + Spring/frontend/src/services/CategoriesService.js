import axios from 'axios';

const RESTAURANTS_BASE_REST_API_URL = 'http://localhost:8080/my_project-1.0-SNAPSHOT/';

class CategoriesService {
    AllCategories() {
    return axios.get(RESTAURANTS_BASE_REST_API_URL+'Categories');
  }

  addCategories(categories) {
    return axios.post(RESTAURANTS_BASE_REST_API_URL+'Categories_add', categories);
  }

  getCategories(categoriesId) {
    return axios.get(RESTAURANTS_BASE_REST_API_URL+'Categories/'+categoriesId);
  }
  
  updateCategories(categoriesId, categories) {
    return axios.put(RESTAURANTS_BASE_REST_API_URL+'Categories_update/'+categoriesId,categories);
  }

  deleteCategories(categoriesId) {
    return axios.delete(RESTAURANTS_BASE_REST_API_URL+'Categories_delete/'+categoriesId);
 }
}

export default new CategoriesService();