import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerComponent } from "ngx-spinner";
import { AppTitleService } from './core/services/title/app-title.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, ToastModule, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit{
  protected readonly title = signal('freshCartApp');
  private readonly appTitle = inject(AppTitleService);


  ngOnInit(): void {
      this.appTitle.init();
  }

}
