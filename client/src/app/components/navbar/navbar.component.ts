import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title;
  logged;
  user_type;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private authService: AuthService) { 
      this.logged = false;
  	  sharedService.changeTitleEmitted$.subscribe( text => {
  	    this.title = text;
    	});
  }

  ngOnInit() {
    this.logged = this.authService.loggedIn();
    this.user_type = this.authService.getCurrentUserInfo() ? this.authService.getCurrentUserInfo().email : "not" ;
    console.log(this.logged);
    console.log(this.user_type);
  }
  LogIn(){
    console.log("login");
    this.router.navigate(['/login']);
  }
  LogOut(){
    console.log("logout");
    this.logged = false;
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }
  SignUp(){
    console.log("signup");
    this.router.navigate(['/register']);
  }
  ContactUs(){
    console.log("contact us");
    this.router.navigate(['/contact']);
  }
  AboutUs(){
    console.log("about us");
  }
  PostJob(){
    console.log("job posting");
    this.router.navigate(['/jobposting']);
  }
}
