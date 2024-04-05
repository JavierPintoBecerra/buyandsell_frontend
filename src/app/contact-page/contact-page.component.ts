import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Listing } from '../types';
import { fakeListings } from '../fake-data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {

  email: string = '';
  message: string = ''; 
  listing: Listing; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingsService,   
  ){}
  
  ngOnInit(): void{  
    const id= this.route.snapshot.paramMap.get('id');
    this.listingsService.getListingById(id)
      .subscribe(listing =>{
        this.listing= listing; 
        this.message = `Hi, im interested in your ${this.listing.name.toLowerCase()}!`; 
      })    
    //this.listing= fakeListings.find(listing => listing.id ===id); 
    
  }

  sendMessage(): void{
    alert('Your message has been sent!'); 
    this.router.navigateByUrl('/listings');
  }

}
