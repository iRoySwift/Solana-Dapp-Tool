import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';
// import { Label } from "@radix-ui/react-dropdown-menu";
import React from 'react';
import ToggleCluster from './ToggleCluster';

interface Props {}
const Setting: React.FC<Props> = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Cog8ToothIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>设置</SheetTitle>
          <SheetDescription>选择集群</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div>
            <ToggleCluster />
          </div>
        </div>
        {/* <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
};
export default Setting;
