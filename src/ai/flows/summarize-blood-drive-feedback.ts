'use server';
/**
 * @fileOverview Summarizes feedback from blood drives to identify areas for improvement.
 *
 * - summarizeBloodDriveFeedback - A function that summarizes blood drive feedback.
 * - SummarizeBloodDriveFeedbackInput - The input type for the summarizeBloodDriveFeedback function.
 * - SummarizeBloodDriveFeedbackOutput - The return type for the summarizeBloodDriveFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeBloodDriveFeedbackInputSchema = z.object({
  feedbackText: z
    .string()
    .describe("Text containing feedback from a blood drive.  Can include multiple feedback entries."),
});
export type SummarizeBloodDriveFeedbackInput = z.infer<typeof SummarizeBloodDriveFeedbackInputSchema>;

const SummarizeBloodDriveFeedbackOutputSchema = z.object({
  summary: z
    .string()
    .describe("A concise summary of the feedback, highlighting key areas for improvement."),
});
export type SummarizeBloodDriveFeedbackOutput = z.infer<typeof SummarizeBloodDriveFeedbackOutputSchema>;

export async function summarizeBloodDriveFeedback(
  input: SummarizeBloodDriveFeedbackInput
): Promise<SummarizeBloodDriveFeedbackOutput> {
  return summarizeBloodDriveFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeBloodDriveFeedbackPrompt',
  input: {schema: SummarizeBloodDriveFeedbackInputSchema},
  output: {schema: SummarizeBloodDriveFeedbackOutputSchema},
  prompt: `You are an expert in analyzing feedback and providing concise summaries.

  Please summarize the following feedback from a blood drive, highlighting key areas for improvement:

  Feedback Text: {{{feedbackText}}}

  Summary:
  `,
});

const summarizeBloodDriveFeedbackFlow = ai.defineFlow(
  {
    name: 'summarizeBloodDriveFeedbackFlow',
    inputSchema: SummarizeBloodDriveFeedbackInputSchema,
    outputSchema: SummarizeBloodDriveFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
