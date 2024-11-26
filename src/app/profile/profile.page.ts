import { Component, OnInit } from '@angular/core';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform, Platform } from '@ionic/angular';
/*import { Camera, CameraOptions } from '@ionic-native/camera/ngx';*/

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;

  constructor(private platform: Platform) {
    if(!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
   }
  async signIn() {
    this.user = await GoogleAuth.signIn();
    console.log('user:', this.user);

}
  async refresh() {
    const authCode = await GoogleAuth.refresh();
    console.log('refresh:',authCode);
}
  async signOut(){
    await GoogleAuth.signOut();
    this.user = null;

}
  
  ngOnInit() {
    this.user = null;
  }

}

/*export class AvatarPage {
  avatarImage: string = 'assets/avatar-placeholder.png';

  constructor(private camera: Camera) {}

  selectAvatar() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData: string) => {
      this.avatarImage = 'data:image/jpeg;base64,' + imageData;
    }, (err: string) => {
      console.log("Error: " + err);
    });
  }
} */