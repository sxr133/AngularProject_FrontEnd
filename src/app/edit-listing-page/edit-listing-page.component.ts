import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from '../listings.service';
import { Listing } from '../types';
import { ListingDataFormComponent } from "../listing-data-form/listing-data-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-listing-page',
  standalone: true, // Ensure this is a standalone component
  imports: [CommonModule, ListingDataFormComponent],
  templateUrl: './edit-listing-page.component.html',
  styleUrls: ['./edit-listing-page.component.css']
})
export class EditListingPageComponent implements OnInit {
  listing: Listing = { id: '', name: '', description: '', price: 0, views: 0 };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingsService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
    this.listingsService.getListingById(id)
      .subscribe(listing => this.listing = listing);
    }
  }

  onSubmit({ name, description, price }: {name:string, description:string, price:number}): void {
    this.listingsService.editListing(this.listing.id, name, description, price)
      .subscribe(() => {
        this.router.navigateByUrl('/my-listings');
      });
  }
}
