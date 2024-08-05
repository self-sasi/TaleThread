import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { UpOrDownVoteService } from '../../services/upordownvote.service';

@Component({
  selector: 'app-contribution-tooltip',
  standalone: true,
  imports: [NgIf],
  templateUrl: './contribution-tooltip.component.html',
  styleUrl: './contribution-tooltip.component.css'
})
export class ContributionTooltipComponent {
  @Input() author: string | undefined;
  @Input() contributionDateTime: Date | undefined;
  @Input() likes: number | undefined;
  @Input() dislikes: number | undefined;
  @Input() contribution_id: number | undefined;
  @Input() thread_id: number | undefined;
  @Input() parentFormatFunction!: (dateTimeString: string) => string;

  @Input() tooltipVisibleMap: { [key: string]: boolean } = {};

  constructor(private upOrDownVoteService: UpOrDownVoteService) {}

  upvote(thread_id : any, contribution_id : any) {
    this.upOrDownVoteService.upvoteContribution(thread_id, contribution_id).subscribe({
      next: (res: any) => {
        this.likes = res.likes;
        this.dislikes = res.dislikes;
      },
      error: (err: Error) => {
        alert(JSON.stringify(err));
      }
    });
    this.likes ? this.likes += 1 : 0;
  }

  downvote(thread_id : any, contribution_id : any) {
    this.upOrDownVoteService.downvoteContribution(thread_id, contribution_id).subscribe({
      next: (res: any) => {
        this.likes = res.likes;
        this.dislikes = res.dislikes;
      },
      error: (err: Error) => {
        alert(JSON.stringify(err));
      }
    });
  }


  formatDateTime(): string | undefined {
    if (this.contributionDateTime) {
      return this.parentFormatFunction(this.contributionDateTime.toString());
    }
    return undefined;
  }

}
