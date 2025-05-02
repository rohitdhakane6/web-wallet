import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string | ReactNode;
  className?: string;
  icon?: ReactNode;
}

export default function StatCard({
  title,
  value,
  subtitle,
  className,
  icon,
}: StatCardProps) {
  return (
    <Card className={cn('transition-all gap-2 hover:shadow-md', className)}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <div className="text-xs mt-1">{subtitle}</div>}
      </CardContent>
    </Card>
  );
}