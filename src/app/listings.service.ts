import { Injectable } from '@angular/core';
import { Listing } from './types';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth, idToken } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';

//const auth= getAuth();
//const user= auth.currentUser;

const httpOptions  = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json', 
  })
}; 

const httOptionsWithAuthToken = token =>({
  headers: new HttpHeaders({
    'Content-Type': 'application/json', 
    'AuthToken': token, 
  })
});

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(
    private http: HttpClient,
    private auth: Auth, 
  ) { }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings'); 
  }

  getListingById(id:string): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`); 
  }

  addViewToListing(id: string): Observable<Listing>{
    return this.http.post<Listing>(
      `/api/listings/${id}/add-view`,
      {}, 
      httpOptions, 
      );
  }
  

  /*getListingsForUser():Observable<Listing[]>{
    return new Observable<Listing[]>(observer =>{
      this.auth.currentUser.getIdToken().then(token =>{
        this.http.get<Listing[]>(`/api/users/${token}/listings`, httOptionsWithAuthToken(token))
          .subscribe(listings =>{
            observer.next(listings)
          });
      })
    })
     
  }*/

  

  getListingsForUser():Observable<Listing[]>{
    const auth= getAuth();
    const user= auth.currentUser;
    return new Observable<Listing[]>(observer =>{
      user.getIdToken().then((token) => {
        const tokenString = token.toString();
        // Now "tokenString" is a string containing the actual JWT
        console.log("Token:", tokenString); 
        if(user && tokenString){
        this.http.get<Listing[]>(`/api/users/${user.uid}/listings`, httOptionsWithAuthToken(tokenString))
        .subscribe(listings=>{
          observer.next(listings)
        }); 
      } else {
        observer.next([]);
      }
      });
    })
  }

  /*getListingsForUser(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/users/12345/listings');
  }*/


  deleteListing(id: string): Observable<any>{
    //return this.http.delete(`/api/listings/${id}`);
    const auth= getAuth();
    const user= auth.currentUser;
    return new Observable<any>(observer =>{
      user.getIdToken().then((token) => {
        const tokenString = token.toString();
        // Now "tokenString" is a string containing the actual JWT
        console.log("Token:", tokenString); 
        this.http.delete<Listing>(
          `/api/listings/${id}`, 
          httOptionsWithAuthToken(tokenString))
        .subscribe(()=>observer.next()); 
      });
    })

    }

  createListing(name: string, description: string, price: number): Observable<Listing>{
    /*return this.http.post<Listing>(
      '/api/listings', 
      {name, description, price}, 
      httpOptions, 
    );*/
    const auth= getAuth();
    const user= auth.currentUser;
    return new Observable<Listing>(observer =>{
      user.getIdToken().then((token) => {
        const tokenString = token.toString();
        // Now "tokenString" is a string containing the actual JWT
        console.log("Token:", tokenString); 
        this.http.post<Listing>(
          '/api/listings',
          {name, description, price}, 
          httOptionsWithAuthToken(tokenString))
        .subscribe(()=>observer.next()); 
      });
    })
  }

  editListing(id: string, name: string, description: string, price: number): Observable<Listing>{
    /*return this.http.post<Listing>(
      `/api/listings/${id}`,
      {id, name, description, price},
      httpOptions, 
    );*/
    const auth= getAuth();
    const user= auth.currentUser;
    return new Observable<Listing>(observer =>{
      user.getIdToken().then((token) => {
        const tokenString = token.toString();
        // Now "tokenString" is a string containing the actual JWT
        console.log("Token:", tokenString); 
        this.http.post<Listing>(
          `/api/listings/${id}`,
          {name, description, price}, 
          httOptionsWithAuthToken(tokenString))
        .subscribe(()=>observer.next()); 
      });
    })

  }
}
