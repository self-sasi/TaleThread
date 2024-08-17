import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContributionTooltipComponent } from '../contribution-tooltip/contribution-tooltip.component';
import { FormsModule } from '@angular/forms';
import { AIContinuationService } from '../../../services/ai-continuation.service';
import { ContributionService } from '../../../services/contribution.service';

@Component({
  selector: 'app-add-contribution',
  standalone: true,
  imports: [CommonModule, ContributionTooltipComponent, FormsModule],
  templateUrl: './add-contribution.component.html',
  styleUrl: './add-contribution.component.css'
})
export class AddContributionComponent {
  contributionContent: string = "";
  ai_loading: boolean = false;
  tooltipVisibleMap: { [key: string]: boolean } = {};
  pinnedTooltip: number | undefined;

  @Input() parentFormatFunction!: (dateTimeString: string) => string;

  @Input() thread : any;
  @Output() threadIdPopupToHide = new EventEmitter<any>();

  constructor(private AIContinuationService: AIContinuationService, private ContributionService: ContributionService) {}

  emitHideAddContributionPopup(threadId : any) {
    this.threadIdPopupToHide.emit(threadId);
  }

  trackById(index: number, item: any): string {
    return item.id;
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

  getAIRecommendation(thread_id: any) {
    this.ai_loading = true;
    this.AIContinuationService.post(thread_id).subscribe({
      next: (res: any) => {        
        this.contributionContent = res.recommended_continuation;
        this.ai_loading = false;
      },
      error: (err: Error) => {
        alert(JSON.stringify(err));
        this.ai_loading = false;
      }
    });
  }

  writeContribution() {
    if (this.contributionContent.trim() === "") {
      return;
    }
    this.ContributionService.writeContribution(this.thread.id, this.contributionContent).subscribe({
      next: (res: any) => {
        console.log('successfully written contribution!');
      },
      error: (err: Error) => {
        alert(JSON.stringify(err));
      }
    });
  }

  get remainingWords(): number {
    const wordCount = this.countWords(this.contributionContent);
    return this.thread.max_words - wordCount;
  }

  private countWords(text: string): number {
    if (!text) {
      return 0;
    }
    return text.trim().split(/\s+/).length;
  }

  onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    const wordCount = this.countWords(textarea.value);

    // If the word count exceeds the maximum allowed, trim the input
    if (wordCount > this.thread.max_words) {
      textarea.value = this.trimToMaxWords(textarea.value);
      this.contributionContent = textarea.value;  // Update the model
    }
  }

  private trimToMaxWords(text: string): string {
    const words = text.trim().split(/\s+/);
    return words.slice(0, this.thread.max_words).join(' ');
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
