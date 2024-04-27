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
            // For file inputs, set the file object directly
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0], // Assuming single file upload
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
            // Append all form data fields to FormData object
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
            // Reset form data after successful submission
            setFormData({
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
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} id='update-form' encType="multipart/form-data">
                <div className='container'>
                    <div className='row each-input-field g-4'>
                        <div className='col-4'>
                            <input type="text" name="id" onChange={handleChange} placeholder='ID' id='form-id' />
                        </div>
                        <div className='col-4'>
                            <input type="text" name="name" onChange={handleChange} placeholder='Name' id='form-name' />
                        </div>
                        <div className='col-4'>
                            <input type="text" name="category" onChange={handleChange} placeholder='Category' id='form-category' />
                        </div>
                        <div className='col-4'>
                            <input type="text" name="color" onChange={handleChange} placeholder='Color' id='form-color' />
                        </div>
                        <div className='col-4'>
                            <input type="number" name="price" onChange={handleChange} placeholder='Price' id='form-price' />
                        </div>
                        <div className='col-4'>
                            <input type="file" name="image1" onChange={handleChange} />
                        </div>
                        <div className='col-4'>
                            <input type="file" name="image2" onChange={handleChange} />
                        </div>
                        <div className='col-4'>
                            <input type="file" name="image3" onChange={handleChange} />
                        </div>
                        <div className='col-4'>
                            <input type="text" name="material" onChange={handleChange} placeholder='Material' id='form-material' />
                        </div>
                        <div className='col-4'>
                            <input type="text" name="size" onChange={handleChange} placeholder='Size (comma separated)' id='form-size' />
                        </div>
                        <div className='col-4'>
                            <input type="text" name="quantity" onChange={handleChange} placeholder='Quantity (comma separated)' id='form-quantity' />
                        </div>
                        <div className='col-4'>
                            <input type="number" name="offer" onChange={handleChange} placeholder='Offer(%)' id='form-offer' />
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
