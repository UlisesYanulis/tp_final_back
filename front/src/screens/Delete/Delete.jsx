import { useState, useEffect } from 'react';
import ProductCard from '../../components/productCard/productCard';
import './Delete.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);

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

    const handleDeleteClick = (productId) => {
        setSelectedProductId(productId);
    };

    const handleConfirmDelete = async () => {
        if (selectedProductId) {
        try {
            const response = await fetch(`http://localhost:3040/api/products/${selectedProductId}`, {
            method: 'DELETE',
            });

            if (response.ok) {
            const updatedProducts = await response.json();
            setProducts(updatedProducts.products);
            console.log('Product Deleted Correctly');
            } else {
            console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error during product deletion:', error);
        } finally {
            setSelectedProductId(null);
        }
        }
    };

    const handleCancelDelete = () => {
        setSelectedProductId(null);
    };

    return (
        <div className="containerDeCards">
        {products.map((producto) => (
            <div key={producto._id} className="product-card">
            <ProductCard producto={producto} />
            <button className='botonDeBorrar' onClick={() => handleDeleteClick(producto._id)}><i className="bi bi-x-circle"></i></button>
            </div>
        ))}

        {selectedProductId && (
            <div className="confirmation-dialog">
            <p>¿Estas seguro que deseas borrar este producto?</p>
            <div className='siONo'>
                <button className='yesNoButton' onClick={handleConfirmDelete}>Yes</button>
                <button className='yesNoButton' onClick={handleCancelDelete}>No</button>
            </div>
            </div>
        )}
        </div>
    );
};

export default Products;
