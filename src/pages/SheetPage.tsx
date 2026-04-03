import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetBody, SheetFooter } from "@components/ui/sheet/Sheet";
import { Button } from "@components/ui/button/Button";
import { Input } from "@components/ui/input/Input";

const SheetPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Sheet" description="A side panel that slides in from the edge of the screen (extends Drawer)." />

    <ShowcaseCard
      title="Default (Right)"
      code={`<Sheet>\n  <SheetTrigger render={<Button variant="outline">Open Sheet</Button>} />\n  <SheetContent>\n    <SheetHeader>\n      <SheetTitle>Edit Profile</SheetTitle>\n      <SheetDescription>Make changes to your profile here.</SheetDescription>\n    </SheetHeader>\n    <SheetBody>\n      <Input label="Name" />\n    </SheetBody>\n    <SheetFooter>\n      <Button>Save</Button>\n    </SheetFooter>\n  </SheetContent>\n</Sheet>`}
    >
      <Sheet>
        <SheetTrigger render={<Button variant="outline">Open Sheet</Button>} />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>Make changes to your profile here.</SheetDescription>
          </SheetHeader>
          <SheetBody>
            <div className="space-y-4">
              <Input label="Name" placeholder="Enter your name" />
              <Input label="Email" placeholder="Enter your email" />
            </div>
          </SheetBody>
          <SheetFooter>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm">Save</Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </ShowcaseCard>

    <ShowcaseCard
      title="Left Side"
      code={`<Sheet>\n  <SheetTrigger render={<Button variant="outline">Left Sheet</Button>} />\n  <SheetContent direction="left">\n    <SheetHeader>\n      <SheetTitle>Navigation</SheetTitle>\n    </SheetHeader>\n    <SheetBody>...</SheetBody>\n  </SheetContent>\n</Sheet>`}
    >
      <Sheet>
        <SheetTrigger render={<Button variant="outline">Left Sheet</Button>} />
        <SheetContent direction="left">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <SheetBody>
            <p className="text-sm text-muted-foreground">Navigation content here.</p>
          </SheetBody>
        </SheetContent>
      </Sheet>
    </ShowcaseCard>
  </div>
);

export default SheetPage;
