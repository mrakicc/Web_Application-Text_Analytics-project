import { Component } from '@angular/core';
import {GetService} from "../../services/get.service";

@Component({
  selector: 'app-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.css']
})
export class SentimentAnalysisComponent {

  text : string = "";
  lang : string = "en";

  resType : string = "";
  resScore : string = "";
  inter : string = "";
  start:Array<number> = [120, 74, 5];
  end:Array<number> = [0, 232, 15];
  good:Array<number> = [];

  constructor(private getService : GetService) {
  }

  interpolateColor(factor:number): void {

    this.good = [];

    for (let i = 0; i < this.start.length; i++) {
      this.good.push(Math.round(this.start[i] +  (this.end[i] - this.start[i]) * factor));
    }
    // console.log(this.good);

  }

  getAnalysis():void{
    this.getService.getAnalysis(this.text, this.lang).subscribe(res=>{
      this.resType = res.body.sentiment.type;
      this.resScore = res.body.sentiment.score;
      // console.log(this.resScore);
      this.interpolateColor(parseFloat(this.resScore));
      // console.log(this.resType);
      // console.log(this.resScore);
    })
  }

}
