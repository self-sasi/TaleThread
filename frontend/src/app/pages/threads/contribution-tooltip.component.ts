import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

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
  @Input() parentFormatFunction!: (dateTimeString: string) => string;

  formatDateTime(): string | undefined {
    if (this.contributionDateTime) {
      return this.parentFormatFunction(this.contributionDateTime.toString());
    }
    return undefined;
  }

}
