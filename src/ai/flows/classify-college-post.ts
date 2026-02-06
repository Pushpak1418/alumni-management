'use server';

/**
 * @fileOverview Classifies college news posts to determine if they are relevant to all alumni or a specific subset.
 *
 * - classifyCollegePost - A function that handles the classification of college news posts.
 * - ClassifyCollegePostInput - The input type for the classifyCollegePost function.
 * - ClassifyCollegePostOutput - The return type for the classifyCollegePost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyCollegePostInputSchema = z.object({
  newsPost: z.string().describe('The news post content to classify.'),
});
export type ClassifyCollegePostInput = z.infer<typeof ClassifyCollegePostInputSchema>;

const ClassifyCollegePostOutputSchema = z.object({
  relevance: z
    .enum(['all', 'subset'])
    .describe(
      'Whether the news post is relevant to all alumni or a specific subset.'
    ),
  subsetCriteria: z
    .string()
    .optional()
    .describe(
      'The criteria for the subset of alumni the news post is relevant to. This could be location, graduation year, company, or interests.'
    ),
  reasoning: z
    .string()
    .optional()
    .describe(
      'The reasoning behind why it is relevant to all alumni or just a subset'
    ),
});
export type ClassifyCollegePostOutput = z.infer<typeof ClassifyCollegePostOutputSchema>;

export async function classifyCollegePost(
  input: ClassifyCollegePostInput
): Promise<ClassifyCollegePostOutput> {
  return classifyCollegePostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyCollegePostPrompt',
  input: {schema: ClassifyCollegePostInputSchema},
  output: {schema: ClassifyCollegePostOutputSchema},
  prompt: `You are an AI assistant that classifies college news posts to determine if they are relevant to all alumni or only a specific subset.

  Analyze the following news post and determine its relevance.
  If the news post is relevant to a specific subset, identify the criteria for that subset (e.g., location, graduation year, company, or interests).
  Explain the reasoning for your classification.

  News Post:
  {{newsPost}}

  Respond in JSON format with the following fields:
  - relevance: 'all' or 'subset'
  - subsetCriteria: (Optional) The criteria for the subset of alumni the news post is relevant to.
  - reasoning: The reasoning behind why it is relevant to all alumni or just a subset.
  `,
});

const classifyCollegePostFlow = ai.defineFlow(
  {
    name: 'classifyCollegePostFlow',
    inputSchema: ClassifyCollegePostInputSchema,
    outputSchema: ClassifyCollegePostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
