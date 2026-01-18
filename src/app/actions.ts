'use server';

import { chatbotSupportForDonors } from '@/ai/flows/chatbot-support-for-donors';
import { findDonorMatches } from '@/ai/flows/find-donor-matches';
import { EmergencyRequest } from '@/lib/types';
import { z } from 'zod';

const chatbotSchema = z.object({
  query: z.string().min(1),
});

export async function getChatbotResponse(prevState: any, formData: FormData) {
  const validatedFields = chatbotSchema.safeParse({
    query: formData.get('query'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please enter a message.',
      response: '',
    };
  }

  const query = validatedFields.data.query;

  try {
    const result = await chatbotSupportForDonors({ query });
    return {
      message: query,
      response: result.response,
    };
  } catch (e) {
    console.error(e);
    return {
      message: query,
      response: "Sorry, I'm having trouble connecting to my brain right now. Please try again later.",
    };
  }
}

export async function findMatchesAction(request: EmergencyRequest) {
  if (request.status !== 'Pending') {
    return { matches: [], error: 'Matches can only be found for pending requests.' };
  }

  const detail = request.bloodType || request.organ || request.tissue;
  if (!detail) {
    return { matches: [], error: 'Request details are missing.' };
  }

  try {
    const result = await findDonorMatches({
      requestType: request.requestType,
      detail,
      location: request.location,
    });
    return { matches: result.matches, error: null };
  } catch (e) {
    console.error(e);
    return { matches: [], error: 'The AI matchmaker is currently unavailable. Please try again later.' };
  }
}
