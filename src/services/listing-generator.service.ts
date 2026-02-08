
import { Injectable } from '@angular/core';
import { GoogleGenAI, Type } from '@google/genai';

// Let's assume the API key is set in the environment.
// In a real app, this would be handled securely.
declare var process: any;

@Injectable({
  providedIn: 'root',
})
export class ListingGeneratorService {
  private ai: GoogleGenAI;

  constructor() {
    // IMPORTANT: You must have a valid API key for this to work.
    // This key is managed externally and is not part of the app's code.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateTitle(productName: string, category: string): Promise<string> {
    const prompt = `
      You are an Etsy SEO expert.
      Generate ONE SEO-optimized Etsy title.
      Max 140 characters.
      Avoid keyword stuffing.
      Write for humans, not algorithms.

      Input:
      - Product title: "${productName}"
      - Category: "${category}"
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      const title = response.text?.trim();

      if (!title) {
        throw new Error('AI returned an empty title.');
      }

      return title;
    } catch (error) {
      console.error('Error generating title with AI:', error);
      throw new Error('Failed to generate title. Please check the API key and try again.');
    }
  }

  async generateDescription(productName: string, category: string, targetCustomer: string): Promise<string> {
    let prompt = `
      You are an Etsy conversion-focused copywriter.
      Write a persuasive Etsy product description.
      150–200 words.
      Focus on benefits, not features.
      Avoid keyword stuffing.
      Write naturally for humans.

      Input:
      - Product title: "${productName}"
      - Category: "${category}"
    `;

    if (targetCustomer) {
      prompt += `\n- Target customer: "${targetCustomer}"`;
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const description = response.text?.trim();
      
      if (!description) {
        throw new Error('AI returned an empty description.');
      }

      return description;
    } catch (error) {
      console.error('Error generating description with AI:', error);
      throw new Error('Failed to generate description. Please try again.');
    }
  }

  async generateTags(productTitle: string, category: string): Promise<string[]> {
    const prompt = `
      You are an Etsy SEO specialist.
      Generate a list of 13 Etsy tags for the following product.

      Rules for tags:
      - Each tag must be 2–4 words.
      - High buyer intent.
      - Relevant to the product and category.
      - Avoid duplicates.
      - Avoid keyword stuffing.
      - Plain text only (no symbols).

      Input:
      - Product title: "${productTitle}"
      - Category: "${category}"
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              tags: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                  description: "An SEO-optimized Etsy tag."
                },
                description: "An array of exactly 13 Etsy tags."
              }
            },
            required: ["tags"],
          },
        },
      });

      const jsonResponse = JSON.parse(response.text);
      const tags = jsonResponse?.tags;

      if (!tags || !Array.isArray(tags) || tags.length !== 13) {
        throw new Error('AI did not return 13 tags in the expected format.');
      }

      return tags;
    } catch (error) {
      console.error('Error generating tags with AI:', error);
      throw new Error('Failed to generate tags. Please try again.');
    }
  }
}
