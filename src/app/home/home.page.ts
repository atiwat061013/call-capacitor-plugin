import { Component } from '@angular/core';
import { HuaweiMlkit } from 'hwmlkit';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  result: any;
  image: any;


  constructor() {}

  async onClickTextRec() {
    await HuaweiMlkit.TextRecognition({language:"en", base64: this.image?.replace(/^data:image\/\w+;base64,/, "")})
      .then((res: any) => {
        this.result = res.value;
        console.log('result ==>', this.result.value);
      })
      .catch((err) => {
        this.result = err;
        console.log('err ==>', this.result);
      });
  }

  onClickInput() {
    document.getElementById('inputimage').click();
  }

  fileChangeChange(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.image = event.target.result;
        console.log('imageAds', this.image);
        
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }



  // async onClickFaceVerification() {
  //   await HuaweiMlkit.faceVerification({
  //     faceTem: "dsd",
  //     faceCom: "dsds"
  //   })
  //     .then((res: any) => {
  //       console.log('result ==>', this.result.value);
  //     })
  //     .catch((err) => {
  //       console.log('err ==>', this.result);
  //     });
  // }

}
