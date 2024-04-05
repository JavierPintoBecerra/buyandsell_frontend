import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Input, Output, EventEmitter } from '@angular/core';
import { Listing } from '../types';

@Component({
  selector: 'app-listing-data-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './listing-data-form.component.html',
  styleUrl: './listing-data-form.component.css'
})
export class ListingDataFormComponent {

  @Input() buttonText;   // Input retrieved from the edit-listing or new-listing page 
  @Input() currentName = '';
  @Input() currentDescriptions= '';
  @Input() currentPrice = 0;   // be carful some changes for the saje of the excercise


  name: string = '';
  description: string='';
  price: string = ''; 


  @Output() onSubmit = new EventEmitter<Listing>();

  constructor(
    private router: Router,
  ){  }

  onButtonClicked(){
    this.onSubmit.emit({
      id: null, 
      name: this.name,
      description: this.description, 
      price: Number(this.price), 
      views: 0
    })
  }

  ngOnInit(){
    this.name = this.currentName; 
    this.description=this.currentDescriptions;
    this.price= String(this.currentPrice);  // be carful I made some changes
  }

}
