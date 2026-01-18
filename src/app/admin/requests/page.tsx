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
import { mockEmergencyRequests } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { EmergencyRequest } from '@/lib/types';
import { Droplets, Heart, Bone, BellRing } from 'lucide-react';
import { FindMatchDialog } from '@/components/find-match-dialog';


const columns: ColumnDef<EmergencyRequest>[] = [
  {
    accessorKey: 'patientName',
    header: 'Patient',
  },
  {
    accessorKey: 'requestType',
    header: 'Request Type',
    cell: ({ row }) => {
      const requestType = row.getValue('requestType') as string;
      return <Badge variant="outline" className="capitalize flex items-center gap-1.5 w-fit">
          {requestType === 'Blood' && <Droplets />}
          {requestType === 'Organ' && <Heart />}
          {requestType === 'Tissue' && <Bone />}
          {requestType}
        </Badge>
    }
  },
  {
    header: 'Details',
    cell: ({ row }) => {
        const { bloodType, organ, tissue } = row.original;
        return <span className="font-mono font-bold">{bloodType || organ || tissue}</span>
    }
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return <Badge variant={status === 'Pending' ? 'destructive' : 'default'}>{status}</Badge>
    }
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Action</div>,
    cell: function Cell({ row }) {
      const request = row.original;
      const [selectedRequest, setSelectedRequest] = React.useState<EmergencyRequest | null>(null);
 
      return (
        <>
          <FindMatchDialog request={selectedRequest} isOpen={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)} />
          <div className="text-right">
              <Button size="sm" disabled={request.status !== 'Pending'} onClick={() => setSelectedRequest(request)}>Find Match</Button>
          </div>
        </>
      )
    },
  },
];


function RequestsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const table = useReactTable({
    data: mockEmergencyRequests,
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
          placeholder="Filter by patient..."
          value={(table.getColumn('patientName')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('patientName')?.setFilterValue(event.target.value)
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
                  {column.id === 'patientName' ? 'Patient' : column.id}
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


export default function RequestsPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellRing />
            Donation Requests
          </CardTitle>
          <CardDescription>
            Manage and monitor all incoming donation requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RequestsTable />
        </CardContent>
      </Card>
    </div>
  );
}
