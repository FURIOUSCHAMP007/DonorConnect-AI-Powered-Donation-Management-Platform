'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { EmergencyRequest } from '@/lib/types';
import { useEffect, useState } from 'react';
import { findMatchesAction } from '@/app/actions';
import { FindDonorMatchesOutput } from '@/ai/flows/find-donor-matches';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertTriangle, UserCheck } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Progress } from './ui/progress';
import { useToast } from '@/hooks/use-toast';

interface FindMatchDialogProps {
  request: EmergencyRequest | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FindMatchDialog({ request, isOpen, onOpenChange }: FindMatchDialogProps) {
  const [result, setResult] = useState<FindDonorMatchesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (request && isOpen) {
      setIsLoading(true);
      setResult(null);
      setError(null);
      findMatchesAction(request)
        .then((res) => {
          if (res.error) {
            setError(res.error);
          } else {
            setResult({ matches: res.matches });
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [request, isOpen]);

  const detail = request?.bloodType || request?.organ || request?.tissue;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck /> AI-Powered Match Finder
          </DialogTitle>
          {request && (
            <DialogDescription>
              Finding potential donors for a <strong>{detail}</strong> request near{' '}
              <strong>{request.location}</strong>.
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="py-4">
          {isLoading && (
             <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {result && result.matches.length > 0 && (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Donor</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Availability</TableHead>
                        <TableHead>Match Score</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {result.matches.map(match => (
                        <TableRow key={match.donorId}>
                            <TableCell className="font-medium">{match.donorName}</TableCell>
                            <TableCell>{match.location}</TableCell>
                            <TableCell>
                                <Badge variant={match.isAvailable ? 'default' : 'secondary'}>
                                    {match.isAvailable ? 'Available' : 'Unavailable'}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Progress value={match.matchScore} className="h-2 w-24" indicatorClassName={cn({
                                        'bg-green-500': match.matchScore > 75,
                                        'bg-yellow-400': match.matchScore >= 50 && match.matchScore <= 75,
                                        'bg-red-500': match.matchScore < 50,
                                    })} />
                                    <span className="font-mono text-sm">{match.matchScore}%</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    toast({
                                      title: `Contacting ${match.donorName}`,
                                      description: `An alert has been sent. Demo contact info: (123) 456-7890`,
                                    });
                                  }}
                                >
                                    Contact
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          )}
          {result && result.matches.length === 0 && !error && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>No Matches Found</AlertTitle>
              <AlertDescription>
                The AI could not find any suitable donors for this request at the moment.
              </AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
            <Button variant="secondary" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
