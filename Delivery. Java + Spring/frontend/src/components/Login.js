import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UsersService from '../services/UsersService';
import { useHistory,useParams } from 'react-router-dom';
import '../cssfiles/login.css'

function Login({ updateHeader}) {
  const [Login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const history=useHistory();

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const user = {
      login: Login,
      password: password
    };
  
    UsersService.checkUser(user)
      .then((response) => {
        if(response.data!=0){
          updateHeader(true);
          localStorage.setItem("UserId",response.data);
          history.push('/')
          window.location.reload();
        }else{console.log("error input login + password");}
      })
      .catch((error) => {
        console.log(error);
      });
  
    // Выполните необходимые действия для входа пользователя,
    // например, отправку данных на сервер для проверки аутентификации
  
    // Очистка полей после отправки
    setLogin('');
    setPassword('');
  };

  return (
    <div className="login-form">
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="login">Логин:</label>
          <input
            type="text"
            id="login"
            value={Login}
            onChange={handleLoginChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Войти</button>
      </form>
      <p>У вас нет аккаунта? <Link to="/registration">Зарегистрироваться</Link></p>
    </div>
  );
}

export default Login;