import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guardar-historial-administrador',
  templateUrl: './guardar-historial-administrador.component.html',
  styleUrls: ['./guardar-historial-administrador.component.css']
})
export class GuardarHistorialAdministradorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  estados = ['perfecto', 'Bueno', 'En reparación', 'Malo'];
  inventario = [{
      categoria: 'mouse',
      imagen: 'https://m.media-amazon.com/images/I/818eEM-H9uL._AC_SL1500_.jpg',
      marca: 'lenovo',
      cantidad: '25',
      estado: this.estados[0],
    },
    {
      categoria: 'teclado alámbrico',
      imagen: 'https://m.media-amazon.com/images/I/51eTowGqy3S._AC_SY450_.jpg',
      marca: 'lenovo',
      cantidad: '15',
      estado: this.estados[1],
    },
    {
      categoria: 'torres',
      //imagen de torres
      imagen: 'https://www.lenovo.com/medias/m900-twr-hero.png?context=bWFzdGVyfGltYWdlc3w4NDY2MnxpbWFnZS9wbmd8aW1hZ2VzL2hmZC9oNmEvOTM5MzQzMDIzMzExOC5wbmd8YzNjMzc5YTVhYzQ4NmJkYjZiZGJkN2U3NzA2NjBkZGI1MjEwZDYyNWQ2YTcwN2Y3M2Q2MmE2N2E1NjFlYWI5MQ',
      marca: 'lenovo',
      cantidad: '15',
      estado: this.estados[2],
    },
    {
      categoria: 'cargadores',
      //imagen de cargadores
      imagen: 'https://ciberwebsupport.com/wp-content/uploads/2020/06/3-30-600x450.jpg',
      marca: 'hp',
      cantidad: '10',
      estado: this.estados[0],
    },
    {
      categoria: 'monitor',
      //imagen de monitor
      imagen: 'https://m.media-amazon.com/images/I/61Uogvag3ML._AC_SL1500_.jpg',
      marca: 'lenovo',
      cantidad: '15',
      estado: this.estados[0],
    }
  ];

  ambientes=[
    {
      codigo: '901',
      cantidadBloques: 2,
    },
    {
      codigo: '902',
      cantidadBloques: 4,
    },
    {
      codigo: '903',
      cantidadBloques: 10,
    },
  ]
  ambiente:any="";
  bloque:any="";
  elements:any="";
  cambiarBloque(ambiente:any){
    this.ambiente=document.getElementById(ambiente);
    this.bloque=document.getElementById("bloque");

    /*CODIGO -> */

    this.elements = document.getElementsByClassName('op');
    while(this.elements.length > 0){
        this.elements[0].parentNode.removeChild(this.elements[0]);
    }


    for(let i=0;i<this.ambientes.length;i++){
      
      if(this.ambientes[i].codigo==this.ambiente.value){
        for(let j=0;j<this.ambientes[i].cantidadBloques;j++){
            
            this.bloque.innerHTML+= this.ambientes[i].codigo+ ` <option class='op' value="${j+1}">Bloque ${j+1}</option>`;
        }
        
      }
      
    }
    

  }

}
