"use server";

/**
 * @fileOverview Generates nostalgic memories for alumni based on past events.
 *
 * - generateMemoryLane - A function that handles the generation of nostalgic captions.
 * - GenerateMemoryLaneInput - The input type for the generateMemoryLane function.
 * - GenerateMemoryLaneOutput - The return type for the generateMemoryLane function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const GenerateMemoryLaneInputSchema = z.object({
  eventName: z.string().describe("The name of the past event."),
  eventDescription: z
    .string()
    .describe("A brief description of what happened at the event."),
  alumniName: z.string().describe("The name of the alumnus viewing the memory."),
});
export type GenerateMemoryLaneInput = z.infer<
  typeof GenerateMemoryLaneInputSchema
>;

const GenerateMemoryLaneOutputSchema = z.object({
  nostalgicCaption: z
    .string()
    .describe(
      "A short, nostalgic caption (2-3 lines) to accompany a photo from the event. It should be written in a warm, personal, and reminiscent tone, addressed to the alumnus."
    ),
});
export type GenerateMemoryLaneOutput = z.infer<
  typeof GenerateMemoryLaneOutputSchema
>;

export async function generateMemoryLane(
  input: GenerateMemoryLaneInput
): Promise<GenerateMemoryLaneOutput> {
  return generateMemoryLaneFlow(input);
}

const prompt = ai.definePrompt({
  name: "generateMemoryLanePrompt",
  input: { schema: GenerateMemoryLaneInputSchema },
  output: { schema: GenerateMemoryLaneOutputSchema },
  prompt: `You are an AI assistant for a college alumni network, specializing in creating nostalgic content. Your task is to write a short, personalized memory for an alumnus based on a past event.

  Event: {{eventName}}
  Description: {{eventDescription}}
  Alumnus Name: {{alumniName}}

  Generate a nostalgic caption (2-3 lines) that feels personal and warm. Address the alumnus, {{alumniName}}, directly. The tone should be reminiscent and evoke positive feelings about their time at the university.

  Respond in JSON format with the generated caption in the 'nostalgicCaption' field.
  `,
});

const generateMemoryLaneFlow = ai.defineFlow(
  {
    name: "generateMemoryLaneFlow",
    inputSchema: GenerateMemoryLaneInputSchema,
    outputSchema: GenerateMemoryLaneOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
