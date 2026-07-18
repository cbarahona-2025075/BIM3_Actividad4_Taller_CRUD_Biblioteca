import { EstadoLibro } from "../models/EstadoLibro";
import { Libro } from "../models/Libro";

const anioActual = new Date().getFullYear();

export function validarLibro(libro: Libro): void {

    if (typeof libro.id !== "number" || isNaN(libro.id) || libro.id <= 0 || !Number.isInteger(libro.id)) {
        throw new Error("El ID debe ser un número entero mayor a 0.");
    }

    if (!libro.titulo || libro.titulo.trim().length < 2 || libro.titulo.length > 200) {
        throw new Error("El titulo de un libro debe tener entre 2 y 200 caracteres.");
    }

    if (!libro.autor || libro.autor.trim().length < 3 || libro.autor.trim().length > 60) {
        throw new Error("El nombre del autor debe tener entre 3 y 60 caracteres.");
    }

    if (typeof libro.anioPublicacion !== "number" || isNaN(libro.anioPublicacion) || libro.anioPublicacion <= 1450 || !Number.isInteger(libro.anioPublicacion)) {
        throw new Error("El año de publicacion debe ser un número entero mayor a 1450.");
    }

    if (libro.anioPublicacion > anioActual) {
        throw new Error("El año de publicacion no puede ser mayor al año Actual");
    }

    if (!Object.values(EstadoLibro).includes(libro.estadoLibro)) {
        throw new Error(`El estado "${libro.estadoLibro}" no es válido.`);
    }

    if (typeof libro.editorialId !== "number" || isNaN(libro.editorialId) || libro.editorialId <= 0 || !Number.isInteger(libro.editorialId)) {
        throw new Error("El ID de la editorial debe ser un número entero mayor a 0.");
    }

}