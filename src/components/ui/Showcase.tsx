import * as React from 'react';
import { Eye, Code2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Card, CardContent, CardDescription, CardHeader, CardTitle, PrettyCode, Sheet, SheetBody, SheetContent, SheetHeader, SheetTitle, Toggle } from './index';
import * as Icon from '@/components/ui/icons';
export const ShowcaseCard = ({
  title, description, children, code, dark,
}: {
  title: string; description?: string; children: React.ReactNode; code?: string; dark?: boolean;
}) => {
  const [codeOpen, setCodeOpen] = React.useState(false);

  return (
    <Card className="mb-8 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="bg-muted/50 border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary flex items-center gap-2 text-base">
            <Eye className="w-4 h-4" /> {title}
          </CardTitle>
          {code && (
            <CardDescription className="mt-1">
              <Toggle
                size="sm"
                pressed={codeOpen}
                onPressedChange={setCodeOpen}
              >
                <Icon.Code2 className="w-4 h-4" />
              </Toggle>
            </CardDescription>
          )}
        </div>
        {description && <CardDescription className="mt-1">{description}</CardDescription>}
      </CardHeader>
      <CardContent className={`p-8 ${dark ? 'bg-zinc-900 rounded-b-xl' : ''}`}>
        <div className="flex flex-wrap gap-4 items-end">
          {children}
        </div>
      </CardContent>
      {code && (
        <Sheet open={codeOpen} onOpenChange={setCodeOpen}>
          <SheetContent size="lg" className="backdrop-blur-none">
            <SheetHeader>
              <SheetTitle>Code mẫu</SheetTitle>
            </SheetHeader>
            <SheetBody>
              <PrettyCode code={code} />
            </SheetBody>
          </SheetContent>
        </Sheet>
      )}
    </Card>
  );
};

export const PageHeader = ({ title, description }: { title: string; description: string }) => (
  <div className="mb-10 animate-in fade-in slide-in-from-left-4 duration-500">
    <h1 className="text-3xl font-bold text-foreground tracking-tight">{title}</h1>
    <p className="text-muted-foreground mt-2 max-w-2xl">{description}</p>
  </div>
);
