import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ListingsService } from '../listings.service';
import { Listing } from '../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-detail-page',
  standalone: true, // Ensure this is a standalone component
  imports: [RouterModule, CommonModule], // Add RouterModule to imports
  templateUrl: './listing-detail-page.component.html',
  styleUrls: ['./listing-detail-page.component.css']
})
export class ListingDetailPageComponent implements OnInit {
  isLoading: boolean = true;
  listing: Listing = { id: '', name: '', description: '', price: 0, views: 0 }; // Provide a default value

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) { // Check if `id` is not null
      this.listingsService.getListingById(id).subscribe(listing => {
        this.listing = listing;
        this.isLoading = false;
      });
      this.listingsService.addViewToListing(id).subscribe(() => {
        console.log('Views updates');
      });
    } else {
      console.error('No ID found in route parameters');
      this.isLoading = false; // Stop the loading spinner in case of error
    }
  }
}
