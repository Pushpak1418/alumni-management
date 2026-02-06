
'use client';

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { alumniData, type Alumni } from "@/lib/data";
import { generateConnectionSuggestions } from "@/ai/flows/generate-connection-suggestions";
import { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Map, Sparkles, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import createGlobe, { type Marker, type Cobe } from 'cobe'


type Suggestion = {
  alumniId: string;
  reason: string;
};

function AlumniFocusCard({ alumnus, onClear }: { alumnus: Alumni, onClear: () => void }) {
    if (!alumnus) return null;

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] max-w-sm">
            <Card className="bg-muted/80 backdrop-blur-sm border-primary/30 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={onClear}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </Button>
                <CardHeader className="pr-10">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border">
                           <AvatarImage src={alumnus.avatarUrl} alt={alumnus.name} data-ai-hint="person portrait" />
                           <AvatarFallback>{alumnus.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">{alumnus.name}</CardTitle>
                            <CardDescription>{alumnus.jobTitle} at {alumnus.company}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter>
                    <Button size="sm" className="w-full" asChild>
                        <Link href={`/directory/${alumnus.id}`}>View Profile <ArrowRight className="ml-2" /></Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

function ConnectionSuggestionCard({ suggestion, allAlumni }: { suggestion: Suggestion; allAlumni: Alumni[] }) {
    const suggestedAlumnus = allAlumni.find(a => a.id === suggestion.alumniId);

    if (!suggestedAlumnus) {
        return null;
    }

    return (
        <Card className="bg-muted/50 backdrop-blur-sm border-primary/20">
            <CardHeader className="flex flex-row items-start gap-4">
                 <Avatar className="h-12 w-12 border">
                    <AvatarImage src={suggestedAlumnus.avatarUrl} alt={suggestedAlumnus.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{suggestedAlumnus.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold">{suggestedAlumnus.name}</h3>
                    <p className="text-sm text-muted-foreground">{suggestedAlumnus.jobTitle} at {suggestedAlumnus.company}</p>
                </div>
            </CardHeader>
            <CardContent>
                <blockquote className="border-l-2 border-primary/50 pl-4 text-sm italic text-muted-foreground">
                    {suggestion.reason}
                </blockquote>
            </CardContent>
            <CardFooter>
                 <Button size="sm" asChild variant="outline">
                    <Link href={`/directory/${suggestedAlumnus.id}`}>
                        View Profile <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

function GlobeWrapper({ setSelectedAlumnus }: { setSelectedAlumnus: (alumnus: Alumni | null) => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const globeRef = useRef<Cobe | null>(null);
    const locationToAlumnus = useRef<Record<string, Alumni>>({});

    const locations = useMemo(() => {
        const coords: Record<string, [number, number]> = {
            'San Francisco, CA': [37.77, -122.41],
            'New York, NY': [40.71, -74.00],
            'Austin, TX': [30.26, -97.74],
            'Los Angeles, CA': [34.05, -118.24],
            'Chicago, IL': [41.87, -87.62],
            'Bangalore, IN': [12.97, 77.59],
            'London, UK': [51.50, -0.12],
            'Tokyo, JP': [35.68, 139.69],
            'Sydney, AU': [-33.86, 151.20],
        };
      
        const markers: Marker[] = [];
        locationToAlumnus.current = {};

        alumniData.forEach(alumnus => {
            const location = coords[alumnus.location];
            if (location) {
                markers.push({ location, size: 0.05 });
                locationToAlumnus.current[location.join(',')] = alumnus;
            }
        });
        return markers;
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;

        let phi = 0;
        let theta = 0.3;
        let pointerInteracting: number | null = null;
        let pointerInteractionMovement = 0;
        let rotationSpeed = 0.005;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 600 * 2,
            height: 600 * 2,
            phi: 0,
            theta: 0.3,
            dark: 1,
            diffuse: 3,
            mapSamples: 16000,
            mapBrightness: 1.2,
            baseColor: [1, 1, 1],
            markerColor: [255 / 255, 196 / 255, 0 / 255],
            glowColor: [1, 1, 1],
            markers: locations,
            onRender: (state) => {
                if (!pointerInteracting) {
                    phi += rotationSpeed;
                }
                state.phi = phi;
                state.theta = theta;
            },
        });
        
        setTimeout(() => {
            if (canvasRef.current) {
              canvasRef.current.style.opacity = '1';
            }
        });

        const onPointerDown = (e: PointerEvent) => {
            pointerInteracting = e.clientX - pointerInteractionMovement;
            canvasRef.current!.style.cursor = 'grabbing';
        };

        const onPointerUp = (e: PointerEvent) => {
            if (pointerInteracting !== null) {
                const clickMovement = Math.abs(e.clientX - (pointerInteracting + pointerInteractionMovement));
                if (clickMovement < 5) {
                    const [lat, lon] = globe.getPos(e.clientX, e.clientY);
                    let closest = { dist: Infinity, alumnus: null as Alumni | null };
                    
                    for (const marker of locations) {
                        const dist = Math.hypot(marker.location[0] - lat, marker.location[1] - lon);
                        if (dist < closest.dist) {
                            closest = { dist, alumnus: locationToAlumnus.current[marker.location.join(',')] };
                        }
                    }

                    if (closest.dist < 10) {
                        setSelectedAlumnus(closest.alumnus);
                    } else {
                        setSelectedAlumnus(null);
                    }
                }
            }
            pointerInteracting = null;
            canvasRef.current!.style.cursor = 'grab';
        };

        const onPointerMove = (e: PointerEvent) => {
            if (pointerInteracting !== null) {
                const delta = e.clientX - pointerInteracting;
                pointerInteractionMovement = delta;
                phi += delta / 200;
            }
        };

        const onPointerOut = () => {
          pointerInteracting = null;
          canvasRef.current!.style.cursor = 'grab';
        }

        const canvas = canvasRef.current;
        canvas.addEventListener('pointerdown', onPointerDown);
        canvas.addEventListener('pointerup', onPointerUp);
        canvas.addEventListener('pointermove', onPointerMove);
        canvas.addEventListener('pointerout', onPointerOut);
        
        return () => {
            globe.destroy();
            canvas.removeEventListener('pointerdown', onPointerDown);
            canvas.removeEventListener('pointerup', onPointerUp);
            canvas.removeEventListener('pointermove', onPointerMove);
            canvas.removeEventListener('pointerout', onPointerOut);
        };
    }, [locations, setSelectedAlumnus]);

    return (
        <div className="absolute inset-0 w-full h-full bg-background overflow-hidden flex items-center justify-center">
            <canvas
                ref={canvasRef}
                style={{ width: 600, height: 600, maxWidth: '100%', aspectRatio: 1, cursor: "grab", opacity: 0, transition: 'opacity 1s ease' }}
            />
        </div>
    );
}

export default function NetworkMapPage() {
  const currentUser = alumniData[0]; // Mock current user as Jane Doe
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAlumnus, setSelectedAlumnus] = useState<Alumni | null>(null);

  useEffect(() => {
    const getSuggestions = async () => {
      try {
        setLoading(true);
        const otherAlumni = alumniData.filter(a => a.id !== currentUser.id);
        const result = await generateConnectionSuggestions({
          currentUser: currentUser,
          otherAlumni: otherAlumni,
        });
        setSuggestions(result.suggestions);
      } catch (error) {
        console.error("Failed to generate connection suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    getSuggestions();
  }, [currentUser]);

  return (
    <MainLayout>
        <div className="mb-8">
            <h1 className="font-headline text-4xl font-bold mb-2 flex items-center gap-3">
                <Map /> Alumni Network Map
            </h1>
            <p className="text-muted-foreground">
                Discover and connect with alumni around the world.
            </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
                <Card className="overflow-hidden relative min-h-[500px] lg:min-h-[650px] flex items-center justify-center">
                    <GlobeWrapper setSelectedAlumnus={setSelectedAlumnus} />
                    <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_125%,rgba(0,0,0,0.2),rgba(255,255,255,0))]"></div>
                    <div className="relative z-10 text-center p-4">
                         <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-foreground to-muted-foreground/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent">
                            Global Network
                        </span>
                    </div>
                     {selectedAlumnus && <AlumniFocusCard alumnus={selectedAlumnus} onClear={() => setSelectedAlumnus(null)} />}
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card className="bg-transparent border-none shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="text-primary" /> AI-Powered Connections
                        </CardTitle>
                        <CardDescription>Suggested connections based on your profile and interests.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto">
                        {loading ? (
                            <>
                                <Skeleton className="h-40 w-full bg-muted/50" />
                                <Skeleton className="h-40 w-full bg-muted/50" />
                                <Skeleton className="h-40 w-full bg-muted/50" />
                            </>
                        ) : (
                            suggestions.map(suggestion => 
                                <ConnectionSuggestionCard key={suggestion.alumniId} suggestion={suggestion} allAlumni={alumniData} />
                            )
                        )}
                        {!loading && suggestions.length === 0 && (
                            <p className="text-muted-foreground text-center py-8">No suggestions available right now.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    </MainLayout>
  );
}
