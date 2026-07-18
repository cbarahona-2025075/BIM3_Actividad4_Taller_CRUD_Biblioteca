import { Estado } from "../models/Estado";
import { Rol } from "../models/Rol";
import { EstadoLibro } from "../models/EstadoLibro";
import { TipoEditorial } from "../models/TipoEditorial";

import { AuthService } from "../services/AuthService";
import { UsuarioService } from "../services/UsuarioService";
import { LibroService } from "../services/LibroService";
import { EditorialService } from "../services/EditorialService";

import { rl } from "../utils/Readline";

const authService = new AuthService();
const usuarioService = new UsuarioService();
const libroService = new LibroService();
const editorialService = new EditorialService();

export async function menuPrincipal() {
    let opcion = 0;
    do {
        console.log("\n| MENU PRINCIPAL |");
        console.log("1. INICIAR SESIÓN");
        console.log("2. REGISTRARSE");
        console.log("3. SALIR");

        opcion = Number(await rl.question("OPCION: "));

        switch (opcion) {
            case 1:
                const correoUsuario = await rl.question("CORREO: ");
                const contrasenaUsuario = await rl.question("CONTRASENA: ");

                const usuarioLogeado = await authService.login(correoUsuario, contrasenaUsuario);

                if (usuarioLogeado) {
                    await menuCruds();
                }

                break;
            case 2:
                const id = Number(await rl.question("ID: "));
                const nombre = await rl.question("NOMBRE: ");
                const apellido = await rl.question("APELLIDO: ");
                const edad = Number(await rl.question("EDAD: "));
                const correo = await rl.question("CORREO: ");
                const contrasena = await rl.question("CONTRASENA: ");
                const rolTexto = await rl.question("ROL (ADMIN/USUARIO): ");
                const estado = await rl.question("ESTADO (ACTIVO/INACTIVO/SUSPENDIDO): ");

                await authService.register({
                    id,
                    nombre,
                    apellido,
                    edad,
                    correo,
                    contrasena,
                    rol: rolTexto.toUpperCase() as Rol,
                    estado: estado.toUpperCase() as Estado
                });
                break;
            case 3:
                console.log("ELEGISTE LA OPCION SALIR", "\n",
                    "SALIENDO.....");
                rl.close();
                break;
            default:
                console.log("OPCION NO VÁLIDAD")
                break;
        }
    } while (opcion !== 3)
}

export async function menuCruds() {
    let opcion = 0;
    do {
        console.log("\n| MENU DE CRUDS |");
        console.log("1. CRUD DE USUARIOS");
        console.log("2. CRUD DE LIBROS");
        console.log("3. CRUD DE EDITORIALES");
        console.log("4. SALIR");

        opcion = Number(await rl.question("OPCION: "));

        switch (opcion) {
            case 1:
                console.log("ELEGISTE EL CRUD DE USUARIOS...")
                await menuUsuarios();
                break;
            case 2:
                console.log("ELEGISTE EL CRUD DE LIBROS...")
                await menuLibros();
                break;
            case 3:
                console.log("ELEGISTE EL CRUD DE EDITORIALES...")
                await menuEditoriales();
                break;
            case 4:
                console.log("ELEGISTE LA OPCION SALIR", "\n",
                    "SALIENDO.....");
                break;
            default:
                console.log("OPCION NO VÁLIDAD")
                break;
        }
    } while (opcion !== 4)
}

