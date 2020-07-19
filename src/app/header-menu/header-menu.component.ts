import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  logout() {
    this.navCtrl.navigateRoot('login', {replaceUrl: true});
  }
}
