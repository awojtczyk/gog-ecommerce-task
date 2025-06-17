import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainBannerComponent } from './main-banner.component';

describe('MainBannerComponent', () => {
  let component: MainBannerComponent;
  let fixture: ComponentFixture<MainBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainBannerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display game of the week title', () => {
    const titleElement = fixture.nativeElement.querySelector('.main-banner__title');
    expect(titleElement.textContent).toContain('GAME OF THE WEEK');
  });

  it('should have a banner image with correct alt text', () => {
    const imgElement = fixture.nativeElement.querySelector('.main-banner__bg');
    expect(imgElement.alt).toContain('The Witcher Adventure Game cover');
  });

  it('should have a secret button', () => {
    const buttonElement = fixture.nativeElement.querySelector('.main-banner__button');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.textContent.trim()).toContain('A secret button that you should totally implement');
  });

  it('should have proper ARIA attributes for accessibility', () => {
    const sectionElement = fixture.nativeElement.querySelector('.main-banner');
    const titleElement = fixture.nativeElement.querySelector('.main-banner__title');
    const buttonElement = fixture.nativeElement.querySelector('.main-banner__button');

    expect(sectionElement.getAttribute('aria-labelledby')).toBe('game-of-the-week-title');
    expect(titleElement.id).toBe('game-of-the-week-title');
    expect(buttonElement.getAttribute('aria-label')).toBe('Featured game action button');
  });
});
