import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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

  @Output() onSubmit = new EventEmitter<{ name: string; description: string; price: number }>();

  ngOnInit(): void {
    this.initializeFields();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentName'] || changes['currentDescription'] || changes['currentPrice']) {
      this.initializeFields();
    }
  }

  private initializeFields(): void {
    this.name = this.currentName;
    this.description = this.currentDescription;
    this.price = this.currentPrice;
  }

  onButtonClicked(): void {
    this.onSubmit.emit({
      name: this.name,
      description: this.description,
      price: Number(this.price),
    });
  }
}
