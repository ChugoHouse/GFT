import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers : [UserService]
})
export class RegisterComponent implements OnInit{
  public title: string;
  public user: User;
  public status: string;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = 'Registro';
    this.user = new User('','','','');
  }
  
  ngOnInit(){
    console.log('register.component cargado !!');
  }
  
  onSubmit(registerForm){
    console.log(this.user);
    this._userService.register(this.user).subscribe(
      response => {
        console.log(response);

        this.status = 'success';
        this.user = new User('','','','');
        registerForm.reset();
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    );
  }
}
