
'use server';

/**
 * @fileOverview Generates a short, quotable nugget of wisdom from an alumni's story.
 *
 * - generateStoryCard - A function that handles the summarization of alumni stories.
 * - GenerateStoryCardInput - The input type for the generateStoryCard function.
 * - GenerateStoryCardOutput - The return type for the generateStoryCard function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStoryCardInputSchema = z.object({
  story: z.string().describe("An alumni's story about their experience."),
  topic: z.string().describe('The topic of the story (e.g., "First Job Interview", "Networking").'),
});
export type GenerateStoryCardInput = z.infer<typeof GenerateStoryCardInputSchema>;

const GenerateStoryCardOutputSchema = z.object({
  nuggetOfWisdom: z
    .string()
    .describe(
      'A short, powerful, and quotable "nugget of wisdom" (1-2 sentences) summarized from the story. It should be inspiring and easy to digest.'
    ),
});
export type GenerateStoryCardOutput = z.infer<typeof GenerateStoryCardOutputSchema>;

export async function generateStoryCard(
  input: GenerateStoryCardInput
): Promise<GenerateStoryCardOutput> {
  return generateStoryCardFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStoryCardPrompt',
  input: {schema: GenerateStoryCardInputSchema},
  output: {schema: GenerateStoryCardOutputSchema},
  prompt: `You are an AI specializing in mentorship and storytelling. Your task is to extract the core wisdom from an alumnus's story and present it as a short, impactful quote.

  Analyze the following story on the topic of "{{topic}}". Distill its main lesson into a single, quotable "nugget of wisdom." The tone should be inspiring, authentic, and easily shareable.

  Alumni Story:
  "{{story}}"

  Respond in JSON format with the generated quote in the 'nuggetOfWisdom' field.
  `,
});

const generateStoryCardFlow = ai.defineFlow(
  {
    name: 'generateStoryCardFlow',
    inputSchema: GenerateStoryCardInputSchema,
    outputSchema: GenerateStoryCardOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
