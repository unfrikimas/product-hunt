export default function validarCrearProducto(valores) {
    let errores = {};

    //validar el nombre de usuario
    if(!valores.nombre) {
        errores.nombre = 'El nombre es obligatorio';
    } 

    //validar nombre de empresa
    if(!valores.empresa) {
        errores.empresa = 'El nombre de la empresa es obligatorio';
    }

    //validar url
    if(!valores.url) {
        errores.url = 'La URL es obligatoria';
    } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url) ) {
        errores.url = 'URL no válida';
    }

    //validar descripcion
    if(!valores.descripcion) {
        errores.descripcion = 'Agrega una descripcion de tu producto';
    }

    return errores;
}