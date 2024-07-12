import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  // properties
  userProfile : any;
  // constructor

  constructor( private profileService : ProfileService) {

  }

  ngOnInit(): void {

    this.profileService.get().subscribe({
      next : (res : any) => {
        this.userProfile = res;
        console.log(this.userProfile)
      },
      error : (err : Error) => {
        alert(err)
      }
    })
  }

}
