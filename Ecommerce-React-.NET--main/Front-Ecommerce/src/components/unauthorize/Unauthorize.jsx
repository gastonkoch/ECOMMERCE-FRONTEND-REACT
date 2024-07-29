import { Link } from 'react-router-dom';
import './Unauthorize.css'
const Unauthorize = () => {
    return (
        <div className='boxUnauthorize'>
            <div className='divUnauthorize'>
                <h1>¡Lo sentimos!</h1>
                <h2>No tienes permisos para acceder a esta página</h2>
                <Link to="/">Volver a la página principal</Link>
                <Link to="/productos">Ver productos</Link>
            </div>
        </div>
    )
}



export default Unauthorize