import React, { useState, useEffect } from 'react';
import UsersService from '../services/UsersService';
import OrdersService from '../services/OrdersService';
import { useHistory, useParams } from 'react-router-dom';
function Delivery() {
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [user, setUser] = useState(null);
  const id1 = localStorage.getItem("UserId");
  const [deliveryDetails, setDeliveryDetails] = useState({
    deliveryAmount: localStorage.getItem('totalPrice') || '',
    phoneNumber: '',
    deliveryAddress: '',
    logionUser: localStorage.getItem('Userlogin') || '',
    id_Dishes: []
  });
  const history = useHistory();

  useEffect(() => {
    if (id1 > 0) {
      getUser();
    }
    const storedDishes = JSON.parse(localStorage.getItem('selectedDishes')) || [];
    setSelectedDishes(storedDishes);
    const dishIds = storedDishes.map((dish) => dish.id);
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      id_Dishes: dishIds
    }));
  }, []);

  const getUser = () => {
    UsersService.getUser(id1)
      .then((response) => {
        const userData = response.data;
        setUser(userData);
        if (userData) {
          setDeliveryDetails((prevDetails) => ({
            ...prevDetails,
            phoneNumber: userData.phone,
            deliveryAddress: userData.address
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeliveryAmountChange = (event) => {
    setDeliveryDetails({
      ...deliveryDetails,
      deliveryAmount: event.target.value
    });
  };

  const handlePhoneNumberChange = (event) => {
    setDeliveryDetails({
      ...deliveryDetails,
      phoneNumber: event.target.value
    });
  };

  const handleDeliveryAddressChange = (event) => {
    setDeliveryDetails({
      ...deliveryDetails,
      deliveryAddress: event.target.value
    });
  };

  const handleAcceptDelivery = () => {
    localStorage.removeItem('selectedDishes');
    localStorage.removeItem('totalPrice');
    const id1 = localStorage.getItem("UserId");
    if (id1 > 0) {
      createOrder();
    }
    history.push('/');
  };

  const createOrder = () => {
    const dishQuantities = selectedDishes.map((dish) => ({
      id: dish.id,
      quantity: dish.quantity
    }));
    const order = {
      price: deliveryDetails.deliveryAmount,
      date_orders: new Date().toLocaleString() + "",
      id_user: id1,
      id_Dishes: deliveryDetails.id_Dishes,
      dishQuantities: dishQuantities
    };
    OrdersService.createOrder(order)
      .then((response) => {
      })
      .catch((error) => {
        console.log('Error creating order:', error);
      });
  };

  const dishesByRestaurant = selectedDishes.reduce((acc, dish) => {
    const restaurantId = dish.id_restaurants.id;
    if (acc[restaurantId]) {
      acc[restaurantId].push(dish);
    } else {
      acc[restaurantId] = [dish];
    }
    return acc;
  }, {});

  const handleRemoveDish = (dishId) => {
    const updatedDishes = selectedDishes.filter((dish) => dish.id !== dishId);
    setSelectedDishes(updatedDishes);
    localStorage.setItem('selectedDishes', JSON.stringify(updatedDishes));
    const newDeliveryAmount = calculateNewDeliveryAmount(updatedDishes);
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      deliveryAmount: newDeliveryAmount
    }));
    localStorage.setItem('totalPrice', newDeliveryAmount);
  };

  const calculateNewDeliveryAmount = (dishes) => {
    const totalPrice = dishes.reduce((total, dish) => {
      return total + (dish.price * dish.quantity);
    }, 0);
    return totalPrice;
  };

  const handleIncrementQuantity = (dishId) => {
    const updatedDishes = selectedDishes.map((dish) => {
      if (dish.id === dishId) {
        return { ...dish, quantity: parseInt(dish.quantity) + 1 };
      }
      return dish;
    });
    setSelectedDishes(updatedDishes);
    localStorage.setItem('selectedDishes', JSON.stringify(updatedDishes));
    const newDeliveryAmount = calculateNewDeliveryAmount(updatedDishes);
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      deliveryAmount: parseInt(newDeliveryAmount)
    }));
    localStorage.setItem('totalPrice', parseInt(newDeliveryAmount));
  };
  
  const handleDecrementQuantity = (dishId) => {
    const updatedDishes = selectedDishes.map((dish) => {
      if (dish.id === dishId) {
        const updatedQuantity = parseInt(dish.quantity) - 1;
        if (updatedQuantity <= 0) {
          return null;
        }
        return { ...dish, quantity: updatedQuantity };
      }
      return dish;
    }).filter(Boolean);
    setSelectedDishes(updatedDishes);
    localStorage.setItem('selectedDishes', JSON.stringify(updatedDishes));
    const newDeliveryAmount = calculateNewDeliveryAmount(updatedDishes);
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      deliveryAmount: parseInt(newDeliveryAmount)
    }));
    localStorage.setItem('totalPrice', parseInt(newDeliveryAmount));
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-3">Оформление доставки</h1>
      {Object.entries(dishesByRestaurant).map(([restaurantId, dishes]) => (
        <div key={restaurantId} className="mb-4">
          <h3>{dishes[0].id_restaurants.name}</h3>
        <div className="d-flex flex-wrap justify-content-start">
          {dishes.map((dish) => (
          <div key={dish.id} className="card m-2">
          <div className="card-body">
        <h5 className="card-title">{dish.title}</h5>
          <p className="card-text">Цена: {dish.price}</p>
          <p className="card-text">Количество: {dish.quantity}</p>
          <div className="d-flex justify-content-center">
{/*           
          <img src={dish.image} alt={dish.title} className="card-img-top" style={{ width: '200px', height: 'auto' }} /> */}
          </div>
          <div className="d-flex justify-content-center">
            <button
            className="btn btn-primary mr-2"
            onClick={() => handleIncrementQuantity(dish.id)}
            >
            +
            </button>
            <button
            className="btn btn-primary"
            onClick={() => handleDecrementQuantity(dish.id)}
            >
            -
            </button>
          
          <button
          className="btn btn-danger"
          onClick={() => handleRemoveDish(dish.id)}
          >
          Удалить
          </button>
          </div>
          </div>
          </div>
          ))}
          </div>
          </div>
          ))}
          <div className="mt-4">
          <div className="form-group">
          <label htmlFor="deliveryAmount" >Сумма доставки:</label>
          <input
            disabled
             type="text"
             className="form-control"
             id="deliveryAmount"
             value={deliveryDetails.deliveryAmount}
             onChange={handleDeliveryAmountChange}
           />
    </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Номер телефона:</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            value={deliveryDetails.phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliveryAddress">Адрес доставки:</label>
          <input
            type="text"
            className="form-control"
            id="deliveryAddress"
            value={deliveryDetails.deliveryAddress}
            onChange={handleDeliveryAddressChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAcceptDelivery}>
          Принять
        </button>
      </div>
    </div>
  );
}

export default Delivery;