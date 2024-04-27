import { useState } from "react";

const Create = () => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        category: '',
        color: '',
        price: '',
        image1: null,
        image2: null,
        image3: null,
        material: '',
        size: [],
        quantity: [],
        offer: '',
        status: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (name === 'size' || name === 'quantity') {
            const arrayValue = value.split(',').map((item) => item.trim());
            setFormData((prevData) => ({
                ...prevData,
                [name]: arrayValue,
            }));
        } else if (type === 'file') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                if (formData[key] !== null) {
                    formDataToSend.append(key, formData[key]);
                }
            }

            const response = await fetch(process.env.REACT_APP_BACKEND_URL, {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('Error adding data to the server');
            }

            const result = await response.json();
            console.log('Data added successfully:', result);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} id='update-form' encType="multipart/form-data">
                <div className='container mt-4'>
                    <div className='row each-input-field g-4'>
                        <div className='col-4'>
                            <label htmlFor='id'>ID: </label>
                            <input type="text" name="id" onChange={handleChange} placeholder='PB..' id='form-id' />
                        </div>
                        <div className='col-4'>
                            <label htmlFor='name'>Name: </label>
                            <input type="text" name="name" onChange={handleChange} id='form-name' />
                        </div>
                        <div className='col-4'>
                            <label htmlFor='category'>Category: </label>
                            <input type="text" name="category" onChange={handleChange} id='form-category' />
                        </div>
                        <div className='col-4'>
                            <label htmlFor='color'>Color: </label>
                            <input type="text" name="color" onChange={handleChange} id='form-color' />
                        </div>
                        <div className='col-4'>
                            <label htmlFor='price'>Price: </label>
                            <input type="number" name="price" onChange={handleChange} id='form-price' />
                        </div>
                        <div className='col-4'>
                            <label htmlFor='image1'>Main image: </label>
                            <input type="file" name="image1" onChange={handleChange} />
                        </div>
                        <div className='col-4'>
                            <label htmlFor='image2'>Other image: </label>
                            <input type="file" name="image2" onChange={handleChange} />
                        </div>
                        <div className='col-4'>
                            <label htmlFor='image3'>Other image: </label>
                            <input type="file" name="image3" onChange={handleChange} />
                        </div>
                        <div className='col-4'>
                            <label htmlFor='material'>Material: </label>
                            <input type="text" name="material" onChange={handleChange} id='form-material' />
                        </div>
                        <div className='col-4'>
                            <label htmlFor='size'>Size: </label>
                            <input type="text" name="size" onChange={handleChange} placeholder='Comma separated' id='form-size' />
                        </div>
                        <div className='col-4'>
                            <label htmlFor='quantity'>Quantity: </label>
                            <input type="text" name="quantity" onChange={handleChange} placeholder='Comma separated' id='form-quantity' />
                        </div>
                        <div className='col-4'>
                            <label htmlFor='offer'>Offer: </label>
                            <input type="number" name="offer" onChange={handleChange} placeholder='%' id='form-offer' />
                        </div>
                        <div className='col-4'>
                            <label className='d-flex align-items-center check-container'>
                                <input className='m-0 w-10' type="checkbox" name="status" checked={formData.status} onChange={handleChange} />
                                <div className="checkmark"></div>
                            </label>
                        </div>
                    </div>
                    <button type="submit">Add this product</button>
                </div>
            </form>
        </div>
    );
};

export default Create;
