import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserInfo } from '../user-info';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {
  signupForm: FormGroup;

  @Input() buttonText: string;
  @Output() formSubmitted = new EventEmitter<UserInfo>();

  constructor() { }

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
      this.formSubmitted.emit(data);
  }

}
