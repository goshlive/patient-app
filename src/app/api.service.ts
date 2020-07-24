import { Injectable } from '@angular/core';
import { Reminder } from './reminders/reminders.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from   'rxjs/operators';
import { User } from './login/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://localhost:8080/api';

  //private reminders: Reminder[] = [{"id":15,"docId":1,"presId":16,"doctorName":"fn_doctor1ln_doctor1","prescription":"test prescription1","message":"pres1 reminder 1","priority":"LOW","duration":1.0,"lateInd":null,"createDt":"2020-07-18T07:19:57.000+00:00","doneDt":null},{"id":16,"docId":1,"presId":16,"doctorName":"fn_doctor1ln_doctor1","prescription":"test prescription1","message":"pres1 reminder 2","priority":"MIDDLE","duration":2.0,"lateInd":null,"createDt":"2020-07-18T07:19:57.000+00:00","doneDt":null},{"id":17,"docId":1,"presId":17,"doctorName":"fn_doctor1ln_doctor1","prescription":"test prescription2","message":"pres2 reminder 2","priority":"MIDDLE","duration":2.0,"lateInd":null,"createDt":"2020-07-18T07:19:57.000+00:00","doneDt":null},{"id":18,"docId":1,"presId":17,"doctorName":"fn_doctor1ln_doctor1","prescription":"test prescription2","message":"pres2 reminder 3","priority":"HIGH","duration":3.0,"lateInd":null,"createDt":"2020-07-18T07:19:57.000+00:00","doneDt":null}]
  private reminders: Reminder[] = []

  private authUser = new ReplaySubject<any>(1);
  public authUserObservable = this.authUser.asObservable();
  
  constructor(private http: HttpClient) {}

  login(username: String, password: String) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });

    return this.http.post(`${this.url}/patient/login`,
      {username: username, password: password, headers: headers}
    ).pipe(tap(
      userResponse => {
        return this.handleLoginResponse(new User(userResponse));
      }
    ));
  }

  private handleLoginResponse(user: User){
    this.authUser.next(user);
    return user;
  }

  getAllReminders(patientId: number):Observable<Reminder[]> {
    return this.http.get<Reminder[]>(`${this.url}/patient/${patientId}/reminders`
    ).pipe(
      map(
        data => {        
          return data.map((reminder) => new Reminder(reminder));
        }
      )
    )
  }

  getReminder(reminderId: number):Observable<Reminder> {
    return this.http.get<Reminder>(`${this.url}/reminder/${reminderId}/detail`
    ).pipe(
      map(
        data => {
          return new Reminder(data);
        }
      )
    )
  }
  
  setDone(reminder: Reminder) {
    return this.http.put(`${this.url}/reminder/${reminder.id}/done`, reminder).subscribe(
      response => {
        reminder = new Reminder(response);
        return reminder;
      },
      error => {
        console.error(error);
      }
    );
  }
}