export async function menuUsuarios() {
    let opcion = 0;
    do {
        console.log("\n| MENU DE USUARIOS |");
        console.log("1. AGREGAR USUARIO");
        console.log("2. LISTAR USUARIO");
        console.log("3. BUSCAR USUARIO");
        console.log("4. ACTUALIZAR USUARIO");
        console.log("5. ELIMINAR USUARIO");
        console.log("6. SALIR");

        opcion = Number(await rl.question("OPCION: "));

        switch (opcion) {
            case 1:
                const id = Number(await rl.question("ID: "));
                const nombre = await rl.question("NOMBRE: ");
                const apellido = await rl.question("APELLIDO: ");
                const edad = Number(await rl.question("EDAD: "));
                const correo = await rl.question("CORREO: ");
                const contrasena = await rl.question("CONTRASENA: ");
                const rolTexto = await rl.question("ROL (ADMIN/USUARIO): ");
                const estado = await rl.question("ESTADO (ACTIVO/INACTIVO/SUSPENDIDO): ");

                await usuarioService.agregar({
                    id,
                    nombre,
                    apellido,
                    edad,
                    correo,
                    contrasena,
                    rol: rolTexto.toUpperCase() as Rol,
                    estado: estado.toUpperCase() as Estado
                });
                break;
            case 2:
                console.table(await usuarioService.listar());
                break;
            case 3:
                const idBuscar = Number(await rl.question("INGRESA EL ID A BUSCAR: "));
                const usuarioEncontrado = await usuarioService.buscar(idBuscar);
                console.table(usuarioEncontrado);
                break;
            case 4:
                const idActualizar = Number(await rl.question("ID DE USUARIO A ACTUALIZAR: "));
                const usuarioExistente = await usuarioService.buscar(idActualizar);

                if (!usuarioExistente) {
                    console.log("USUARIO NO ENCONTRADO");
                    break;
                }

                const nombreNuevo = await rl.question("NOMBRE NUEVO: ");
                const apellidoNuevo = await rl.question("APELLIDO NUEVO: ");
                const edadNueva = Number(await rl.question("EDAD NUEVA: "));
                const correoNuevo = await rl.question("CORREO NUEVO: ");
                const contrasenaNueva = await rl.question("CONTRASEÑA NUEVA: ");
                const rolTextoNuevo = await rl.question("ROL (ADMIN/USUARIO) NUEVO: ");
                const estadoNuevo = await rl.question("ESTADO (ACTIVO/INACTIVO/SUSPENDIDO) NUEVO: ");

                await usuarioService.actualizar({
                    id: idActualizar,
                    nombre: nombreNuevo,
                    apellido: apellidoNuevo,
                    edad: edadNueva,
                    correo: correoNuevo,
                    contrasena: contrasenaNueva,
                    rol: rolTextoNuevo.toUpperCase() as Rol,
                    estado: estadoNuevo.toUpperCase() as Estado
                });
                break;
            case 5:
                const idEliminar = Number(await rl.question("ID DEL USUARIO A ELIMINAR:"));
                await usuarioService.eliminar(idEliminar);
                break;
            case 6:
                console.log("ELEGISTE LA OPCION SALIR", "\n",
                    "SALIENDO.....");
                break;
            default:
                console.log("OPCION NO VÁLIDAD")
                break;
        }
    } while (opcion !== 6)
}

