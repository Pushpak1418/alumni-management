'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/classify-college-post.ts';
import '@/ai/flows/generate-college-post.ts';
import '@/ai/flows/generate-memory-lane.ts';
import '@/ai/flows/generate-connection-suggestions.ts';
import '@/ai/flows/generate-story-card.ts';
