import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./Customers.css";
import crear from '/public/crear4.png';
import cruz from '/public/cruz2.png';
import lapiz from '/public/lapiz.png';
import lupa from '/public/lupa2.png';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [customersFilter, setCustomersFilter] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    
    let navigate = useNavigate();

    const handleNameSearch = (e) => {
        setNameSearch(e.target.value);
    };

    useEffect(() => {
        fetch(`https://localhost:7197/api/User/type/${0}`, {
            method: "GET",
            mode: "cors",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener los productos");
                }
                return response.json();
            })
            .then((productsData) => {
                setCustomers(productsData);
                setCustomersFilter(productsData)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const onHandleSearch = () => {
        if (!nameSearch) {
            setCustomers(customersFilter)
        } else {
            const nameFilter = customers.filter(
                (customer) =>
                    customer.name.toLowerCase().includes(nameSearch.toLowerCase())
            )
            setCustomers(nameFilter)
        }
    };


    const onHandleCreateCustomer = () => {
        navigate(`/createcustomer`);
    };

    const onHandleDisplayCustomer = (id) => () => {
        navigate(`/displaycustomer/${id}`);
    };

    const onHandleUpdateCustomer = (id) => () => {
        navigate(`/updatecustomer/${id}`);
    };

    const onHandleDeleteCustomer = (id) => () => {
        navigate(`/deletecustomer/${id}`);
    };

    return (
        <div className='boxCustomer'>
            <Form className='containerCustomer'>
                <div className='titleCustomerDiv'>
                    <h1>Clientes</h1>
                </div>
                <div className='box-customer'>
                    <div className='leftCustomer'>
                        <Form.Label className="search-customer-p">Nombre: </Form.Label>
                        <Form.Control className="search-customer" type="text" placeholder="Ingresar el nombre" onChange={handleNameSearch} />
                        <Button type="button" className="mb-3 mt-2 ps-5 pe-5 search-customer-button" onClick={onHandleSearch}>Buscar</Button>
                    </div>
                    <div className='rightCustomer'>
                        <img className="icono-grilla create" src={crear} alt="crear" style={{ cursor: 'pointer' }} onClick={onHandleCreateCustomer} />
                    </div>
                </div>
                <Container fluid>
                    <Row className='row-title'>
                        <Col className='title empty-col'></Col>
                        <Col className='title empty-col'></Col>
                        <Col className='title empty-col'></Col>
                        <Col className='title'>ID</Col>
                        <Col className='title'>Name</Col>
                        <Col className='title'>Email</Col>
                        <Col className='title'>Usuario</Col>
                    </Row>
                    {customers.map((customer) => (
                        <Row key={customer.id}>
                            <Col className="empty-col" onClick={onHandleDisplayCustomer(customer.id)} style={{ cursor: 'pointer' }}><img className="icono-grilla" src={lupa} alt="display" /></Col>
                            <Col className="empty-col" onClick={onHandleUpdateCustomer(customer.id)} style={{ cursor: 'pointer' }}><img className="icono-grilla" src={lapiz} alt="update" /></Col>
                            <Col className="empty-col" onClick={onHandleDeleteCustomer(customer.id)} style={{ cursor: 'pointer' }}><img className="icono-grilla" src={cruz} alt="delete" /></Col>
                            <Col>{customer.id}</Col>
                            <Col>{customer.name}</Col>
                            <Col>{customer.email}</Col>
                            <Col>{customer.userName}</Col>
                        </Row>
                    ))}
                </Container>
            </Form>
        </div>
    );
};

export default Customers;
