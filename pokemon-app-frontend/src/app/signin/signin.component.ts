import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from '../user-info';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit() {
  }

  login(data: UserInfo) {
      console.log(data);
      this.authService.signIn(data).subscribe(
          (response) => {
              this.router.navigate(['/home'], { relativeTo: this.route });
          },
          (error) => {
              console.log(error);
          }
      )
  }

}
