'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  mockBloodInventory,
  mockDemandForecast,
  mockEmergencyRequests,
} from '@/lib/data';
import {
  BarChart3,
  Droplets,
  Send,
  Users,
  Heart,
  Bone,
  AlertTriangle,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { EmergencyRequest as EmergencyRequestType, BloodType, Organ, Tissue } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FindMatchDialog } from '@/components/find-match-dialog';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const bloodTypes: BloodType[] = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-',
];

const chartConfig = {
  'A+': { label: 'A+', color: 'hsl(var(--chart-1))' },
  'O-': { label: 'O-', color: 'hsl(var(--chart-2))' },
  'B+': { label: 'B+', color: 'hsl(var(--chart-3))' },
};

export default function AdminPage() {
  const [selectedRequest, setSelectedRequest] = useState<EmergencyRequestType | null>(null);
  const criticalInventory = mockBloodInventory.filter(item => item.status === 'Critical');

  return (
    <div className="grid gap-6">
      <FindMatchDialog request={selectedRequest} isOpen={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)} />

      {criticalInventory.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Critical Inventory Alert!</AlertTitle>
          <AlertDescription>
            The following blood types are at critical levels: {criticalInventory.map(i => i.bloodType).join(', ')}. Consider broadcasting an urgent request.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="text-primary" />
            Blood Inventory Heatmap
          </CardTitle>
          <CardDescription>
            Current blood stock levels across all types.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {mockBloodInventory.map((item) => (
            <div key={item.bloodType} className="flex flex-col items-center gap-2">
              <div className="relative font-bold text-lg">
                {item.bloodType}
              </div>
              <Progress value={item.level} className="h-2" 
                indicatorClassName={cn({
                  'bg-destructive': item.status === 'Critical',
                  'bg-yellow-400': item.status === 'Low',
                  'bg-green-500': item.status === 'Safe',
                })}
              />
              <span className={cn(
                "text-xs font-semibold",
                {
                  'text-destructive': item.status === 'Critical',
                  'text-yellow-500': item.status === 'Low',
                  'text-green-600': item.status === 'Safe',
                }
              )}>
                {item.status}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="text-primary" />
              Signal Trigger
            </CardTitle>
            <CardDescription>
              Broadcast an urgent request for a specific donation type.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select donation type" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="blood">Blood</SelectItem>
                  <SelectItem value="organ">Organ</SelectItem>
                  <SelectItem value="tissue">Tissue</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Specify type (e.g., O-, Kidney, Cornea)" />
            <Input placeholder="Geographic area (e.g., Downtown)" />
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Send className="mr-2 h-4 w-4" /> Broadcast Alert
            </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="text-primary" />
              Predictive Demand
            </CardTitle>
            <CardDescription>
              Forecasted demand for the next 5 days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <ResponsiveContainer>
                <BarChart data={mockDemandForecast} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="A+" fill="var(--color-A+)" radius={4} />
                  <Bar dataKey="O-" fill="var(--color-O-)" radius={4} />
                  <Bar dataKey="B+" fill="var(--color-B+)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-primary" />
              Smart Matching
            </CardTitle>
            <CardDescription>
              Active requests and AI-powered donor matching.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Request Type</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEmergencyRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>{req.patientName}</TableCell>
                    <TableCell>
                       <Badge variant="outline" className="capitalize flex items-center gap-1.5 w-fit">
                          {req.requestType === 'Blood' && <Droplets />}
                          {req.requestType === 'Organ' && <Heart />}
                          {req.requestType === 'Tissue' && <Bone />}
                          {req.requestType}
                        </Badge>
                    </TableCell>
                    <TableCell className="font-mono font-bold">{req.bloodType || req.organ || req.tissue}</TableCell>
                    <TableCell>{req.location}</TableCell>
                    <TableCell>
                      <Badge variant={req.status === 'Pending' ? 'destructive' : 'default'}>{req.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" disabled={req.status !== 'Pending'} onClick={() => setSelectedRequest(req)}>Find Match</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
