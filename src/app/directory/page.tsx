import { MainLayout } from "@/components/layout/main-layout";
import { AlumniCard } from "@/components/alumni-card";
import { alumniData } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function DirectoryPage() {
  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold mb-2">Alumni Directory</h1>
          <p className="text-muted-foreground">Find and connect with fellow alumni.</p>
          <div className="relative mt-4 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, course, company..."
              className="pl-10"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {alumniData.map((alumnus) => (
            <AlumniCard key={alumnus.id} alumnus={alumnus} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
