import { MainLayout } from "@/components/layout/main-layout";
import { PostCard } from "@/components/post-card";
import { postsData } from "@/lib/data";
import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsFeedPage() {
  return (
    <MainLayout>
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8">
            <h1 className="font-headline text-4xl font-bold mb-2">News Feed</h1>
            <p className="text-muted-foreground">See what's happening in your alumni network.</p>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://picsum.photos/seed/avatar1/40/40" data-ai-hint="person portrait" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Input placeholder="What's on your mind, Jane?" className="bg-muted border-0 focus-visible:ring-0 text-base" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="flex justify-end">
                    <Button>Post</Button>
                </div>
            </CardContent>
          </Card>
          
          {postsData.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
