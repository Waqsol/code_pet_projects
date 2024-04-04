import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../cssfiles/clock.css'
function HeaderComponent() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const id1 = localStorage.getItem('UserId');
  const history=useHistory();
  const handleLogout = () => {
    localStorage.removeItem('UserId');
    history.push('/login')
    window.location.reload();
  };
  
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#000',
    transition: 'color 0.3s, opacity 0.3s',
  };

  const getRandomColor = () => {
    const colors = ['#FA8072','#E9967A','#FFC0CB','#FFDAB9','#D8BFD8','#00FFFF','#EE82EE','#F0E68C','#9370DB','#6A5ACD','#BC8F8F','#87CEFA','#B0C4DE','#7FFFD4','#AFEEEE'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const handleMouseEnter = (event) => {
    event.target.style.color = getRandomColor();
    event.target.style.opacity = 1;
  };

  const handleMouseLeave = (event) => {
    event.target.style.color = linkStyle.color;
    event.target.style.opacity = 0.8;
  };

  setInterval(function(){
    var time=new Date()
   var  h=time.getHours()
   var m=time.getMinutes()
   var s=time.getSeconds()
    h=(h<10)?"0"+h:h;
    m=(m<10)?"0"+m:m;
    s=(s<10)?"0"+s:s;
    document.getElementById("hour").innerHTML = h+":";
    document.getElementById("minutes").innerHTML = m+":";
    document.getElementById("seconds").innerHTML = s;
  },1000)

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Выбор ресторана</Link>
        <button className="navbar-toggler" type="button" onClick={toggleNav}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/dishes/1"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>Главная</Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/categories"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>Категории блюд</Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/delivery"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>Доставка</Link>
            </li>
            {id1 ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/profile/${userId}" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  Личный кабинет
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleLogout}>
                  Выйти
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                Вход в систему
              </Link>
            </li>
          )}
            </ul>
            <div className="clock" id="clock">
            <div id="hour">00</div>
            <div id="minutes">00</div>
            <div id="seconds">00</div>
          </div>
            </div>
            </nav>
            </header>
            );
            }

export default HeaderComponent;