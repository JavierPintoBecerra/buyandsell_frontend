import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ListingsPageComponent } from './listings-page/listings-page.component';
import { CommonModule } from '@angular/common';
import { NavVarComponent } from './nav-var/nav-var.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ListingsPageComponent, CommonModule, NavVarComponent, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'buy_and_sell';
  email: string = '';
  password: string='';

  
  constructor( 
    public auth: Auth,
  ){}

  register(email: any, password: any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  login(email: any, password: any){
    return signInWithEmailAndPassword(this.auth, email, password); 
  }
  logOut(){
    return signOut(this.auth); 
  }

  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  loginClicked(): void{
    this.login(this.email, this.password)
      .then(response=>{
        console.log(response, 'succes in LOGIN');
      })
      .catch(error=>console.log(error)); 
  }

  googleClicked(){
    this.loginWithGoogle()
      .then(response =>{
        console.log(response, 'user logged with Google Account'); 
      })
      .catch(error => console.log(error))
  }
  logOutClicked():void{
    this.logOut()
      .then(()=>{
        console.log('User has signed out!'); 
      })
      .catch(error => console.log(error))
  }

  registerUser(){
    this.register(this.email, this.password)
      .then(response=>{
        console.log(response, 'succes in REGISTER');
      })
      .catch(error=>console.log(error));
  }
}
