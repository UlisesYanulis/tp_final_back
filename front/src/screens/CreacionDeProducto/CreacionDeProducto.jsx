import { useState } from 'react';
import './CreacionDeProducto.css';

const Formulario = () => {
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [imagenSrc, setImagenSrc] = useState('');

    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImagenSrc(imageUrl);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        if (
        !formData.get('nombre') ||
        !formData.get('precio') ||
        !formData.get('stock') ||
        !formData.get('descripcion') ||
        !formData.get('thumbnail')
        ) {
        setMostrarAlerta(true);
        } else {
        setMostrarAlerta(false);

        try {
            const response = await fetch('http://localhost:3040/api/products', {
            method: 'POST',
            body: formData,
            });

            const data = await response.json();

            if (response.ok) {
            console.log('Product created successfully:', data);
            window.alert('¡El producto ha sido creado con éxito!');
            } else {
            console.error('Failed to create product:', data.error);
            window.alert('Error al crear el producto');
            }
        } catch (error) {
            console.error('Error during product creation:', error);
            window.alert('Error durante la creación del producto');
        }
        }
    };

    return (
        <div className='contactFormBody'>
        {mostrarAlerta && <div className='alerta'>Por favor, complete todos los campos obligatorios.</div>}
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='card'>
            <h3>Add Product</h3>
            <div className='inputName'>
                <h4>Name*</h4>
                <input className='inputContact' type='text' name='nombre' placeholder='Name' required />
            </div>
            <div className='inputName'>
                <h4>Price*</h4>
                <input className='inputContact' type='text' name='precio' placeholder='$$$' required />
            </div>
            <div className='inputName'>
                <h4>Stock*</h4>
                {/* Cambiado a un campo de número */}
                <input className='inputContact' type='number' name='stock' placeholder='' required />
            </div>
            <div className='inputName'>
                <h4>Add Image*</h4>
                <input className='inputContact' type='file' name='thumbnail' onChange={handleThumbnailChange} required />
            </div>
            <div className='inputName'>
                <h4>Description*</h4>
                <input className='inputContactMessage' type='text' name='descripcion' placeholder='' />
            </div>
            <div>
                <button className='botonContact' type='submit'>
                Apply
                </button>
            </div>
            {/* Mostrar la imagen seleccionada */}
            {imagenSrc && <img src={imagenSrc} alt='Preview' />}
            </div>
        </form>
        </div>
    );
};

export default Formulario;