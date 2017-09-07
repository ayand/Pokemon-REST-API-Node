import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Rating } from './rating';
import { AuthService } from './auth.service';

@Injectable()
export class RatingService {

    constructor(private authService: AuthService, private http: Http) {

    }

    getRating(pokemonId: number) {
        const id = this.authService.getId();
        const token = this.authService.getToken();
        const headers = new Headers();
        headers.append('Authorization', ('Bearer ' + token));
        const urlString: string = 'http://localhost:3000/ratings?userId=' + id + "&pokemonId=" + pokemonId;
        return this.http.get(urlString, { headers: headers })
            .map((response: Response) => {
                const data = response.json();
                console.log('Success');
                return data;
            })
            .catch((error: Response) => {
                const errorResponse = error.json();
                console.log('Failure');
                return errorResponse;
            })
    }

}
