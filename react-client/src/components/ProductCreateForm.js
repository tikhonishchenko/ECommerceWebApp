import React, {useState} from 'react'
import Constants from "../utils/Constants";

export default function ProductCreateForm(props) {
    
    const initialFormData = Object.freeze({
        idString: "0000000",
        name: "product",
        description: "description",
        imageUrl: "",
        price: 0.00,
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

        const productToCreate = {
            id: 0,
            idString: formData.idString,
            name: formData.name,
            description: formData.description,
            imageUrl: formData.imageUrl,
            price: parseFloat(formData.price),
            quantity: 1
        };

        const url = Constants.API_URL_CREATE_PRODUCT;

        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify(productToCreate),
              
          })
          .then(response => response.json())
          .then(responseFromServer => {
            console.log(productToCreate)
            console.log(responseFromServer);
          })
          .catch((error) => {
            console.log(error)
            alert(error);
          });
          props.OnProductCreated(productToCreate);
    };


    return (
    <div>
        <form className='w-100 px-5'>
            <h1 className='mt-5'>Create new product</h1>

            <div className='mt-5'>
                <label className='h3 form-label'>Id</label>
                <input value={formData.idString} name='idString' type="text" className="form-control" onChange={handleChange}/>
            </div>

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
            <button onClick={() => props.onProductCreated(null)} className="btn btn-danger btn-lg w-100 mt-3">Cancel</button>
        </form>
    </div>
  );
}
