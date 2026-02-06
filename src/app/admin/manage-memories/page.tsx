
'use client';

import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

function Uploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  
  const removeFile = () => {
      setFile(null);
      setPreview(null);
  }

  return (
    <>
      <Label htmlFor="photo-upload">Event Photo</Label>
      <div className="relative flex justify-center w-full h-64 border-2 border-dashed rounded-lg border-muted hover:border-primary transition-colors">
        {!preview && (
          <>
            <input id="photo-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
            <label htmlFor="photo-upload" className="flex flex-col items-center justify-center w-full h-full text-center cursor-pointer">
              <UploadCloud className="w-12 h-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
            </label>
          </>
        )}
        {preview && (
          <div className="relative w-full h-full">
            <img src={preview} alt="Preview" className="object-contain w-full h-full rounded-md" />
            <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={removeFile}>
                <X className="w-4 h-4"/>
                <span className="sr-only">Remove image</span>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}


export default function ManageMemoriesPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: "Memory Added!",
            description: "The new memory has been successfully added to the corpus.",
        });
    }

  return (
    <AdminLayout>
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold mb-2">Manage Memory Lane</h1>
          <p className="text-muted-foreground">
            Upload and manage the content that powers the AI Memory Lane for alumni.
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Add New Memory</CardTitle>
                    <CardDescription>Upload a photo and add details about a past event.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="event-title">Event Title</Label>
                        <Input id="event-title" placeholder="e.g., Tech Fest 2017" required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="event-date">Event Date</Label>
                        <Input id="event-date" placeholder="e.g., March 2017" required />
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="event-description">Event Description</Label>
                       <Textarea id="event-description" placeholder="A brief description of what happened at the event." required />
                    </div>
                     <div className="space-y-2">
                       <Uploader />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button type="submit">Add to Corpus</Button>
                </CardFooter>
            </Card>
        </form>

      </div>
    </AdminLayout>
  );
}
