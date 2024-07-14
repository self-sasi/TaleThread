import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ElseprofileService } from '../../services/elseprofile.service';

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

  constructor( private router : Router, private elseProfileService : ElseprofileService) {}

  setElseUsername( elseUsername : string){
    this.elseProfileService.set(elseUsername);
    this.router.navigateByUrl('user');
  }

}
