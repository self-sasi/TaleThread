import { Component, Output, EventEmitter } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-threadform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './threadform.component.html',
  styleUrl: './threadform.component.css'
})
export class ThreadformComponent {

  @Output() threadSpecificationsEmitter = new EventEmitter<FormGroup>();

  threadSpecifications : FormGroup = new FormGroup({
    title : new FormControl(''),
    maxContributors : new FormControl(''),
    maxWords : new FormControl(''),
    description : new FormControl('')
  })

  onPost() {
    this.threadSpecificationsEmitter.emit(this.threadSpecifications.value);
  }
}
