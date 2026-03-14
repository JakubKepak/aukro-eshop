import { inject, Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { TRANSLATIONS } from '../i18n/translations';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly languageService = inject(LanguageService);

  transform(key: string): string {
    return TRANSLATIONS[key]?.[this.languageService.language()] ?? key;
  }
}
