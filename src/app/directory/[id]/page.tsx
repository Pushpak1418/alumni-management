import Image from "next/image";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Briefcase, Building, GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { alumniData } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function AlumniProfilePage({ params }: { params: { id: string } }) {
  const profileData = alumniData.find(a => a.id === params.id);

  if (!profileData) {
    notFound();
  }

  // Mock data for experience and education since it's not in alumniData
  const experience = [
      {
          title: profileData.jobTitle,
          company: profileData.company,
          duration: "2020 - Present"
      },
      {
          title: "Software Engineer",
          company: "Tech Solutions",
          duration: "2018 - 2020"
      }
  ];
  const education = [
      {
          degree: `B.S. in ${profileData.course}`,
          university: "Legacy University",
          duration: `2014 - ${profileData.graduationYear}`
      }
  ];
  const bio = `Passionate ${profileData.jobTitle.toLowerCase()} with a focus on building scalable web applications and a love for elegant, user-centric design. Always eager to connect with fellow innovators and tech enthusiasts from our alma mater.`
  const email = `${profileData.name.toLowerCase().replace(' ', '.')}@example.com`;
  const phone = `+1 234 567 890`;


  return (
    <MainLayout>
      <div className="container mx-auto max-w-5xl">
        <Button variant="outline" asChild className="mb-4">
            <Link href="/directory">Back to Directory</Link>
        </Button>
        <Card className="overflow-hidden">
          <div className="h-32 w-full bg-secondary" />
          <CardHeader className="flex flex-col items-center text-center -mt-16 sm:flex-row sm:text-left sm:items-end sm:gap-4">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={profileData.avatarUrl} alt={profileData.name} data-ai-hint="person portrait"/>
              <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="py-2 flex-1">
                <CardTitle className="font-headline text-3xl">{profileData.name}</CardTitle>
                <p className="text-lg text-muted-foreground">{profileData.jobTitle} at {profileData.company}</p>
                <p className="text-sm text-muted-foreground">{profileData.location}</p>
            </div>
            <Button>Connect</Button>
          </CardHeader>
          <CardContent className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
                <Card>
                    <CardHeader><CardTitle>About</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground">{bio}</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Experience</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {experience.map(exp => (
                            <div key={exp.company} className="flex gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted"><Building className="h-6 w-6"/></div>
                                <div>
                                    <p className="font-semibold">{exp.title}</p>
                                    <p className="text-sm">{exp.company}</p>
                                    <p className="text-xs text-muted-foreground">{exp.duration}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Education</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {education.map(edu => (
                            <div key={edu.university} className="flex gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted"><GraduationCap className="h-6 w-6"/></div>
                                <div>
                                    <p className="font-semibold">{edu.university}</p>
                                    <p className="text-sm">{edu.degree}</p>
                                    <p className="text-xs text-muted-foreground">{edu.duration}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-1 space-y-4">
                <Card>
                     <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
                     <CardContent className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{phone}</span>
                        </div>
                     </CardContent>
                </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
