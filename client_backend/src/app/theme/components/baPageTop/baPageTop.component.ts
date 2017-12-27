import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {GlobalState} from '../../../global.state';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop implements OnInit{

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  domain = environment.domain;
  s3bucket = environment.s3bucket;
  photoUrl = 'assets/img/theme/no-photo.png';
  user;

  constructor(
    private _state:GlobalState,
    private router: Router,
    private authService:AuthService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  ngOnInit() {
    this.user = this.authService.getCurrentUserInfo();
    console.log(this.user);
  }

  // Function to log out user
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
