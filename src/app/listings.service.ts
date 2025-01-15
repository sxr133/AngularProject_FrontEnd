import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth, authState, User } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Listing } from './types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const httpOptionsWithAuthToken = (token:string) => ({
  headers: new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }),
});

@Injectable({
  providedIn: 'root'
})

export class ListingsService {
  private apiUrl = 'http://localhost:8000/api/listings';
  private apiUrl2 = 'http://localhost:8000/api/users';

  constructor(
    private http: HttpClient,
    private auth: Auth, // Updated from AngularFireAuth to Auth
  ) { }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.apiUrl);
  }

  getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`${this.apiUrl}/${id}`);
  }

  addViewToListing(id: string): Observable<Listing> {
    return this.http.post<Listing>(`${this.apiUrl}/${id}/add-view`, {}, httpOptions);
  }

  getListingsForUser(): Observable<Listing[]> {
    return authState(this.auth).pipe(
      switchMap((user: User | null) => {
        if (user) {
          return from(user.getIdToken()).pipe( // Convert Promise to Observable
            switchMap((token) => {
              return this.http.get<Listing[]>(`${this.apiUrl2}/${user.uid}/listings`, httpOptionsWithAuthToken(token));
            })
          );
        } else {
          return new Observable<Listing[]>((observer) => {
            observer.next([]); // Emit an empty array for unauthenticated users
            observer.complete();
          });
        }
      })
    );
  }

  deleteListing(id: string): Observable<any> {
    return authState(this.auth).pipe(
      switchMap((user: User | null) => {
        if (user) {
          return from(user.getIdToken()).pipe( // Convert Promise to Observable
            switchMap((token) => {
              return this.http.delete<any>(`${this.apiUrl}/${id}`,httpOptionsWithAuthToken(token));
            })
          );
        } else {
          return new Observable<Listing[]>((observer) => {
            observer.next([]); // Emit an empty array for unauthenticated users
            observer.complete();
          });
        }
      })
    );
  }

  createListing(name: string, description: string, price: number): Observable<Listing> {
    return authState(this.auth).pipe(
      switchMap((user: User | null) => {
        if (!user) {
          return throwError(() => new Error('User not authenticated'));
        }
        return from(user.getIdToken()).pipe(
          switchMap((token: string) => {
            console.log('Generated Token:', token);
            const payload = { name, description, price };
            const options = httpOptionsWithAuthToken(token);
            return this.http.post<Listing>(this.apiUrl, payload, options);
          })
        );
      }),
      catchError((error) => {
        console.error('Error in createListing:', error);
        return throwError(() => error);
      })
    );
    
  }

  editListing(id: string, name: string, description: string, price: number): Observable<Listing> {
    return authState(this.auth).pipe(
      switchMap((user: User | null) => {
        if (!user) {
          return throwError(() => new Error('User not authenticated'));
        }
        return from(user.getIdToken()).pipe(
          switchMap((token: string) => {
            console.log('Generated Token:', token);
            const payload = { id, name, description, price };
            const options = httpOptionsWithAuthToken(token);
            return this.http.post<Listing>(`${this.apiUrl}/${id}`, payload, options);
          })
        );
      }),
      catchError((error) => {
        console.error('Error in createListing:', error);
        return throwError(() => error);
      })
    );
  }
}
