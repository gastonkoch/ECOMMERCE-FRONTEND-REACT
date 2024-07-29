import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import "./ProductDetail.css";
import { CartContext } from '../../services/cart/CartContext';
import UpdateProducts from '../updateProducts/UpdateProducts';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';

export const ProductsAddedContext = createContext({});

const ProductDetail = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [productOnScreen, setProductOnScreen] = useState({});
  const { handleAddCart } = useContext(CartContext);
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://localhost:7197/api/Product/id/${id}`, { // Asegúrate de usar backticks aquí
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }
        return response.json();
      })
      .then((productsData) => {
        let productFromAPI = {
          brand: productsData.brand,
          category: productsData.category,
          description: productsData.description,
          id: productsData.id,
          image: productsData.image,
          name: productsData.name,
          price: productsData.price,
          stock: productsData.stock,
          avaible: productsData.avaible,
          quantity: 1
        }
        setProductOnScreen(productFromAPI)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);


  const onHandleAdd = () => {
    setProductOnScreen((prevProduct) => ({
      ...prevProduct,
      quantity: prevProduct.quantity + 1
    }));
  };

  const handleAddCarrito = () => {
    !user ? alert("Debe loguearse primero") :
      handleAddCart(productOnScreen.quantity, productOnScreen);
    setProductOnScreen((prevProduct) => ({
      ...prevProduct,
      quantity: 1
    }));
  };

  const onHandleDelete = () => {
    setProductOnScreen((prevProduct) => ({
      ...prevProduct,
      quantity: prevProduct.quantity - 1
    }));
  };

  const handleBaja = () => {
    fetch(`https://localhost:7197/api/Product/baja/${id}`, {
      method: "PUT",
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar el producto");
        }
        setProductOnScreen(prevState => ({
          ...prevState,
          avaible: false
        }));
      })
      .catch((error) => {
        navigate("/*")
        console.error("Error:", error);
      });
  };

  const handleAlta = () => {
    fetch(`https://localhost:7197/api/Product/alta/${id}`, {
      method: "PUT",
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar el producto");
        }
        setProductOnScreen(prevState => ({
          ...prevState,
          avaible: true
        }));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  if (error) {
    return <div>Producto no encontrado</div>;
  }

  const onHandleUpdate = () => {
    navigate(`/updateproduct/${productOnScreen.id}`);
  }

  const handleReturn = () => {
    navigate("/productos")
  }

  return (
    <div className='box-product-detail'>
      <Container className="main-container">
        <Container className='img-main-product-detail'>
          <Row>
            <Col className='box-image-product-detail'>
              <Image className='image img-fluid' src={productOnScreen.image} rounded />
            </Col>
          </Row>
        </Container>

        <Container className='data'>
          <Form>
            <Form.Group className="mb-3" controlId="nameId">
              <Form.Label><b>{productOnScreen.name}</b></Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="priceId">
              <Form.Label><strong>Precio:</strong> ${productOnScreen.price}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="descriptionId">
              <Form.Label><strong>Descripcion: </strong>{productOnScreen.description}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="stockId">
              <Form.Label><strong>Stock: </strong> {productOnScreen.stock} unidades</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="categoryId">
              <Form.Label><strong>Categoría: </strong> {productOnScreen.category}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="brandId">
              <Form.Label><strong>Marca: </strong> {productOnScreen.brand}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="disponibleId">
              <Form.Label><strong>Disponible: </strong> {productOnScreen.avaible ? "Disponible" : "No disponible"}</Form.Label>
            </Form.Group>
          </Form>

          <Container className='buttonsBox'>
            <Container className='data'>
              <Button className='button button-add' onClick={onHandleAdd}>+</Button>
              <Button className='button button-add' variant="primary" onClick={handleAddCarrito}>Agregar al Carrito {productOnScreen.quantity}</Button>
              <Button className='button button-add' onClick={onHandleDelete}>-</Button>
              <Button className='button button-return' onClick={handleReturn}>Volver</Button>
            </Container>
            {user && user.userType !== 0 &&
              <Container className='button-for-seller'>
                {user && user.userType !== 0 &&
                  <Container>
                    <Button className='button button-for-seller-action' variant="warning" onClick={onHandleUpdate}>Editar</Button>
                    {productOnScreen.avaible
                      ? <Button className='button button-for-seller-action' variant="danger" onClick={handleBaja}>Dar de baja</Button>
                      : <Button className='button button-for-seller-action' variant="success" onClick={handleAlta}>Dar de alta</Button>}
                  </Container>}
              </Container>}
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default ProductDetail;
