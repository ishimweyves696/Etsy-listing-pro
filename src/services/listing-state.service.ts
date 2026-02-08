
import { Injectable, signal } from '@angular/core';

export interface ListingResult {
  title: string;
  description: string;
  bullets: string[];
  tags: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ListingStateService {
  private resultState = signal<ListingResult | null>(null);

  // Expose the result as a readonly signal to prevent mutation from outside.
  result = this.resultState.asReadonly();

  setResult(result: ListingResult): void {
    this.resultState.set(result);
  }

  clearResult(): void {
    this.resultState.set(null);
  }
}
