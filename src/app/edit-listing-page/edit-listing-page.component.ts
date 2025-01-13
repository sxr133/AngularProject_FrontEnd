import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from '../listings.service';
import { Listing } from '../types';
import { ListingDataFormComponent } from "../listing-data-form/listing-data-form.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-listing-page',
  standalone: true, // Ensure this is a standalone component
  imports: [CommonModule, ListingDataFormComponent, FormsModule],
  templateUrl: './edit-listing-page.component.html',
  styleUrls: ['./edit-listing-page.component.css']
})
export class EditListingPageComponent implements OnInit {
  listing: Listing = { id : '', name: '', description: '', price: 0, views: 0 };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingsService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Route id: ', id);
    if (id) {
      this.listingsService.getListingById(id).subscribe({
        next: (listing) => {
          this.listing = listing; // Assign the fetched listing data
          this.cdr.detectChanges(); // Trigger change detection
          console.log('Listing fetched:', this.listing); // Log the fetched listing
        },
        error: (err) => {
          console.error('Error fetching listing:', err); // Handle errors
        },
      });
    } else {
      console.error('No ID provided in the route.'); // Log an error if no ID is provided
    }
  }

  onSubmit({ name, description, price }: {name:string, description:string, price:number}): void {
    this.listingsService.editListing(this.listing.id, name, description, price)
      .subscribe(() => {
        this.router.navigateByUrl('/my-listings');
      });
  }
}
