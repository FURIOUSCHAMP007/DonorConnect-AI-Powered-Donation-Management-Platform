'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button, buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Slot } from '@radix-ui/react-slot';
import { ChevronRight } from 'lucide-react';

const sidebarVariants = cva('h-full bg-card transition-all duration-300', {
  variants: {
    collapsible: {
      icon: 'w-14',
      wide: 'w-64',
    },
  },
  defaultVariants: {
    collapsible: 'wide',
  },
});

type TSidebarContext = {
  isMobile: boolean;
  collapsible: 'icon' | 'wide';
  isCollapsed: boolean;
  setCollapsible: (value: 'icon' | 'wide') => void;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = React.createContext<TSidebarContext | undefined>(undefined);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const [collapsible, setCollapsible] = React.useState<'icon' | 'wide'>(
    isMobile ? 'icon' : 'wide'
  );
  const [isOpen, setIsOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    setCollapsible(isMobile ? 'icon' : 'wide');
    setIsOpen(!isMobile);
  }, [isMobile]);

  const toggle = () => {
    if (isMobile) {
      setIsOpen((prev) => !prev);
    } else {
      setCollapsible((prev) => (prev === 'wide' ? 'icon' : 'wide'));
    }
  };
  
  const close = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        isMobile,
        collapsible: isMobile ? 'wide' : collapsible,
        isCollapsed: isMobile ? false : collapsible === 'icon',
        setCollapsible,
        toggle,
        close,
      }}
    >
       <div
        className={cn(
          'fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 sm:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={close}
      />
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </SidebarContext.Provider>
  );
}

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { collapsible, isMobile, isCollapsed } = useSidebar();
  const [isOpen, setIsOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);
  
  return (
    <aside
      ref={ref}
      className={cn(
        'group fixed inset-y-0 left-0 z-40 flex flex-col border-r transform transition-transform duration-300',
        sidebarVariants({ collapsible: isMobile ? 'wide' : collapsible }),
        isMobile && (isOpen ? 'translate-x-0' : '-translate-x-full'),
        className
      )}
      {...props}
      data-collapsible={isMobile ? 'wide' : collapsible}
    />
  );
});
Sidebar.displayName = 'Sidebar';

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex items-center h-16 p-4 border-b shrink-0', className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = 'SidebarHeader';

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex-1 overflow-y-auto', className)}
      {...props}
    />
  );
});
SidebarContent.displayName = 'SidebarContent';

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => {
  const { isMobile, isCollapsed } = useSidebar();
  return (
    <ul
      ref={ref}
      className={cn('space-y-1 p-2', (isCollapsed && !isMobile) && 'p-1', className)}
      {...props}
    />
  );
});
SidebarMenu.displayName = 'SidebarMenu';

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ ...props }, ref) => {
  return <li ref={ref} {...props} />;
});
SidebarMenuItem.displayName = 'SidebarMenuItem';

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & {
    isActive?: boolean;
    tooltip?: string;
  }
>(({ tooltip, isActive, className, children, ...props }, ref) => {
  const { isCollapsed, isMobile, close } = useSidebar();

  const handleCLick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) props.onClick(e);
    if(isMobile) close();
  }

  const buttonContent = (
    <Button
      ref={ref}
      variant={isActive ? 'secondary' : 'ghost'}
      className={cn('w-full justify-start', className)}
      onClick={handleCLick}
      {...props}
    >
      {children}
    </Button>
  );

  if (isCollapsed && !isMobile) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
        {tooltip && <TooltipContent side="right">{tooltip}</TooltipContent>}
      </Tooltip>
    );
  }

  return buttonContent;
});
SidebarMenuButton.displayName = 'SidebarMenuButton';


const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { collapsible, isMobile } = useSidebar();

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-300',
        !isMobile && collapsible === 'wide' && 'lg:ml-64',
        !isMobile && collapsible === 'icon' && 'lg:ml-14',
        className
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = 'SidebarInset';

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & { asChild?: boolean }
>(({ asChild, className, ...props }, ref) => {
  const { toggle, isCollapsed, isMobile } = useSidebar();
  const Comp = asChild ? Slot : Button;
  return (
    <Comp
      ref={ref}
      onClick={toggle}
      className={cn(
        buttonVariants({
          variant: 'ghost',
          size: 'icon',
        }),
        className
      )}
      {...props}
    >
      <ChevronRight
        className={cn('transition-transform', 
            isMobile ? 'rotate-0' : (isCollapsed ? 'rotate-0' : 'rotate-180')
        )}
      />
    </Comp>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger
};
