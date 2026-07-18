import { UsuarioRepository } from "../data/UsuarioRepository";
import { Usuario } from "../models/Usuario";
import { validarUsuario } from "../utils/UsuarioValidaciones";


export class UsuarioService {
    private repository = new UsuarioRepository();

    //Metodo para obtener usuarios
    async listar(): Promise<Usuario[]> {
        return await this.repository.obtenerUsuario();
    }

    //Metodo para agregarUsuarios | actualizar | eliminar
    async agregar(usuario: Usuario): Promise<void> {
        try {

            validarUsuario(usuario);

            const usuarios = await this.repository.obtenerUsuario();

            const existe = usuarios.some(u => u.id === usuario.id);

            if (existe) {
                console.log("YA EXISTE UN USUARIO CON ESE ID");
                return;
            }

            usuarios.push(usuario);

            await this.repository.guardarUsuarios(usuarios);

            console.log("USUARIO AGREGADO CORRECTAMENTE")
        } catch (error) {
            console.log("ERROR AL GUARDAR UN USUARIO: " + (error as Error).message);
        }
    }

    //Metodo para buscar
    async buscar(id: number): Promise<Usuario | undefined> {
        const usuarios = await this.repository.obtenerUsuario();

        return usuarios.find(u => u.id === id)
    }


    //Metodo para actualizar
    async actualizar(usuario: Usuario): Promise<void> {

        try {

            validarUsuario(usuario);

            const usuarios = await this.repository.obtenerUsuario();

            const indice = usuarios.findIndex(u => u.id === usuario.id);

            if (indice === -1) {
                console.log("USUARIO NO EXISTE");
                return
            }
            usuarios[indice] = usuario;

            await this.repository.guardarUsuarios(usuarios);

            console.log("USUARIO ACTUALIZADO CORRECTAMENTE")
        } catch (error) {
            console.log("ERROR AL GUARDAR UN USUARIO: " + (error as Error).message);
        }
    }

    //Metodo para eliminar
    async eliminar(id: number): Promise<void> {
        try {
            const usuarios = await this.repository.obtenerUsuario();

            const nuevos = usuarios.filter(u => u.id !== id);

            if (nuevos.length === usuarios.length) {
                console.log("USUARIO NO ENCONTRADO");
                return;
            }

            await this.repository.guardarUsuarios(nuevos);
            console.log("USUARIO ELIMINADO CORRECTAMENTE")
        } catch (error) {
            console.log("ERROR AL ELIMINAR UN USUARIO")
        }
    }
}