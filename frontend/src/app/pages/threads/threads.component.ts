import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../../services/threads.service';
import { ContributionTooltipComponent } from './contribution-tooltip.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-threads',
  standalone: true,
  imports: [ContributionTooltipComponent, NgIf, NgFor],
  templateUrl: './threads.component.html',
  styleUrl: './threads.component.css'
})
export class ThreadsComponent implements OnInit{

  threads : any;
  tooltipVisibleMap: { [key: string]: boolean } = {};
  tooltipVisible: boolean | undefined;

  pinnedTooltip: number | undefined;

  constructor ( private threadsService : ThreadsService) {

  }

  ngOnInit(): void {
    this.getThreads('1');
    this.tooltipVisible = false;
  }

  getThreads(threadId? : any) {
    this.threadsService.get(threadId).subscribe({
      next : (res : any) => {
        this.threads = res;
      },
      error : (err : Error) => {
        alert(JSON.stringify(err))
      }
    })
  }

  showTooltip(contribution: any) {
    this.tooltipVisibleMap[contribution.id] = true;
  }

  hideTooltip(contribution: any) {
    if (contribution.id !== this.pinnedTooltip) {
      this.tooltipVisibleMap[contribution.id] = false;
    }
  }

  pinTooltip(contribution: any) {
    this.pinnedTooltip = contribution.id;
  }

  trackById(index: number, item: any): string {
    return item.id;
  }

  formatDateTime(dateTimeString: string): string {
    const dateObj = new Date(dateTimeString);

    // Format date part as MM/DD/YYYY
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });
    const formattedDate = dateFormatter.format(dateObj);

    // Format time part as 12-hour format with AM/PM
    let hours = dateObj.getHours();
    const amPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert hour 0 to 12
    const minutes = dateObj.getMinutes();
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}${amPm}`;

    return `${formattedDate} - ${formattedTime}`;
  }
}