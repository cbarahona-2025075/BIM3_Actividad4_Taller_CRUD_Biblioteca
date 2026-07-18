import { TipoEditorial } from "../models/TipoEditorial";
import { Editorial } from "../models/Editorial";

export function validarEditorial(editorial: Editorial): void {

    if (typeof editorial.id !== "number" || isNaN(editorial.id) || editorial.id <= 0 || !Number.isInteger(editorial.id)) {
        throw new Error("El ID debe ser un número entero mayor a 0.");
    }

    if (!editorial.nombre || editorial.nombre.trim().length < 2 || editorial.nombre.length > 60) {
        throw new Error("El nombre de la editorial debe tener entre 2 y 60 caracteres.");
    }

    if (!editorial.pais || editorial.pais.trim().length < 3 || editorial.pais.length > 40) {
        throw new Error("El país debe tener entre 3 y 40 caracteres.");
    }

    if (!Object.values(TipoEditorial).includes(editorial.tipo)) {
        throw new Error(`El tipo "${editorial.tipo}" no es válido.`);
    }
}