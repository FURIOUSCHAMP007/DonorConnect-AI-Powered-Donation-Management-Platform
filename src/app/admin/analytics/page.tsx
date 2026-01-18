'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  mockDonationHistory,
  mockEmergencyRequests,
  mockBloodInventory,
  mockUserProfile
} from '@/lib/data';
import {
  Users,
  Droplets,
  BellRing,
  CheckCircle,
  BarChart as BarChartIcon,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';

// Helper to process data for charts
const processDonationData = () => {
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(new Date(), i);
    return {
      date: format(date, 'MMM dd'),
      count: 0,
    };
  }).reverse();

  mockDonationHistory.forEach((donation) => {
    const donationDate = new Date(donation.date);
    const thirtyDaysAgo = subDays(new Date(), 30);
    if (donationDate >= thirtyDaysAgo && donation.status === 'Completed') {
      const dateStr = format(donationDate, 'MMM dd');
      const dayData = last30Days.find((d) => d.date === dateStr);
      if (dayData) {
        dayData.count++;
      }
    }
  });

  return last30Days;
};

const processRequestData = () => {
  return mockEmergencyRequests.reduce(
    (acc, req) => {
      if (req.status === 'Pending') {
        acc[0].value++;
      } else if (req.status === 'Fulfilled') {
        acc[1].value++;
      }
      return acc;
    },
    [
      { name: 'Pending', value: 0 },
      { name: 'Fulfilled', value: 0 },
    ]
  );
};

const processDonorDemographics = () => {
    // This is mock data. In a real app, this would come from a database.
    return [
        { ageGroup: '18-25', count: 350 },
        { ageGroup: '26-35', count: 420 },
        { ageGroup: '36-45', count: 280 },
        { ageGroup: '46-55', count: 190 },
        { ageGroup: '56+', count: 110 },
    ];
};

const processNewDonors = () => {
    // Mock data for new donor sign-ups over the last 6 months
    return [
        { month: 'Feb', newDonors: 30 },
        { month: 'Mar', newDonors: 45 },
        { month: 'Apr', newDonors: 50 },
        { month: 'May', newDonors: 60 },
        { month: 'Jun', newDonors: 75 },
        { month: 'Jul', newDonors: 80 },
    ];
};


const bloodTypeColors: { [key: string]: string } = {
  'A+': '#22C55E', // green-500
  'A-': '#3B82F6', // blue-500
  'B+': '#EAB308', // yellow-500
  'B-': '#F97316', // orange-500
  'AB+': '#8B5CF6', // violet-500
  'AB-': '#1E90FF', // DodgerBlue
  'O+': '#32CD32', // LimeGreen
  'O-': '#EF4444', // red-500
};

const chartConfigDonations = {
  donations: {
    label: 'Donations',
    color: 'hsl(var(--primary))',
  },
};

const chartConfigRequestStatus = {
  Pending: { label: 'Pending', color: 'hsl(var(--destructive))' },
  Fulfilled: { label: 'Fulfilled', color: 'hsl(var(--primary))' },
};

const chartConfigDemographics = {
    count: { label: "Donors" }
};
const chartConfigNewDonors = {
    newDonors: { label: "New Donors", color: "hsl(var(--primary))" }
};


export default function AnalyticsPage() {
  const donationTrendData = processDonationData();
  const requestStatusData = processRequestData();
  const donorDemographicsData = processDonorDemographics();
  const newDonorsData = processNewDonors();

  const totalRequests = mockEmergencyRequests.length;
  const fulfilledRequests = requestStatusData.find(d => d.name === 'Fulfilled')?.value || 0;
  const fulfillmentRate = totalRequests > 0 ? (fulfilledRequests / totalRequests) * 100 : 0;

  return (
    <div className="grid gap-6">
      <CardHeader className="p-0">
        <CardTitle className="flex items-center gap-2 text-3xl">
          <BarChartIcon />
          Advanced Analytics
        </CardTitle>
        <CardDescription>
          In-depth insights into donation patterns, inventory, donor demographics, and fulfillment metrics.
        </CardDescription>
      </CardHeader>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">+50 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations (YTD)</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDonationHistory.length}</div>
            <p className="text-xs text-muted-foreground">+15% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            <BellRing className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requestStatusData.find(d => d.name === 'Pending')?.value || 0}</div>
             <p className="text-xs text-muted-foreground">3 new requests today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fulfillment Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fulfillmentRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Up 5% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp /> Donation Trends (Last 30 Days)</CardTitle>
            <CardDescription>Daily number of completed donations.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigDonations} className="h-64 w-full">
              <ResponsiveContainer>
                <LineChart data={donationTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{fontSize: 12}} tickMargin={10} />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="count" stroke="var(--color-donations)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Request Status</CardTitle>
            <CardDescription>Breakdown of all emergency requests.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigRequestStatus} className="h-64 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                  <Pie data={requestStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                     {requestStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`var(--color-${entry.name})`} />
                    ))}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
       <div className="grid lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users /> Donor Demographics (By Age)</CardTitle>
                <CardDescription>Distribution of active donors by age group.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfigDemographics} className="h-64 w-full">
                    <ResponsiveContainer>
                        <BarChart data={donorDemographicsData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="ageGroup" tick={{fontSize: 12}} tickMargin={10} />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><UserPlus /> New Donor Acquisition</CardTitle>
                <CardDescription>Number of new donor sign-ups over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfigNewDonors} className="h-64 w-full">
                    <ResponsiveContainer>
                        <AreaChart data={newDonorsData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tick={{fontSize: 12}} tickMargin={10} />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Area type="monotone" dataKey="newDonors" stroke="var(--color-newDonors)" fill="var(--color-newDonors)" fillOpacity={0.3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
       </div>

       <Card>
          <CardHeader>
            <CardTitle>Blood Inventory Levels</CardTitle>
            <CardDescription>Current percentage of blood units available by type.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-80 w-full">
               <ResponsiveContainer>
                <BarChart data={mockBloodInventory} layout="vertical" margin={{ left: 10, right: 10 }}>
                  <CartesianGrid horizontal={false} />
                  <YAxis 
                    dataKey="bloodType" 
                    type="category" 
                    tickLine={false} 
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) => value}
                    tick={{fontSize: 12, fontWeight: 'bold'}}
                  />
                  <XAxis type="number" hide />
                  <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                  <Bar dataKey="level" radius={4}>
                     {mockBloodInventory.map((entry) => (
                      <Cell key={`cell-${entry.bloodType}`} fill={bloodTypeColors[entry.bloodType]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
    </div>
  );
}
