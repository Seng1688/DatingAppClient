import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  model : any = {};


  constructor(public accountService : AccountService, private router : Router,  private route: ActivatedRoute, private toastr: ToastrService) {}
  ngOnInit(): void {
   
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next : () =>{ 
        this.router.navigate(['members'], {relativeTo: this.route})
       } ,
      error : error => {
        console.log(error)
        this.toastr.error(error.error);
      }
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigate([''], {relativeTo: this.route})
  }
}
