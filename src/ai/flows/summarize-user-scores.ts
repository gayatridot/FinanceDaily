'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing a user's quiz scores over time.
 *
 * - summarizeUserScores - A function that takes a user's quiz scores as input and returns a summary of their performance.
 * - SummarizeUserScoresInput - The input type for the summarizeUserScores function.
 * - SummarizeUserScoresOutput - The return type for the summarizeUserScores function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUserScoresInputSchema = z.array(
  z.object({
    date: z.string().describe('The date the quiz was taken.'),
    score: z.number().describe('The score the user received on the quiz.'),
    topic: z.string().describe('The topic of the quiz.'),
  })
).describe('An array of the users quiz scores, with the date, score, and topic of each quiz.');

export type SummarizeUserScoresInput = z.infer<typeof SummarizeUserScoresInputSchema>;

const SummarizeUserScoresOutputSchema = z.object({
  summary: z.string().describe('A summary of the user\'s quiz scores over time, highlighting strengths and weaknesses.'),
});

export type SummarizeUserScoresOutput = z.infer<typeof SummarizeUserScoresOutputSchema>;

export async function summarizeUserScores(scores: SummarizeUserScoresInput): Promise<SummarizeUserScoresOutput> {
  return summarizeUserScoresFlow(scores);
}

const summarizeUserScoresPrompt = ai.definePrompt({
  name: 'summarizeUserScoresPrompt',
  input: {schema: SummarizeUserScoresInputSchema},
  output: {schema: SummarizeUserScoresOutputSchema},
  prompt: `You are an AI assistant that summarizes a user's quiz scores over time, highlighting strengths and weaknesses, so that they can better understand their financial knowledge and focus on areas for improvement.

  Here are the user's quiz scores:
  {{#each this}}
  - Date: {{date}}, Score: {{score}}, Topic: {{topic}}
  {{/each}}
  \n
  Please provide a summary of the user's performance.`,
});

const summarizeUserScoresFlow = ai.defineFlow(
  {
    name: 'summarizeUserScoresFlow',
    inputSchema: SummarizeUserScoresInputSchema,
    outputSchema: SummarizeUserScoresOutputSchema,
  },
  async input => {
    const {output} = await summarizeUserScoresPrompt(input);
    return output!;
  }
);
