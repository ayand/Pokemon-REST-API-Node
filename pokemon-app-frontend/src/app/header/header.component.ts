import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit() {
  }

  signOut() {
      this.authService.signOut();
      this.router.navigate(['/'], { relativeTo: this.route });
  }

}
