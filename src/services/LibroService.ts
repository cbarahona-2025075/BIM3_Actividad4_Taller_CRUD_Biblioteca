import { LibroRepository } from "../data/LibroRepository";
import { Libro } from "../models/Libro";
import { validarLibro } from "../utils/LibroValidaciones";
import { EditorialService } from "../services/EditorialService";

export class LibroService {
    private repository = new LibroRepository();
    private editorialService = new EditorialService();

    //Metodo para obtener libros
    async listar(): Promise<Libro[]> {
        return await this.repository.obtenerLibro();
    }

    //Metodo para agregarLibro | actualizar | eliminar
    async agregar(libro: Libro): Promise<void> {

        try {

            validarLibro(libro);

            const editorial = await this.editorialService.buscar(libro.editorialId);
            if (!editorial) {
                console.log("LA EDITORIAL NO EXISTE");
                return;
            }

            const libros = await this.repository.obtenerLibro();

            const existe = libros.some(u => u.id === libro.id);

            if (existe) {
                console.log("YA EXISTE UN LIBRO CON ESE ID");
                return;
            }

            libros.push(libro);

            await this.repository.guardarLibros(libros);

            console.log("LIBRO AGREGADO CORRECTAMENTE")
        } catch (error) {
            console.log("ERROR AL GUARDAR UN LIBRO: " + (error as Error).message);
        }
    }

    //Metodo para buscar
    async buscar(id: number): Promise<Libro | undefined> {
        const libros = await this.repository.obtenerLibro();

        return libros.find(l => l.id === id)
    }


    //Metodo para actualizar
    async actualizar(libro: Libro): Promise<void> {

        try {

            validarLibro(libro);

            const editorial = await this.editorialService.buscar(libro.editorialId);
            if (!editorial) {
                console.log("LA EDITORIAL NO EXISTE");
                return;
            }

            const libros = await this.repository.obtenerLibro();

            const indice = libros.findIndex(l => l.id === libro.id);

            if (indice === -1) {
                console.log("LIBRO NO EXISTE");
                return
            }
            libros[indice] = libro;

            await this.repository.guardarLibros(libros);

            console.log("LIBRO ACTUALIZADO CORRECTAMENTE")
        } catch (error) {
            console.log("ERROR AL GUARDAR UN LIBRO: " + (error as Error).message);
        }
    }

    //Metodo para eliminar
    async eliminar(id: number): Promise<void> {
        try {
            const libros = await this.repository.obtenerLibro();

            const nuevos = libros.filter(l => l.id !== id);

            if (nuevos.length === libros.length) {
                console.log("LIBRO NO ENCONTRADO");
                return;
            }

            await this.repository.guardarLibros(nuevos);
            console.log("LIBRO ELIMINADO CORRECTAMENTE")
        } catch (error) {
            console.log("ERROR AL ELIMINAR UN LIBRO")
        }
    }
}