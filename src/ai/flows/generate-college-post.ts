'use server';

/**
 * @fileOverview Generates college news posts based on a topic and tone.
 *
 * - generateCollegePost - A function that handles the generation of college news posts.
 * - GenerateCollegePostInput - The input type for the generateCollegePost function.
 * - GenerateCollegePostOutput - The return type for the generateCollegePost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCollegePostInputSchema = z.object({
  topic: z.string().describe('The topic for the news post.'),
  tone: z.enum(['formal', 'informal', 'enthusiastic', 'professional']).describe('The desired tone of the post.'),
});
export type GenerateCollegePostInput = z.infer<typeof GenerateCollegePostInputSchema>;

const GenerateCollegePostOutputSchema = z.object({
    postContent: z.string().describe('The generated news post content.'),
});
export type GenerateCollegePostOutput = z.infer<typeof GenerateCollegePostOutputSchema>;

export async function generateCollegePost(
  input: GenerateCollegePostInput
): Promise<GenerateCollegePostOutput> {
  return generateCollegePostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCollegePostPrompt',
  input: {schema: GenerateCollegePostInputSchema},
  output: {schema: GenerateCollegePostOutputSchema},
  prompt: `You are an AI assistant for a college's alumni relations office. Your task is to write a news post for the alumni network.

  Generate a news post based on the following topic and tone. The post should be engaging and relevant to college alumni.

  Topic: {{topic}}
  Tone: {{tone}}

  Respond in JSON format with the generated post content in the 'postContent' field.
  `,
});

const generateCollegePostFlow = ai.defineFlow(
  {
    name: 'generateCollegePostFlow',
    inputSchema: GenerateCollegePostInputSchema,
    outputSchema: GenerateCollegePostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
