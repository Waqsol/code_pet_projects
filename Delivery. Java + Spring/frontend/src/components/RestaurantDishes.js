import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DishesService from '../services/DishesService';
import UsersService from '../services/UsersService';
import '../cssfiles/dish.css'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const RestaurantDishes = () => {
  const [dishes, setDishes] = useState([]);
  const { id } = useParams();
  const id1 = localStorage.getItem('UserId');
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shouldSaveData, setShouldSaveData] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAllDishes(id);
    if (id1 > 0) {
    getUser();}
    const storedSelectedDishes = JSON.parse(localStorage.getItem('selectedDishes'));
    const storedTotalPrice = localStorage.getItem('totalPrice');

    if (storedSelectedDishes && storedTotalPrice) {
      setSelectedDishes(storedSelectedDishes);
      setTotalPrice(Number(storedTotalPrice));
    }
  }, [id]);

  useEffect(() => {
    if (shouldSaveData) {
      localStorage.setItem('selectedDishes', JSON.stringify(selectedDishes));
      localStorage.setItem('totalPrice', totalPrice);
      setShouldSaveData(false);
    }
  }, [selectedDishes, totalPrice, shouldSaveData]);

  const getAllDishes = (id) => {
    DishesService.getAllDishes(id)
      .then((response) => {
        setDishes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteDishes = (DishesId) => {
    DishesService.deleteDishes(DishesId)
      .then((response) => {
        getAllDishes(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = () => {
    UsersService.getUser(id1)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function getDishesWord(count) {
    const cases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const titles = ['блюд', 'блюдо', 'блюда', 'блюда', 'блюда', 'блюд', 'блюд', 'блюд', 'блюд', 'блюд'];
    const index = count % 100 > 4 && count % 100 < 20 ? 0 : cases[count % 10] < 5 ? cases[count % 10] : 0;
    return titles[index];
  }

  const handleAddToCart = (dishId) => {
    const selectedDish = dishes.find((dish) => dish.id === dishId);
    if (selectedDish) {
      const existingDish = selectedDishes.find((dish) => dish.id === dishId);
      if (existingDish) {
        // Increment the quantity of the existing dish
        const updatedSelectedDishes = selectedDishes.map((dish) =>
          dish.id === dishId ? { ...dish, quantity: dish.quantity + 1 } : dish
        );
        setSelectedDishes(updatedSelectedDishes);
      } else {
        // Add the dish with quantity 1
        const updatedSelectedDishes = [...selectedDishes, { ...selectedDish, quantity: 1 }];
        setSelectedDishes(updatedSelectedDishes);
      }
      setTotalPrice((prevTotal) => prevTotal + Number(selectedDish.price));
      setShouldSaveData(true);
    }
  };

  const handleClearCart = () => {
    setSelectedDishes([]);
    setTotalPrice(0);
    localStorage.removeItem('selectedDishes');
    localStorage.removeItem('totalPrice');
  };

  const onSearch = () => {
    const input = document.querySelector('#search').value.toUpperCase();
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach((card) => {
      const title = card.querySelector('.card-title').textContent.toUpperCase();
      title.includes(input) ? (card.style.display = '') : (card.style.display = 'none');
    });
  };

  const isAdmin = user && user.roles === 'ADMIN';

  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-3">Список блюд</h1>
      <input type="text" id="search" className="form-control" onChange={onSearch} placeholder="Поиск" />
      <br></br>
      {isAdmin && (
        <Link to="/add-dishes" className="btn btn-primary mb-2">
          Добавить блюдо
        </Link>
      )}
      <div className="d-flex justify-content-between mb-2">
        <div>
          <strong>
            Вы выбрали {selectedDishes.length} {getDishesWord(selectedDishes.length)} на сумму {totalPrice} рублей. Оформите заказ на вкладке
          </strong>
        </div>
        <div>
          <button className="btn btn-danger" onClick={handleClearCart}>
            Очистить корзину
          </button>
          <button className="btn btn-primary ml-2" onClick={() => {window.location.href = "/delivery"}}>
            Перейти к доставке
          </button>
        </div>
      </div>
      {dishes.map((dish) => (
        <Card key={dish.id} className="mb-3 shadow menu-card">
          <Card.Header>
            <Card.Title>
              <strong>{dish.title}</strong>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              <ListGroupItem>
                <strong>Описание: </strong>
                {dish.description}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Цена: </strong>
                {dish.price}
              </ListGroupItem>
                    {dish.image && (
                      <ListGroupItem>
                        <img src={dish.image} alt="Dish" className="dish-image" />
                      </ListGroupItem>
                    )}
              <ListGroupItem>
                <strong>Действия: </strong>
                {isAdmin ? (
                  <>
                    <Link className="btn btn-info" to={`/edit-Dishes/${dish.id}`}>
                      Обновить
                    </Link>
                    <button className="btn btn-danger" onClick={() => deleteDishes(dish.id)} style={{ marginLeft: "10px" }}>
                      Удалить
                    </button>
                  </>
                ) : (
                  <div style={{ marginLeft: "10px" }}>
                  </div>
                )}
                <button className="btn btn-primary" onClick={() => handleAddToCart(dish.id)} style={{ marginLeft: "10px" }}>
                    Добавить в корзину
                  </button>
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default RestaurantDishes;
