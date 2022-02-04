import { Ambiente } from "./ambiente";
import { Jornada } from "./jornada";

export class Inventario {
    public id: number=0;
    public fecha!: Date;
    idAmbiente!: Ambiente;
    idJornada!: Jornada;
}
