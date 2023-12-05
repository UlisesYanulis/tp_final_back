import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import ProductCard from '../../components/productCard/productCard';
import './Products.css'

const Products = () => {
const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3040/api/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);

        // Manejar el contenido de la respuesta solo si hay una respuesta
        if (error.response) {
          console.log('Response content:', await error.response.text());
        }
      }
    };

    fetchProducts();
  }, []);

  return (

      <div className="containerDeCards">
        {products.map(producto => (
          <ProductCard key={producto._id} producto={producto} />
        ))}
        <div>
        <NavLink to='/CreacionDeProducto'>
          <button className='botonDeAgregar'><i className="bi bi-plus-circle"></i></button>
        </NavLink>
        </div>
        <div>
        <NavLink to='/Delete'>
          <button className='botonDeAgregar'><i className="bi bi-x-circle"></i></button>
        </NavLink>
        </div>
      </div>
      

  );
};

export default Products;