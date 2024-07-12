import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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

  // constructor

  constructor( private router : Router) {}

  toggleSidebar() {
    this.isActive = !this.isActive;
  }

  reload(){
    this.router.navigateByUrl('profile')
  }

}
