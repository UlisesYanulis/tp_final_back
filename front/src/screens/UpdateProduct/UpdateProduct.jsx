// UpdateProduct.jsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UpdateProduct.css';

const UpdateProduct = () => {
    const { pid } = useParams();
    const [productSelect, setProductSelect] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        descripcion: '',
        precio: 0,
        stock: 0,
    });

    useEffect(() => {
        fetch(`http://localhost:3040/api/products/${pid}`)
            .then((res) => res.json())
            .then((result) => {
                setProductSelect(result.product);
                setUpdatedData({
                    descripcion: result.product.descripcion,
                    precio: result.product.precio,
                    stock: result.product.stock,
                });
            })
            .catch((error) => console.error('Error fetching product:', error));
    }, [pid]);

    const handleFieldChange = (field, value) => {
        setUpdatedData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3040/api/products/${pid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            const result = await response.json();

            if (result.ok) {
                console.log('Product updated successfully');
            } else {
                console.error('Error updating product:', result.error);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className='update-container'>
            <div className='update-product-card'>
                {productSelect && productSelect.thumbnail ? (
                    <img
                        src={`http://localhost:3040/${productSelect.thumbnail}`}
                        alt={productSelect.nombre}
                        width={'150px'}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/fallback.jpg';
                        }}
                    />
                ) : (
                    <div className="fallback-image">No Image</div>
                )}
                {productSelect && (
                    <>
                        <h3>{productSelect.nombre}</h3>
                        <p>Price: ${productSelect.precio}</p>
                        <p>Stock: {productSelect.stock}</p>
                    </>
                )}
            </div>

            {productSelect && (
                <div className='update-right'>
                    <h2>{productSelect.descripcion}</h2>
                    <form className='update-form'>
                        <label>Description:</label>
                        <input className='input'
                            type='text'
                            value={updatedData.descripcion}
                            onChange={(e) => handleFieldChange('descripcion', e.target.value)}
                        />
                        <label>Price:</label>
                        <input className='input'
                            type='number'
                            value={updatedData.precio}
                            onChange={(e) => handleFieldChange('precio', parseFloat(e.target.value))}
                        />
                        <label>Stock:</label>
                        <input className='input'
                            type='number'
                            value={updatedData.stock}
                            onChange={(e) => handleFieldChange('stock', parseInt(e.target.value))}
                        />
                        <button className='update-button' type='button' onClick={handleUpdate}>
                            Update Product
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdateProduct;