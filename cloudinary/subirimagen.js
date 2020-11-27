import React, { useState } from 'react';
import axios from 'axios';

const SubirImagen = () => {

    const [ imagen, guardarImagen ] = useState('');
    const [ cargando, guardarCargando ] = useState(false);

    const SubirACloudinary = async e => {
        const files = e.target.files[0];
        const formData = new FormData();
        formData.append('upload_preset', 'pets_preset');
        formData.append('file', files);
        guardarCargando(true);

        try {
            const res = await axios.post(`https://api.cloudinary.com/v1_1/petportrait/upload`, formData)
            guardarImagen(res.data.secure_url)
            guardarCargando(false)
            console.log(res);
        } catch (error) {
            console.log(error);
        }

    }

    return (  
        <div>
            <input 
                type="file"
                name="file"
                onChange={ SubirACloudinary }
            />
            { cargando ? <h1>Cargando</h1> : <img className="clase" width="500" src={ imagen } /> }
        </div>
    );
}
 
export default SubirImagen;