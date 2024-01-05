import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from '../../_services/members.service';
import { CommonModule } from '@angular/common';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  standalone:true,
  styleUrl: './member-detail.component.css',
  imports: [CommonModule, GalleryModule]
})
export class MemberDetailComponent implements OnInit {

  images: GalleryItem[] = [];
  member: Member;
  tabSelected : string = 'About';

  constructor(private router: Router, private route: ActivatedRoute , private memberService : MembersService ){ }

  ngOnInit(): void {
    this.loadMember();
  }

  getImages(){
    if(!this.member) return;
    for(const photo of this.member.photos){
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }));
    }
  }
  
  loadMember(){

    const username = this.route.snapshot.paramMap.get('username');

    if(!username) return;

    this.memberService.getMember(username).subscribe({
      next : member => {
        this.member = member;
        this.getImages();
      },
      error : error => console.log(error)
    })
  }

  selectTab(tab: string){
    this.tabSelected = tab;
  }










}