export async function menuLibros() {
    let opcion = 0;
    do {
        console.log("\n| MENU DE LIBROS |");
        console.log("1. AGREGAR LIBRO");
        console.log("2. LISTAR LIBRO");
        console.log("3. BUSCAR LIBRO");
        console.log("4. ACTUALIZAR LIBRO");
        console.log("5. ELIMINAR LIBRO");
        console.log("6. SALIR");

        opcion = Number(await rl.question("OPCION: "));

        switch (opcion) {
            case 1:
                const id = Number(await rl.question("ID: "));
                const titulo = await rl.question("TITULO: ");
                const autor = await rl.question("AUTOR: ");
                const anioPublicacion = Number(await rl.question("AÑO DE PUBLICACIÓN: "));
                const estadoLibroTexto = await rl.question("ESTADO LIBRO (DISPONIBLE/PRESTADO): ");
                const editorialId = Number(await rl.question("ID DE LA EDITORIAL: "));

                await libroService.agregar({
                    id,
                    titulo,
                    autor,
                    anioPublicacion,
                    estadoLibro: estadoLibroTexto.toUpperCase() as EstadoLibro,
                    editorialId
                });
                break;
            case 2:
                console.table(await libroService.listar());
                break;
            case 3:
                const idBuscar = Number(await rl.question("INGRESA EL ID A BUSCAR: "));
                const libroEncontrado = await libroService.buscar(idBuscar);
                console.table(libroEncontrado);
                break;
            case 4:
                const idActualizar = Number(await rl.question("ID DE LIBRO A ACTUALIZAR: "));
                const libroExistente = await libroService.buscar(idActualizar);

                if (!libroExistente) {
                    console.log("LIBRO NO ENCONTRADO");
                    break;
                }

                const tituloNuevo = await rl.question("TITULO NUEVO: ");
                const autorNuevo = await rl.question("AUTOR NUEVO: ");
                const anioPublicacionNuevo = Number(await rl.question("AÑO DE PUBLICACIÓN NUEVO: "));
                const estadoLibroTextoNuevo = await rl.question("ESTADO (DISPONIBLE/PRESTADO) NUEVO: ");
                const editorialIdNuevo = Number(await rl.question("ID DE LA EDITORIAL NUEVO: "));

                await libroService.actualizar({
                    id: idActualizar,
                    titulo: tituloNuevo,
                    autor: autorNuevo,
                    anioPublicacion: anioPublicacionNuevo,
                    estadoLibro: estadoLibroTextoNuevo.toUpperCase() as EstadoLibro,
                    editorialId: editorialIdNuevo
                });
                break;
            case 5:
                const idEliminar = Number(await rl.question("ID DEL LIBRO A ELIMINAR:"));
                await libroService.eliminar(idEliminar);
                break;
            case 6:
                console.log("ELEGISTE LA OPCION SALIR", "\n",
                    "SALIENDO.....");
                break;
            default:
                console.log("OPCION NO VÁLIDAD")
                break;
        }
    } while (opcion !== 6)
}

export async function menuEditoriales() {
    let opcion = 0;
    do {
        console.log("\n| MENU DE EDITORIALES |");
        console.log("1. AGREGAR EDITORIAL");
        console.log("2. LISTAR EDITORIAL");
        console.log("3. BUSCAR EDITORIAL");
        console.log("4. ACTUALIZAR EDITORIAL");
        console.log("5. ELIMINAR EDITORIAL");
        console.log("6. SALIR");

        opcion = Number(await rl.question("OPCION: "));

        switch (opcion) {
            case 1:
                const id = Number(await rl.question("ID: "));
                const nombre = await rl.question("NOMBRE: ");
                const pais = await rl.question("PAIS: ");
                const tipoTexto = await rl.question("TIPO (NACIONAL/INTERNACIONAL): ");

                await editorialService.agregar({
                    id,
                    nombre,
                    pais,
                    tipo: tipoTexto.toUpperCase() as TipoEditorial
                });
                break;
            case 2:
                console.table(await editorialService.listar());
                break;
            case 3:
                const idBuscar = Number(await rl.question("INGRESA EL ID A BUSCAR: "));
                const editorialEncontrada = await editorialService.buscar(idBuscar);
                console.table(editorialEncontrada);
                break;
            case 4:
                const idActualizar = Number(await rl.question("ID DE EDITORIAL A ACTUALIZAR: "));
                const editorialExistente = await editorialService.buscar(idActualizar);

                if (!editorialExistente) {
                    console.log("EDITORIAL NO ENCONTRADA");
                    break;
                }

                const nombreNuevo = await rl.question("NOMBRE NUEVO: ");
                const paisNuevo = await rl.question("PAIS NUEVO: ");
                const tipoTextoNuevo = await rl.question("TIPO (NACIONAL/INTERNACIONAL) NUEVO: ");

                await editorialService.actualizar({
                    id: idActualizar,
                    nombre: nombreNuevo,
                    pais: paisNuevo,
                    tipo: tipoTextoNuevo.toUpperCase() as TipoEditorial
                });
                break;
            case 5:
                const idEliminar = Number(await rl.question("ID DE LA EDITORIAL A ELIMINAR:"));
                await editorialService.eliminar(idEliminar);
                break;
            case 6:
                console.log("ELEGISTE LA OPCION SALIR", "\n",
                    "SALIENDO.....");
                break;
            default:
                console.log("OPCION NO VÁLIDAD")
                break;
        }
    } while (opcion !== 6)
}