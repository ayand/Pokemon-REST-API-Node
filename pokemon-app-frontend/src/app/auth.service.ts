import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from './user-info';

@Injectable()
export class AuthService {
    private token: string;
    private id: number;

    constructor(private http: Http) {}

    signUp(user: UserInfo) {
        console.log('Trying to sign up');
        return this.http.post('http://localhost:3000/users/signup', user)
            .map((response: Response) => {
                const data = response.json();
                this.token = data.token;
                this.id = data.id;
                console.log('Success');
                return data;
            })
            .catch((error: Response) => {
                const errorResponse = error.json();
                console.log('Failure');
                return errorResponse;
            })
    }

    signIn(user: UserInfo) {
        console.log('Trying to sign up');
        return this.http.post('http://localhost:3000/users/signin', user)
            .map((response: Response) => {
                const data = response.json();
                this.token = data.token;
                this.id = data.id;
                console.log('Success');
                return data;
            })
            .catch((error: Response) => {
                const errorResponse = error.json();
                console.log('Failure');
                return errorResponse;
            })
    }

    signOut() {
        this.token = null;
        this.id = null;
    }

    isAuthenticated(): boolean {
        return this.token != null;
    }

    getToken() {
        return this.token;
    }

    getId() {
        return this.id;
    }
}
