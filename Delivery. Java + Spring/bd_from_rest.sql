-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 18 2023 г., 07:03
-- Версия сервера: 10.4.11-MariaDB
-- Версия PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `bd_from_rest`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `id_dish` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `title`) VALUES
(1, 'Салаты');

-- --------------------------------------------------------

--
-- Структура таблицы `dishes`
--

CREATE TABLE `dishes` (
  `id` int(11) NOT NULL,
  `title` varchar(65) NOT NULL,
  `description` varchar(350) NOT NULL,
  `price` int(11) NOT NULL,
  `id_category` int(11) DEFAULT NULL,
  `id_restaurants` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `dishes`
--

INSERT INTO `dishes` (`id`, `title`, `description`, `price`, `id_category`, `id_restaurants`) VALUES
(1, 'Крабовый', '50', 10, 1, 1),
(3, 'Оливье', 'Салат1', 2, 1, 1),
(4, 'Какой-то еще', '123', 222, 1, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `date_orders` date NOT NULL,
  `id_order_items` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `id_dish` int(11) DEFAULT NULL,
  `id_order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `name` varchar(65) NOT NULL,
  `cuisine` varchar(50) NOT NULL,
  `opening_hours` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `cuisine`, `opening_hours`, `phone`, `address`) VALUES
(1, 'ДжастаПаста', 'Итальянская кухня', '12:00-24:00', '79254477317', 'ул. Солянка 2/6 стр.1, Москва'),
(2, 'Любовь Пирогова', 'Русская кухня', '10:00-21:00', '74951200097', 'Москва, Варшавское шоссе, 28А'),
(3, 'АндерСон', 'Русская кухня', '09:00-21:00', '79451069680', 'Москва, Жулебинский бульвар, д. 5 (ТЦ «Динамит»)'),
(4, 'Zafferano - Aviapark', 'Японская и Итальянская кухни', '10:00-22:00', '49452361011', 'Москва, МКАД 66 км, этаж 4');

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `description` varchar(250) NOT NULL,
  `id_restaurants` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `descriprion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `password` varchar(65) NOT NULL,
  `address` varchar(65) NOT NULL,
  `email` varchar(65) NOT NULL,
  `name` varchar(65) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `bonus_money` int(11) DEFAULT NULL,
  `login` varchar(65) NOT NULL,
  `roles` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `password`, `address`, `email`, `name`, `phone`, `bonus_money`, `login`, `roles`) VALUES
(1, 'first_password', 'first_address', 'first_email@yandex.ru', 'first_name', '0', 0, 'first_login', 'USER'),
(7, '1234', '1234', '123@ya.ru1', '1232', '1234', 0, '123', 'ADMIN');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_dish` (`id_dish`),
  ADD KEY `id_user` (`id_user`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `dishes`
--
ALTER TABLE `dishes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`id_category`),
  ADD KEY `id_restaurants` (`id_restaurants`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_order_items` (`id_order_items`),
  ADD KEY `id_user` (`id_user`);

--
-- Индексы таблицы `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_dish` (`id_dish`),
  ADD KEY `id_order` (`id_order`);

--
-- Индексы таблицы `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_restaurants` (`id_restaurants`),
  ADD KEY `id_user` (`id_user`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `dishes`
--
ALTER TABLE `dishes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`id_dish`) REFERENCES `dishes` (`id`),
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `dishes`
--
ALTER TABLE `dishes`
  ADD CONSTRAINT `dishes_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `dishes_ibfk_2` FOREIGN KEY (`id_restaurants`) REFERENCES `restaurants` (`id`);

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FKlt6imiaaf9u67mf9aqfbs48od` FOREIGN KEY (`id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_order_items`) REFERENCES `order_items` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `FKnwi6srbdi6xxyctmkqhwtfvo9` FOREIGN KEY (`id`) REFERENCES `dishes` (`id`),
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`id_dish`) REFERENCES `dishes` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id`);

--
-- Ограничения внешнего ключа таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `FKnjs022t7evdxk6kl4uqvu84rc` FOREIGN KEY (`id`) REFERENCES `restaurants` (`id`),
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`id_restaurants`) REFERENCES `restaurants` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
