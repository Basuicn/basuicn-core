import * as React from 'react';
import {
  Drawer as SheetRoot,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  type DrawerContentProps,
} from '../drawer/Drawer';

/** Sheet is a Drawer that defaults to direction="right" and size="lg". */

const Sheet = SheetRoot;
const SheetTrigger = DrawerTrigger;
const SheetClose = DrawerClose;

const SheetContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ direction = 'right', size = 'lg', backdropBlur = false, ...props }, ref) => (
    <DrawerContent ref={ref} direction={direction} size={size} backdropBlur={backdropBlur} {...props} />
  ),
);
SheetContent.displayName = 'SheetContent';

const SheetHeader = DrawerHeader;
const SheetTitle = DrawerTitle;
const SheetDescription = DrawerDescription;
const SheetBody = DrawerBody;
const SheetFooter = DrawerFooter;

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetClose,
};
