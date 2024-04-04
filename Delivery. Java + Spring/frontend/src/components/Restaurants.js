import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import RestaurantsService from '../services/RestaurantsService';
import UsersService from '../services/UsersService';
import ReviewsService from '../services/ReviewsService';
import '../cssfiles/restaurant.css'
function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [user, setUser] = useState(null);
  const id1 = localStorage.getItem('UserId');
  const [ratings, setRatings] = useState({});
  const [showRating, setShowRating] = useState(false);

  useEffect(() => {                            
    if (id1 > 0) {
      getUser();
    }
    getAllRestaurants();
    getRestaurantRating();
  }, []);

  const getAllRestaurants = () => {
    RestaurantsService.getAllRestaurants()
      .then((response) => {
        setRestaurants(response.data);
        response.data.forEach((restaurant) => {
         getRestaurantRating(restaurant.id);

        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRestaurantRating = () => {
    RestaurantsService.getAllRestaurants()
      .then((response) => {
        const updatedRatings = { ...ratings };
        response.data.forEach((restaurant) => {
          ReviewsService.getRestaurantRating(restaurant.id)
            .then((response) => {
              const ratingData = response.data;
              updatedRatings[restaurant.id] = ratingData;
              setRatings(updatedRatings);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleShowRating = () => {
    setShowRating(!showRating);
  };

  const getUser = () => {
    UsersService.getUser(id1)
      .then((response) => {
        const userData = response.data;
        setUser(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const deleteRestaurant = (restaurantId) => {
    RestaurantsService.deleteRestaurant(restaurantId)
      .then((response) => {
        getAllRestaurants();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (restaurantId) => {
    localStorage.setItem('restaurantId', restaurantId);
  };

  const onSearch = () => {
    const input = document.querySelector('#search').value.toUpperCase();
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach((card) => {
      const title = card.querySelector('.card-title').textContent.toUpperCase();
      title.includes(input) ? (card.style.display = '') : (card.style.display = 'none');
    });
  };

  const isAdmin = user && user.roles === 'ADMIN'; // Проверка роли пользователя

 

  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-3">Список ресторанов</h1>
      <input type="text" id="search" className="form-control" onChange={onSearch} placeholder="Поиск" />
      <br></br>
      {isAdmin && <Link to="/add-restaurant" className="btn btn-primary mb-2">Добавить ресторан</Link>}
      {restaurants.map((restaurant) => (
        <Card key={restaurant.id} className="mb-3 shadow menu-card">
          <Card.Header>
            <Card.Title>
              <Link to={`/dishes/${restaurant.id}`} onClick={() => handleClick(restaurant.id)}>{restaurant.name}</Link>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              <ListGroupItem>
                <strong>Кухня: </strong>
                {restaurant.cuisine}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Время работы: </strong>
                {restaurant.opening_hours}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Адрес: </strong>
                {restaurant.address}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Телефон: </strong>
                {restaurant.phone}
              </ListGroupItem>
              <ListGroupItem>
              <strong>Рейтинг: </strong>
                {ratings[restaurant.id] !== "" ? (
                  <input type="text" value={ratings[restaurant.id]} readOnly disabled />
                ) : (
                  <span>Нет рейтинга</span>
                )}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Действия: </strong>
                {isAdmin ? (
                          <>
                            <Link className="btn btn-info" to={`/edit-restaurant/${restaurant.id}`}>
                              Обновить
                            </Link>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteRestaurant(restaurant.id)}
                              style={{ marginLeft: '10px' }}
                            >
                              Удалить
                            </button>
                          </>
                        ) : (
                          <div>нет доступа</div>
                        )}
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Restaurants;