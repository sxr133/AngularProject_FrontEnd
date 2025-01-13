import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ListingsService } from '../listings.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Listing } from '../types';
import { ListingDataFormComponent } from "../listing-data-form/listing-data-form.component";

@Component({
  selector: 'app-new-listing-page',
  standalone: true,  // Ensure this is a standalone component
  imports: [CommonModule, FormsModule, ListingDataFormComponent],  // Add RouterModule to imports
  templateUrl: './new-listing-page.component.html',
  styleUrls: ['./new-listing-page.component.css']
})
export class NewListingPageComponent implements OnInit {

  constructor(
    private router: Router,
    private listingsService: ListingsService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(listing: Listing): void {
    this.listingsService.createListing(listing).subscribe(() => {
      this.router.navigateByUrl('/my-listings');
    });
  }
}

