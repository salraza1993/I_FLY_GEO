import { CommonModule } from '@angular/common';
import { Component, input, model, signal } from '@angular/core';
import { BreakerLineComponent } from "@/shared/components/breaker-line/breaker-line.component";

@Component({
  selector: 'app-card-footer, card-footer',
  imports: [CommonModule, BreakerLineComponent],
  templateUrl: './card-footer.component.html',
  styleUrl: './card-footer.component.css',
  host: {
    'class': 'card-footer-wrapper'
  }
})
export class CardFooterComponent {
  tripType = input<string | null>(null);

}
