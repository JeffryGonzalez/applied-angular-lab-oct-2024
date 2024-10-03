import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LinkItem } from '../types';

@Component({
  selector: 'app-nav-bar-center-items',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <ul class="menu menu-horizontal px-1">
      @for(link of links(); track $index) {
      <li>
        <a
          [routerLink]="link.path"
          [routerLinkActive]="['underline', 'underline-offset-2', 'font-bold']"
          [routerLinkActiveOptions]="{ exact: true }"
          >{{ link.text }}</a
        >
      </li>
      }
    </ul>
  `,
  styles: ``,
})
export class NavbarCenterMenuComponent {
  links = input.required<LinkItem[]>();
}
