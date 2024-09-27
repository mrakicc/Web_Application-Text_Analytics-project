import { Component } from '@angular/core';
import {GetService} from "../../services/get.service";

@Component({
  selector: 'app-text-similarity',
  templateUrl: './text-similarity.component.html',
  styleUrls: ['./text-similarity.component.css']
})
export class TextSimilarityComponent {

  firstText:string = "";
  secondText:string = "";

  similarity:number  = 0;

  constructor(private getService : GetService) {
  }

  getSimilarity():void{
    this.getService.getSimilarity(this.firstText, this.secondText).subscribe(res =>{
      this.similarity = res.body.similarity * 100;
      // console.log(this.similarity);
    });
  }

}
