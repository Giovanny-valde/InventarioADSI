import { Estado } from "./estado";
import { TipoElemento } from "./tipo-elemento";
import { Zona } from "./zona";

export class Elemento {
    public id: number=0;
    public nombre: String="";
    public marca: String="";
    public serial: String="";
    public activo: boolean=true;
    idTipoElemento!: TipoElemento;
    idEstado!: Estado;
    idZona!: Zona;
}
