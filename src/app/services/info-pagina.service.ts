import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina';
import { InfoEquipo } from '../interfaces/info-equipo';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada= false;

  equipo: InfoEquipo;

  constructor(private http: HttpClient) { 
    console.log('Servicio de info pagina listo');

    this.cargarInfo();
    this.cargarEquipo();
      
  }

  private cargarInfo(){
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp:InfoPagina )=>{
      this.cargada = true;
      this.info = resp;
    });
  }

  private cargarEquipo(){
    this.http.get('https://angular-html-portafolio-udemy.firebaseio.com/equipo.json')
    .subscribe( (resp:InfoEquipo )=>{
      this.cargada = true;
      this.equipo = resp;
    });

  }

}
