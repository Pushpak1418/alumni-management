 Alumni Management System

A modern, AI-powered alumni management platform built with Next.js, featuring intelligent content generation, face recognition, and comprehensive networking tools.

 Features

 Core Functionality
- User Profiles: Comprehensive alumni profiles with personal and professional information
- **Directory**: Searchable alumni directory with advanced filtering
- **News Feed**: Dynamic feed of announcements, posts, and updates
- **Memory Lane**: AI-generated nostalgic content and memory sharing
- **Network Map**: Visual representation of alumni connections and relationships
- **Voice of Wisdom**: Platform for sharing experiences and advice

### AI-Powered Features
- **Smart Content Generation**: AI-generated college posts, connection suggestions, and story cards
- **Face Recognition**: Integrated face detection and recognition using TensorFlow.js models
- **Intelligent Classification**: Automatic categorization of posts and content

### Admin Features
- **Dashboard**: Administrative overview and management tools
- **Announcement Management**: Create and manage system-wide announcements
- **Memory Management**: Curate and moderate memory lane content

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **AI/ML**: Firebase Genkit, Google AI (Gemini), TensorFlow.js face-api
- **Database**: Firebase (implied from Genkit usage)
- **Deployment**: Firebase App Hosting (apphosting.yaml present)

## Prerequisites

- Node.js 18+
- npm or yarn
- Google AI API key (for Gemini)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Alumini_ms
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:9002`

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run genkit:dev` - Start Genkit development environment
- `npm run genkit:watch` - Start Genkit in watch mode
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
src/
├── ai/                 # AI flows and Genkit configuration
├── app/                # Next.js app router pages
├── components/         # Reusable React components
├── hooks/             # Custom React hooks
└── lib/               # Utility functions and data

public/
└── models/            # TensorFlow.js face recognition models
```

## AI Features

The application leverages Firebase Genkit for AI-powered features:

- **Content Generation**: Generate engaging college posts and stories
- **Connection Suggestions**: AI-powered networking recommendations
- **Memory Lane**: Create personalized memory content
- **Post Classification**: Automatic content categorization

## Face Recognition

Integrated face detection and recognition capabilities using pre-trained models:
- Age and gender detection
- Facial expression analysis
- Face landmark detection
- Face recognition for user identification


