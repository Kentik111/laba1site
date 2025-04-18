import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const nameRef = useRef(null);
  const statusRef = useRef(null);
  const [info, setInfo] = useState('');

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(response.data);
      setInfo(response.data.info); // Устанавливаем начальное значение info
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setInfo(selectedStatus === "Проверено" ? "Подходит к продаже" : "Не подходит к продаже");
  };

  const submittingForm = (event) => {
    event.preventDefault();
    const updatedProduct = {
      name: nameRef.current.value,
      status: statusRef.current.value,
      info: info,
    };

    axios.put(`http://localhost:5000/products/${id}`, JSON.stringify(updatedProduct), {
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        navigate('/products'); 
      })
      .catch(error => console.error("Ошибка обновления:", error));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Редактирование продукта</h1>
      <form onSubmit={submittingForm}>
        <label style={{ fontSize: '18px' }}>
          Название:
          <input 
            type="text" 
            ref={nameRef} 
            defaultValue={product.name} 
            required 
            style={{ fontSize: '16px', marginLeft: '10px' }} 
          />
        </label>
        <br />
        <label style={{ fontSize: '18px' }}>
          Статус:
          <select 
            ref={statusRef} 
            defaultValue={product.status} 
            onChange={handleStatusChange} 
            required 
            style={{ fontSize: '16px', marginLeft: '10px' }} 
          >
            <option value="Проверено">Проверено</option>
            <option value="Не проверено">Не проверено</option>
          </select>
        </label>
        <br />
        <label style={{ fontSize: '18px' }}>
          Информация:
          <input 
            type="text" 
            value={info} 
            readOnly 
            style={{ fontSize: '16px', marginLeft: '10px' }} 
          />
        </label>
        <br />
        <button type="submit" style={{ fontSize: '16px', marginTop: '10px' }}>Сохранить</button>
      </form>
    </div>
  );  
};

export default ProductDetail;
