'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Map, Pin, Calendar, Clock, Search, Rsvp } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { mockBloodDrives } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function DrivesPage() {
    const mapImage = PlaceHolderImages.find(img => img.id === 'blood-drive-map');
    const { toast } = useToast();

    const handleRsvp = (driveName: string) => {
        toast({
            title: "RSVP Successful!",
            description: `You have successfully RSVP'd for the ${driveName}.`,
        });
    };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl">
            <Map className="h-8 w-8" />
            Find a Blood Drive
          </CardTitle>
          <CardDescription>
            Search for upcoming blood drives in your area and RSVP to participate.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex gap-2 mb-6">
                <Input placeholder="Enter your city or zip code..." className="max-w-sm"/>
                <Button>
                    <Search className="mr-2 h-4 w-4" /> Search
                </Button>
            </div>
            {mapImage && (
                <div className="w-full h-96 rounded-lg overflow-hidden border relative">
                    <Image src={mapImage.imageUrl} alt={mapImage.description} layout="fill" objectFit="cover" data-ai-hint={mapImage.imageHint} />
                </div>
            )}
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBloodDrives.map(drive => (
            <Card key={drive.id}>
                <CardHeader>
                    <CardTitle>{drive.name}</CardTitle>
                    <CardDescription>{drive.organizer}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                        <Pin className="h-4 w-4 text-muted-foreground" />
                        <span>{drive.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(drive.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{drive.time}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={() => handleRsvp(drive.name)}>
                        RSVP Now
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
