import { Injectable, signal } from '@angular/core';

export type Language = 'cs' | 'sk' | 'en';

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'cs', label: 'Čeština' },
  { code: 'sk', label: 'Slovenčina' },
  { code: 'en', label: 'English' },
];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly language = signal<Language>('cs');

  setLanguage(lang: Language): void {
    this.language.set(lang);
  }
}
