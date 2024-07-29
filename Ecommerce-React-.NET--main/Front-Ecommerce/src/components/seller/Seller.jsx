import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./Seller.css";
import crear from '/public/crear4.png';
import cruz from '/public/cruz2.png';
import lapiz from '/public/lapiz.png';
import lupa from '/public/lupa2.png';

const Seller = () => {
    const [sellers, setSellers] = useState([]);
    const [sellersFilter, setSellersFilter] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const { id } = useParams();

    let navigate = useNavigate();

    const handleNameSearch = (e) => {
        setNameSearch(e.target.value);
    };

    useEffect(() => {
        fetch(`https://localhost:7197/api/User/type/${1}`, {
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
                setSellers(productsData);
                setSellersFilter(productsData);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);


    const onHandleSearch = () => {
        if (!nameSearch) {
            setSellers(sellersFilter)
        } else {
            const nameFilter = sellers.filter(
                (seller) =>
                    seller.name.toLowerCase().includes(nameSearch.toLowerCase())
            )
            setSellers(nameFilter)
        }
    };

    const onHandleCreateSeller = () => {
        navigate(`/createseller`);
    };

    const onHandleDisplaySeller = (id) => () => {
        navigate(`/displayseller/${id}`);
    };

    const onHandleUpdateSeller = (id) => () => {
        navigate(`/updateseller/${id}`);
    };

    const onHandleDeleteSeller = (id) => () => {
        navigate(`/deleteseller/${id}`);
    };

    return (
        <div className='boxSeller'>
            <Form className='containerSeller'>
                <div className='titleSellerDiv'>
                    <h1>Vendedores</h1>
                </div>
                <div className='box-seller'>
                    <div className='leftSeller'>
                        <Form.Label className="search-seller-p">Nombre: </Form.Label>
                        <Form.Control className="search-seller" type="text" placeholder="Ingresar el nombre" onChange={handleNameSearch} />
                        <Button type="button" className="mb-3 mt-2 ps-5 pe-5 search-seller-button" onClick={onHandleSearch}>Buscar</Button>
                    </div>
                    <div className='rightSeller'>
                        <img className="icono-grilla create" src={crear} alt="crear" style={{ cursor: 'pointer' }} onClick={onHandleCreateSeller} />
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
                    {sellers.map((seller) => (
                        <Row key={seller.id}>
                            <Col className="empty-col" onClick={onHandleDisplaySeller(seller.id)} style={{ cursor: 'pointer' }}><img className="icono-grilla" src={lupa} alt="display" /></Col>
                            <Col className="empty-col" onClick={onHandleUpdateSeller(seller.id)} style={{ cursor: 'pointer' }}><img className="icono-grilla" src={lapiz} alt="update" /></Col>
                            <Col className="empty-col" onClick={onHandleDeleteSeller(seller.id)} style={{ cursor: 'pointer' }}><img className="icono-grilla" src={cruz} alt="delete" /></Col>
                            <Col>{seller.id}</Col>
                            <Col>{seller.name}</Col>
                            <Col>{seller.email}</Col>
                            <Col>{seller.userName}</Col>
                        </Row>
                    ))}
                </Container>
            </Form>
        </div>
    )
}

export default Seller