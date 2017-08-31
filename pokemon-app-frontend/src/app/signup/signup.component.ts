import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../user-info';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  signUp(data: UserInfo) {
      console.log(data);
      this.authService.signUp(data).subscribe(
          (response) => {
              this.router.navigate(['/home'], { relativeTo: this.route });
          },
          (error) => {
              console.log(error);
          }
      )
  }

}
