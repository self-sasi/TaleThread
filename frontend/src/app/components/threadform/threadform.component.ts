import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-threadform',
  standalone: true,
  imports: [FormsModule, ChipsModule, FloatLabelModule],
  templateUrl: './threadform.component.html',
  styleUrl: './threadform.component.css'
})
export class ThreadformComponent {
  values: string[] = ["hello", "word"];
}
