import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ListingsService } from '../listings.service';
import { Listing } from '../types';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-listing-detail-page',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './listing-detail-page.component.html',
  styleUrl: './listing-detail-page.component.css'
})
export class ListingDetailPageComponent {

  isLoading: boolean = true; 

  listing: Listing; 
  
  constructor(
    private route: ActivatedRoute, 
    private listingsService: ListingsService, 
  ){ }

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id'); 
    this.listingsService.getListingById(id)
      .subscribe(listing =>{
        this.listing = listing;
        this.isLoading = false; 
        console.log('Received response data:', listing); // Log the response data
      } );
      
     this.listingsService.addViewToListing(id)
     .subscribe(()=>console.log('Vews updated!'))
  }

}


