import { Header } from './Header';
import { GrOverview } from 'react-icons/gr';
import { AiOutlineProduct } from 'react-icons/ai';
import { LuPackage } from 'react-icons/lu';
import { ChevronRight } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ReactNode } from 'react';

const data = {
  navMain: [
    {
      title: 'Overview',
      url: '/products',
      icon: GrOverview,
      isActive: true,
      items: [],
    },
    {
      title: 'Products',
      url: '/products',
      icon: AiOutlineProduct,
      isActive: true,
      items: [
        {
          title: 'Add New Product',
          url: '/products/new',
        },
        {
          title: 'View all',
          url: '/products/view',
        },
        {
          title: 'Edit',
          url: '/products/edit',
        },
      ],
    },
    {
      title: 'Orders',
      url: '#',
      icon: LuPackage,
      items: [
        {
          title: 'view all',
          url: '#',
        },
        {
          title: 'active orders',
          url: '#',
        },
      ],
    },
  ],
};

export default function Home({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />

      <SidebarProvider>
        <Sidebar collapsible='icon' className='top-[3.57rem] bg-white'>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {data.navMain.map((item) =>
                  item.items.length > 0 ? (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={item.isActive}
                      className='group/collapsible'
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span className='text-base font-semibold capitalize'>
                              {item.title}
                            </span>
                            {item.items.length > 0 && (
                              <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.url} className='capitalize'>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span className='text-base font-semibold'>
                          {item.title}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
          <SidebarInset>
            <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
              <SidebarTrigger className='ml-4' />
            </header>

            <div>{children}</div>
          </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
