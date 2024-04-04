import React, { useState } from 'react';
import UsersService from '../services/UsersService';
import { useHistory,useParams } from 'react-router-dom';

function Registration() {
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [login, setLogin] = useState('');
  const [roles, setRoles] = useState('USER');
  const [bonusMoney, setBonusMoney] = useState(0);
  const history=useHistory();
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const isEmailValid = (email) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const isNameValid = (name) => /^[а-яА-ЯёЁ]+$/.test(name);
  const isPhoneValid = (phone) => /^\d+$/.test(phone);



  const handleRegistration = (event) => {
    event.preventDefault();
    setAddress('');
    setEmail('');
    setName('');
    setPhone('');
    setBonusMoney(1);
  };



  const addUser=(e)=>{
    e.preventDefault();
    if (!password || !address || !email || !name || !phone || !login) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    if (!email || !isEmailValid(email)) {
      alert('Пожалуйста, введите корректнуюю почту');
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
    const User ={password,address,email,name,phone,bonusMoney,login,roles}
        UsersService.addUser(User).then((responce)=>{
        history.push('/login')
    }).catch(error=>{
        console.log(error)
    })
    }



  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegistration}>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label htmlFor="login">Логин:</label>
          <input
            type="login"
            id="login"
            value={login}
            onChange={handleLoginChange}
          />
        </div>
        <div>
          <label htmlFor="address">Адрес:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div>
          <label htmlFor="email">Почта:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Телефон:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
        <button className='btn btn-success' onClick={(e)=> addUser(e)}>Регистрация</button>
      </form>
    </div>
  );
}

export default Registration;