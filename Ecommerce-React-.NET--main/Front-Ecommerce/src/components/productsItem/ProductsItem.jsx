import proptypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './ProductsItem.css'

const ProductsItem = ({ item }) => {
    let navigate = useNavigate()
    const onProductDetail = () => {
        navigate(`/producto/${item.id}`)
    }
    return (
        <>
            <Card className='product-item-card'>
                <Card.Body className='product-image-box'>
                    <Card.Img variant="top" src={item.image} className='product-image' />
                </Card.Body>
                <Card.Body className='product-data'>
                    <Card.Title className='product-item-name'>{item.name}</Card.Title>
                    <Card.Text className='product-item-description'><strong>Categoria:</strong> {item.category}</Card.Text>
                    <Card.Text className='product-item-description'><strong>Marca:</strong> {item.brand}</Card.Text>
                    <Card.Text className='product-item-description'><strong>Precio:</strong> ${item.price}</Card.Text>
                    <Card.Text className='product-item-description'>{item.avaible ? "Disponible" : "No disponible"}</Card.Text>
                    <Button onClick={onProductDetail} className='button-product-item'>Ver mas</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default ProductsItem

ProductsItem.proptypes = {
    item: proptypes.array
}