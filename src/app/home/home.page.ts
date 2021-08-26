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
  strImage: any;

  constructor() {}

  async onClickTextRec() {
    await HuaweiMlkit.textRec({ value: this.strImage })
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
        this.strImage = this.image.replace(/^data:image\/\w+;base64,/, "");
        console.log('imageAds', this.image);

        console.log('strImage =>', this.strImage);
        
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
