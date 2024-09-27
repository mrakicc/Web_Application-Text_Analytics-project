import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private token: string;

  constructor() {
    this.token = "";
  }

  public setToken(token: string):void {
    localStorage.setItem("token", token);
  }

  getToken():string{
    if(localStorage.getItem("token") === null)
    {
      return "";
    }
    let value = localStorage.getItem("token");
    if(typeof value === 'string')
    {
      this.token = value;
    }
    return  this.token;

  }
}
