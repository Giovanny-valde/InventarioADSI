import { Persona } from "./persona";
import { Rol } from "./rol";

export class Usuario {
    public id: number=0;
    public username: String="";
    public password: String="";
    public activo: boolean=true;
    idPersona!: Persona;
}
