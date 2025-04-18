import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const roleRef = useRef(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };

  const submittingForm = (event) => {
    event.preventDefault();
    const updatedUser = {
      login: loginRef.current.value,
      password: passwordRef.current.value,
      role: roleRef.current.value,
    };

    axios.put(`http://localhost:5000/users/${id}`, JSON.stringify(updatedUser), {
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        navigate('/users'); 
      })
      .catch(error => console.error("Ошибка обновления:", error));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Редактирование пользователя</h1>
      <form onSubmit={submittingForm}>
        <label style={{ fontSize: '18px' }}>
          Логин:
          <input 
            type="text" 
            ref={loginRef} 
            defaultValue={user.login} 
            required 
            style={{ fontSize: '16px', marginLeft: '10px' }} 
          />
        </label>
        <br />
        <label style={{ fontSize: '18px' }}>
          Пароль:
          <input 
            type="password" 
            ref={passwordRef} 
            defaultValue={user.password} 
            required 
            style={{ fontSize: '16px', marginLeft: '10px' }} 
          />
        </label>
        <br />
        <label style={{ fontSize: '18px' }}>
          Роль:
          <select 
            ref={roleRef} 
            defaultValue={user.role} 
            required 
            style={{ fontSize: '16px', marginLeft: '10px' }} 
          >
            <option value="Администратор">Администратор</option>
            <option value="Пользователь">Пользователь</option>
          </select>
        </label>
        <br />
        <button type="submit" style={{ fontSize: '16px', marginTop: '10px' }}>Сохранить</button>
      </form>
    </div>
  );  
};

export default UserDetail;
