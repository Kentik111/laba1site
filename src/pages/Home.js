import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const contentUsers = await axios.get("http://localhost:5000/users"); 
      const contentProducts = await axios.get("http://localhost:5000/products"); 
      setUsers(contentUsers.data);
      setProducts(contentProducts.data);
      
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => console.error("Ошибка удаления:", error));
  };

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => console.error("Ошибка удаления:", error));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Информация о пользователях и продуктах</h1>
      
      <h2>Пользователи</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}style={{ margin: '10px 0' }}>
            <Link to={`/user/${user.id}`} style={{ fontSize: '18px', marginRight: '10px' }}>{user.login}</Link>
            <button onClick={() => deleteUser(user.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <Link to="/add-user" style={{ fontSize: '18px', marginRight: '10px' }}>Добавить пользователя</Link>

      <h2>Продукты</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}style={{ margin: '10px 0' }}>
            <Link to={`/product/${product.id}`} style={{ fontSize: '18px', marginRight: '10px' }}>{product.name}</Link>
            <button onClick={() => deleteProduct(product.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <Link to="/add-product" style={{ fontSize: '18px', marginRight: '10px' }}>Добавить продукт</Link>
    </div>
  );
};

export default Home;



