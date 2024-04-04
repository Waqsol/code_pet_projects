import axios from 'axios';

const RESTAURANTS_BASE_REST_API_URL = 'http://localhost:8080/my_project-1.0-SNAPSHOT/';


class RestaurantsService {
  getAllRestaurants() {
    return axios.get(RESTAURANTS_BASE_REST_API_URL);
  }

  addRestaurant(restaurant) {
    return axios.post(RESTAURANTS_BASE_REST_API_URL, restaurant);
  }

  getRestaurant(restaurantId) {
    return axios.get(RESTAURANTS_BASE_REST_API_URL+'/'+restaurantId);
  }
  
  updateRestaurant(restaurantId, restaurant) {
    return axios.put(RESTAURANTS_BASE_REST_API_URL+'/'+restaurantId,restaurant);
  }
  deleteRestaurant(restaurantId) {
    return axios.delete(RESTAURANTS_BASE_REST_API_URL+'/'+restaurantId);
 }
}

export default new RestaurantsService();