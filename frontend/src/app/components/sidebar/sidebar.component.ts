import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  // properties

  isActive: boolean = false;
  activeButton: string = 'profile';

  // constructor

  constructor( private router : Router, private logoutService : ProfileService) {}

  toggleSidebar() {
    this.isActive = !this.isActive;
  }

  reload(){
    this.router.navigateByUrl('profile')
  }

  handleLogout() {
    this.logoutService.logout().subscribe({
      next : (res : any) => {
        localStorage.removeItem('token');
        alert(JSON.stringify(res.message));
        this.router.navigateByUrl('login');
      },
      error : (err : Error) => {
        alert(JSON.stringify(err))
      }
    })
  }

  handleActiveButton(btn : string) {
    this.activeButton = btn;
  }

}
