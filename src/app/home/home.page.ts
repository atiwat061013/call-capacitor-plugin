import { Component } from '@angular/core';
import { HuaweiMlkit } from 'hwmlkit';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  result: any;
  image: any;

  imageFaceDetec: any;
  resultFaceDetec: any;
  resultFaceVerification: any;

  imageVerifiTem: any;
  imageVerifiCom: any;

  resultPicVerifiTem: any;
  resultPicVerifiCom: any;

  constructor(private sanitizer: DomSanitizer) {}

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


  onClickInputFaceDetec(){
    document.getElementById('inputFaceDetec').click();
  }

  fileFaceDetecChange(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageFaceDetec = event.target.result;
        console.log('imageFaceDetec', this.imageFaceDetec);
        
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async onClickFaceDetec() {
    await HuaweiMlkit.FaceDetection({FaceImage: this.imageFaceDetec?.replace(/^data:image\/\w+;base64,/, "")})
      .then((res: any) => {
        this.resultFaceDetec = res.value;
        console.log('result ==>', res);
      })
      .catch((err) => {
        this.resultFaceDetec = err;
        console.log('err ==>', this.resultFaceDetec);
      });
  }

  onClickInputFaceVerifiTem(){
    document.getElementById('inputFaceVerifiTem').click();
  }

  fileFaceVerifiTemChange(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageVerifiTem = event.target.result;
        console.log('imageVerifiTem', this.imageVerifiTem);
        
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ///com
  onClickInputFaceVerifiCom(){
    document.getElementById('inputFaceVerifiCom').click();
  }

  fileFaceVerifiComChange(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageVerifiCom = event.target.result;
        console.log('imageVerifiCom', this.imageVerifiCom);
        
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  async onClickFaceVerification() {
    await HuaweiMlkit.FaceVerification({faceTemplate: this.imageVerifiTem?.toString().replace(/^data:image\/\w+;base64,/, ""), faceCompare: this.imageVerifiCom?.toString().replace(/^data:image\/\w+;base64,/, "")}).then((res: any) => {
      
      this.resultFaceVerification = res;
      console.log('FaceVerification ==>',this.resultFaceVerification);
      this.resultPicVerifiTem = this.sanitizer.bypassSecurityTrustUrl("data:Image/*;base64,"+res.picTemplate);
      this.resultPicVerifiCom = this.sanitizer.bypassSecurityTrustUrl("data:Image/*;base64,"+res.picCom);
      
      // console.log('this.imageVerifiTem ==>',this.imageVerifiTem);
      
      
    }).catch((err) => {
      this.resultFaceVerification = err;
      console.log('err ==>', this.resultFaceVerification);
    });
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
