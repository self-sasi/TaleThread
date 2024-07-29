import { Component } from '@angular/core';
import { ThreadformComponent } from "../../components/threadform/threadform.component";
import { ThreadsService } from '../../services/threads.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ThreadformComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  constructor( private threadsService : ThreadsService) {}

  handleThreadSpecificationsEmitter( threadSpecifications : any) {
    this.threadsService.post(threadSpecifications).subscribe({
      next : (res : any) => {
        alert('success');
      },
      error : (err : Error) => {
        alert(err);
      }
    })
  }
}
