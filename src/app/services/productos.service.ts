import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];
  cargando = true;

  constructor( private http: HttpClient) { 
    this.cargarProductos();
  }


    private cargarProductos(){
      return new Promise( (resolve, reject) => {
        this.http.get('https://angular-html-portafolio-udemy.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
      });
  }

  getProducto(id: string){
    return this.http.get(`https://angular-html-portafolio-udemy.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string){

    if (this.productos.length === 0){

      this.cargarProductos().then( () => {
        // cargar productos
        this.filtrarProductos(termino);
        // ejecutar despues de tener los productos
        // Aplicar filtro
      });

    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {

    console.log(this.productos);

    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if (prod.categoria.indexOf(termino)>= 0 || tituloLower.indexOf(termino)>= 0){
        this.productosFiltrado.push(prod);
      }
    });

  }

}
