import { TipoDocumento } from "./tipo-documento";

export class Persona {
    public id: number=0;
    public nombres: String="";
    public apellidos: String="";
    public documento: string="";
    public telefono: string="";
    public email: String="";
    public direccion: String="";
    public activo: boolean=true;
    idTipoDocumento!: TipoDocumento;
}
