import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Listing } from './types';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})

export class ListingsService {
  private apiUrl = 'http://localhost:8000/api/listings';
  private apiUrl2 = 'http://localhost:8000/api/users';;
  constructor(
    private http: HttpClient,
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
    return this.http.get<Listing[]>(`${this.apiUrl2}/99999/listings`);
  }

  deleteListing(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  createListing(listing: Listing): Observable<Listing> {
    return this.http.post<Listing>(this.apiUrl, 
      {
        name: listing.name,
        description: listing.description,
        price: listing.price
      }, 
      httpOptions);
  }
}
