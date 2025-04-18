import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductForm = () => {
  const nameRef = useRef(null);
  const statusRef = useRef(null);
  const navigate = useNavigate();

  const submittingForm = (event) => {
    event.preventDefault();

    // Проверяем, что первый символ имени не пробел
    if (nameRef.current.value[0] === ' ') {
      alert('Имя продукта не должно начинаться с пробела');
      return;
    }

    // Определяем info на основе статуса
    const info = statusRef.current.value === "Проверено" 
      ? "Подходит к продаже" 
      : "Не подходит к продаже";

    const newProduct = {
      name: nameRef.current.value,
      status: statusRef.current.value,
      info: info,
    };

    axios.post("http://localhost:5000/products", JSON.stringify(newProduct), {
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error("Ошибка создания продукта:", error));
  };

  return (
    <form onSubmit={submittingForm} style={{ textAlign: 'center', padding: '20px' }}>
      <label style={{ fontSize: '18px' }}>
        Название продукта:
        <input 
          type="text" 
          ref={nameRef} 
          required 
          style={{ fontSize: '16px', marginLeft: '10px' }} 
        />
      </label>
      <br />
      <label style={{ fontSize: '18px' }}>
        Статус:
        <select 
          ref={statusRef} 
          required 
          style={{ fontSize: '16px', marginLeft: '10px' }} 
        >
          <option value="Проверено">Проверено</option>
          <option value="Не проверено">Не проверено</option>
        </select>
      </label>
      <br />
      <button type="submit" style={{ fontSize: '16px', marginTop: '10px' }}>Добавить продукт</button>
    </form>
  );  
};

export default ProductForm;

