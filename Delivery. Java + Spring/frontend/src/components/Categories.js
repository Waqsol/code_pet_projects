import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoriesService from '../services/CategoriesService';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import UsersService from '../services/UsersService';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const id1 = localStorage.getItem('UserId');

  useEffect(() => {
    AllCategories();
    if (id1 > 0) {
      getUser();
    }
  }, []);

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

const AllCategories = () =>{
	CategoriesService.AllCategories().then((response)=>{
        setCategories(response.data)

    }).catch(error=>{
      console.log(error);
    })
}


const deleteCategories=(categoriesId)=>{
	CategoriesService.deleteCategories(categoriesId).then((response)=>{
		AllCategories();
		
		
	}).catch(error=>{console.log(error);})
}

const isAdmin = user && user.roles === 'ADMIN'; // Проверка роли пользователя
  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-3">Список категорий</h1>
      {isAdmin && <Link to="/add-categories" className='btn btn-primary mb-2' >Добавить категорию</Link>}
      {categories.map((categories) => (
        <Card key={categories.id} className="mb-3 shadow">
          <Card.Header>
            <Card.Title>
            <div>{categories.title}</div>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              <ListGroupItem>
                <strong>Действия: </strong>
                {isAdmin ? (
                    <>
                      <Link className="btn btn-info" to={`/edit-categories/${categories.id}`}>
                        Изменить
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteCategories(categories.id)}
                        style={{ marginLeft: '10px' }}
                      >
                        Удалить
                      </button>
                    </>
                  ) : (
                    <div>Нет доступа</div>
)}
              </ListGroupItem>

                
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Categories;