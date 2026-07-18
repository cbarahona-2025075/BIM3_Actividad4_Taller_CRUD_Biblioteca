import { Usuario } from "../models/Usuario";
import { Rol } from "../models/Rol";
import { Estado } from "../models/Estado";

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DOMINIOS_PERMITIDOS = ["gmail.com", "outlook.com", "hotmail.com"];
const ESTADOS_VALIDOS: Estado[] = ["ACTIVO", "INACTIVO", "SUSPENDIDO"];

export function validarUsuario(usuario: Usuario): void {

    if (typeof usuario.id !== "number" || isNaN(usuario.id) || usuario.id <= 0 || !Number.isInteger(usuario.id)) {
        throw new Error("El ID debe ser un número entero mayor a 0.");
    }

    if (!usuario.nombre || usuario.nombre.trim().length < 3 || usuario.nombre.length > 20) {
        throw new Error("El nombre debe tener entre 3 y 20 caracteres.");
    }

    if (!usuario.apellido || usuario.apellido.trim().length < 3 || usuario.apellido.length > 20) {
        throw new Error("El apellido debe tener entre 3 y 20 caracteres.");
    }

    if (typeof usuario.edad !== "number" || isNaN(usuario.edad) || usuario.edad <= 0 || usuario.edad > 100 || !Number.isInteger(usuario.edad)) {
        throw new Error("La edad debe ser un número entero entre 1 y 100.");
    }

    if (!usuario.correo || !REGEX_CORREO.test(usuario.correo)) {
        throw new Error(`El correo "${usuario.correo}" no tiene un formato válido.`);
    }

    const dominio = usuario.correo.toLowerCase().split("@")[1];

    if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
        throw new Error("El correo debe ser de dominio gmail, outlook o hotmail.");
    }

    if (!usuario.contrasena || usuario.contrasena.length < 8) {
        throw new Error("La contraseña debe tener al menos 8 caracteres.");
    }

    if (!Object.values(Rol).includes(usuario.rol)) {
        throw new Error(`El rol "${usuario.rol}" no es válido.`);
    }

    if (!ESTADOS_VALIDOS.includes(usuario.estado)) {
        throw new Error(`El estado "${usuario.estado}" no es válido.`);
    }
}