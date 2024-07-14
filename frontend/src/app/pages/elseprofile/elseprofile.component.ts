import { Component, OnInit } from '@angular/core';
import { ProfilecardComponent } from "../../components/profilecard/profilecard.component";
import { ElseprofileService } from '../../services/elseprofile.service';

@Component({
  selector: 'app-elseprofile',
  standalone: true,
  imports: [ProfilecardComponent],
  templateUrl: './elseprofile.component.html',
  styleUrl: './elseprofile.component.css'
})
export class ElseprofileComponent implements OnInit{

  elseUserProfile : any;
  isElse : boolean = true;

  constructor( private elseProfileService : ElseprofileService) {}

  ngOnInit(): void {
      this.elseProfileService.get().subscribe({
        next : (res : any) => {
          this.elseUserProfile = res;
        },
        error : (err : Error) => {
          alert(err);
        }
      })
  }
}
