import { Component, OnInit } from '@angular/core';
import { Reminder } from './reminders.model';
import { ApiService } from '../api.service';
import { User } from '../login/user.model';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.page.html',
  styleUrls: ['./reminders.page.scss'],
})
export class RemindersPage implements OnInit {

  reminders: Reminder[];
  user: User;

  private patientId: number;

  constructor(private apiService: ApiService) {
    this.apiService.authUserObservable.subscribe(user => {
      if (user) {
        this.user = user;
        this.patientId = this.user.ownerId;
      } else {
        this.user = null;
      }
    });
  }

  ngOnInit() {
    this.getReminders();
  }

  ionViewWillEnter() {
    this.getReminders();
  }

  getReminders() {
    this.apiService.getAllReminders(this.patientId).subscribe((reminders : Reminder[])=>{
      this.reminders = reminders;
    });
  }

  refresh(event) {
    this.getReminders();
    event.target.complete();
  }
}
