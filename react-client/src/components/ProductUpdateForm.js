import React, {useState} from 'react'
import Constants from "../utils/Constants";

export default function ProductUpdateForm(props) {
    
    const initialFormData = Object.freeze({
        id: props.product.id,
        idString: props.product.idString,
        name: props.product.name,
        description: props.product.description,
        imageUrl: props.product.imageUrl,
        price: parseFloat(props.product.price),
        quantity: 1
    });

    const [formData, setFormData] = useState(initialFormData);


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const productToUpdate = {
            id: props.product.id,
            idString: props.product.idString,
            name: formData.name,
            description: formData.description,
            imageUrl: formData.imageUrl,
            price: parseFloat(formData.price),
            quantity: 1
        };

        const url = Constants.API_URL_UPDATE_PRODUCT;

        fetch(url, {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify(productToUpdate),
              
          })
          .then(response => response.json())
          .then(responseFromServer => {
            console.log(productToUpdate)
            console.log(responseFromServer);
          })
          .catch((error) => {
            console.log(error)
            alert(error);
          });
          props.OnProductUpdated(productToUpdate);
    };


    return (
    <div>
        <form className='w-100 px-5'>
            <h1 className='mt-5'>Update the "{props.product.name}" </h1>


            <div className='mt-5'>
                <label className='h3 form-label'>Name</label>
                <input value={formData.name} name='name' type="text" className="form-control" onChange={handleChange}/>
            </div>
            
            <div className='mt-4'>
                <label className='h3 form-label'>Description</label>
                <input value={formData.description} name='description' type="text" className="form-control" onChange={handleChange}/>
            </div>

            <div className='mt-5'>
                <label className='h3 form-label'>Image URL</label>
                <input value={formData.imageUrl} name='imageUrl' type="text" className="form-control" onChange={handleChange}/>
            </div>
            
            <div className='mt-3'>
                <label className='h3 form-label'>Price</label>
                <input value={formData.price} name='price' type="number" className="form-control" onChange={handleChange}/>
            </div>


            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
            <button onClick={() => props.OnProductUpdated(null)} className="btn btn-danger btn-lg w-100 mt-3">Cancel</button>
        </form>
    </div>
  );
}
