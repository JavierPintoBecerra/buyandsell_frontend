import { Component } from '@angular/core';
import { Listing } from '../types';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-my-listing-page',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './my-listing-page.component.html',
  styleUrl: './my-listing-page.component.css'
})
export class MyListingPageComponent {

  listings: Listing[]=[]; 

  constructor(
    private listingsService: ListingsService, 
  ){}
  

  ngOnInit(): void{
    //this.listings = fakeMyListings; 
    this.listingsService.getListingsForUser()
      .subscribe(listings=>this.listings =listings); 
  }
  onDeleteClicked( listingId: string): void{
    //alert(`Deleting your listing with id: ${listingId}`)
    this.listingsService.deleteListing(listingId)
      .subscribe(() =>{
        this.listings = this.listings.filter(
          listing =>listing.id !== listingId
        )
      })

  }

}
