import { Accion } from "./accion";
import { Inventario } from "./inventario";
import { Usuario } from "./usuario";

export class InventarioUsuario {
    public id: number=0;
    public observaciones: String="";
    idUsuario!: Usuario;
    idInventario!: Inventario;
    idAccion!: Accion;
}
