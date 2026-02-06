"use client";

import { useState, useTransition } from "react";
import { classifyCollegePost, type ClassifyCollegePostOutput } from "@/ai/flows/classify-college-post";
import { generateCollegePost } from "@/ai/flows/generate-college-post";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Users, User, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type AIClassificationResult = ClassifyCollegePostOutput | { error?: string };

function ClassifyButton({ content }: { content: string }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [result, setResult] = useState<AIClassificationResult | null>(null);

  const handleClassify = () => {
    startTransition(async () => {
      if (!content.trim()) {
        toast({
          title: "Error",
          description: "Post content cannot be empty.",
          variant: "destructive",
        });
        return;
      }

      try {
        const aiResult = await classifyCollegePost({ newsPost: content });
        setResult(aiResult);
      } catch (e) {
        const errorResult = { error: "An unexpected error occurred during classification." };
        setResult(errorResult);
        toast({
          title: "AI Classification Failed",
          description: errorResult.error,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="space-y-4">
        <Button onClick={handleClassify} disabled={isPending || !content.trim()}>
        {isPending ? (
            <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Classifying...
            </>
        ) : (
            <>
            <Sparkles className="mr-2 h-4 w-4" />
            Classify Audience
            </>
        )}
        </Button>
        {result && (
        <Card className="bg-muted/50">
            <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Audience Suggestion
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            {"error" in result ? (
                <p className="text-destructive-foreground">{result.error}</p>
            ) : (
                <>
                <div className="flex items-center gap-4">
                    {result.relevance === "all" ? (
                    <Users className="h-8 w-8 text-foreground" />
                    ) : (
                    <User className="h-8 w-8 text-foreground" />
                    )}
                    <div>
                    <p className="font-semibold">
                        Relevance:{" "}
                        <Badge variant={result.relevance === 'all' ? 'default' : 'secondary'}>
                        {result.relevance === "all"
                            ? "All Alumni"
                            : "Specific Subset"}
                        </Badge>
                    </p>
                    {result.subsetCriteria && (
                        <p className="text-sm text-muted-foreground">
                        Criteria: {result.subsetCriteria}
                        </p>
                    )}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-1">Reasoning:</h4>
                    <p className="text-sm text-muted-foreground italic">
                    "{result.reasoning}"
                    </p>
                </div>
                </>
            )}
            </CardContent>
        </Card>
        )}
    </div>
  );
}

function GenerateButton({ onContentGenerated }: { onContentGenerated: (content: string) => void }) {
  const [isPending, startTransition] = useTransition();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const { toast } = useToast();

  const handleGenerate = () => {
    startTransition(async () => {
      if (!topic.trim()) {
        toast({
            title: "Error",
            description: "Topic cannot be empty.",
            variant: "destructive",
        });
        return;
    }
      try {
        const result = await generateCollegePost({ topic, tone });
        onContentGenerated(result.postContent);
        toast({
          title: "Content Generated",
          description: "The AI has generated the announcement content.",
        });
      } catch (e) {
        toast({
          title: "AI Generation Failed",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          Generate with AI
        </CardTitle>
        <CardDescription>
          Let our AI assistant draft the announcement for you. Just provide a topic and a tone.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <Label htmlFor="topic">Topic</Label>
          <Input 
            id="topic" 
            placeholder="e.g., Annual homecoming event" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={isPending}
          />
        </div>
        <div>
          <Label htmlFor="tone">Tone</Label>
          <Select 
            value={tone}
            onValueChange={setTone}
            disabled={isPending}
          >
            <SelectTrigger id="tone">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="informal">Informal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={isPending || !topic.trim()}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              Generate Content
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CreateAnnouncementForm() {
  const [content, setContent] = useState("");

  return (
    <div className="space-y-6">
      <GenerateButton onContentGenerated={setContent} />
      <Card>
        <CardHeader>
          <CardTitle>Announcement Details</CardTitle>
          <CardDescription>
            Enter the content of your announcement below, or generate it with AI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="newsPost">Post Content</Label>
            <Textarea
              placeholder="Type your announcement here."
              id="newsPost"
              name="newsPost"
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <ClassifyButton content={content} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button>Publish Announcement</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
