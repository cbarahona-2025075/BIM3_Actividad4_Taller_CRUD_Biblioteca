import { readFile, writeFile } from "fs/promises";
import { Libro } from "../models/Libro";

export class LibroRepository {

    //Ruta donde se almacenara el json de libros
    private ruta = "./src/data/libros.json";

    //Metodo para obtener libros | mostrar los datos
    async obtenerLibro(): Promise<Libro[]> {

        try {
            const datos = await readFile(this.ruta, "utf-8");

            return JSON.parse(datos);
        } catch (error) {
            return [];
        }
    }

    // Metodo para guardar libros | para actualizar
    async guardarLibros(libros: Libro[]): Promise<void> {
        try {

            await writeFile(
                this.ruta,
                JSON.stringify(libros, null, 4)
            );
        } catch (error) {
            console.log("Error al guardar.");
            throw error;
        }
    }
}