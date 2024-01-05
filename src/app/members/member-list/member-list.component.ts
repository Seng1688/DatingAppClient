import { Component } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {

  members$ : Observable<Member[]>;

  constructor(private membersService : MembersService) {
    this.members$ = this.membersService.getMembers();
   }
}
