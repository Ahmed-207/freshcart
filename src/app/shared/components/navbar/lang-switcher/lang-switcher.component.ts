import { Component, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface Language {
  code: string;
  label: string;
}

@Component({
  selector: 'app-lang-switcher',
  imports: [],
  templateUrl: './lang-switcher.component.html',
  styleUrl: './lang-switcher.component.css',
})
export class LangSwitcherComponent {

  private readonly renderer = inject(Renderer2);
  private readonly ele = inject(ElementRef);
  private readonly translator = inject(TranslateService);

  languages: Language[] = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' }
  ];

  selectedLanguage: Language = { code: this.translator.getCurrentLang(), 
    label: this.translator.getCurrentLang() === 'en' ? 'English' : 'العربية'
  };
  isOpen = false;


  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(lang: Language): void {
    this.selectedLanguage = lang;
    this.isOpen = false;
    this.translator.use(lang.code);
    this.renderer.setAttribute(document.documentElement, 'dir' , this.translator.getCurrentLang() === 'ar' ? 'rtl' : 'ltr');
    this.renderer.setAttribute(document.documentElement, 'lang' , this.translator.getCurrentLang());
  }

  // Closes the dropdown if user clicks outside the component
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.ele.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

}
