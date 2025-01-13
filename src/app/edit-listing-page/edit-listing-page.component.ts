import { Component, OnInit } from '@angular/core';
import { ListingDataFormComponent } from "../listing-data-form/listing-data-form.component";
import { Listing } from '../types';
import { ActivatedRoute, Router } from '@angular/router';
import { fakeMyListings } from '../fake-data';

@Component({
  selector: 'app-edit-listing-page',
  standalone: true,  // Ensure this is a standalone component
  imports: [ListingDataFormComponent],
  templateUrl: './edit-listing-page.component.html',
  styleUrl: './edit-listing-page.component.css'
})
export class EditListingPageComponent implements OnInit {
  listing: Listing = { id: '', name: '', description: '', price: 0, views: 0 }; // Provide a default value

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const listing = fakeMyListings.find(listing => listing.id === id);
    if (listing) {
      this.listing = listing;
    }
  }

  onSubmit(): void {
    alert('Saving changes to the listing...');
    this.router.navigateByUrl('/my-listings');
  }
}
