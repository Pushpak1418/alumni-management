import { AdminLayout } from "@/components/layout/admin-layout";
import { CreateAnnouncementForm } from "@/components/create-announcement-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreateAnnouncementPage() {
  return (
    <AdminLayout>
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold mb-2">Create Announcement</h1>
          <p className="text-muted-foreground">
            Craft a new announcement for the alumni network. Our AI assistant can help generate content and target the right audience.
          </p>
        </div>
        <CreateAnnouncementForm />
      </div>
    </AdminLayout>
  );
}
