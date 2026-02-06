"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Shield, Users } from "lucide-react";

export function LoginForm() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Button
        variant="outline"
        size="lg"
        onClick={() => router.push('/dashboard')}
        className="h-auto py-4"
      >
        <div className="flex flex-col items-center gap-2">
            <Users className="h-8 w-8" />
            <span className="font-semibold">Alumni Dashboard</span>
        </div>
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={() => router.push('/admin/dashboard')}
        className="h-auto py-4"
      >
        <div className="flex flex-col items-center gap-2">
            <Shield className="h-8 w-8" />
            <span className="font-semibold">Admin Dashboard</span>
        </div>
      </Button>
    </div>
  );
}
