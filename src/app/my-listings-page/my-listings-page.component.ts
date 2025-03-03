import { Component, OnInit } from '@angular/core';
import { ListingsService } from '../listings.service';
import { Listing } from '../types';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-listings-page',
  standalone: true,  // Ensure this is a standalone component
  imports: [RouterModule, CommonModule, FormsModule],  // Add RouterModule to imports
  templateUrl: './my-listings-page.component.html',
  styleUrls: ['./my-listings-page.component.css']
})
export class MyListingsPageComponent implements OnInit {
  listings: Listing[] = [];

  constructor(
    private listingsService: ListingsService,
  ) { }
  
  ngOnInit(): void {
    this.listingsService.getListingsForUser().subscribe({
      next: (listings) => {
        console.log('Listings fetched:', listings); // Log the fetched listings
        if (Array.isArray(listings)) {
          this.listings = listings;
        } else {
          console.error('Expected an array, but got:', listings);
        }
      },
      error: (err) => {
        console.error('Error fetching listings:', err);
      },
    });
  }

  onDeleteClicked(listingId: string): void {
    this.listingsService.deleteListing(listingId).subscribe(() => {
      this.listings = this.listings.filter(listing => listing.id !== listingId);
    })
  }
}
