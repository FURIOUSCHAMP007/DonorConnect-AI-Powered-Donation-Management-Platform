'use client';

import * as React from 'react';
import {
  CaretSortIcon,
  ChevronDownIcon,
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
import {
  mockBloodInventoryDetail,
  mockOrganInventory,
  mockTissueInventory,
} from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BloodType, Organ, Tissue } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Droplets, Heart, Bone } from 'lucide-react';

type BloodInventoryDetail = {
  bloodType: BloodType;
  units: number;
  status: 'Critical' | 'Low' | 'Safe' | 'Surplus';
  lastDonation: string;
};

type OrganInventory = {
  organ: Organ;
  donorsAvailable: number;
  requests: number;
  urgency: 'High' | 'Medium' | 'Low';
};

type TissueInventory = {
    tissue: Tissue;
    units: number;
    requests: number;
    lastUpdated: string;
}

const bloodColumns: ColumnDef<BloodInventoryDetail>[] = [
  {
    accessorKey: 'bloodType',
    header: 'Blood Type',
  },
  {
    accessorKey: 'units',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Units
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return <Badge variant={
            status === 'Critical' ? 'destructive' :
            status === 'Low' ? 'secondary' : 'default'
        } className={cn(
            {'bg-yellow-400 text-yellow-900': status === 'Low'},
            {'bg-green-500 text-white': status === 'Safe'},
            {'bg-blue-500 text-white': status === 'Surplus'},
        )}>{status}</Badge>
    }
  },
  {
    accessorKey: 'lastDonation',
    header: 'Last Donation',
    cell: ({row}) => new Date(row.getValue('lastDonation')).toLocaleDateString()
  },
];

const organColumns: ColumnDef<OrganInventory>[] = [
  {
    accessorKey: 'organ',
    header: 'Organ Type',
  },
  {
    accessorKey: 'donorsAvailable',
    header: 'Donors Available',
  },
  {
    accessorKey: 'requests',
    header: 'Active Requests',
  },
    {
    accessorKey: 'urgency',
    header: 'Urgency',
    cell: ({ row }) => {
        const urgency = row.getValue('urgency') as string;
        return <Badge variant={
            urgency === 'High' ? 'destructive' :
            urgency === 'Medium' ? 'secondary' : 'default'
        } className={cn(
            {'bg-yellow-400 text-yellow-900': urgency === 'Medium'},
        )}>{urgency}</Badge>
    }
  },
];

const tissueColumns: ColumnDef<TissueInventory>[] = [
  {
    accessorKey: 'tissue',
    header: 'Tissue Type',
  },
  {
    accessorKey: 'units',
    header: 'Units Available',
  },
  {
    accessorKey: 'requests',
    header: 'Active Requests',
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Last Updated',
    cell: ({row}) => new Date(row.getValue('lastUpdated')).toLocaleDateString()
  },
];


function InventoryTable<T>({ columns, data }: { columns: ColumnDef<T>[]; data: T[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
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
          placeholder="Filter..."
          value={(table.getAllColumns()[0]?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getAllColumns()[0]?.setFilterValue(event.target.value)
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} row(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}


export default function InventoryPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Inventory Management</CardTitle>
          <CardDescription>
            Detailed view of blood, organ, and tissue inventories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="blood">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="blood" className="flex items-center gap-2">
                <Droplets /> Blood
              </TabsTrigger>
              <TabsTrigger value="organs" className="flex items-center gap-2">
                <Heart /> Organs
              </TabsTrigger>
              <TabsTrigger value="tissues" className="flex items-center gap-2">
                <Bone /> Tissues
              </TabsTrigger>
            </TabsList>
            <TabsContent value="blood">
               <InventoryTable columns={bloodColumns} data={mockBloodInventoryDetail} />
            </TabsContent>
            <TabsContent value="organs">
               <InventoryTable columns={organColumns} data={mockOrganInventory} />
            </TabsContent>
            <TabsContent value="tissues">
                <InventoryTable columns={tissueColumns} data={mockTissueInventory} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
