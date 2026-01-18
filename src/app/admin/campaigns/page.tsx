'use client';

import * as React from 'react';
import {
  CaretSortIcon,
  ChevronDownIcon,
  PlusIcon
} from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockDonationCampaigns } from '@/lib/data';
import { DonationCampaign } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const columns: ColumnDef<DonationCampaign>[] = [
  {
    accessorKey: 'name',
    header: 'Campaign Name',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          variant={
            status === 'Active'
              ? 'default'
              : status === 'Upcoming'
              ? 'secondary'
              : 'outline'
          }
          className={cn({
            'bg-green-500 text-white': status === 'Active',
            'bg-yellow-400 text-yellow-900': status === 'Upcoming',
          })}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'goal',
    header: 'Goal',
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Start Date
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
     cell: ({ row }) => new Date(row.getValue('startDate')).toLocaleDateString(),
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
     cell: ({ row }) => new Date(row.getValue('endDate')).toLocaleDateString(),
  },
];


function CampaignsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const table = useReactTable({
    data: mockDonationCampaigns,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


export default function CampaignsPage() {
    const campaignBanner = PlaceHolderImages.find(img => img.id === 'campaign-banner');
  return (
    <div className="grid gap-6">
        {campaignBanner && (
            <div className="relative h-48 w-full rounded-lg overflow-hidden">
                <Image src={campaignBanner.imageUrl} alt={campaignBanner.description} layout="fill" objectFit="cover" data-ai-hint={campaignBanner.imageHint} />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
                    <h2 className="text-3xl font-bold">Launch a New Campaign</h2>
                    <p className="max-w-md mt-2">Create and manage targeted donation campaigns to meet specific goals and engage your community.</p>
                </div>
            </div>
        )}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Megaphone />
              Donation Campaigns
            </CardTitle>
            <CardDescription>
              Create, manage, and track donation campaigns.
            </CardDescription>
          </div>
           <Button>
            <PlusIcon className="mr-2 h-4 w-4" /> Create Campaign
          </Button>
        </CardHeader>
        <CardContent>
          <CampaignsTable />
        </CardContent>
      </Card>
    </div>
  );
}
