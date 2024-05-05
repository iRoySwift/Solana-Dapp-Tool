'use client';
import { AlignJustify } from 'lucide-react';
import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { sidebarLinks } from '@/routes';
import Logo from '../Logo/Logo';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import useLocaleRoute from '@/hooks/useLocaleRoute';
import { useI18n } from '@/i18n';

interface Props {}
const MobileNav: React.FC<Props> = () => {
  const pathname = usePathname();
  const params = useParams();
  const localeLink = useLocaleRoute();
  const t = useI18n();

  return (
    <section className="flex-center">
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex-center h-10 w-10 cursor-pointer sm:hidden">
            <AlignJustify size={32} strokeWidth={2} />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-background">
          <div className="flex flex-col ">
            <Link href="/">
              <Logo />
            </Link>
            <div className="h-[calc(100vh-20px)] overflow-y-scroll">
              <SheetClose asChild>
                <div className="flex h-full flex-col gap-6 pt-16 text-white">
                  {sidebarLinks.map((link) => {
                    const isActive =
                      pathname
                        .replace(`/${params.lang}`, '/')
                        .replace('//', '/') == link.route;
                    return (
                      <Link
                        className={cn(
                          'flex items-center gap-4 rounded-lg p-4',
                          {
                            'bg-primary': isActive,
                          },
                        )}
                        key={link.id}
                        href={localeLink(link.route)}
                      >
                        <div className="flex h-6 w-6">{link.icon}</div>
                        <p className="text-lg font-semibold ">{t(link.id)}</p>
                      </Link>
                    );
                  })}
                </div>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};
export default MobileNav;
