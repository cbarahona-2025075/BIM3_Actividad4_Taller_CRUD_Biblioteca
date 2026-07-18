import { readFile, writeFile } from "fs/promises";
import { Editorial } from "../models/Editorial";

export class EditorialRepository {

    private ruta = "./src/data/editoriales.json";

    async obtenerEditorial(): Promise<Editorial[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            return [];
        }
    }

    async guardarEditoriales(editoriales: Editorial[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(editoriales, null, 4)
            );
        } catch (error) {
            console.log("Error al guardar.");
            throw error;
        }
    }
}