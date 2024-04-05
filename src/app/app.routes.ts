import { Routes } from '@angular/router';
import { ListingsPageComponent } from './listings-page/listings-page.component';
import { ListingDetailPageComponent } from './listing-detail-page/listing-detail-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { EditListingPageComponent } from './edit-listing-page/edit-listing-page.component';
import { MyListingPageComponent } from './my-listing-page/my-listing-page.component';
import { NewListingPageComponent } from './new-listing-page/new-listing-page.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: '/listings',   // redirects to the homepage 
        pathMatch: 'full'

    },
    {
        path: 'listings',
        component: ListingsPageComponent,
        pathMatch: 'full'   // this is because atherwise this route will be desplayed when editting the list component
    },
    {
        path: 'listings/:id',   // :id selects a particular list from the web page
        component: ListingDetailPageComponent,
    },
    {
        path: 'contact/:id',   // :id selects a particular list from the web page
        component: ContactPageComponent,
    },
    {
        path: 'edit-listing/:id',   // :id selects a particular list from the web page
        component: EditListingPageComponent,
    },
    {
        path: 'my-listings',   // :id selects a particular list from the web page
        component: MyListingPageComponent,
    },
    {
        path: 'new-listing',   // :id selects a particular list from the web page
        component: NewListingPageComponent,
    },
];
