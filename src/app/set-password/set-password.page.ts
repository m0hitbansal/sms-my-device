import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.page.html',
  styleUrls: ['./set-password.page.scss'],
})
export class SetPasswordPage implements OnInit {
  password:string="aliensoft"
  constructor(public alertController: AlertController) { }

  ngOnInit() {
    this.password=window.localStorage.getItem('password')?window.localStorage.getItem('password'):this.password;
  }
  async updatePassword(){
    window.localStorage.setItem('password',this.password);
    const alert = await this.alertController.create({
      message: 'Password Updated Successfully',
      buttons: ['OK']
    });
    await alert.present();
  }

}
