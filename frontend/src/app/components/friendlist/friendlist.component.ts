import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-friendlist',
  standalone: true,
  imports: [],
  templateUrl: './friendlist.component.html',
  styleUrl: './friendlist.component.css'
})
export class FriendlistComponent {

  @Input() friends : any;

}
