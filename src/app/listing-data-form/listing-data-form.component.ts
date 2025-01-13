import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Listing } from '../types';

@Component({
  selector: 'app-listing-data-form',
  standalone: true,  // Ensure this is a standalone component
  imports: [CommonModule, FormsModule],  // Add RouterModule to imports
  templateUrl: './listing-data-form.component.html',
  styleUrl: './listing-data-form.component.css'
})
export class ListingDataFormComponent {
  @Input() buttonText?: string;
  @Input() currentName: string = '';
  @Input() currentDescription: string = '';
  @Input() currentPrice: string = '';
  name: string = '';
  description: string = '';
  price: string = '';

  @Output() onSubmit = new EventEmitter<Listing>();

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.name = this.currentName;
    this.description = this.currentDescription;
    this.price = this.currentPrice;
  }

  onButtonClicked(): void {
    const priceValue = Number(this.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      // Handle invalid price
      alert('Please enter a valid price.');
      return;
    }
    
    // Emit the listing data
    this.onSubmit.emit({
      id: '',  // Assuming id is generated elsewhere or will be assigned later
      name: this.name,
      description: this.description,
      price: priceValue,
      views: 0,  // Default value for views
    });
  }
}
