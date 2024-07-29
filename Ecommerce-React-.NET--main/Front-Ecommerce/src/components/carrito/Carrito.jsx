import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../services/cart/CartContext';
import './Carrito.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from "prop-types";
import lapiz from '/public/lapiz.png';
import cruz from '/public/cruz2.png';
import check from '/public/check3.png';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';

const Carrito = ({ setCartProducts }) => {
  const [showPayMethod, setShowPayMethod] = useState(false);
  const { handleProduct, handleAddCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    setProducts(handleProduct());
  }, [handleProduct]);

  const handleUpdateProduct = (index) => {
    setEditableIndex(index);
    setNewQuantity(products[index].quantity);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
    setCartProducts(newProducts);

  };

  const handleSaveProduct = (index) => {
    const updatedProducts = [...products];
    if (newQuantity > 0) {
      updatedProducts[index].quantity = newQuantity;
      setProducts(updatedProducts);
      setCartProducts(updatedProducts);
      setEditableIndex(null);
    } else {
      alert("La cantidad no puede ser menor a uno")
    }

  };

  const handlePay = () => {
    if (products.length === 0) {
      alert("Debe agregar productos al carrito");
    } else {
      !user ? alert("Debe loguearse primero") :
        navigate('/paymethod');
    }
  };

  const handleBack = () => {
    setShowPayMethod(false);
  };

  return (
    <div className='box'>
      <div className='top'>
        {products.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <Container className='container-cart'>
            <Form className='form-cart'>
              {products.map((product, index) => (
                <Row key={index} className='d-flex justify-content-between align-items-center product'>
                  <Col><span>{product.name}</span></Col>
                  <Col><span>${product.price.toFixed(2)}</span></Col>
                  <Col>
                    {editableIndex === index ? (
                      <Form.Control
                        type="number"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                        className='quantity-update-input'
                      />
                    ) : (
                      <Form.Control type="text" value={product.quantity} readOnly />
                    )}
                  </Col>
                  <Col>
                    {editableIndex === index ? (
                      <Button className='check-cart' size='sm' onClick={() => handleSaveProduct(index)}>
                        <img className="icono-grilla" src={check} alt="delete" />
                      </Button>
                    ) : (
                      <Button className='update-cart' size='sm' onClick={() => handleUpdateProduct(index)}>
                        <img className="icono-grilla" src={lapiz} alt="update" />
                      </Button>
                    )}
                  </Col>
                  <Col>
                    <Button variant='danger' size='sm' onClick={() => handleRemoveProduct(index)}>
                      <img className="icono-grilla" src={cruz} alt="delete" />
                    </Button>
                  </Col>
                </Row>
              ))}
            </Form>
          </Container>
        )}
      </div>
      <div className='bot'>
        <Button variant='success' onClick={handlePay} className='w-100 mt-2 botonPagar'>Pagar</Button>
      </div>
    </div>
  );
};

Carrito.propTypes = {
  setCartProducts: PropTypes.func
};

export default Carrito;
