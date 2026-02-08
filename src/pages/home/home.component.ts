
import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ListingStateService, ListingResult } from '../../services/listing-state.service';
import { ListingGeneratorService } from '../../services/listing-generator.service';

interface GenerationMode {
  id: string;
  name: string;
  description: string;
  iconSvg: string;
}

@Component({
  selector: 'app-home',
  template: `
    <div class="max-w-4xl mx-auto">
      <div class="bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-100">
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Create new content</h1>
        <p class="text-lg text-gray-600 mb-10">Choose a content type and provide some details to get started.</p>

        @if (errorMessage()) {
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-6" role="alert">
            <strong class="font-bold">Generation Failed: </strong>
            <span class="block sm:inline">{{ errorMessage() }}</span>
          </div>
        }

        <!-- Mode Selector -->
        <div class="mb-10">
          <label class="block text-lg font-semibold text-gray-800 mb-4">1. Choose a Content Type</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (mode of generationModes; track mode.id) {
              <button
                (click)="selectMode(mode.id)"
                type="button"
                class="p-5 text-left border rounded-xl transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                [class]="selectedMode() === mode.id ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-500' : 'bg-white hover:border-gray-300 border-gray-200'"
              >
                <div [innerHTML]="getSafeHtml(mode.iconSvg)" class="h-8 w-8 text-orange-600 mb-3"></div>
                <h3 class="font-bold text-gray-900">{{ mode.name }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ mode.description }}</p>
              </button>
            }
          </div>
        </div>


        <div class="space-y-6">
          <label class="block text-lg font-semibold text-gray-800 -mb-2">2. Provide Product Details</label>

          <!-- Product Title -->
          <div>
            <label for="product-name" class="block text-base font-semibold text-gray-800 mb-2">Product Title</label>
            <input
              type="text"
              id="product-name"
              [value]="productName()"
              (input)="onProductNameChange($event)"
              class="w-full p-4 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all duration-200 ease-in-out"
              placeholder="e.g., Handmade Rustic Wooden Coasters"
            >
            <p class="mt-2 text-sm text-gray-500">This is the most important field for SEO. Be descriptive.</p>
          </div>

          <!-- Category -->
          <div>
            <label for="category" class="block text-base font-semibold text-gray-800 mb-2">Category</label>
            <select
              id="category"
              [value]="category()"
              (change)="onCategoryChange($event)"
              class="w-full p-4 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all duration-200 ease-in-out"
            >
              <option value="" disabled>Select a category</option>
              @for (cat of categories; track cat) {
                <option [value]="cat">{{ cat }}</option>
              }
            </select>
            <p class="mt-2 text-sm text-gray-500">Choosing the right category helps buyers find your item.</p>
          </div>

          <!-- Target Customer -->
          <div>
            <label for="target-customer" class="block text-base font-semibold text-gray-800 mb-2">
              Target Customer <span class="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="target-customer"
              [value]="targetCustomer()"
              (input)="onTargetCustomerChange($event)"
              class="w-full p-4 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all duration-200 ease-in-out"
              placeholder="e.g., new homeowners, coffee lovers, gift shoppers"
            >
            <p class="mt-2 text-sm text-gray-500">Describe who this product is for to get more tailored results.</p>
          </div>

          <!-- Action Button -->
          <div class="flex justify-end pt-8 mt-4 border-t border-gray-200">
            <button
              (click)="generateListing()"
              [disabled]="isFormInvalid() || isLoading()"
              class="w-full sm:w-auto flex items-center justify-center bg-orange-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-orange-600 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 transform-gpu hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none"
            >
              @if (isLoading()) {
                <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="http://www.w3.org/2000/svg">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating...</span>
              } @else {
                <span class="text-base">Generate Content</span>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private router = inject(Router);
  private listingState = inject(ListingStateService);
  private listingGenerator = inject(ListingGeneratorService);
  private sanitizer = inject(DomSanitizer);

  productName = signal('Handmade Rustic Wooden Coasters'); // Pre-filled for demo
  category = signal('Home & Living'); // Pre-filled for demo
  targetCustomer = signal('new homeowners, coffee lovers'); // Pre-filled for demo
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  selectedMode = signal<string | null>(null);

  generationModes: GenerationMode[] = [
    {
      id: 'listing',
      name: 'Etsy / Shopify Listing',
      description: 'Title, description, and tags for a product.',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" /></svg>`
    },
    {
      id: 'blog',
      name: 'Product Blog',
      description: 'An SEO-friendly blog post about the product.',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>`
    },
    {
      id: 'landing_page',
      name: 'Landing Page Copy',
      description: 'Headline and body copy for a sales page.',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" /></svg>`
    },
    {
      id: 'social',
      name: 'Social Media Content',
      description: 'Engaging posts for platforms like Instagram.',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V3a.75.75 0 0 1 .75-.75A2.25 2.25 0 0 1 16.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904M6.633 10.5l-1.879.623a4.5 4.5 0 0 0-3.031 3.031l-1.879.623M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V3a.75.75 0 0 1 .75-.75A2.25 2.25 0 0 1 16.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904" /></svg>`
    },
     {
      id: 'email',
      name: 'Email Campaign',
      description: 'A promotional email for your subscribers.',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>`
    },
    {
      id: 'comparison',
      name: 'Product Comparison',
      description: 'Compare your product to a competitor.',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`
    }
  ];

  categories = [
    'Home & Living',
    'Jewelry & Accessories',
    'Clothing & Shoes',
    'Weddings',
    'Toys & Entertainment',
    'Art & Collectibles',
    'Craft Supplies & Tools',
  ];

  isFormInvalid = computed(() => !this.selectedMode() || this.productName().trim() === '' || this.category() === '');

  selectMode(modeId: string): void {
    this.selectedMode.set(modeId);
  }
  
  getSafeHtml(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  onProductNameChange(event: Event): void {
    this.productName.set((event.target as HTMLInputElement).value);
  }

  onCategoryChange(event: Event): void {
    this.category.set((event.target as HTMLSelectElement).value);
  }

  onTargetCustomerChange(event: Event): void {
    this.targetCustomer.set((event.target as HTMLInputElement).value);
  }

  async generateListing(): Promise<void> {
    if (this.isFormInvalid() || this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      // NOTE: This logic currently only handles the original 'full' listing mode.
      // It will need to be adapted to handle the different generation modes.
      
      // 1. Generate title (critical step)
      const generatedTitle = await this.listingGenerator.generateTitle(
        this.productName(),
        this.category()
      );

      // Initialize final result with mock data and the new title
      const finalResult: ListingResult = {
        ...MOCK_RESULT,
        title: generatedTitle,
      };

      // 2. Attempt to generate description (non-critical step)
      try {
        const generatedDescription = await this.listingGenerator.generateDescription(
          generatedTitle, // Use the new AI title for better context
          this.category(),
          this.targetCustomer()
        );
        finalResult.description = generatedDescription;
      } catch (descError) {
        console.warn('Could not generate description, falling back to mock data.', descError);
      }

      // 3. Attempt to generate tags (non-critical step)
      try {
        const generatedTags = await this.listingGenerator.generateTags(
          generatedTitle,
          this.category()
        );
        finalResult.tags = generatedTags;
      } catch (tagsError) {
         console.warn('Could not generate tags, falling back to mock data.', tagsError);
      }
      
      this.listingState.setResult(finalResult);
      this.router.navigate(['/results']);

    } catch (error) {
      // This catches critical errors, like title generation failing.
      this.errorMessage.set(error instanceof Error ? error.message : 'An unknown error occurred.');
    } finally {
      this.isLoading.set(false);
    }
  }
}

