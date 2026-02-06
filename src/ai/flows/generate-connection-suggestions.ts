
"use server";

/**
 * @fileOverview Generates connection suggestions for alumni based on shared interests, location, and career paths.
 *
 * - generateConnectionSuggestions - A function that handles generating networking suggestions.
 * - GenerateConnectionSuggestionsInput - The input type for the function.
 * - GenerateConnectionSuggestionsOutput - The return type for the function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";
import type { Alumni } from "@/lib/data";

const AlumniSchema = z.object({
    id: z.string(),
    name: z.string(),
    course: z.string(),
    graduationYear: z.number(),
    company: z.string(),
    jobTitle: z.string(),
    location: z.string(),
});

const GenerateConnectionSuggestionsInputSchema = z.object({
  currentUser: AlumniSchema.describe("The profile of the user requesting suggestions."),
  otherAlumni: z.array(AlumniSchema).describe("A list of other alumni in the network."),
});
export type GenerateConnectionSuggestionsInput = z.infer<
  typeof GenerateConnectionSuggestionsInputSchema
>;

const GenerateConnectionSuggestionsOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      alumniId: z.string().describe("The ID of the suggested alumnus to connect with."),
      reason: z
        .string()
        .describe(
          "A short, compelling reason why the user should connect with this person (e.g., shared industry, location, or interests)."
        ),
    })
  ).describe("A list of up to 3 personalized connection suggestions."),
});
export type GenerateConnectionSuggestionsOutput = z.infer<
  typeof GenerateConnectionSuggestionsOutputSchema
>;

export async function generateConnectionSuggestions(
  input: GenerateConnectionSuggestionsInput
): Promise<GenerateConnectionSuggestionsOutput> {
  // Omit avatarUrl as it's not needed for the prompt
  const cleanedInput = {
      currentUser: (({ avatarUrl, ...o }) => o)(input.currentUser),
      otherAlumni: input.otherAlumni.map(({ avatarUrl, ...o }) => o)
  };
  return generateConnectionSuggestionsFlow(cleanedInput as any);
}

const prompt = ai.definePrompt({
  name: "generateConnectionSuggestionsPrompt",
  input: { schema: GenerateConnectionSuggestionsInputSchema },
  output: { schema: GenerateConnectionSuggestionsOutputSchema },
  prompt: `You are a sophisticated AI networking assistant for a college alumni platform. Your goal is to help an alumnus, {{currentUser.name}}, discover valuable connections within the network.

  Analyze the profile of the current user:
  - Name: {{currentUser.name}}
  - Job: {{currentUser.jobTitle}} at {{currentUser.company}}
  - Location: {{currentUser.location}}
  - Graduated: {{currentUser.graduationYear}} with a degree in {{currentUser.course}}

  Here is a list of other alumni in the network:
  {{#each otherAlumni}}
  - ID: {{id}}, Name: {{name}}, Job: {{jobTitle}} at {{company}}, Location: {{location}}, Graduated: {{graduationYear}}
  {{/each}}

  Based on this data, identify up to 3 of the most relevant alumni for {{currentUser.name}} to connect with. Provide a concise, personalized reason for each suggestion. Focus on shared criteria such as:
  1.  **Location:** Alumni living in the same city or region.
  2.  **Industry/Career:** Alumni working in the same company, a similar role, or a related industry.
  3.  **Shared Background:** Alumni who graduated in nearby years or from the same course.

  Example reason: "Works as a Product Manager in your city, San Francisco, and also graduated in 2018."

  Respond in JSON format with a list of suggestions.
  `,
});

const generateConnectionSuggestionsFlow = ai.defineFlow(
  {
    name: "generateConnectionSuggestionsFlow",
    inputSchema: GenerateConnectionSuggestionsInputSchema,
    outputSchema: GenerateConnectionSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
