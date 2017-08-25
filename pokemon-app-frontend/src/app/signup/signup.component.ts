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
  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
      this.signupForm = new FormGroup({
          'username': new FormControl(null, Validators.required),
          'password': new FormControl(null, Validators.required)
      });
  }

  onSubmit() {
      const data = this.signupForm.value as UserInfo;
      console.log(this.signupForm);
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
