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
  private ddMMyyyy: string = this.formatDate();

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
    this.apiService.getAllReminders(this.patientId, this.ddMMyyyy).subscribe((reminders : Reminder[])=>{
      this.reminders = reminders;
    });
  }

  refresh(event) {
    this.getReminders();
    event.target.complete();
  }

  formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('');
  }
}
