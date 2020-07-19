import { Component, OnInit, Input } from '@angular/core';
import { Reminder } from '../reminders.model';

@Component({
  selector: 'app-reminder-item',
  templateUrl: './reminder-item.component.html',
  styleUrls: ['./reminder-item.component.scss'],
})
export class ReminderItemComponent implements OnInit {
  @Input() reminderItem: Reminder;

  constructor() { }

  ngOnInit() {}

}
