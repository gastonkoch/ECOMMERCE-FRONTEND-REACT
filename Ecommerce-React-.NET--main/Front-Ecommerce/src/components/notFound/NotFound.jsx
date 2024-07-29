import { Link } from 'react-router-dom';
import './NotFound.css'
const NotFound = () => {
  return (
    <div className='boxNotFound'>
      <div className='divNotFound'>
        <h1>¡Error 404! </h1>
        <h1>No pudimos encontrar tu página</h1>
        <p className='pNotFound' >
          Parece que te has perdido debido a un enlace desactualizado o
          un error tipográfico en la página a la que intentabas acceder. Por favor siéntete libre de regresar
          a la página principal o direccionarte a la lista de productos
          .
          .
        </p>
        <Link to="/">Volver a la página principal</Link>
        <Link to="/productos">Ver productos</Link>
      </div>
    </div>
  )
}



export default NotFound