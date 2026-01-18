'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { mockUserProfile } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Heart, User, CheckCircle, Clock, XCircle, ShieldQuestion, Award, Star, Medal, Droplets, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Badge as BadgeType } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  emergencyContact: z.string().optional(),
  receiveNotifications: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const statusIcons: { [key: string]: React.ReactElement } = {
  Passed: <CheckCircle className="text-green-500" />,
  Pending: <Clock className="text-blue-500" />,
  Failed: <XCircle className="text-destructive" />,
};

const iconMap: { [key: string]: LucideIcon } = {
  Award: LucideIcons.Award,
  Star: LucideIcons.Star,
  Medal: LucideIcons.Medal,
  Droplets: LucideIcons.Droplets,
};

const BadgeCard = ({ badge }: { badge: BadgeType }) => {
  const Icon = iconMap[badge.icon];
  return (
    <div className="flex items-start gap-4 rounded-lg border p-4 bg-background">
      {Icon && <Icon className="h-8 w-8 text-primary mt-1" />}
      <div>
        <h4 className="font-semibold">{badge.name}</h4>
        <p className="text-sm text-muted-foreground">{badge.description}</p>
      </div>
    </div>
  );
};


export default function ProfilePage() {
  const { toast } = useToast();
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar-1');

  const defaultValues: Partial<ProfileFormValues> = {
    name: mockUserProfile.name,
    email: mockUserProfile.email,
    receiveNotifications: true,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'Profile Updated',
      description: 'Your information has been saved successfully.',
    });
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={mockUserProfile.name} />}
            <AvatarFallback>
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{mockUserProfile.name}</CardTitle>
            <div className="flex items-center gap-2 text-md text-muted-foreground">
              <Heart className="h-4 w-4 text-destructive" />
              <span>Blood Type: <strong>{mockUserProfile.donations.bloodType}</strong></span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-6">
              <h3 className="text-lg font-medium">Your Donations</h3>
              <div className="flex flex-wrap gap-2">
                {mockUserProfile.donations.bloodType && <Badge variant="secondary">Blood</Badge>}
                {mockUserProfile.donations.organs?.map(organ => <Badge key={organ} variant="outline">{organ}</Badge>)}
                {mockUserProfile.donations.tissues?.map(tissue => <Badge key={tissue} variant="outline">{tissue}</Badge>)}
              </div>
          </div>
          <Separator className="my-6" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the name that will be displayed on your profile.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        We use your email for communication and login.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="emergencyContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number or email" {...field} />
                      </FormControl>
                      <FormDescription>
                        Who we can contact in case of an emergency.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="receiveNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Receive Emergency Notifications
                        </FormLabel>
                        <FormDescription>
                          Get notified for urgent donation requests in your area.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">Update Profile</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Award /> Badges & Achievements</CardTitle>
          <CardDescription>Celebrate your donation milestones and contributions.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockUserProfile.badges.map(badge => (
                <BadgeCard key={badge.id} badge={badge} />
            ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <ShieldQuestion />
                Medical Test Status
            </CardTitle>
            <CardDescription>
                Results of tests required for organ and tissue donation.
            </CardDescription>
        </CardHeader>
        <CardContent>
             <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUserProfile.medicalTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">
                    {test.name}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        test.status === 'Passed'
                          ? 'default'
                          : test.status === 'Pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                      className="capitalize flex items-center gap-1.5 w-fit"
                    >
                      {statusIcons[test.status]}
                      {test.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{test.date || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground">These tests are part of the standard protocol for ensuring safe donations.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
