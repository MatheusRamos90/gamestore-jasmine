import {Injectable} from '@angular/core';
import EntityHttp from '../entity-http';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import RestApi from '../../../../environments/rest-api';
import GamesDto from './games-dto';

@Injectable({
  providedIn: 'root'
})
export class GamesService implements EntityHttp {
  private entity = 'games';

  constructor(
    private http: HttpClient
  ) {}

  public list(): Observable<any> {
    return this.http.get<any>(`${RestApi.PATH}:${RestApi.PORT}/${this.entity}`, { headers: { 'Content-Type': 'application/json' } }).pipe(
      catchError(this.handleError)
    );
  }

  public get(param): Observable<any> {
    return this.http.get<any>(`${RestApi.PATH}:${RestApi.PORT}/${this.entity}/${param.gameId}`,
      { headers: { 'Content-Type': 'application/json' } }).pipe(
      catchError(this.handleError)
    );
  }

  public delete(param): Observable<any> {
    return this.http.delete<any>(`${RestApi.PATH}:${RestApi.PORT}/${this.entity}/${param.gameId}`,
      { headers: { 'Content-Type': 'application/json' } }).pipe(
      catchError(this.handleError)
    );
  }

  public create(params: GamesDto): Observable<any> {
    return this.http.post<any>(`${RestApi.PATH}:${RestApi.PORT}/${this.entity}`,
      params, { headers: { 'Content-Type': 'application/json' } }).pipe(catchError(this.handleError));
  }

  public update(params: GamesDto): Observable<any> {
    return this.http.put<any>(`${RestApi.PATH}:${RestApi.PORT}/${this.entity}/${params.getId()}`,
      params, { headers: { 'Content-Type': 'application/json' } }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
