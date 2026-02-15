import { Component, computed, inject, Input, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthenticationService } from '../../../core/auth/services/authentication.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { Constants } from '../../../core/constants/constants';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { UserDropdownComponent } from "./user-dropdown/user-dropdown.component";
import { TranslatePipe } from '@ngx-translate/core';
import { LangSwitcherComponent } from "./lang-switcher/lang-switcher.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, OverlayBadgeModule, UserDropdownComponent, TranslatePipe, LangSwitcherComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {

  @Input({ required: true }) isLogged!: boolean;
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly cartService = inject(CartService);
  cartItemsCount: Signal<number> = computed(() => this.cartService.cartCount());
  private readonly plat_id = inject(PLATFORM_ID);

  isMenuCollapsed = true;

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }



  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((_flowbite) => {
      initFlowbite();
    });
    if (isPlatformBrowser(this.plat_id)) {
      const token = localStorage.getItem(Constants.userToken);
      if (token) {
        this.getCartCount();

      }
    }
  }

  getCartCount(): void {
    this.cartService.getCartDetails().subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
      }
    })
  }

}
