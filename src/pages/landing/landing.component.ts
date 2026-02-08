
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  template: `
    <div class="bg-white">
      <!-- Header -->
      <header class="absolute inset-x-0 top-0 z-50">
        <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div class="flex lg:flex-1">
            <a href="#" class="-m-1.5 p-1.5 flex items-center space-x-3">
              <svg class="h-9 w-9 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.47 2.118L2.25 12.87a2.25 2.25 0 0 1 2.248-2.118l.23.08a3 3 0 0 0 5.78-1.128 2.25 2.25 0 0 1 2.47-2.118L12.75 4.5l.23.08a3 3 0 0 0 5.78 1.128 2.25 2.25 0 0 1 2.47 2.118l-1.99 7.02a2.25 2.25 0 0 1-2.248 2.118l-.23-.08a3 3 0 0 0-5.78-1.128 2.25 2.25 0 0 1-2.47-2.118L9.53 16.122Z" />
              </svg>
              <span class="font-bold text-2xl text-gray-800">Etsy Listing Pro</span>
            </a>
          </div>
        </nav>
      </header>

      <main class="isolate">
        <!-- Hero section -->
        <div class="relative pt-14">
          <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#ffc966] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
          </div>
          <div class="py-24 sm:py-32">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
              <div class="mx-auto max-w-2xl text-center">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Stop Guessing. Start Selling.</h1>
                <p class="mt-6 text-lg leading-8 text-gray-600">Create high-converting, SEO-optimized product listings for your Etsy shop in seconds. Our AI-powered tool helps you attract more buyers and save hours of work.</p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                  <a routerLink="/home" class="rounded-xl bg-orange-500 px-6 py-4 text-base font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-all duration-300 transform-gpu hover:-translate-y-0.5 active:translate-y-0">
                    Start Now For Free
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ffc966] to-[#ff80b5] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
          </div>
        </div>

        <!-- Feature section -->
        <div class="bg-gray-50 py-24 sm:py-32">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:text-center">
              <h2 class="text-base font-semibold leading-7 text-orange-600">Everything You Need</h2>
              <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">The Ultimate Toolkit for Etsy Sellers</p>
              <p class="mt-6 text-lg leading-8 text-gray-600">Go from a simple product idea to a fully optimized Etsy listing in a fraction of the time.</p>
            </div>
            <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                <div class="relative pl-16">
                  <dt class="text-base font-semibold leading-7 text-gray-900">
                    <div class="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500">
                      <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.012H8.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3h3.75a3 3 0 0 1 3 3v3.75M12 18.012v-3.75m0 3.75a3 3 0 0 0 3-3V8.25a3 3 0 0 0-3-3H9" />
                      </svg>
                    </div>
                    Boost Your SEO
                  </dt>
                  <dd class="mt-2 text-base leading-7 text-gray-600">Generate titles, descriptions, and tags that are optimized to rank higher in Etsy search results.</dd>
                </div>
                <div class="relative pl-16">
                  <dt class="text-base font-semibold leading-7 text-gray-900">
                    <div class="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500">
                      <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    Save Hours of Time
                  </dt>
                  <dd class="mt-2 text-base leading-7 text-gray-600">Stop staring at a blank page. Create compelling copy and get back to what you do best—creating.</dd>
                </div>
                <div class="relative pl-16">
                  <dt class="text-base font-semibold leading-7 text-gray-900">
                    <div class="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500">
                      <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                         <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                      </svg>
                    </div>
                    Increase Your Clicks
                  </dt>
                  <dd class="mt-2 text-base leading-7 text-gray-600">Write copy that speaks directly to your target customer, encouraging more clicks, favorites, and sales.</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
      
      <!-- Footer -->
      <footer class="bg-white">
        <div class="mx-auto max-w-7xl overflow-hidden px-6 py-12 lg:px-8">
            <p class="text-center text-xs leading-5 text-gray-500">&copy; 2024 Etsy Listing Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {}
