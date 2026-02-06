import Image from "next/image";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Briefcase, Building, GraduationCap, Mail, MapPin, Phone } from "lucide-react";

const collegeProfileData = {
    name: "Legacy University",
    avatarUrl: "https://picsum.photos/seed/college/128/128",
    location: "University Town, USA",
    email: "contact@legacy.edu",
    phone: "+1 800 123 4567",
    bio: "Legacy University, founded in 1868, is a world-renowned institution dedicated to excellence in education and research. Our mission is to foster a vibrant community of scholars, innovators, and leaders. We are proud of our extensive alumni network, which spans the globe and represents a multitude of industries and accomplishments.",
    stats: [
        {
            label: "Alumni Network",
            value: "50,000+"
        },
        {
            label: "Academic Programs",
            value: "150+"
        },
        {
            label: "Founded",
            value: "1868"
        }
    ]
}

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="container mx-auto max-w-5xl">
        <Card className="overflow-hidden">
          <div className="h-40 w-full overflow-hidden">
             <Image 
                src="https://picsum.photos/seed/postImg2/1200/400" 
                alt="Legacy University Campus"
                width={1200}
                height={400}
                className="w-full h-full object-cover"
                data-ai-hint="college campus"
            />
          </div>
          <CardHeader className="flex flex-col items-center text-center -mt-20 sm:flex-row sm:text-left sm:items-end sm:gap-4">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={collegeProfileData.avatarUrl} alt={collegeProfileData.name} data-ai-hint="building" />
              <AvatarFallback>{collegeProfileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="py-2 flex-1">
                <CardTitle className="font-headline text-4xl">{collegeProfileData.name}</CardTitle>
                <p className="text-lg text-muted-foreground">{collegeProfileData.location}</p>
            </div>
            <Button>Edit Profile</Button>
          </CardHeader>
          <CardContent className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
                <Card>
                    <CardHeader><CardTitle>About Legacy University</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground">{collegeProfileData.bio}</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>University Stats</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4 text-center">
                        {collegeProfileData.stats.map(stat => (
                            <div key={stat.label} className="p-4 bg-muted/50 rounded-lg">
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-1 space-y-4">
                <Card>
                     <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
                     <CardContent className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{collegeProfileData.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{collegeProfileData.phone}</span>
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
