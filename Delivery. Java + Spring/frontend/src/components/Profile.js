import React, { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import UsersService from '../services/UsersService';
import OrdersService from '../services/OrdersService';
import ReviewsService from '../services/ReviewsService';
function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [ratedOrders, setRatedOrders] = useState([]);


  const isEmailValid = (email) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const isNameValid = (name) => /^[а-яА-ЯёЁ]+$/.test(name);
  const isPhoneValid = (phone) => /^\d+$/.test(phone);
  const isRatingValid = (rating) => /^[1-5]$/.test(rating);

  const id1 = localStorage.getItem('UserId');

  useEffect(() => {
    getUser();
    getOrders();
  }, []);

  const getUser = () => {
    UsersService.getUser(id1)
      .then((response) => {
        const userData = response.data;
        setUser(userData);
        setName(userData.name);
        setAddress(userData.address);
        setPhone(userData.phone);
        setEmail(userData.email);
        setPassword(userData.password);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getOrders = () => {
    OrdersService.getUserOrders(id1)
      .then((response) => {
        const ordersData = response.data.map(order => ({ ...order, rated: ratedOrders.includes(order.id) }));
        setOrders(ordersData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUpdateProfile = () => {
    if (!password || !address || !email || !name || !phone) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    if (!email || !isEmailValid(email)) {
      alert('Пожалуйста, введите корректную почту');
      return;
    }

    if (!name || !isNameValid(name)) {
      alert('Пожалуйста, введите корректное имя');
      return;
    }

    if (!phone || !isPhoneValid(phone)) {
      alert('Пожалуйста, введите корректный номер телефона');
      return;
    }
    const updatedUser = {
      ...user,
      name: name,
      address: address,
      phone: phone,
      email: email,
      password: password,
    };

    UsersService.updateUser(updatedUser)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRateOrder = (orderId,userId,dish, rating) => {
    if (!isRatingValid(rating)) {
      alert('Пожалуйста, введите рейтинг от 1 до 5');
      return;
    }
    ReviewsService.checkRateByUserAndOrder(orderId,userId,dish.id_restaurants.id, rating).then((response)=>{

      if (response.data!=""){
        document.getElementById('rate').value = "";
        document.getElementById('rate').removeAttribute("onChange");
        
       alert("Оценка уже была выставлена !!!");
      }
      else{
        ReviewsService.rateOrder(orderId,userId,dish.id_restaurants.id, rating)
        .then((response) => {
          alert("Спасибо за отзыв, ваша оценка очень важна для нас")
         // const restaurantId = response.data.id_restaurants.id;
        })
        .catch((error) => {
          console.log(error);
        });

      }


    }).catch((error)=>{console.log(error)})
    
  }

  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-3">Пользователь</h1>
      {user && (
        <Card key={user.id} className="mb-3 shadow menu-card">
          <Card.Body>
            <ListGroup>
              <ListGroupItem>
                <strong>Имя: </strong>
                <input type="text" value={name} onChange={handleNameChange} />
              </ListGroupItem>
              <ListGroupItem>
                <strong>Почта: </strong>
                <input type="email" value={email} onChange={handleEmailChange} />
              </ListGroupItem>
              <ListGroupItem>
                <strong>Адрес: </strong>
                <input type="text" value={address} onChange={handleAddressChange} />
              </ListGroupItem>
              <ListGroupItem>
                <strong>Телефон: </strong>
                <input type="text" value={phone} onChange={handlePhoneChange} />
              </ListGroupItem>
              <ListGroupItem>
                <strong>Пароль: </strong>
                <input type="text" value={password} onChange={handlePasswordChange} />
              </ListGroupItem>
              
            </ListGroup>
            <button className="btn btn-primary" onClick={handleUpdateProfile}>
              Изменить профиль
            </button>
          </Card.Body>
        </Card>
      )}
      <h2>Заказы</h2>
      <div className="horizontal-scroll">
        {orders.map((order) => (
          <Card key={order.id} className="mb-3 shadow menu-card">
            <Card.Body>
              <ListGroup>
                <ListGroupItem>
                  <strong>Ресторан: </strong> {order.id_Dishes[0].id_restaurants.name}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Дата заказа: </strong> {order.date_orders}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Цена: </strong> {order.price}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Блюда:</strong>
                  <ul>
                    {order.id_Dishes.map((dish) => (
                      <li key={dish.id}>{dish.title}</li>
                    ))}
                    
                  </ul>
                </ListGroupItem>
                <ListGroupItem>
                <div>
                <strong>Оценка: </strong>
                  <input id='rate'
                    type="number"
                    min="1"
                    max="5"
                    value={order.rating}
                    onChange={(e) => handleRateOrder(order.id ,id1, order.id_Dishes[0], e.target.value)}
                  />
              </div>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Profile;
