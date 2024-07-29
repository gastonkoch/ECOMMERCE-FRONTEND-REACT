import { Button, Form } from 'react-bootstrap';
import './Register.css'
import { useState, useContext, useRef } from "react";
import { useForm } from '../../hook/useForm';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';

const Register = () => {

    const navigate = useNavigate()
    const { handleLogin } = useContext(AuthenticationContext);

    const { email, password, name, userNickName, lastName, userAdress, onInputChange, onResetForm } = useForm({
        email: '',
        password: '',
        name: '',
        userNickName: '',
        lastName: '',
        userAdress: ''
    })

    const [errors, setErrors] = useState({
        email: false,
        password: false,
        name: false,
        userNickName: false,
        lastName: false,
        userAdress: false
    });

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const nameRef = useRef(null);
    const userNickNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const userAdressRef = useRef(null);

    const onInputNickName = async (event) => {
        const nickName = event.target.value;
        if (nickName) {
            try {
                const response = await fetch(`https://localhost:7197/api/User/nickNameAvaible/${nickName}`, {
                    method: "POST",
                    mode: "cors",
                });

                if (!response.ok) {
                    throw new Error("Error en el servidor");
                }

                const data = await response.json();
                if (!data) {  // Suponiendo que data es un booleano
                    //Se puede cambiar el contorno en rojo
                    alert("Usuario inválido o en uso");
                } else {
                    //Se puede cambiar el contorno en verde
                    alert("Usuario válido");
                }
            } catch (error) {
                alert("Error al verificar el usuario");
            }
        }
    };
    const onInputEmail = async (event) => {
        const Email = event.target.value;
        if (Email) {
            try {
                const response = await fetch(`https://localhost:7197/api/User/EmailRegistered/${Email}`, {
                    method: "POST",
                    mode: "cors",
                });

                if (!response.ok) {
                    throw new Error("Error en el servidor");
                }

                const data = await response.json();
                if (!data) {  // Suponiendo que data es un booleano
                    //Se puede cambiar el contorno en rojo
                    alert("Este mail ya se encuentra registrado");
                } else {
                    //Se puede cambiar el contorno en verde
                    alert("Mail valido");
                }
            } catch (error) {
                alert("Error al verificar el mail");
            }
        }
    };

    const onRegister = async (event) => {
        event.preventDefault()

        if (!emailRef.current.value) {
            emailRef.current.focus();
            alert("Debe ingresar su email")
            setErrors({ ...errors, email: true });
            return;
        }

        if (!passwordRef.current.value) {
            passwordRef.current.focus();
            alert("Debe ingresar su contraseña")
            setErrors({ ...errors, password: true });
            return;
        }

        if (!nameRef.current.value) {
            nameRef.current.focus();
            alert("Debe ingresar su contraseña")
            setErrors({ ...errors, password: true });
            return;
        }

        if (!userNickNameRef.current.value) {
            userNickNameRef.current.focus();
            alert("Debe ingresar su nombre de usuario")
            setErrors({ ...errors, userNickName: true });
            return;
        }

        if (!lastNameRef.current.value) {
            lastNameRef.current.focus();
            alert("Debe ingresar su Apellido")
            setErrors({ ...errors, lastName: true });
            return;
        }

        if (!userAdressRef.current.value) {
            userAdressRef.current.focus();
            alert("Debe ingresar su Dirección")
            setErrors({ ...errors, userAdress: true });
            return;
        }

        setErrors({ ...errors, exist: false });


        const newClient = {
            name: name,
            lastName: lastName,
            password: password,
            email: name,
            userName: userNickName,
            adress: userAdress
        }
        try {
            const response = await fetch("https://localhost:7197/customer", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newClient),
            });
            if (!response.ok) {
                throw new Error("Error al registrarse");
                alert("Error al registrarse");
            }
            handleLogin(email)
            navigate('/')
            onResetForm();
        } catch (error) {
            alert("Error al verificar el mail");
        }

    }



    return (
        <div className='divBoxRegister'>
            <div className='divRegister'>
                <Form onSubmit={onRegister} className='form'>
                    <h1>Registrate</h1>
                    <Form.Group controlId="userName" className='formGroup'>
                        <Form.Label className='text-dark labelForm'>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Ingrese su nombre...'
                            name="name"
                            value={name}
                            ref={nameRef}
                            onChange={onInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="userLastName" className='formGroup'>
                        <Form.Label className='text-dark labelForm'>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Ingrese su apellido...'
                            name="lastName"
                            value={lastName}
                            ref={lastNameRef}
                            onChange={onInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="userEmail" className='formGroup'>
                        <Form.Label className='text-dark labelForm'>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder='Ingrese su email...'
                            name="email"
                            value={email}
                            ref={emailRef}
                            onChange={onInputChange}
                            onBlur={onInputEmail}
                        />
                    </Form.Group>
                    <Form.Group controlId="userNickName" className='formGroup'>
                        <Form.Label className='text-dark labelForm'>Nombre de usuario</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Ingrese su nombre de usuario...'
                            name="userNickName"
                            value={userNickName}
                            ref={userNickNameRef}
                            onChange={onInputChange}
                            onBlur={onInputNickName}
                        />
                    </Form.Group>
                    <Form.Group controlId="userPassword" className='formGroup'>
                        <Form.Label className='text-dark labelForm'>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder='Ingrese su contraseña...'
                            name="password"
                            value={password}
                            ref={passwordRef}
                            onChange={onInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="userAdress" className='formGroup'>
                        <Form.Label className='text-dark labelForm'>Dirección</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Ingrese su dirección...'
                            name="userAdress"
                            value={userAdress}
                            ref={userAdressRef}
                            onChange={onInputChange}
                        />
                    </Form.Group>
                    <div className='box-button-register'>
                        <Button type='submit' variant='warning' className="mb-3 mt-2 ps-5 pe-5 botonForm">Registrarse</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register