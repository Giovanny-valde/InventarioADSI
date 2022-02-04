import { Ambiente } from "./ambiente";

export class Zona {
    public id:number=0;
    public codigo: number=0;
    public nombre:String="";
    public activo: boolean=true;
    idAmbiente!: Ambiente;
}
