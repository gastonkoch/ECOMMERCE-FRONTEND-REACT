import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./CreateCustomer.css";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const CreateCustomer = () => {
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


    const submitCreateCustomerHandler = (e) => {
        e.preventDefault();
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

        fetch(`https://localhost:7197/customer`, {
            method: "POST",
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
                    <h1>Crear cliente</h1>
                    <Card.Body className="card-body-create-customer">
                        <Form className="text-white box-add-customer" onSubmit={submitCreateCustomerHandler}>
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
                                <Button type="submit" className="mb-3 mt-2 ps-5 pe-5 botonFormAdd botonFormUpdateCus">Crear</Button>
                                <Button type="button" className="mb-3 mt-2 ps-5 pe-5 botonFormAdd botonFormUpdateCus botonFormUpdateCusCancel" onClick={handleCancel}>Cancelar</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default CreateCustomer