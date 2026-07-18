import { EstadoLibro } from "./EstadoLibro";

export interface Libro {
    id:number;
    titulo:string;
    autor:string;
    anioPublicacion: number;
    estadoLibro: EstadoLibro;
    editorialId: number;
}