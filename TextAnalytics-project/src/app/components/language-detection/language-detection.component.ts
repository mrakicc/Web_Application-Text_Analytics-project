import { Component } from '@angular/core';
import {GetService} from "../../services/get.service";

@Component({
  selector: 'app-language-detection',
  templateUrl: './language-detection.component.html',
  styleUrls: ['./language-detection.component.css']
})
export class LanguageDetectionComponent {

  text:string = "";
  clean: boolean = false;
  list:Array<any> = [];

  constructor(private getService : GetService) {

  }

  getlanguage():void{
    this.list = [];
    this.getService.getLanguage(this.text, this.clean).subscribe(res =>{
      for(let i=0;i<res.body.detectedLangs.length;i++) {
       this.list.push(res.body.detectedLangs[i].lang);
       this.list.push(res.body.detectedLangs[i].confidence);
      }
      // console.log(this.list);
    })
  }

}
