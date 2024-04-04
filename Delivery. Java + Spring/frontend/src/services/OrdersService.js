import axios from 'axios';

const RESTAURANTS_BASE_REST_API_URL = 'http://localhost:8080/my_project-1.0-SNAPSHOT/';


class OrdersService {
    createOrder(order) {
        return axios.post(RESTAURANTS_BASE_REST_API_URL + 'orders', order);
      }

      getUserOrders(DishesId) {
        return axios.get(RESTAURANTS_BASE_REST_API_URL+'orders/'+DishesId);
      }

}

export default new OrdersService();