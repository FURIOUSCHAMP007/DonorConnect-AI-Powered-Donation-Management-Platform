'use server';
/**
 * @fileOverview An AI-powered chatbot to answer donor queries.
 *
 * - chatbotSupportForDonors - A function that handles the chatbot support process.
 * - ChatbotSupportForDonorsInput - The input type for the chatbotSupportForDonors function.
 * - ChatbotSupportForDonorsOutput - The return type for the chatbotSupportForDonors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ChatbotSupportForDonorsInputSchema = z.object({
  query: z.string().describe('The donor query.'),
});
export type ChatbotSupportForDonorsInput = z.infer<typeof ChatbotSupportForDonorsInputSchema>;

const ChatbotSupportForDonorsOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the donor query.'),
});
export type ChatbotSupportForDonorsOutput = z.infer<typeof ChatbotSupportForDonorsOutputSchema>;

export async function chatbotSupportForDonors(input: ChatbotSupportForDonorsInput): Promise<ChatbotSupportForDonorsOutput> {
  return chatbotSupportForDonorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotSupportForDonorsPrompt',
  input: {schema: ChatbotSupportForDonorsInputSchema},
  output: {schema: ChatbotSupportForDonorsOutputSchema},
  prompt: `You are a chatbot designed to answer questions from blood donors.

  Provide helpful and accurate information about the blood donation process, eligibility requirements, and related topics.

  Respond to the following query:

  {{query}}`,
});

const chatbotSupportForDonorsFlow = ai.defineFlow(
  {
    name: 'chatbotSupportForDonorsFlow',
    inputSchema: ChatbotSupportForDonorsInputSchema,
    outputSchema: ChatbotSupportForDonorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
