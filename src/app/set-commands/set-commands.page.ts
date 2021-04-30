import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-set-commands',
  templateUrl: './set-commands.page.html',
  styleUrls: ['./set-commands.page.scss'],
})
export class SetCommandsPage implements OnInit {
  location:string="getLocation";
  contact:string="getContact";
  ringer:string="setRinger";
  lock:string="lock";
  constructor(public alertController: AlertController) { }

  ngOnInit() {
    this.location=window.localStorage.getItem('location')?window.localStorage.getItem('location'):this.location;
    this.contact=window.localStorage.getItem('contact')?window.localStorage.getItem('contact'):this.contact;
    this.ringer=window.localStorage.getItem('ringer')?window.localStorage.getItem('ringer'):this.ringer;
    this.lock=window.localStorage.getItem('lock')?window.localStorage.getItem('lock'):this.lock;
  }
  async updateCommands(){
    window.localStorage.setItem('location',this.location);
    window.localStorage.setItem('contact',this.contact);
    window.localStorage.setItem('ringer',this.ringer);
    window.localStorage.setItem('lock',this.lock);
    const alert = await this.alertController.create({
      message: 'Commands Updated Successfully',
      buttons: ['OK']
    });
    await alert.present();
  }

}
