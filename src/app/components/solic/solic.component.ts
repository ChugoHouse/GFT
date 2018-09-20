import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Card } from '../../models/card';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-solic',
  templateUrl: './solic.component.html',
  providers: [UserService]
})
export class SolicComponent implements OnInit{
  public title: string;
  public card: Card;
  public type_cards: Array<{name: string, type: string}>;
  public status: string;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = 'Solicitud de Cuenta';
    this.card = new Card(this._userService.getIdentity().id,'','');
  }
  
  ngOnInit(){
    console.log('accounts.component cargado !!');
        
    this._userService.getCards().subscribe(
      response => {
          this.type_cards = response.response.type_cards;
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
      }
    );
  }
  
  onSubmit(cardForm){
    this._userService.solCard(this.card).subscribe(
      response => {
          this.card = new Card(this._userService.getIdentity().id,'','');
          cardForm.reset();
          this.status = 'success';
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