import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ListingsService } from '../listings.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Listing } from '../types';
import { ListingDataFormComponent } from "../listing-data-form/listing-data-form.component";

@Component({
  selector: 'app-new-listing-page',
  standalone: true,  // Ensure this is a standalone component
  imports: [CommonModule, FormsModule, RouterModule , ListingDataFormComponent],  // Add RouterModule to imports
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

  onSubmit({ name, description, price } : { name: string; description: string; price: number }) : void {
    console.log('name', name);
    console.log('description', description);
    console.log('price', price);
    this.listingsService.createListing(name, description, price).subscribe(() => {
      this.router.navigateByUrl('/my-listings');
    });
  }
}

