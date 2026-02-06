import { LoginForm } from "@/components/login-form";
import { GraduationCap } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <GraduationCap className="h-12 w-12 text-primary"/>
            </div>
            <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground">
              LegacyLink
            </h1>
            <p className="mt-4 text-muted-foreground">
              Connecting generations of excellence.
            </p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Select a dashboard to view the platform's capabilities.
        </p>
      </div>
    </div>
  );
}
