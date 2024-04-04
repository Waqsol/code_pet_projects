import axios from 'axios';

const RESTAURANTS_BASE_REST_API_URL = 'http://localhost:8080/my_project-1.0-SNAPSHOT/';


class ReviewsService {
  getRestaurantRating(restaurantId) {
    return axios.get(RESTAURANTS_BASE_REST_API_URL+'rating/'+restaurantId);
  }
  rateOrder(orderId,id1,restId, rating){
    const requestData = {
      id_order:orderId,
      id_user: id1,
      id_restaurant: restId,
      rate: rating
    };
    return axios.post(RESTAURANTS_BASE_REST_API_URL+'rating/'+restId,requestData);
  }

  checkRateByUserAndOrder(orderId,id1,restId, rating) {
    const requestData={
      id_order:orderId,
      id_user:id1,
      id_restaurant:restId,
      rate:rating
    }
    return axios.post(RESTAURANTS_BASE_REST_API_URL+'rating_by_user_and_order',requestData);
  }
}

export default new ReviewsService();