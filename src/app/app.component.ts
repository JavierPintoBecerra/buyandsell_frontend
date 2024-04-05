import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ListingsPageComponent } from './listings-page/listings-page.component';
import { CommonModule } from '@angular/common';
import { NavVarComponent } from './nav-var/nav-var.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ListingsPageComponent, CommonModule, NavVarComponent, RouterModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'buy_and_sell';
  
  constructor( ){}

  signInClicked(): void{
  }
  
}
