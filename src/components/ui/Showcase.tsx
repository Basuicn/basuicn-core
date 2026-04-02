import * as React from 'react';
import { Eye, Code2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Card, CardContent, CardDescription, CardHeader, CardTitle, PrettyCode } from './index';

export const ShowcaseCard = ({
  title, description, children, code, dark,
}: {
  title: string; description?: string; children: React.ReactNode; code?: string; dark?: boolean;
}) => (
  <Card className="mb-8 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
    <CardHeader className="bg-muted/50 border-b border-border/50">
      <CardTitle className="text-primary flex items-center gap-2 text-base">
        <Eye className="w-4 h-4" /> {title}
      </CardTitle>
      {description && <CardDescription className="mt-1">{description}</CardDescription>}
    </CardHeader>
    <CardContent className={`p-8 ${dark ? 'bg-zinc-900 rounded-b-xl' : ''}`}>
      <div className="flex flex-wrap gap-4 items-end">
        {children}
      </div>
    </CardContent>
    {code && (
      <Accordion>
        <AccordionItem value="code" className="border-t border-border/50">
          <AccordionTrigger className="px-6 py-3 hover:bg-muted transition-colors" hideChevron>
            <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" /> Xem mã nguồn
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0 ove">
            <PrettyCode 
              code={code} 
              className="p-6 text-xs overflow-auto leading-relaxed max-h-[400px]" 
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )}
  </Card>
);

export const PageHeader = ({ title, description }: { title: string; description: string }) => (
  <div className="mb-10 animate-in fade-in slide-in-from-left-4 duration-500">
    <h1 className="text-3xl font-bold text-foreground tracking-tight">{title}</h1>
    <p className="text-muted-foreground mt-2 max-w-2xl">{description}</p>
  </div>
);
