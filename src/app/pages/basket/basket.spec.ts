import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { BasketComponent } from './basket';
import { BasketService } from '../../services/basket.service';
import { LanguageService } from '../../services/language.service';
import { Product } from '../../models/product.model';

const mockProduct: Product = {
  id: 'apple',
  name: { cs: 'Jablko', sk: 'Jablko', en: 'Apple' },
  priceCzk: 45,
  unit: 'kg',
  image: 'assets/images/apple.svg',
};

describe('BasketComponent', () => {
  let fixture: ComponentFixture<BasketComponent>;
  let component: BasketComponent;
  let basketService: BasketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    basketService = TestBed.inject(BasketService);
    TestBed.inject(LanguageService).setLanguage('en');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty message when basket is empty', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Your basket is empty');
  });

  it('should show basket items after adding a product', () => {
    basketService.addItem(mockProduct, 2);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Apple');
    expect(el.textContent).toContain('2 kg');
  });

  it('should show item count in header', () => {
    basketService.addItem(mockProduct, 1);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('1 item');
  });

  it('should remove item when remove button is clicked', () => {
    basketService.addItem(mockProduct, 1);
    fixture.detectChanges();

    const removeBtn = fixture.nativeElement.querySelector('.remove-btn') as HTMLButtonElement;
    expect(removeBtn).toBeTruthy();
    removeBtn.click();
    fixture.detectChanges();

    expect(basketService.itemCount()).toBe(0);
    expect(fixture.nativeElement.textContent).toContain('Your basket is empty');
  });
});
