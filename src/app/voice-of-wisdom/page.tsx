
'use client';

import { MainLayout } from "@/components/layout/main-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { alumniData, wisdomStoriesData, type Alumni, type WisdomStory } from "@/lib/data";
import { generateStoryCard } from "@/ai/flows/generate-story-card";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Mic, PlayCircle, Quote, UploadCloud, Volume2, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

function StoryCard({ story }: { story: WisdomStory }) {
  const [wisdom, setWisdom] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const author = alumniData.find(a => a.id === story.alumniId);

  useEffect(() => {
    const generateWisdom = async () => {
      try {
        setLoading(true);
        const result = await generateStoryCard({
          story: story.originalStory,
          topic: story.topic,
        });
        setWisdom(result.nuggetOfWisdom);
      } catch (error) {
        console.error("Failed to generate wisdom nugget:", error);
        setWisdom("Every experience is a lesson learned."); // Fallback
      } finally {
        setLoading(false);
      }
    };

    generateWisdom();
  }, [story]);

  if (!author) return null;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
           <Avatar className="h-12 w-12 border">
              <AvatarImage src={author.avatarUrl} alt={author.name} data-ai-hint="person portrait" />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                 <p className="font-semibold">{author.name}</p>
                 <p className="text-sm text-muted-foreground">Class of {author.graduationYear}</p>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-start gap-4">
            <Quote className="h-6 w-6 text-primary flex-shrink-0" />
            {loading ? (
                 <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            ) : (
                <p className="font-medium text-lg italic">
                    {wisdom}
                </p>
            )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4 flex-col items-start gap-4">
        <div className="flex items-center justify-between w-full">
            <p className="text-sm font-semibold text-muted-foreground">{story.topic}</p>
            <Button variant="ghost" size="icon">
                <PlayCircle className="h-6 w-6" />
                <span className="sr-only">Play audio</span>
            </Button>
        </div>
        <div className="flex items-center gap-2 w-full">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <div className="w-full h-1 bg-border rounded-full">
                <div className="w-1/3 h-1 bg-primary rounded-full"></div>
            </div>
             <span className="text-xs text-muted-foreground">0:12</span>
        </div>
      </CardFooter>
    </Card>
  );
}

function ShareStoryForm() {
    const { toast } = useToast();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Story Submitted!",
            description: "Thank you for sharing your wisdom with the community.",
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Share Your Wisdom</CardTitle>
                    <CardDescription>Leave a story for the next generation. Your voice can make a difference.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                         <Label htmlFor="topic">Topic</Label>
                        <Select name="topic" required>
                             <SelectTrigger id="topic">
                                <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="first-job">First Job Interview</SelectItem>
                                <SelectItem value="passion">Finding Your Passion</SelectItem>
                                <SelectItem value="networking">Networking</SelectItem>
                                <SelectItem value="overcoming-failure">Overcoming Failure</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="story">Your Story</Label>
                        <Textarea id="story" placeholder="Share your experience... (or use the mock audio recorder below)" rows={5} required />
                    </div>
                    <div className="space-y-2">
                        <Label>Record Audio (Coming Soon)</Label>
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-muted border border-dashed">
                           <Button type="button" variant="outline" size="icon" className="h-12 w-12 rounded-full">
                               <Mic className="h-6 w-6" />
                           </Button>
                           <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium">Recording...</p>
                                <div className="w-full bg-border rounded-full h-1.5">
                                    <div className="bg-primary h-1.5 rounded-full w-2/3"></div>
                                </div>
                           </div>
                           <span className="text-sm text-muted-foreground font-mono">01:23</span>
                        </div>
                        <p className="text-xs text-muted-foreground">The ability to record and upload voice notes is not yet implemented.</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button type="submit">Submit Story</Button>
                </CardFooter>
            </Card>
        </form>
    );
}

export default function VoiceOfWisdomPage() {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold mb-2 flex items-center gap-3">
          <Sparkles className="text-primary"/> Voice of Wisdom
        </h1>
        <p className="text-muted-foreground">
          Listen to bite-sized stories and advice from those who have walked the path before you.
        </p>
      </div>

     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold">Wisdom from the Network</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wisdomStoriesData.map((story) => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </div>
        </div>
        <div className="lg:col-span-1">
             <h2 className="text-2xl font-semibold mb-4">Share Your Story</h2>
            <ShareStoryForm />
        </div>
     </div>
    </MainLayout>
  );
}
