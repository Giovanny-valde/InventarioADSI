import { Sede } from "./sede";

export class Ambiente {

    public id: Number=0;
    public nombre: String="";
    public descripcion: String="";
    public capacidad: Number=0;
    public activo: boolean=true;
    public bloque: String ="";
    idSede!: Sede;
}
