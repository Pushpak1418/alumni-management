import { MainLayout } from "@/components/layout/main-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bell, Calendar, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { postsData } from "@/lib/data";

export default function DashboardPage() {
  const recentPosts = postsData.slice(0, 2);

  return (
    <MainLayout>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h1 className="font-headline text-4xl font-bold mb-2">Welcome Back, Jane!</h1>
            <p className="text-muted-foreground">Here's what's new in your network.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest posts from your network.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                <Link href="/news-feed">View Full Feed <ArrowRight className="ml-2" /></Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-primary/10 border-primary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5" /> AI-Powered Memory Lane</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Take a stroll down memory lane with AI-generated throwbacks from your time at Legacy University.</p>
              <Button asChild>
                <Link href="/memory-lane">Relive Memories <ArrowRight className="ml-2" /></Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-center bg-muted/50 rounded-md px-3 py-1">
                  <p className="font-bold text-lg">JUL</p>
                  <p className="text-xl font-bold">25</p>
                </div>
                <div>
                  <h4 className="font-semibold">Annual Alumni Homecoming</h4>
                  <p className="text-sm text-muted-foreground">Legacy University Campus</p>
                  <Button variant="link" className="p-0 h-auto text-primary">View Details</Button>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-center bg-muted/50 rounded-md px-3 py-1">
                  <p className="font-bold text-lg">AUG</p>
                  <p className="text-xl font-bold">12</p>
                </div>
                <div>
                  <h4 className="font-semibold">Bay Area Alumni Mixer</h4>
                  <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                   <Button variant="link" className="p-0 h-auto text-primary">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">John Smith commented on your post.</p>
                <p className="text-sm text-muted-foreground">Your connection request to Alex Johnson was accepted.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
