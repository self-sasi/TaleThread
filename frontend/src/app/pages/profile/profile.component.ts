import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FriendlistComponent } from "../../components/friendlist/friendlist.component";
import { ProfilecardComponent } from "../../components/profilecard/profilecard.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FriendlistComponent, ProfilecardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  // properties
  userProfile : any;
  friendsList : any;
  incomingRequests : any;
  isNotElse : boolean = false;
  // constructor

  constructor( private profileService : ProfileService) {

  }

  ngOnInit(): void {

    this.profileService.get().subscribe({
      next : (res : any) => {
        this.userProfile = res;
        this.friendsList = res.friendlist;
        this.incomingRequests = res.friend_requests_received;
        console.log(this.userProfile)
      },
      error : (err : Error) => {
        alert(err)
      }
    })
  }

}
