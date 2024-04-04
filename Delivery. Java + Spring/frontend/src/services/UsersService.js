import axios from 'axios';

const RESTAURANTS_BASE_REST_API_URL = 'http://localhost:8080/my_project-1.0-SNAPSHOT/';


class UsersService {
//   getAllRestaurants() {
//     return axios.get(RESTAURANTS_BASE_REST_API_URL);
//   }

addUser(user) {
    return axios.post(RESTAURANTS_BASE_REST_API_URL+'registration', user);
  }

  checkUser(user) {
    return axios.post(RESTAURANTS_BASE_REST_API_URL + 'login', user);
  }

  getUser(UserId) {
    return axios.get(RESTAURANTS_BASE_REST_API_URL+'profile/'+UserId);
  }
  updateUser(user) {
    return axios.put(RESTAURANTS_BASE_REST_API_URL + 'profile/' + user.id, user);}
  
//   updateRestaurant(restaurantId, restaurant) {
//     return axios.put(RESTAURANTS_BASE_REST_API_URL+'/'+restaurantId,restaurant);
//   }
//   deleteRestaurant(restaurantId) {
// 	  console.log(restaurantId);
//     return axios.delete(RESTAURANTS_BASE_REST_API_URL+'/'+restaurantId);
//  }
}

export default new UsersService();