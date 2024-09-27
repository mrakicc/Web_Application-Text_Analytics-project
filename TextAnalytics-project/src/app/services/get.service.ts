import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {observable, Observable} from "rxjs";
import {HistoryComponent} from "../components/history/history.component";

@Injectable({
  providedIn: 'root'
})
export class GetService {

  include:string = "";
  private urlEntity:string  = "";
  private urlSimilarity:string  = "";
  private urlLanguage:string  = "";
  private urlAnalysis:string  = "";
  private readonly token = localStorage.getItem("token");
  private similarity:any;
  now = new Date();

  constructor(private httpClient : HttpClient) { }

  getEntity(text:string,minConfidence:number,include:string):Observable<any>{
    this.urlEntity = "https://api.dandelion.eu/datatxt/nex/v1/?lang=en";
    // console.log(this.url+"&text="+text+"&include="+include+"&min_confidence="+minConfidence+"&token="+this.token);
    text = text.replaceAll(" ","%20");
    // console.log(text);
    this.urlEntity += "&text="+text+"&min_confidence="+minConfidence+"&token="+this.token;
    if(include.length > 0)
    {
      this.urlEntity += "&include="+include;
    }
    // console.log(this.urlEntity);
    HistoryComponent.urls.push(this.now.toLocaleString() + " GET " + this.urlEntity);
    return this.httpClient.get(this.urlEntity,{observe:'response'});
  }

  createInclude(image:boolean, abstract:boolean, categories:boolean):string{
    this.include = "";

    if(image)
    {
      this.include += "image,";
    }
    if(abstract)
    {
      this.include += "abstract,";
    }
    if(categories)
    {
      this.include += "categories,";
    }

    this.include = this.include.slice(0,-1);

    return this.include;
  }

  getSimilarity(firstText:string, secondText:string):Observable<any>{
    firstText = firstText.replaceAll(" ","%20");
    secondText = secondText.replaceAll(" ","%20");
    this.urlSimilarity = "https://api.dandelion.eu/datatxt/sim/v1/?lang=en&text1="+firstText+"&text2="+secondText+"&token=" + this.token
    HistoryComponent.urls.push(this.now.toLocaleString() + " GET " + this.urlSimilarity);
    return this.httpClient.get(this.urlSimilarity, {observe:'response'});
  }

  getLanguage(text:string, clean:boolean):Observable<any>{
    text = text.replaceAll(" ","%20");
    this.urlLanguage = "https://api.dandelion.eu/datatxt/li/v1/?text=" + text + "&clean=" + clean + "&token=" + this.token;
    HistoryComponent.urls.push(this.now.toLocaleString() + " GET " +this.urlLanguage);
    return this.httpClient.get(this.urlLanguage, {observe:'response'});
  }

  getAnalysis(text:string, lang:string):Observable<any>{
    text = text.replaceAll(" ", "%20");
    this.urlAnalysis = "https://api.dandelion.eu/datatxt/sent/v1/?lang=" + lang + "&text=" + text + "&token=" + this.token;
    HistoryComponent.urls.push(this.now.toLocaleString() + " GET " + this.urlAnalysis)
    return this.httpClient.get(this.urlAnalysis, {observe:'response'});
  }

}
