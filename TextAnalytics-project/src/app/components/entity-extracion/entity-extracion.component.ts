import { Component } from '@angular/core';
import {GetService} from "../../services/get.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-entity-extracion',
  templateUrl: './entity-extracion.component.html',
  styleUrls: ['./entity-extracion.component.css']
})
export class EntityExtracionComponent {
  text:string = "";
  minConfidence: number = 0;
  image: boolean = false;
  abstract : boolean = false;
  categories: boolean = false;
  include:string = "";
  listLabel:Array<any> = [];
  listImage:Array<any> = [];
  listAbstract:Array<any> = [];
  listCategories:Array<any> = [];
  constructor(private getService : GetService) {

  }

  getEntity():void {
    this.listAbstract = [];
    this.listCategories = [];
    this.listLabel = [];
    this.listImage = [];

    this.include = this.getService.createInclude(this.image, this.abstract, this.categories);
    this.getService.getEntity(this.text, this.minConfidence,this.include).subscribe(res =>{
      // console.log(res.body.annotations);
      for(let i=0;i<res.body.annotations.length;i++)
      {
        this.listLabel.push(res.body.annotations[i].label);
        if(this.image == true)
        {
          // console.log(res.body.annotations[i].image.full);
          this.listImage.push(res.body.annotations[i].image.full);
        }
        if(this.abstract == true)
        {

          // console.log(res.body.annotations[i].abstract);
          this.listAbstract.push(res.body.annotations[i].abstract);
        }
        if(this.categories == true)
        {
          // console.log(res.body.annotations[i].categories);
          this.listCategories.push(res.body.annotations[i].categories);
        }
      }
      // console.log(this.listAbstract+"");
    });
  }

}
