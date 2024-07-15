import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ElseprofileService } from '../../services/elseprofile.service';
import { FriendService } from '../../services/friend.service';

@Component({
  selector: 'app-friendlist',
  standalone: true,
  imports: [],
  templateUrl: './friendlist.component.html',
  styleUrl: './friendlist.component.css'
})
export class FriendlistComponent {

  @Input() friends : any;
  @Output() elseUsernameEmitter : any;

  constructor( private router : Router, private elseProfileService : ElseprofileService, private friendService : FriendService) {}

  setElseUsername( elseUsername : string){
    this.elseProfileService.set(elseUsername);
    this.router.navigateByUrl('user');
  }

  removeFriend( username : string ) {

    const removalConfirmed = confirm(`Are you sure you want to remove ${username} from your friends?`);

    if (removalConfirmed) {
      this.friendService.remove(username).subscribe({
        next : (res : any) => {
          console.log("removed");
          window.location.reload();
        },
        error : (err : Error) => {
          alert(err);
        }
      })
    }

  }

}
