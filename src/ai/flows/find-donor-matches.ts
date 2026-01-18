'use server';
/**
 * @fileOverview An AI-powered agent to find suitable donors for emergency requests.
 *
 * - findDonorMatches - A function that finds potential donor matches.
 * - FindDonorMatchesInput - The input type for the findDonorMatches function.
 * - FindDonorMatchesOutput - The return type for the findDonorMatches function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { mockUserProfile } from '@/lib/data';

const FindDonorMatchesInputSchema = z.object({
  requestType: z.enum(['Blood', 'Organ', 'Tissue']),
  detail: z.string().describe('The specific type of donation required (e.g., O-, Kidney, Cornea).'),
  location: z.string().describe('The location of the emergency request.'),
});
export type FindDonorMatchesInput = z.infer<typeof FindDonorMatchesInputSchema>;

const DonorMatchSchema = z.object({
    donorName: z.string().describe('Full name of the potential donor.'),
    donorId: z.string().describe('The unique ID of the donor.'),
    matchScore: z.number().min(0).max(100).describe('A score from 0-100 indicating the quality of the match.'),
    location: z.string().describe('The donor\'s location.'),
    isAvailable: z.boolean().describe('Whether the donor is currently marked as available.'),
});

const FindDonorMatchesOutputSchema = z.object({
  matches: z.array(DonorMatchSchema).describe('A list of potential donor matches.'),
});
export type FindDonorMatchesOutput = z.infer<typeof FindDonorMatchesOutputSchema>;


export async function findDonorMatches(input: FindDonorMatchesInput): Promise<FindDonorMatchesOutput> {
  return findDonorMatchesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findDonorMatchesPrompt',
  input: { schema: FindDonorMatchesInputSchema },
  output: { schema: FindDonorMatchesOutputSchema },
  prompt: `You are an AI assistant for DonorConnect, responsible for finding suitable donors for emergency requests.

  Your task is to identify the best potential matches from a list of registered donors based on the specific request details.

  **Request Details:**
  - **Type:** {{{requestType}}}
  - **Detail:** {{{detail}}}
  - **Location:** {{{location}}}

  **Donor Information (Sample):**
  - Donor Name: ${mockUserProfile.name}
  - Donor ID: ${mockUserProfile.id}
  - Availability: ${mockUserProfile.availability}
  - Blood Type: ${mockUserProfile.donations.bloodType}
  - Registered Organs: ${mockUserProfile.donations.organs?.join(', ')}
  - Registered Tissues: ${mockUserProfile.donations.tissues?.join(', ')}

  **Matching Criteria:**
  1.  **Compatibility:** Must be a compatible match (e.g., correct blood type, organ, or tissue).
  2.  **Availability:** The donor must be marked as 'Available'.
  3.  **Proximity:** Closer proximity to the request location results in a higher match score.

  Based on the criteria and the sample donor, generate a list of 3-5 realistic but fictional donor matches. Calculate a 'matchScore' for each, where a higher score indicates a better match. Ensure you return at least one donor with a high match score (above 80).
  `,
});

const findDonorMatchesFlow = ai.defineFlow(
  {
    name: 'findDonorMatchesFlow',
    inputSchema: FindDonorMatchesInputSchema,
    outputSchema: FindDonorMatchesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
