import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-commands',
  templateUrl: './show-commands.page.html',
  styleUrls: ['./show-commands.page.scss'],
})
export class ShowCommandsPage implements OnInit {
  location:string="getLocation";
  contact:string="getContact";
  ringer:string="setRinger";
  lock:string="lock";
  constructor() { }

  ngOnInit() {
    this.location=window.localStorage.getItem('location')?window.localStorage.getItem('location'):this.location;
    this.contact=window.localStorage.getItem('contact')?window.localStorage.getItem('contact'):this.contact;
    this.ringer=window.localStorage.getItem('ringer')?window.localStorage.getItem('ringer'):this.ringer;
    this.lock=window.localStorage.getItem('lock')?window.localStorage.getItem('lock'):this.lock;
  }

}
