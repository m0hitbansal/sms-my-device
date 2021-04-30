import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform } from '@ionic/angular';
import { Contacts, Contact, ContactField, ContactAddress, ContactName,ContactFindOptions } from '@ionic-native/contacts/ngx';
import { AudioManagement } from '@ionic-native/audio-management/ngx';
import { Autostart } from '@ionic-native/autostart/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse,BackgroundGeolocationEvents,BackgroundGeolocationCurrentPositionConfig } from '@ionic-native/background-geolocation/ngx';

declare var SMS:any;

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  passcode:string="aliensoft";
  location:string="getLocation";
  contact:string="getContact";
  ringer:string="setRinger";
  lock:string="lock";
  num:string="";
  constructor(
    public platform:Platform,
    public androidPermissions: AndroidPermissions,
    private contacts: Contacts,
    public audioman: AudioManagement,
    private autostart: Autostart,
    private backgroundMode: BackgroundMode,
    private backgroundGeolocation: BackgroundGeolocation
  ){}
  ngOnInit() {
    this.autostart.enable();
    //this.backgroundMode.enable();
    const config: BackgroundGeolocationConfig = {
            desiredAccuracy: 10,
            stationaryRadius: 20,
            distanceFilter: 30,
            debug: false,
            stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };
    this.backgroundGeolocation.configure(config);

      this.backgroundGeolocation.start();
        /*.on(BackgroundGeolocationEvents.start)
        .subscribe((location: BackgroundGeolocationResponse) => {*/



          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
      //  });

    this.location=window.localStorage.getItem('location')?window.localStorage.getItem('location'):this.location;
    this.contact=window.localStorage.getItem('contact')?window.localStorage.getItem('contact'):this.contact;
    this.ringer=window.localStorage.getItem('ringer')?window.localStorage.getItem('ringer'):this.ringer;
    this.lock=window.localStorage.getItem('lock')?window.localStorage.getItem('lock'):this.lock;
    this.passcode=window.localStorage.getItem('password')?window.localStorage.getItem('password'):this.passcode;

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
    success => this.checkSMS(),
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
    );
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS,this.androidPermissions.PERMISSION.SEND_SMS,this.androidPermissions.PERMISSION.READ_CONTACTS,this.androidPermissions.PERMISSION.ACCESS_BACKGROUND_LOCATION,this.androidPermissions.	PERMISSION.ACCESS_FINE_LOCATION]);

   // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS,).then(
   // success => console.log('granted'),
   // err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
   // );
    //this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SEND_SMS]);
    }
    checkSMS(){
      this.platform.ready().then((readySource) => {

      if(SMS) SMS.startWatch(()=>{
                 console.log('watching started');
              }, Error=>{
             console.log('failed to start watching');
         });

        document.addEventListener('onSMSArrive', (e:any)=>{
             var sms = e.data.body;
             var number = e.data.address;
             console.log(number);
             var str=sms.split("\n");
             var length=str.length;
             var check=str[0];
             if(check=="$sms$"){
               var password=str[1];
               if(this.passcode!=password)
                  this.SendMySMS(number,"Incorrect Passcode");
                else{
                 var cmd=str[2];
                 if(length>3&&cmd==this.contact){
                   var name=str[3];
                   this.findName(name,number);
                 }
                 else if(cmd==this.ringer){
                   this.setAudioMode();
                   this.SendMySMS(number,"Audio Mode is set to Ringer");
                 }
                 else if(cmd==this.location){
                   this.num=number;
                   console.log("called");
                    this.getLocation();
                 }
                 else if(cmd==this.lock){

                 }
                 else
                  this.SendMySMS(number,"Invalid Command");
               }
             }


        });

      });
    }

    findName(name,number){
      var options      = new ContactFindOptions();
      options.filter   = name;
      options.multiple = true;
      options.hasPhoneNumber = true;
      this.contacts.find(['*'], options).then(
        (con) => {
          if(con.length>0){
            console.log(con[0]);
            var msg ="";
            for(var i=0;i<con[0].phoneNumbers.length;i++){
              msg+=con[0].phoneNumbers[i].value+"\n";
            }
            console.log(msg);
            this.SendMySMS(number,msg);
          }
          else{
            this.SendMySMS(number,"No Contact Found");
          }
        }
    );
    }
    SendMySMS(number:string,msg:string)
    {

    this.platform.ready().then((readySource) => {
      console.log(number);
      console.log(msg);
    if(SMS) SMS.sendSMS(number,msg,()=>{
       console.log("Sent");
      }, Error=>{
       console.log("Error occurs")
      });
      });

    }
    setAudioMode() {
       this.audioman.setAudioMode(AudioManagement.AudioMode.NORMAL)
         .then(() => {
          console.log('Device audio mode is now NORMAL');
         })
         .catch((reason) => {
           console.log(reason);
         });
      }
      getLocation(){
        const config: BackgroundGeolocationCurrentPositionConfig = {
                timeout: 10000,
                maximumAge: 10000,
                enableHighAccuracy: true// enable this to clear background location settings when the app terminates
        };
        console.log("get");
        this.backgroundGeolocation.getCurrentLocation(config).then((location:any)=>{
          console.log(location);
          let lat=location.latitude;
          let lng=location.longitude;
          let msg="Latitude : "+lat+"\nLongitude : "+lng;
          this.SendMySMS(this.num,msg);
        });

        /*this.backgroundGeolocation.stop();
        let lat=location.latitude;
        let lng=location.longitude;
        let msg="Latitude : "+lat+"\nLongitude : "+lng;
        this.SendMySMS(this.num,msg);*/
      }
  }
