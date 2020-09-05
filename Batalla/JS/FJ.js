/*
 * Validaciones y otras funciones
 * 
 * Francisco Javier Rodríguez Hernández
 * 
 * Version 0.1
*/

//Expresiones usadas, se pueden modificar dependiendo las necesidades.

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const isValidUser = (User) => expresiones.usuario.test(User);  // validar usuario, no admite acentos, ni caracteres raros ni espacio

const isValidName = (Name) => expresiones.nombre.test(Name); //Nombres que admiten acentos y espacios

const isValidPass = (Password) => expresiones.password.test(Password); // entre 4 y 12 caracteress

const isValidMail = (Email) => expresiones.correo.test(Email); // revisa que el correo tenga un @ y un punto.

const isValidPhone = (Phone) => expresiones.telefono.test(Phone); //revisa que solo sean numeros minimo 7 maximo 14