import { Component, OnInit } from '@angular/core';
import { ProfilecardComponent } from "../../components/profilecard/profilecard.component";
import { ElseprofileService } from '../../services/elseprofile.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-elseprofile',
  standalone: true,
  imports: [ProfilecardComponent],
  templateUrl: './elseprofile.component.html',
  styleUrl: './elseprofile.component.css'
})
export class ElseprofileComponent implements OnInit{

  currUser : any;
  elseUserProfile : any;
  isElse : boolean = true;
  isFriend : boolean = false;

  constructor( private elseProfileService : ElseprofileService, private profileService : ProfileService) {}

  ngOnInit(): void {
      this.profileService.get().subscribe({
        next : (res : any) => {
          this.currUser = res;
          this.checkFriendStatus();
        },
        error : (err : Error) => {
          alert(err);
        }
      })
      this.elseProfileService.get().subscribe({
        next : (res : any) => {
          this.elseUserProfile = res;
          this.checkFriendStatus();
        },
        error : (err : Error) => {
          alert(err);
        }
      })
  }

  checkFriendStatus() {
    if (this.currUser && this.elseUserProfile) {
      for (let friend of this.currUser.friendlist) {
        if (friend.user.username === this.elseUserProfile.user.username) {
          this.isFriend = true;
          break;
        }
      }
    }
  }
}
