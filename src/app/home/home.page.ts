import { Component } from '@angular/core';

import { AlertController, NavController } from '@ionic/angular';
import { DataService } from '../servicios/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {



  //obtenidos de los datos almacenados
  usuario: any;
  password: any;
  //obtenienen los datos del front-end
  usuario_: any;
  psw: any;

  constructor(private alertController: AlertController, private navCtrl: NavController,private servicios:DataService) {}

  async ngOnInit(){
    
    //this.servicios.registro_nuevo('admin','1234')
    //this.servicios.pruebas()
   
  }

  validar(){
    this.usuario=((document.getElementById("usuario") as HTMLInputElement).value);
    this.psw=((document.getElementById("password") as HTMLInputElement).value); 
    this.servicios.Registro_validar(this.usuario,this.psw)    
  }

 

}
