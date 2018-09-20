import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  providers: [UserService]
})
export class AccountsComponent implements OnInit{
  public title: string;
  public accounts: Array<{_id: string, name: string, type: string, userID: string, deposits: number, withdrawals: number, balance: number}>;
  
  constructor(
    private _userService: UserService
  ){
    this.title = 'Cuentas Autorizadas';
  }
  
  ngOnInit(){
    console.log('accounts.component cargado !!');
        
    this._userService.getAccounts().subscribe(
      response => {
        if(response.response.length > 0){
          this.accounts=response.response;
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
      }
    );
  }
}