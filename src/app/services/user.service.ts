import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
  public url: string;
  public identity;
  public token;
  
  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }
  
  register(user_to_register){
    let params = JSON.stringify(user_to_register);
    let headers = new Headers({'Content-Type':'application/json'});
    
    return this._http.post(this.url+'auth/user/create', params, {headers: headers}).pipe(map(res => res.json()));
  }
  
  signup(user_to_login){
    let params = JSON.stringify(user_to_login);
    let headers = new Headers({'Content-Type':'application/json'});
    
    return this._http.post(this.url+'auth/user/authenticate', params, {headers: headers}).pipe(map(res => res.json()));
  }
  
  solCard(card){
    let params = JSON.stringify(card);
    let token = this.getToken();
    let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
    
    return this._http.post(this.url+'accounts', params, {headers: headers}).pipe(map(res => res.json()));
  }
  
  getAccounts(){
    let token = this.getToken();
    let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
    
    return this._http.get(this.url+'accounts', {headers: headers}).pipe(map(res => res.json()));
  }
  
  getCards(){
    let token = this.getToken();
    let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
    
    return this._http.get(this.url+'catalogs/cards', {headers: headers}).pipe(map(res => res.json()));
  }  
  
  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    
    if(identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }
    
    return this.identity;
  }
  
  getToken(){
    let token = localStorage.getItem('token');
    
    if(token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }
    
    return this.token;
  }
}