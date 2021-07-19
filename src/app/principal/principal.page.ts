import { Component, OnInit } from '@angular/core';
import { DataService } from '../servicios/data.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  public id: any;
  usuarios: Observable<any>
  constructor(private dataService: DataService, public alertController: AlertController,
    private navegar: NavController,private socialSharing: SocialSharing) {

  }

  ngOnInit() {
    this.usuarios = this.dataService.getUser();
    //console.log(this.usuarios)
  }
  abrir(user) {

    this.presentAlert(user);
  }


  async presentAlert(user) {
    console.log(user);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nombre: ' + user.name,
      subHeader: 'ID: ' + user.id,
      message: '<center>Informacion</center>' + '<br/>' + '<strong>Email</strong>: ' + '<br/>' + user.email + '<br/>' + '<strong>Username:</strong>' + '<br/>' + user.username + '<br/>' + '<strong>Ciudad:</strong>' + '<br/>' + user.address.city
        + '<br/>' + '<strong>phone: </strong>' + '<br/>' + user.phone + '<br/>' + '<strong>Codigo Postal: </strong>' + '<br/>' + user.address.zipcode,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  localizar(user) {
    var latitud = JSON.stringify(user.address.geo.lat)
    var longitud = JSON.stringify(user.address.geo.lng)
    latitud = latitud.replace(/['"]+/g, '')
    longitud = longitud.replace(/['"]+/g, '')
    console.log(latitud, longitud)

    this.navegar.navigateForward(`mapa/${latitud}/${longitud}`)
  }
  compartir(user){
    var text=`User: ${user.name} \nUsername: ${user.username} \nEmail: ${user.email} \nPhone: ${user.phone}`;
    //console.log(text)
    this.socialSharing.shareViaWhatsApp(text).then((resp) => {
      // Success!
      console.log(resp)
     }).catch((e) => {
      // Error!
     });
  }
 

}
