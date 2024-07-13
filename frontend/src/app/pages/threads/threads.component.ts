import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../../services/threads.service';

@Component({
  selector: 'app-threads',
  standalone: true,
  imports: [],
  templateUrl: './threads.component.html',
  styleUrl: './threads.component.css'
})
export class ThreadsComponent implements OnInit{

  threads : any;

  constructor ( private threadsService : ThreadsService) {

  }

  ngOnInit(): void {
      this.getThreads('1')
  }

  getThreads(threadId? : any) {
    this.threadsService.get(threadId).subscribe({
      next : (res : any) => {
        this.threads = res;
        console.log(this.threads)
      },
      error : (err : Error) => {
        alert(JSON.stringify(err))
      }
    })

  }
}
