import { EditorialRepository } from "../data/EditorialRepository";
import { Editorial } from "../models/Editorial";
import { validarEditorial } from "../utils/EditorialValidaciones";

export class EditorialService {
    private repository = new EditorialRepository();

    async listar(): Promise<Editorial[]> {
        return await this.repository.obtenerEditorial();
    }

    async agregar(editorial: Editorial): Promise<void> {
        try {
            validarEditorial(editorial);

            const editoriales = await this.repository.obtenerEditorial();

            const existe = editoriales.some(e => e.id === editorial.id);
            if (existe) {
                console.log("YA EXISTE UNA EDITORIAL CON ESE ID");
                return;
            }

            editoriales.push(editorial);
            await this.repository.guardarEditoriales(editoriales);
            console.log("EDITORIAL AGREGADA CORRECTAMENTE")
        } catch (error) {
            console.log("ERROR AL GUARDAR UNA EDITORIAL: " + (error as Error).message);
        }
    }

    async buscar(id: number): Promise<Editorial | undefined> {
        const editoriales = await this.repository.obtenerEditorial();
        return editoriales.find(e => e.id === id)
    }

    async actualizar(editorial: Editorial): Promise<void> {
        try {
            validarEditorial(editorial);

            const editoriales = await this.repository.obtenerEditorial();

            const indice = editoriales.findIndex(e => e.id === editorial.id);
            if (indice === -1) {
                console.log("EDITORIAL NO EXISTE");
                return
            }
            editoriales[indice] = editorial;

            await this.repository.guardarEditoriales(editoriales);
            console.log("EDITORIAL ACTUALIZADA CORRECTAMENTE")
        } catch (error) {
            console.log("ERROR AL GUARDAR UNA EDITORIAL: " + (error as Error).message);
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            const editoriales = await this.repository.obtenerEditorial();

            const nuevas = editoriales.filter(e => e.id !== id);
            if (nuevas.length === editoriales.length) {
                console.log("EDITORIAL NO ENCONTRADA");
                return;
            }

            await this.repository.guardarEditoriales(nuevas);
            console.log("EDITORIAL ELIMINADA CORRECTAMENTE")
        } catch (error) {
            console.log("ERROR AL ELIMINAR UNA EDITORIAL")
        }
    }
}