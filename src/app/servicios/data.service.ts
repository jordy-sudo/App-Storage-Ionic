import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AlertController, NavController } from '@ionic/angular';
import Swal from 'sweetalert2';

var registro = []
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController, private alertController: AlertController) {
    storage.create();
    storage.get('Registros').then((item) => {
      console.log(item)
      if (item) {
        registro = item;
        console.log(registro)
      } else {
        registro = [];
      }

    }).catch((e) => {
      registro = [];
    })



  }

  registro_nuevo(user_new, psw_new) {
    var newRegistro = {
      user_new: user_new,
      psw_new: psw_new
    };
    registro.push(newRegistro)
    this.guardar(newRegistro);
    console.log(registro)
  }

  getUser() {
    // return this.http.get('https://jsonplaceholder.typicode.com/users')
    return this.http.get('https://my-json-server.typicode.com/AndreaGonzalez14/dataJSONPlataformasMoviles/estudiantes')
  }

  guardar(registro) {
    this.storage.set('Registros', registro)
    this.persistencia();
  }
  persistencia() {

    var per = this.storage['Registros'] = JSON.stringify(registro);

    this.storage.set('Registros', JSON.parse(per))


    console.log(this.storage['Registros'])
  }


  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ingresa tu usuario!',
      inputs: [
        {
          name: 'Nombre',
          type: 'text',
          placeholder: 'Ingres tu usuario'
        },
        {
          name: 'Password',
          type: 'password',
          placeholder: 'Ingresa tu password',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 4,
            inputmode: 'decimal'
          }
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            console.log('Confirm Ok');
            console.log(data.Nombre)
            
            if(data.Nombre){
              this.registro_nuevo(data.Nombre, data.Password)
              Swal.fire({
                title: 'Registro Exitoso',
                text: 'Ahora puedes ingresar con tu nuevo usuario',
                icon: 'success',
              })
            }else{
              Swal.fire({
                title: 'Campos vacios',
                text: 'No se peude ingresar el usuario',
                icon: 'error',
              })
            }
            
            //this.guardar(data.Nombre,data.Password);
          }
        }
      ]
    });

    await alert.present();
  }
  capturar: any
  contra: any
  Registro_validar(usuario, psw) {
    if (registro.length == 0) {
      Swal.fire({
        title: 'No existen usuarios',
        text: 'Ingresa un usuario',
        icon: 'warning',
      })
      this.presentAlertPrompt();
    } else {
      //aqui corte
      this.storage.forEach((value, key, index) => {
        index = registro.length
        //console.log(index)
        //console.log(value)
        var sw = false;
        for (let i = 0; i < index; i++) {
          if (value[i].user_new == usuario && value[i].user_new) {
            console.log("Encontro en: " + i);
            sw = true;
          }
        }
        if (sw == false) {
          Swal.fire({
            title: 'No se encontro el Usuario',
            text: 'Deseas ingresar un nuevo usuario?',
            icon: 'error',
            showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {
  
              this.presentAlertPrompt();
              
              
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Ok',
                'Trata con un diferente usuario :)',
                'error'
              )
            }
          })
        } else {
          Swal.fire({
            title: 'Registro Exitoso',
            text: 'Bienvenido: '+usuario,
            icon: 'success',
          })
          this.navCtrl.navigateForward('/home/principal');
        }
      })




    }


  }




}
