// productCard.jsx en el proyecto full stack
import './productCard.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductCard = ({ producto }) => {
  console.log('Ruta de la imagen:', `/api/products/images/${producto.thumbnail}`);

  return (
      <Link to={`/UpdateProduct/${producto._id}`} className="containerCards">
          {producto.thumbnail && <img src={`/api/products/images/${producto.thumbnail}`} alt={producto.nombre} />}
          <div className='pcText'>
              <h2 className='nombre'>{producto.nombre}</h2>
              <h3 className='precio'>$ {producto.precio}</h3>
              <h3 className='stock'> Stock ({producto.stock})</h3>
              <h3 className='descripcion'> Descripcion: {producto.descripcion}</h3>
          </div>
      </Link>
  );
};

ProductCard.propTypes = {
  producto: PropTypes.shape({
    thumbnail: PropTypes.string,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    descripcion: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
