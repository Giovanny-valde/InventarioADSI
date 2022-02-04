import { Empresa } from "./empresa";

export class Sede {
    public id:number=0;
    public nombre:String="";
    public direccion:String="";
    public activo: boolean=true;
    idEmpresa!: Empresa;
}
