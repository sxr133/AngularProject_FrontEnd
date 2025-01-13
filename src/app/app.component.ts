import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListingsPageComponent } from "./listings-page/listings-page.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { provideHttpClient  } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'buy-and-sell';
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
})
  .catch(err => console.error(err));