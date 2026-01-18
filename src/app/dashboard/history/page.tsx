'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockDonationHistory } from '@/lib/data';
import { History, CheckCircle, Clock, XCircle, MoreHorizontal, Truck, TestTube2, Hospital } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { DonationHistoryEntry, DonationJourneyStep } from '@/lib/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const statusIcons: { [key: string]: React.ReactElement } = {
  Completed: <CheckCircle className="text-green-500" />,
  Scheduled: <Clock className="text-blue-500" />,
  Cancelled: <XCircle className="text-destructive" />,
};

const journeyIcons: { [key: string]: React.ReactElement } = {
    'Donation Received': <CheckCircle />,
    'In Transit to Lab': <Truck />,
    'Testing & Processing': <TestTube2 />,
    'Delivered to Hospital': <Hospital />,
};


function DonationJourneySheet({
  journey,
  isOpen,
  onOpenChange,
}: {
  journey: DonationJourneyStep[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Donation Journey</SheetTitle>
          <SheetDescription>
            Track the progress of your donation from collection to delivery.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-2">
            {journey.map((step, index) => (
              <li key={step.step} className="mb-10 ml-6">
                <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground ring-8 ring-background">
                  {journeyIcons[step.title] || <CheckCircle />}
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold">
                  {step.title}
                  {step.status === 'Completed' && (
                     <Badge className="ml-2 bg-green-100 text-green-800">Completed</Badge>
                  )}
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-muted-foreground">
                  {new Date(step.date).toLocaleDateString()}
                </time>
                 {index === journey.length -1 && (
                    <p className="text-base font-normal text-muted-foreground">Your donation has successfully reached a patient in need. Thank you for saving a life!</p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </SheetContent>
    </Sheet>
  );
}


export default function HistoryPage() {
  const [selectedJourney, setSelectedJourney] = useState<DonationJourneyStep[] | undefined>(undefined);

  return (
    <div className="grid gap-6">
      {selectedJourney && (
          <DonationJourneySheet journey={selectedJourney} isOpen={!!selectedJourney} onOpenChange={() => setSelectedJourney(undefined)} />
      )}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-6 w-6" />
            Donation History
          </CardTitle>
          <CardDescription>
            A record of your past and scheduled blood, organ, and tissue donations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDonationHistory.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">
                    {new Date(donation.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>{donation.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{donation.type}</Badge>
                  </TableCell>
                  <TableCell>{donation.details}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        donation.status === 'Completed'
                          ? 'default'
                          : donation.status === 'Scheduled'
                          ? 'secondary'
                          : 'destructive'
                      }
                      className="capitalize flex items-center gap-1.5 w-fit"
                    >
                      {statusIcons[donation.status]}
                      {donation.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        {donation.status === 'Scheduled' && <DropdownMenuItem>Reschedule</DropdownMenuItem>}
                        {donation.status === 'Scheduled' && <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>}
                        {donation.status === 'Completed' && donation.journey && (
                           <DropdownMenuItem onClick={() => setSelectedJourney(donation.journey)}>
                                Track Journey
                            </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
