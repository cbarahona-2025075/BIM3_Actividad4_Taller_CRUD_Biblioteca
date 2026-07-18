import { UsuarioRepository } from "../data/UsuarioRepository";
import { Usuario } from "../models/Usuario";
import { UsuarioService } from "./UsuarioService";

export class AuthService {
    private repository = new UsuarioRepository();
    private usuarioService = new UsuarioService();

    async login(correo:string, contrasena: string): Promise<Usuario | undefined> {
        const usuarios = await this.repository.obtenerUsuario();

        const usuarioRegistrado = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
        
        if(usuarioRegistrado){
            console.log("INICIO DE SESIÓN CORRECTAMENTE")
            return usuarioRegistrado;
        }  
        
        console.log("CREDENCIALES INVÁLIDAS")
        return undefined;
    }

    async register(usuario:Usuario): Promise<void>{
        await this.usuarioService.agregar(usuario);
    }
}