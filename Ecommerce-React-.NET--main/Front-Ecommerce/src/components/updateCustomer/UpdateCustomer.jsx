import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./UpdateCustomer.css";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const UpdateCustomer = () => {
    const { id } = useParams();
    const [customerOnScreen, setCustomerOnScreen] = useState({
        name: '',
        lastName: '',
        password: '',
        id: '',
        email: '',
        userName: '',
        adress: ''
    })

    const [errors, setErrors] = useState({
        name: false,
        lastName: false,
        password: false,
        email: false,
        userName: false,
        adress: false,
    });

    const nameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const userNameRef = useRef(null);
    const adressRef = useRef(null);

    let navigate = useNavigate();

    useEffect(() => {
        fetch(`https://localhost:7197/api/User/${id}`, {
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
                setCustomerOnScreen(prevState => ({
                    ...prevState, // Mantén los valores existentes
                    name: productsData.name || prevState.name,
                    lastName: productsData.lastName || prevState.lastName,
                    password: productsData.password || prevState.password,
                    id: productsData.id || prevState.id,
                    email: productsData.email || prevState.email,
                    userName: productsData.userName || prevState.userName,
                    adress: productsData.adress || prevState.adress,
                }));
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const submitUpdateCustomerHandler = (e) => {
        e.preventDefault()
        if (!nameRef.current.value) {
            nameRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                name: true
            }));
            alert("Por favor ingrese su nombre")
            return;
        }

        if (!lastNameRef.current.value) {
            lastNameRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                lastName: true
            }));
            alert("Por favor ingrese su apellido")
            return;
        }


        if (!customerOnScreen.email) {
            emailRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                email: true
            }));
            alert("Por favor ingrese el email")
            return;
        }

        if (!userNameRef.current.value) {
            userNameRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                userName: true
            }));
            alert("Por favor ingrese el user name")
            return;
        }

        if (!adressRef.current.value) {
            adressRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                adress: true
            }));
            alert("Por favor ingrese la direccion")
            return;
        }
        fetch(`https://localhost:7197/api/User/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerOnScreen)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al actualizar el producto");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        navigate(`/customer`)
    }



    const handleCancel = () => (
        navigate(`/customer`)
    )

    return (
        <>
            <div className="divUpdateCustomer">
                <Card className="m-4 w-50 formUpdateCustomer">
                    <h1>Modificar Cliente</h1>
                    <Card.Body>
                        <Form className="text-white box" onSubmit={submitUpdateCustomerHandler}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="nombre">
                                        <Form.Label className="labelForm">Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingresar el nombre"
                                            value={customerOnScreen.name}
                                            onChange={(e) => setCustomerOnScreen({ ...customerOnScreen, name: e.target.value })}
                                            ref={nameRef}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="apellido">
                                        <Form.Label className="labelForm">Apellido</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingresar apellido"
                                            value={customerOnScreen.lastName}
                                            onChange={(e) => setCustomerOnScreen({ ...customerOnScreen, lastName: e.target.value })}
                                            ref={lastNameRef}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label className="labelForm">Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Ingresar email"
                                            max={10000}
                                            min={0}
                                            value={customerOnScreen.email}
                                            onChange={(e) => setCustomerOnScreen({ ...customerOnScreen, email: e.target.value })}
                                            ref={emailRef}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="usuario">
                                        <Form.Label className="labelForm">Usuario</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingresar nombre de usuario"
                                            value={customerOnScreen.userName}
                                            onChange={(e) => setCustomerOnScreen({ ...customerOnScreen, userName: e.target.value })}
                                            ref={userNameRef}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="direccion">
                                        <Form.Label className="labelForm">Direccion</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingresar direccion"
                                            value={customerOnScreen.adress}
                                            onChange={(e) => setCustomerOnScreen({ ...customerOnScreen, adress: e.target.value })}
                                            ref={adressRef}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className="box-button-update">
                                <Button type="submit" className="mb-3 mt-2 ps-5 pe-5 botonFormAdd botonFormUpdateCus">Modificar</Button>
                                <Button type="button" className="mb-3 mt-2 ps-5 pe-5 botonFormAdd botonFormUpdateCus botonFormUpdateCusCancel" onClick={handleCancel}>Cancelar</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default UpdateCustomer