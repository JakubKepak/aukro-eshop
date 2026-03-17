import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../services/language.service';
import { TRANSLATIONS } from '../i18n/translations';

@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {
  transform(key: string, lang: Language): string {
    return TRANSLATIONS[key]?.[lang] ?? key;
  }
}
