import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CoinService } from 'src/app/services/coin.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent implements OnInit {
  isAuthenticated : boolean;
  coins: Array<any> = [];
  
  constructor(private coinService:CoinService, 
    private authService:AuthService, 
    private router:Router, 
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getListingsLatest()
    this.isAuthenticated = this.authService.isAuthenticated()
  }

  getListingsLatest(){
    return this.coinService.getListingsLatest().subscribe(response => {
      let tmpAllKeys = Object.keys(response.data);
      let tmpArray = [];
      for (let prop of tmpAllKeys) { 
          tmpArray.push(response.data[prop]);
      }
      this.coins = tmpArray;
    })
  }

  
  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(["/login"])
    this.toastrService.success('Çıkış başarılı')
  }
}
