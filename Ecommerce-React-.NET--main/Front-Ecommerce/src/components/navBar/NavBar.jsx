import { Container, Nav, Navbar, Button, Dropdown } from 'react-bootstrap';
import { useContext, useState } from "react";
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import Carrito from '../carrito/Carrito';
import "./NavBar.css"
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../services/cart/CartContext';
import logo from '/public/logo.ico';
import cart from '/public/cart.png';


const NavBar = () => {
    let navigate = useNavigate();
    const { handleLogout, user } = useContext(AuthenticationContext);
    const [cartProducts, setCartProducts] = useState([]);
    const { handleProduct } = useContext(CartContext);
    const products = handleProduct();
    let totalQuantity = 0;
    if (products.length > 0) {
        for (const product of products) {
            totalQuantity += product.quantity; // Corregimos el nombre de la propiedad
        }
    }

    const onHandleLogout = () => {
        handleLogout();
    };

    const onHandleLogin = () => {
        navigate("/login");
    };

    const onHandleProduct = () => {
        navigate("/productos");
    };

    const onHandleNewProduct = () => {
        navigate("/nuevoProducto");
    };

    const onHandleCustomer = () => {
        navigate("/customer");
    };

    const onHandleSeller = () => {
        navigate("/seller");
    };

    const onHandleLanding = () => {
        navigate("/");
    };
    return (
        <>
            <Navbar data-bs-theme="dark" className='navbar'>
                <Container>
                    <Navbar.Brand className='nameBussines' onClick={onHandleLanding}><img style={{ height: '6vh', cursor: 'pointer' }} className="image-order" src={logo} alt="First slide" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='caja'>
                        <Nav className="me-auto caja-titulos" >
                            <Nav.Link onClick={onHandleProduct} className='products'>Productos</Nav.Link>
                        </Nav>
                        {user && user.userType !== 0 &&
                            <Nav className="me-auto caja-titulos" >
                                <Nav.Link onClick={onHandleNewProduct} className='option-navbar'>Agregar Producto</Nav.Link>
                            </Nav>
                        }
                        {user && user.userType == 2 &&
                            <Nav className="me-auto caja-titulos" >
                                <Nav.Link onClick={onHandleCustomer} className='option-navbar admin-option'>Clientes</Nav.Link>
                            </Nav>}
                        {user && user.userType == 2 &&
                            <Nav className="me-auto caja-titulos" >
                                <Nav.Link onClick={onHandleSeller} className='option-navbar admin-option'>Vendedores</Nav.Link>
                            </Nav>}
                        {user &&
                            <Navbar.Text className='username'>
                                ¡Hola {user.name}!
                            </Navbar.Text>}
                        <Nav>
                            {user ? (
                                <Button type='button' variant='warning' className="mb-3 mt-2 ps-5 pe-5 botonForm boton-form-nav-bar" onClick={onHandleLogout}>Cerrar sesión</Button>
                            ) : (
                                <Button type='button' variant='warning' className="mb-3 mt-2 ps-5 pe-5 botonForm boton-form-nav-bar" onClick={onHandleLogin}>Iniciar sesión</Button>
                            )}
                        </Nav>
                        <Dropdown align="end">
                            <Dropdown.Toggle className='button-cart-navbar' id="dropdown-basic">
                                <img style={{ height: '3vh', width: '2hv' }} className="image-order" src={cart} alt="First slide" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='carrito-desplegable'>
                                <Carrito products={cartProducts} setCartProducts={setCartProducts} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;
