import { AdminLayout } from "@/components/layout/admin-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { alumniData, postsData } from "@/lib/data";
import { ArrowRight, PenSquare, Users, Newspaper, Building, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PostCard } from "@/components/post-card";

export default function AdminDashboardPage() {
  const recentPost = postsData.find(p => p.author.name === "Legacy University");

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your alumni network and communications.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alumni</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alumniData.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 since last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{[...new Set(alumniData.map(a => a.company))].length}</div>
            <p className="text-xs text-muted-foreground">
              across the network
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posts This Month</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postsData.length}</div>
             <p className="text-xs text-muted-foreground">
              +5 since last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-primary/10 border-primary/50">
          <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">New Announcement</CardTitle>
              <CardDescription className="text-sm">Craft and publish a new announcement.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="sm">
              <Link href="/create-announcement">Create Now <PenSquare className="ml-2" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Recent Official Post</h2>
            {recentPost && <PostCard post={recentPost} />}
        </div>
        <div className="lg:col-span-1">
             <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
             <div className="space-y-4">
                <Card className="hover:bg-muted/50 transition-colors">
                    <Link href="/directory" className="block p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">Alumni Directory</h3>
                                <p className="text-sm text-muted-foreground">Search and manage alumni profiles</p>
                            </div>
                           <ArrowRight className="h-5 w-5 text-muted-foreground"/>
                        </div>
                    </Link>
                </Card>
                 <Card className="hover:bg-muted/50 transition-colors">
                    <Link href="/news-feed" className="block p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">News Feed</h3>
                                <p className="text-sm text-muted-foreground">View and moderate community posts</p>
                            </div>
                           <ArrowRight className="h-5 w-5 text-muted-foreground"/>
                        </div>
                    </Link>
                </Card>
                 <Card className="hover:bg-muted/50 transition-colors">
                    <Link href="/admin/manage-memories" className="block p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">Manage Memories</h3>
                                <p className="text-sm text-muted-foreground">Add content for Memory Lane</p>
                            </div>
                           <Camera className="h-5 w-5 text-muted-foreground"/>
                        </div>
                    </Link>
                </Card>
             </div>
        </div>
      </div>
    </AdminLayout>
  );
}
