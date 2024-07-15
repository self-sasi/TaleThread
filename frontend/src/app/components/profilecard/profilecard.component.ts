import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { CommonModule } from '@angular/common';
import { FriendService } from '../../services/friend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilecard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profilecard.component.html',
  styleUrl: './profilecard.component.css'
})
export class ProfilecardComponent {

  // properties

  @Input() profile? : any;
  @Input() isElse : boolean = false;
  isEditing = false;
  newAge?: number;
  newFavGenre?: string;
  newAvatar?: string;

  // constructor

  constructor(private profileService : ProfileService, private friendService : FriendService, private router : Router) {

  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  updateChanges() {
    const updatedStruct : any = {
      'age' : this.newAge,
      'fav_genres' : this.newFavGenre,
      'avatar' : this.newAvatar
    }

    console.log(updatedStruct)
    console.log(this.newAvatar)
    this.profileService.update(updatedStruct).subscribe({
      next : () => {
        console.log("updated succesfully");
        window.location.reload();
      },
      error : (err : Error) => {
        alert(JSON.stringify(err))
      }
    })
  }

  removeFriend( username : string) {
    const removalConfirmed = confirm(`Are you sure you want to remove ${username} from your friends?`);

    if (removalConfirmed) {
      this.friendService.remove(username).subscribe({
        next : (res : any) => {
          console.log("removed");
          this.router.navigateByUrl('profile')
        },
        error : (err : Error) => {
          alert(err);
        }
      })
    }
  }

}
