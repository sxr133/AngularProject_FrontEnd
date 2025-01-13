import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Listing } from '../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listing-data-form',
  standalone: true, // Ensure this is a standalone component
  imports: [FormsModule], // Add RouterModule to imports
  templateUrl: './listing-data-form.component.html',
  styleUrls: ['./listing-data-form.component.css']
})

export class ListingDataFormComponent implements OnInit {
  @Input() buttonText = '';
  @Input() currentName = '';
  @Input() currentDescription = '';
  @Input() currentPrice = 0;

  name: string = '';
  description: string = '';
  price: number = 0;

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
    this.onSubmit.emit({
      id: '',
      name: this.name,
      description: this.description,
      price: Number(this.price),
      views: 0,
    });
  }
}
