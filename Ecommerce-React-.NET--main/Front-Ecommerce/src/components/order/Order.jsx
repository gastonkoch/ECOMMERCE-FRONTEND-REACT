import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../services/cart/CartContext';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Order.css';
import logo from '/public/logo.ico';
import { PayMethodContext } from '../../services/cart/PayMethodContext';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';

export const Order = () => {
    const { handleProduct } = useContext(CartContext);
    const { payMethod } = useContext(PayMethodContext);
    const [products, setProducts] = useState([]);
    const [nameAndLastName, setNameAndLastName] = useState()
    const [email, setEmail] = useState()
    const [home, setHome] = useState()
    const [postalCode, setPostalCode] = useState()
    const [selectedMethod, setSelectedMethod] = useState()

    const navigate = useNavigate();


    const handlePayMethod = () => {
        setNameAndLastName(payMethod.nameAndLastName)
        setEmail(payMethod, email)
        setHome(payMethod.home)
        setPostalCode(payMethod.postalCode)
        setSelectedMethod(payMethod.selectedMethod)
    }



    useEffect(() => {
        setProducts(handleProduct());
    }, [handleProduct]);

    let totalAmount = 0;

    const handleBack = () => (
        navigate("/productos")
    )

    return (
        <>
            <Container className='img-order'>
                <img style={{ height: '30vh' }} className="image-order" src={logo} alt="First slide" />
            </Container>
            <Container className='message-order'>
                <h3>Detalle de su compra</h3>
            </Container>
            <Container className='order-box'>
                <Container className='box-order'>
                    <Container>
                        <Form className='container-order'>
                            <Container>
                                <Row>
                                    <Col className='title-order'>Nombre</Col>
                                    <Col className='title-order'>Precio</Col>
                                    <Col className='title-order'>Cantidad</Col>
                                    <Col className='title-order'>Total</Col>
                                </Row>
                                {products.map((product, index) => {
                                    const amountRow = product.price * product.quantity;
                                    totalAmount += amountRow;
                                    return (
                                        <Row key={index} className='d-flex justify-content-between align-items-center product'>
                                            <Col ><span>{product.name}</span></Col>
                                            <Col ><span>${product.price.toFixed(2)}</span></Col>
                                            <Col><span>{product.quantity}</span></Col>
                                            <Col><span>${amountRow.toFixed(2)}</span></Col>
                                        </Row>
                                    );
                                })}
                            </Container>
                        </Form>

                        <Container className='data-user-order'>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="nombre">
                                            <Form.Label className="labelForm">Nombre</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={payMethod.nameAndLastName}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label className="labelForm">Email</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={payMethod.email}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="home">
                                            <Form.Label className="labelForm">Direccion</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={payMethod.home}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="selectedMethod">
                                            <Form.Label className="labelForm">Metodo de pago</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={payMethod.selectedMethod}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="postalCode">
                                            <Form.Label className="labelForm">Codigo postal</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={payMethod.postalCode}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>

                                </Row>
                            </Form>
                        </Container>

                        <Container className='amount-order'>
                            <h3>Total: ${totalAmount.toFixed(2)}</h3>
                        </Container>

                        <Container className="box-button-update">
                            <Button type="button" className="mb-3 mt-2 ps-5 pe-5 botonFormAdd botonFormUpdateCus" onClick={handleBack}>Volver a la tienda</Button>
                        </Container>
                    </Container>
                </Container>
            </Container>

        </>
    );
};
