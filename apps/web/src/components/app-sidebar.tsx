"use client";

import {
  AudioWaveform,
  BookOpen,
  ChevronRightIcon,
  Command,
  GalleryVerticalEnd,
  Search,
  SquareTerminal,
} from "@iroy/ui/icons";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@iroy/ui/components/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@iroy/ui/components/collapsible";
import { Label } from "@iroy/ui/components/label";
import { TeamSwitcher } from "./team-switcher";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { useI18nStore } from "@iroy/i18n/store";

type NavMainItem = {
  title: string;
  key: any;
  url: string;
};
type NavMain = {
  title: string;
  key: any;
  url: string;
  icon: any;
  isActive: boolean;
  items?: NavMainItem[];
};

type Data = {
  user: any;
  teams: any;
  navMain: NavMain[];
};

// This is sample data.
const data: Data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.png",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      key: "home.home",
      url: "/",
      icon: BookOpen,
      isActive: true,
    },
    {
      title: "Playground",
      key: "common.playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Demo",
          key: "common.demo",
          url: "/demo",
        },
      ],
    },
  ],
};
interface Props extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar(props: Props) {
  const { $t } = useI18nStore();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <SidebarGroup className="py-0 group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <form className="relative">
              <Label htmlFor="search" className="sr-only">
                {$t("common.search")}
              </Label>
              <SidebarInput
                id="search"
                placeholder={$t("home.search_the_docs")}
                className="pl-8"
              />
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </form>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{$t("common.platform")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map(item =>
                item.items ? (
                  <Collapsible
                    key={item.key}
                    asChild
                    defaultOpen={item.isActive}
                    className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          {item.icon && <item.icon />}
                          <span>{$t(item.key)}</span>
                          <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map(subItem => (
                            <SidebarMenuSubItem key={$t(subItem.key)}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  <span>{$t(subItem.key)}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{$t(item.key)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
