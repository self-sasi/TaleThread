import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ElseprofileService } from '../../services/elseprofile.service';
import { FriendService } from '../../services/friend.service';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-friendlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './friendlist.component.html',
  styleUrl: './friendlist.component.css'
})
export class FriendlistComponent {

  @Input() friends : any;
  @Input() incomingRequests : any;
  @Output() elseUsernameEmitter : any;

  isFriendsList : boolean = true;

  constructor( private router : Router, private elseProfileService : ElseprofileService, private friendService : FriendService, private requestService : RequestService) {

  }

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

  toggleList() {
    this.isFriendsList = !this.isFriendsList;
    console.log(this.incomingRequests)
  }

  acceptRequest( username : string ) {
    this.requestService.acceptRequest(username).subscribe( {
      next : (res : any) => {
        window.location.reload();
      },
      error : (err : Error) => {
        console.log(err)
      }
    })
  }

  rejectRequest( username : string ) {

    const rejectionConfirm = confirm(` Are you sure you want to reject ${username}'s request?`)

    if(rejectionConfirm) {
      this.requestService.rejectRequest( username ).subscribe( {
        next : (res : any) => {
          window.location.reload();
        },
        error : (err : Error) => {
          console.log(err)
        }
      })
    }
  }

}
