import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController, NavController, LoadingController, ToastController } from '@ionic/angular';
import {finalize} from 'rxjs/operators';

import { NgForm } from '@angular/forms';
import { AlertService } from '../alert.service';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private apiService: ApiService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  //Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }

  async login(form: NgForm) {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Logging in ...'
    });

    loading.present();

    this.apiService.login(form.value.username, form.value.password)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(
        _ => {
          this.navCtrl.navigateRoot(['reminders'], {replaceUrl: true});
        },
        err => this.handleError(err));
  }

  async handleError(error: any) {
    let message: string;
    if (error.status && error.status === 401) {
      message = 'Login failed';
    } else {
      message = `Unexpected error: ${error.statusText}`;
    }

    const toast = await this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }
}