// Mock data for fields NOT generated by AI in this step
const MOCK_RESULT: Omit<ListingResult, 'title'> = {
  description: `Protect your surfaces in style with our beautiful set of four handmade rustic wooden coasters. Each coaster is crafted from reclaimed pine, sanded to a smooth finish, and sealed with a water-resistant natural oil to highlight the gorgeous wood grain. Their simple, modern farmhouse design adds a touch of warmth and nature to any coffee table, desk, or nightstand.

Perfect as a thoughtful housewarming gift for new homeowners, a charming present for a coffee-loving friend, or simply as a well-deserved treat for yourself. These durable and timeless coasters are not just functional—they're a small piece of art that brings cozy, rustic vibes into your home.`,
  bullets: [
    'Set of 4 handcrafted wooden coasters from reclaimed pine.',
    'Sealed with a durable, water-resistant natural oil finish.',
    'Protects furniture from drips, spills, and heat marks.',
    'Perfect for coffee mugs, glasses, and cups.',
    'Thoughtful and practical gift for housewarmings or birthdays.',
  ],
  tags: [
    'wooden coasters',
    'farmhouse decor',
    'rustic home decor',
    'coffee table decor',
    'new home gift',
    'housewarming gift',
    'gift for him',
    'coaster set',
    'handmade coasters',
    'wood slice decor',
    'drink coasters',
    'table protection',
    'anniversary gift',
  ],
};
