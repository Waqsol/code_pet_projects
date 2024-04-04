import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import Restaurants from './components/Restaurants';
import AddRestaurants from './components/AddRestaurants';
import RestaurantDishes from './components/RestaurantDishes';
import AddDish from './components/AddDish';
import Categories from './components/Categories';
import AddCategories from './components/AddCategories';
import Delivery from './components/Delivery';
import Login from './components/Login';
import Registration from './components/Registration';
import Profile from './components/Profile';
import ErrorPage from './components/ErrorPage';
import { AuthProvider } from './components/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const updateHeader = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  };

  return (
    <AuthProvider>
    <div>
      <Router>
      <HeaderComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Restaurants} />
            <Route path="/Restaurants" component={Restaurants} />
            <Route path="/add-restaurant" component={AddRestaurants} />
            <Route path="/edit-restaurant/:id" component={AddRestaurants} />
            <Route path="/dishes/:id" component={RestaurantDishes} />
            <Route path="/add-dishes" component={AddDish} />
            <Route path="/edit-Dishes/:id" component={AddDish} />
            <Route path="/Categories" component={Categories} />
            <Route path="/add-categories" component={AddCategories} />
            <Route path="/edit-categories/:id" component={AddCategories} />
            <Route path="/delivery" component={Delivery} />
            <Route path="/login">
              <Login updateHeader={updateHeader} />
            </Route>
            <Route path="/registration" component={Registration} />
            <Route path="/profile/:id">
              <Profile onLogout={handleLogout} />
            </Route>
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    </div>
    </AuthProvider>
  );
}

export default App;