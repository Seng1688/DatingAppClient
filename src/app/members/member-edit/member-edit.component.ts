import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { HttpClient } from '@angular/common/http';
import { MembersService } from '../../_services/members.service';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';
import { User } from '../../_models/user';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm',{static : false}) editForm: NgForm;
  @HostListener('window:beforeunload',['$event']) unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  member: Member;
  user: User = null;
  tabSelected : string = 'About';


  constructor(private http: HttpClient, private memberService: MembersService, private accountService: AccountService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        this.user = user;
      }
    })
  }

  ngOnInit() : void {
    this.loadMember();
  }

  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: member => {
        this.member = member;
      }
    })
  };

  updateMember(){
    this.memberService.updateMember(this.member).subscribe({
      next: () => {
        this.toastr.success('Profile updated successfully');
        this.editForm.reset(this.member);
      }
    })
  }

  selectTab(tab: string){
    this.tabSelected = tab;
  }
  

}



