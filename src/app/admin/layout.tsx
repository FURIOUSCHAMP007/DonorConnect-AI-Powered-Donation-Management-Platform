'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Droplets,
  BellRing,
  BarChart3,
  LogOut,
  Megaphone,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/admin/inventory',
      label: 'Inventory',
      icon: Droplets,
    },
    {
      href: '/admin/requests',
      label: 'Requests',
      icon: BellRing,
    },
    {
      href: '/admin/analytics',
      label: 'Analytics',
      icon: BarChart3,
    },
    {
      href: '/admin/campaigns',
      label: 'Campaigns',
      icon: Megaphone,
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
              DonorConnect
            </h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Link href="/">
                <LogOut />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <SidebarTrigger>
            <span className="hidden md:inline">Toggle Sidebar</span>
          </SidebarTrigger>
          <h1 className="text-2xl font-semibold">Admin Portal</h1>
          <Button asChild>
            <Link href="/">Home</Link>
          </Button>
        </header>
        <main className="p-4 sm:p-6 lg:p-8 bg-background/50">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
