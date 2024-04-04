import axios from 'axios';

const RESTAURANTS_BASE_REST_API_URL = 'http://localhost:8080/my_project-1.0-SNAPSHOT/';


class DishesService {
  getAllDishes(restaurantId) {
    return axios.get(RESTAURANTS_BASE_REST_API_URL+'dishes/'+restaurantId);
  }

  AddDish(dishes) {
    return axios.post(RESTAURANTS_BASE_REST_API_URL+'dishes_add',dishes);
  }

  getDishesFromId(DishesId) {
    return axios.get(RESTAURANTS_BASE_REST_API_URL+'dishes_from_id/'+DishesId);
  }
  
  updateDishes(DishesId, Dishes) {
    return axios.put(RESTAURANTS_BASE_REST_API_URL+'dishes_update/'+DishesId,Dishes);
  }
  deleteDishes(DishesId) {
    return axios.delete(RESTAURANTS_BASE_REST_API_URL+'dishes_delete/'+DishesId);
 }
 getDishesByCategory(category){
    return axios.get(RESTAURANTS_BASE_REST_API_URL+'dishes_by_id',category);

 }
}

export default new DishesService();