import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reminder } from '../reminders.model';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-reminder-detail',
  templateUrl: './reminder-detail.page.html',
  styleUrls: ['./reminder-detail.page.scss'],
})
export class ReminderDetailPage implements OnInit {
  loadedReminder: Reminder;
  reminderId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.reminderId = +this.activatedRoute.snapshot.paramMap.get('reminderId');
    this.apiService.getReminder(this.reminderId).subscribe((reminder : Reminder)=>{
      this.loadedReminder = reminder;
    })

/*    
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('reminderId')) {
        //redirect 
        return;
      }
      const reminderId = paramMap.get('reminderId');
      this.remindersService.getReminder(+reminderId).subscribe((reminder : Reminder)=>{
        this.loadedReminder = reminder;
      })
    })
*/    
  }

  onMarkDone(){
    this.alertCtrl.create({header: 'Prescription Reminder', message: 'Mark as Done?', 
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Yes',
        handler: () => {
          this.apiService.setDone(this.loadedReminder);
          this.router.navigate(['/reminders']);
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

}
