'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockHealthInsights, mockUserProfile } from '@/lib/data';
import {
  CheckCircle,
  Clock,
  Heart,
  User,
  AlertTriangle,
  HeartPulse,
  Droplets,
  Bone,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar-1');
  const mapPlaceholder = PlaceHolderImages.find((img) => img.id === 'map-placeholder');
  const [isAvailable, setIsAvailable] = useState(mockUserProfile.availability === 'Available');

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={mockUserProfile.name} />}
            <AvatarFallback>
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{mockUserProfile.name}</CardTitle>
            <CardDescription>{mockUserProfile.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
              <div className="flex items-center gap-2 text-lg">
                <HeartPulse className="h-5 w-5 text-primary" />
                <span>Donation Types</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {mockUserProfile.donations.bloodType && <Badge variant="secondary" className="flex items-center gap-1"><Droplets className="h-3 w-3" /> Blood ({mockUserProfile.donations.bloodType})</Badge>}
                {mockUserProfile.donations.organs && mockUserProfile.donations.organs.length > 0 && <Badge variant="outline" className="flex items-center gap-1"><Heart className="h-3 w-3" /> Organs</Badge>}
                {mockUserProfile.donations.tissues && mockUserProfile.donations.tissues.length > 0 && <Badge variant="outline" className="flex items-center gap-1"><Bone className="h-3 w-3" /> Tissues</Badge>}
              </div>
            </div>
          <div className="flex items-center gap-2 text-lg">
            {mockUserProfile.isEligible ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Clock className="h-5 w-5 text-amber-500" />
            )}
            <span>
              Eligibility: <strong>{mockUserProfile.isEligible ? 'Eligible' : `Next on ${mockUserProfile.nextEligibleDate}`}</strong>
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Availability Status</CardTitle>
          <CardDescription>Let us know if you're available for urgent requests.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Switch
            id="availability-mode"
            checked={isAvailable}
            onCheckedChange={setIsAvailable}
            aria-label='Availability status'
          />
          <Label htmlFor="availability-mode" className="text-lg font-medium">
            {isAvailable ? 'Available for Donations' : 'Currently Unavailable'}
          </Label>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Your location is only shared for emergency requests when you are available.
          </p>
        </CardFooter>
      </Card>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Card className="cursor-pointer hover:border-accent transition-colors">
            <CardHeader>
              <CardTitle className="text-accent flex items-center gap-2">
                <AlertTriangle />
                Simulate Emergency
              </CardTitle>
              <CardDescription>Click to see what an emergency alert looks like.</CardDescription>
            </CardHeader>
          </Card>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-2xl text-accent">
              <AlertTriangle className="h-8 w-8" />
              Urgent Organ Request!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg">
              A patient at <strong>City General Hospital</strong> urgently needs a <strong>Kidney</strong>.
              Your immediate response can save a life.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {mapPlaceholder && (
            <div className="rounded-lg overflow-hidden border">
              <Image src={mapPlaceholder.imageUrl} alt="Map to hospital" width={800} height={600} data-ai-hint={mapPlaceholder.imageHint} />
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Decline</AlertDialogCancel>
            <AlertDialogAction>Accept & View Details</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            Personalized Health Insights
          </CardTitle>
          <CardDescription>Tips and stats to help you stay healthy and donation-ready.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mockHealthInsights.map((insight) => (
            <Card key={insight.title} className="bg-background">
              <CardHeader>
                <CardTitle className="text-lg">{insight.title}</CardTitle>
                <CardDescription className="text-2xl font-bold text-foreground">{insight.value}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{insight.insight}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
