
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
import { memoriesData, type Memory, alumniData, type Alumni } from "@/lib/data";
import { generateMemoryLane } from "@/ai/flows/generate-memory-lane";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function MemoryCard({ memory, currentUser, suggestedFriend }: { memory: Memory; currentUser: Alumni; suggestedFriend: Alumni; }) {
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const generateCaption = async () => {
      try {
        setLoading(true);
        const result = await generateMemoryLane({
          eventName: memory.title,
          eventDescription: memory.description,
          alumniName: currentUser.name.split(' ')[0], // Use first name
        });
        setCaption(result.nostalgicCaption);
      } catch (error) {
        console.error("Failed to generate memory caption:", error);
        // Fallback caption
        setCaption(`Remember this day at ${memory.title}? Good times!`);
      } finally {
        setLoading(false);
      }
    };

    generateCaption();
  }, [memory, currentUser]);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
         <CardTitle className="font-headline text-2xl">{memory.title}</CardTitle>
         <CardDescription>{memory.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            <Image
                src={memory.imageUrl}
                alt={memory.title}
                fill
                className="object-cover"
                data-ai-hint="nostalgic event"
            />
        </div>
        <div className="mt-4">
            {loading ? (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            ) : (
                <blockquote className="border-l-2 pl-4 italic text-muted-foreground">
                    {caption}
                </blockquote>
            )}
        </div>
      </CardContent>
       <CardFooter className="bg-muted/50 p-4">
        <div className="flex items-center justify-between w-full">
            <div>
                <p className="text-sm text-muted-foreground">Remember this day with {suggestedFriend.name}?</p>
            </div>
            <Button size="sm" asChild>
                <Link href={`/directory/${suggestedFriend.id}`}>
                    Reconnect <ArrowRight className="ml-2" />
                </Link>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}


export default function MemoryLanePage() {
  const currentUser = alumniData[0]; // Mock current user as Jane Doe
  const [suggestedFriends, setSuggestedFriends] = useState<Alumni[]>([]);

  useEffect(() => {
    // Mock logic to find suggested friends from the same graduation year
    const friends = alumniData.filter(
      (a) => a.id !== currentUser.id && a.graduationYear === currentUser.graduationYear
    );
     // Shuffle and pick to make it seem more dynamic
    setSuggestedFriends(friends.sort(() => 0.5 - Math.random()));
  }, [currentUser]);


  return (
    <MainLayout>
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold mb-2">Memory Lane</h1>
          <p className="text-muted-foreground">
            Relive your best moments from Legacy University, powered by AI.
          </p>
        </div>
        <div className="space-y-8">
            {memoriesData.map((memory, index) => {
                const friend = suggestedFriends[index % suggestedFriends.length];
                if (!friend) return null; // Avoid rendering if no friend is available
                return (
                    <MemoryCard key={memory.id} memory={memory} currentUser={currentUser} suggestedFriend={friend} />
                )
            })}
        </div>
      </div>
    </MainLayout>
  );
}
