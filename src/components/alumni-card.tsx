import Image from "next/image";
import type { Alumni } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin } from "lucide-react";
import Link from "next/link";

type AlumniCardProps = {
  alumnus: Alumni;
};

export function AlumniCard({ alumnus }: AlumniCardProps) {
  return (
    <Card className="flex flex-col text-center">
      <CardHeader className="items-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={alumnus.avatarUrl} alt={alumnus.name} data-ai-hint="person portrait" />
          <AvatarFallback>{alumnus.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle className="font-headline text-xl">{alumnus.name}</CardTitle>
        <CardDescription>Class of {alumnus.graduationYear}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Briefcase className="h-4 w-4" />
          <span>{alumnus.jobTitle}</span>
        </div>
        <p className="text-sm font-semibold">{alumnus.company}</p>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{alumnus.location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/directory/${alumnus.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
