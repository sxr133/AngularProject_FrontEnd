import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { provideHttpClient  } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAuth, getAuth, Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'buy-and-sell';
  user$: Observable<any>;

  constructor(public auth: Auth) {
    // Track the authentication state and explicitly type the observable
    this.user$ = authState(this.auth);
  }

  signInClicked(): void {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('User signed in:', result.user);
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
      });
  }

  signOutClicked(): void {
    this.auth.signOut()
      .then(() => {
        console.log('User signed out.');
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  }
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
})
  .catch((err) => console.error(err));