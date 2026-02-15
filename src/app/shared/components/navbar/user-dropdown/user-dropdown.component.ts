import { AuthenticationService } from './../../../../core/auth/services/authentication.service';
import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-dropdown',
  imports: [TranslatePipe],
  templateUrl: './user-dropdown.component.html',
  styleUrl: './user-dropdown.component.css',
})
export class UserDropdownComponent {

  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthenticationService);
  isDropdownOpen:boolean = false;



  toggleDropdown(event:Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log(this.isDropdownOpen);
  }


  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
  @HostListener('document:click', ['$event', '$event.target'])
  onDocumentClick(event: MouseEvent, targetElement:EventTarget | null): void {
    const clickedInside = (event.target as HTMLElement).closest('.user-dropdown-container');

    if (!clickedInside && this.isDropdownOpen) {
      this.closeDropdown();
    }
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
    this.closeDropdown();
  }

  navigateToWishlist(): void {
    this.router.navigate(['/wishlist']);
    this.closeDropdown();
  }

  signOut(): void {

    this.authenticationService.signOutUser();
  }

}
