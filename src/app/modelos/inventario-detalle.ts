import { Elemento } from "./elemento";
import { Inventario } from "./inventario";
import { Usuario } from "./usuario";

export class InventarioDetalle {
    public id: number=0;
    public cantidad: String="";
    public observacion: String="";
    public idElemento!: Elemento;
    public idInventario!: Inventario;
    public idUsuario!: Usuario;
}
