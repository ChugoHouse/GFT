import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserService]
})
export class LoginComponent implements OnInit{
  public title: string;
  public user: User;
  public identity;
  public token;
  public decodedToken;
  public expirationDate;
  public isExpired;
  public status: string;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = 'Identificate';
    this.user = new User('','','','');
  }
  
  ngOnInit(){
    console.log('login.component cargado !!');
  }
  
  onSubmit(loginForm){
    this._userService.signup(this.user).subscribe(
      response => {
        if(response.token){
          this.token = response.token;
          localStorage.setItem('token',this.token);
          localStorage.setItem('identity',JSON.stringify(helper.decodeToken(this.token)));
          
          this.user = new User('','','','');
          loginForm.reset();
          this.status = 'success';
          this._router.navigate(['/cuentas']);
        }
      },
      error => {
        const errorMessage = <any>error;
        
        if(errorMessage != null){
          const body = JSON.parse(error._body);
          this.status = 'error';
        }
      }
    );
  }
}
