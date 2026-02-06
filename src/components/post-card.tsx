import Image from "next/image";
import type { Post } from "@/lib/data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal } from "lucide-react";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const authorInitial = post.author.name.charAt(0);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint="person portrait" />
          <AvatarFallback>{authorInitial}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-sm text-muted-foreground">
            {post.author.jobTitle} at {post.author.company}
            {post.author.graduationYear > 0 && ` | Class of ${post.author.graduationYear}`}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{post.timestamp}</span>
            <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{post.content}</p>
        {post.image && (
          <div className="mt-4 relative aspect-video w-full overflow-hidden rounded-lg border">
            <Image
              src={post.image}
              alt="Post image"
              fill
              className="object-cover"
              data-ai-hint="college event"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="flex justify-between w-full text-muted-foreground text-sm">
            <span>{post.likes} Likes</span>
            <span>{post.comments} Comments</span>
        </div>
        <div className="w-full h-px bg-border my-1"></div>
        <div className="grid grid-cols-3 gap-2 w-full">
          <Button variant="ghost" className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4" />
            Like
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Comment
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
