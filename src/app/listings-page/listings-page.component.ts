import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-listings-page',
  standalone: true,  // Ensure this is a standalone component
  imports: [RouterModule, CommonModule],  // Add RouterModule to imports
  templateUrl: './listings-page.component.html',
  styleUrl: './listings-page.component.css'
})

export class ListingsPageComponent  implements OnInit {
  listings: Listing[] = [];

  constructor( private listingsService: ListingsService) { }

  ngOnInit(): void {
    this.listingsService.getListings().subscribe(listings => this.listings = listings);
  }
}