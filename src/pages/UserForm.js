import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserForm = () => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const roleRef = useRef(null);
  const navigate = useNavigate();

  const submittingForm = (event) => {
    event.preventDefault();

    // Проверяем, что первый символ логина и пароля не пробел
    if (loginRef.current.value[0] === ' ' || passwordRef.current.value[0] === ' ') {
      alert('Логин и пароль не должны начинаться с пробела');
      return;
    }

    const newUser = {
      login: loginRef.current.value,
      password: passwordRef.current.value,
      role: roleRef.current.value,
    };

    axios.post("http://localhost:5000/users", JSON.stringify(newUser), {
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        navigate('/'); 
      })
      .catch(error => console.error("Ошибка создания пользователя:", error));
  };

  return (
    <form onSubmit={submittingForm} style={{ textAlign: 'center', padding: '20px' }}>
      <label style={{ fontSize: '18px' }}>
        Логин:
        <input 
          type="text" 
          ref={loginRef} 
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
          required 
          style={{ fontSize: '16px', marginLeft: '10px' }} 
        />
      </label>
      <br />
      <label style={{ fontSize: '18px' }}>
        Роль:
        <select 
          ref={roleRef} 
          required 
          style={{ fontSize: '16px', marginLeft: '10px' }} 
        >
          <option value="Администратор">Администратор</option>
          <option value="Пользователь">Пользователь</option>
        </select>
      </label>
      <br />
      <button type="submit" style={{ fontSize: '16px', marginTop: '10px' }}>Добавить пользователя</button>
    </form>
  );  
};

export default UserForm;