import { Component } from '@angular/core';
import { ListingDataFormComponent } from '../listing-data-form/listing-data-form.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-listing-page',
  standalone: true,
  imports: [ListingDataFormComponent, CommonModule],
  templateUrl: './edit-listing-page.component.html',
  styleUrl: './edit-listing-page.component.css'
})
export class EditListingPageComponent {

  listing: Listing;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private listingsService: ListingsService, 
  ){}

  onSubmit({name, description, price}):void{
    //alert('Saving changes to the listing'); 
    this.listingsService.editListing(this.listing.id, name, description, price)
      .subscribe(()=>{
        this.router.navigateByUrl('/my-listings'); 
      }); 
  }

  ngOnInit(){
    const id= this.route.snapshot.paramMap.get('id')
    this.listingsService.getListingById(id)
      .subscribe(listing=> this.listing = listing)
  }

}
