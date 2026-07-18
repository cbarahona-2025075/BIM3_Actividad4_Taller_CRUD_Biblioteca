import { TipoEditorial } from "./TipoEditorial";

export interface Editorial {
    id: number;
    nombre: string;
    pais: string;
    tipo: TipoEditorial;
}