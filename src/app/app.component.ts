import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@core/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <main class="app-container">
      <router-outlet />
    </main>
  `,
  styles: [`
    .app-container {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: var(--spacing-md);
      display: flex;
      flex-direction: column;
      padding-top: 29px;
    }
  `]
})
export class AppComponent {}
