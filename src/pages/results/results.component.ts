
import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ListingStateService, ListingResult } from '../../services/listing-state.service';

type CopyState = {
  [key in keyof ListingResult | string]: boolean;
};

@Component({
  selector: 'app-results',
  template: `
    @if (result(); as res) {
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Your Generated Listing</h1>
          <p class="text-lg text-gray-600 mt-1">Copy the generated content to use in your Etsy shop.</p>
        </div>
        <button (click)="startOver()" class="bg-white border border-gray-300 text-gray-800 font-semibold py-2 px-5 rounded-xl hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 transition-all duration-200 shadow-sm whitespace-nowrap">
          Start Over
        </button>
      </div>

      <!-- SEO Title -->
      <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h2 class="text-xl font-bold text-gray-800">SEO Optimized Title</h2>
            <p class="text-sm text-gray-500 mt-1">A compelling title to attract buyers.</p>
          </div>
           <button (click)="copyToClipboard(res.title, 'title')" class="flex items-center space-x-2 text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out" [class]="copyState().title ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
              @if (copyState().title) {
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Copied!</span>
              } @else {
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                </svg>
                <span>Copy</span>
              }
            </button>
        </div>
        <div class="p-4 bg-gray-50 rounded-xl text-gray-800">
          {{ res.title }}
        </div>
      </div>

      <!-- Product Description -->
      <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
         <div class="flex justify-between items-start mb-4">
          <div>
            <h2 class="text-xl font-bold text-gray-800">Product Description</h2>
            <p class="text-sm text-gray-500 mt-1">A detailed description to convert shoppers.</p>
          </div>
           <button (click)="copyToClipboard(res.description, 'description')" class="flex items-center space-x-2 text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out" [class]="copyState().description ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
              @if (copyState().description) {
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                <span>Copied!</span>
              } @else {
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" /></svg>
                <span>Copy</span>
              }
            </button>
        </div>
        <div class="p-4 bg-gray-50 rounded-xl text-gray-800 leading-relaxed whitespace-pre-wrap">
          {{ res.description }}
        </div>
      </div>

      <!-- Key Features (Bullet Points) -->
      <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
         <div class="flex justify-between items-start mb-4">
          <div>
            <h2 class="text-xl font-bold text-gray-800">Key Features</h2>
            <p class="text-sm text-gray-500 mt-1">Scannable points to highlight benefits.</p>
          </div>
           <button (click)="copyToClipboard(res.bullets.join('\\n'), 'bullets')" class="flex items-center space-x-2 text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out" [class]="copyState().bullets ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
              @if (copyState().bullets) {
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                <span>Copied!</span>
              } @else {
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" /></svg>
                <span>Copy</span>
              }
            </button>
        </div>
        <ul class="space-y-3 p-4 bg-gray-50 rounded-xl">
          @for (bullet of res.bullets; track bullet) {
            <li class="flex items-start">
              <svg class="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-gray-800">{{ bullet }}</span>
            </li>
          }
        </ul>
      </div>

      <!-- Etsy Tags -->
      <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
         <div class="flex justify-between items-start mb-4">
          <div>
            <h2 class="text-xl font-bold text-gray-800">Etsy Tags</h2>
            <p class="text-sm text-gray-500 mt-1">13 tags to improve your listing's visibility.</p>
          </div>
           <button (click)="copyToClipboard(res.tags, 'tags')" class="flex items-center space-x-2 text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out" [class]="copyState().tags ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
              @if (copyState().tags) {
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                <span>Copied!</span>
              } @else {
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" /></svg>
                <span>Copy All Tags</span>
              }
            </button>
        </div>
        <div class="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-xl">
          @for (tag of res.tags; track tag) {
            <span class="bg-orange-100 text-orange-800 text-sm font-semibold px-4 py-1.5 rounded-full">{{ tag }}</span>
          }
        </div>
      </div>

    </div>
    } @else {
      <div class="text-center bg-white p-12 sm:p-16 rounded-2xl shadow-lg border border-gray-100">
        <svg class="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836A3.375 3.375 0 0 1 14.625 2.25h3.375a3.375 3.375 0 0 1 3.375 3.375v3.375c0 1.254-.673 2.36-1.685 2.966M11.35 3.836c.216-.118.44-.225.673-.321m-2.025 2.025a3.375 3.375 0 0 0-3.375-3.375H3.375A3.375 3.375 0 0 0 0 5.625v3.375c0 1.254.673 2.36 1.685 2.966m0 0A3.375 3.375 0 0 1 5.625 13.5h3.375a3.375 3.375 0 0 1 2.336-1.014m-5.35 2.028a3.375 3.375 0 0 0-3.375 3.375v3.375a3.375 3.375 0 0 0 3.375 3.375h3.375a3.375 3.375 0 0 0 3.375-3.375v-3.375a3.375 3.375 0 0 0-3.375-3.375h-3.375m12.375-8.25a3.375 3.375 0 0 1 3.375 3.375v3.375a3.375 3.375 0 0 1-3.375 3.375h-3.375a3.375 3.375 0 0 1-3.375-3.375v-3.375a3.375 3.375 0 0 1 3.375-3.375h3.375Z" />
        </svg>
        <h2 class="mt-6 text-2xl font-bold text-gray-900">No results yet</h2>
        <p class="mt-2 text-lg text-gray-600">Your generated product listings will appear here.</p>
        <a routerLink="/home" class="mt-8 inline-block bg-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-orange-600 transition-all duration-300 transform-gpu hover:-translate-y-0.5 active:translate-y-0">
          Generate a New Listing
        </a>
      </div>
    }
  `,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent {
  private router = inject(Router);
  private listingState = inject(ListingStateService);

  result = this.listingState.result;
  copyState = signal<CopyState>({});

  startOver(): void {
    this.listingState.clearResult();
    this.router.navigate(['/home']);
  }

  async copyToClipboard(textToCopy: string | string[], key: string): Promise<void> {
    const text = Array.isArray(textToCopy) ? textToCopy.join(', ') : textToCopy;
    if (!navigator.clipboard) {
      console.warn('Clipboard API is not available.');
      // You could implement a fallback here if needed.
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      this.copyState.update(current => ({ ...current, [key]: true }));
      setTimeout(() => {
        this.copyState.update(current => ({ ...current, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Optionally, show an error message to the user.
    }
  }
}
