import { useState, useRef, useContext } from 'react';
import { useForm } from '../../hook/useForm';
import './PayMethod.css';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PayMethodContext } from '../../services/cart/PayMethodContext';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';


const PayMethod = () => {
    const { handlePayMethod } = useContext(PayMethodContext);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [showCardData, setShowCardData] = useState(false);
    const [showTransferData, setShowTransferData] = useState(false);
    const [showCashData, setShowCashData] = useState(false);
    const { user } = useContext(AuthenticationContext);

    const { nameAndLastName, email, home, postalCode, tarjetNumber, securityCode, expirationYear, expirationMonth, selectedValue, onInputChange, onResetForm } = useForm({
        nameAndLastName: `${user.name} ${user.lastName}`,
        email: user.email,
        home: user.adress,
        postalCode: '',
        tarjetNumber: '',
        securityCode: '',
        expirationMonth: '',
        expirationYear: '',
        selectedValue: ''
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        email: false,
        password: false,
        home: false,
        postalCode: false,
        tarjetNumbe: false,
        securityCode: false,
        expirationMonth: false,
        expirationYear: false,
        selectedValue: false
    });


    const handleMethodChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedMethod(selectedValue);
        setShowCardData(selectedValue === 'Tarjeta');
        setShowTransferData(selectedValue === 'Transferencia');
        setShowCashData(selectedValue === 'Efectivo');
    };

    const nameRef = useRef(`${user.name} ${user.lastName}`);
    const emailRef = useRef(user.email);
    const homeRef = useRef(user.adress);
    const postalCodeRef = useRef(null);

    const tarjetNumberRef = useRef(null);
    const securityCodeRef = useRef(null);
    const expirationMonthRef = useRef(null);
    const expirationYearRef = useRef(null);
    const selectedValueRef = useRef(null);

    const handlePay = (e) => {
        e.preventDefault();

        if (!nameRef.current.value) {
            nameRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                name: true
            }));
            alert("Por favor ingrese su nombre completo")
            return;
        }

        if (!emailRef.current.value) {
            emailRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                email: true
            }));
            alert("Por favor ingrese su email")
            return;
        }

        if (!homeRef.current.value) {
            homeRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                home: true
            }));
            alert("Por favor ingrese su domicilio")
            return;
        }

        if (!postalCodeRef.current.value) {
            postalCodeRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                postalCode: true
            }));
            alert("Por favor ingrese su código postal")
            return;
        }

        if (!selectedValueRef.current.value) {
            selectedValueRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                selectedValue: true
            }));
            alert("Por favor ingrese un método de pago")
            return;
        }

        if (showCardData && !tarjetNumberRef.current.value) {
            setErrors((prev) => ({
                ...prev,
                tarjetNumber: true
            }));
            alert("Por favor ingrese su numero de tarjeta")
            return;
        }

        if (showCardData && !securityCodeRef.current.value) {
            setErrors((prev) => ({
                ...prev,
                securityCode: true
            }));
            alert("Por favor ingrese el codigo de seguridad ")
            return;
        }

        if (showCardData && !expirationMonthRef.current.value) {
            setErrors((prev) => ({
                ...prev,
                expirationMonth: true
            }));
            alert("Por favor ingrese el mes de expiracion ")
            return;
        }

        if (showCardData && !expirationYearRef.current.value) {
            setErrors((prev) => ({
                ...prev,
                expirationYear: true
            }));
            alert("Por favor ingrese el año de expiracion ")
            return;
        }

        let metodoPago = {
            nameAndLastName: nameAndLastName,
            email: email,
            home: home,
            postalCode: postalCode,
            selectedMethod: selectedMethod
        };

        handlePayMethod(metodoPago);
        navigate('/order');
    }

    return (
        <div className='divPay'>
            <Form className='formPayMethod' onSubmit={handlePay}>
                <Container className='title-paymethod'>
                    <h1>Proceso de pago</h1>
                </Container>
                <Form.Group controlId="userNombre" className='formGroup'>
                    <Form.Label className='text-dark labelForm'>Nombre y apellido</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Ingrese su nombre y apellido...'
                        name="nameAndLastName"
                        value={nameAndLastName}
                        onChange={onInputChange}
                        ref={nameRef}
                    />
                </Form.Group>

                <Form.Group controlId="userEmail" className='formGroup'>
                    <Form.Label className='text-dark labelForm'>Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Ingrese su email...'
                        name="email"
                        value={email}
                        onChange={onInputChange}
                        ref={emailRef}
                    />
                </Form.Group>
                <Form.Group controlId="userHome" className='formGroup'>
                    <Form.Label className='text-dark labelForm'>Domicilio</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Ingrese su domicilio...'
                        name="home"
                        value={home}
                        onChange={onInputChange}
                        ref={homeRef}
                    />
                </Form.Group>

                <Form.Group controlId="userPostalCode" className='formGroup'>
                    <Form.Label className='text-dark labelForm'>Codigo Postal</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Ingrese su codigo postal...'
                        name="postalCode"
                        value={postalCode}
                        onChange={onInputChange}
                        ref={postalCodeRef}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className='text-dark labelForm'>Método de pago</Form.Label>
                    <Form.Select onChange={handleMethodChange} ref={selectedValueRef}>
                        <option value="">Seleccionar</option>
                        <option value="Tarjeta">Tarjeta Debito/Crédito</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="Efectivo">Efectivo</option>
                    </Form.Select>
                </Form.Group>

                {showCardData && (
                    <>
                        <Form.Group controlId="userTarjetNumber" className='formGroup'>
                            <Form.Label className='text-dark labelForm'>Numero de Tarjeta</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder='Ingrese el numero de tarjeta...'
                                name="tarjetNumber"
                                value={tarjetNumber}
                                onChange={onInputChange}
                                ref={tarjetNumberRef}
                            />
                        </Form.Group>

                        <Form.Group controlId="userSecurityCode" className='formGroup'>
                            <Form.Label className='text-dark labelForm'>Codigo de seguridad</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder='Ingrese su codigo de seguridad...'
                                name="securityCode"
                                value={securityCode}
                                onChange={onInputChange}
                                ref={securityCodeRef}
                            />
                        </Form.Group>

                        <Form.Group controlId="userExpirationMonth" className='formGroup'>
                            <Form.Label className='text-dark labelForm'>Mes de vencimiento</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder='Ingrese el mes de vencimiento...'
                                name="expirationMonth"
                                value={expirationMonth}
                                onChange={onInputChange}
                                ref={expirationMonthRef}
                            />
                        </Form.Group>
                        <Form.Group controlId="userExpirationDate" className='formGroup'>
                            <Form.Label className='text-dark labelForm'>Año vencimiento</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder='Ingrese el año de vencimiento...'
                                name="expirationYear"
                                value={expirationYear}
                                onChange={onInputChange}
                                ref={expirationYearRef}
                            />
                        </Form.Group>
                    </>
                )}

                {showTransferData && (
                    <Form.Group controlId="userCbu" className='formGroup'>
                        <Form.Label className='text-dark labelForm'>CBU para transferir</Form.Label>
                        <Form.Control
                            type="text"
                            name="cbu"
                            readOnly
                            value={'285059094009041813520'} // Esto es harcodeado es un cbu de prueba
                            onChange={onInputChange}
                        />
                        <Form.Text className="text-muted">
                            Luego enviar comprobante a comprobantes@easygrip.com
                        </Form.Text>
                    </Form.Group>
                )}

                {showCashData && (
                    <Form.Group controlId="userPaymentCode" className='formGroup'>
                        <Form.Label className='text-dark labelForm'>Codigo de pago</Form.Label>
                        <Form.Control
                            type="text"
                            name="paymentCode"
                            readOnly
                            value={'45465451321657489785'}
                        />
                        <Form.Text className="text-muted">
                            Con el código proporcionado efectue el pago en RappiPago o PagoFacil
                        </Form.Text>
                    </Form.Group>
                )}

                <div className='box-button-pay'>
                    <Button type='submit' variant='warning' className="mb-3 mt-2 ps-5 pe-5 botonForm">Pagar</Button>
                </div>
            </Form>
        </div>
    )
}

export default PayMethod
