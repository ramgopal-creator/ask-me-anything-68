import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings, TrendingUp, AlertCircle } from 'lucide-react';

const budgetCategories = [
  {
    name: 'Food & Dining',
    spent: 650,
    budget: 800,
    color: 'bg-expense',
    status: 'good' as const
  },
  {
    name: 'Transportation',
    spent: 280,
    budget: 300,
    color: 'bg-accent',
    status: 'warning' as const
  },
  {
    name: 'Entertainment',
    spent: 420,
    budget: 400,
    color: 'bg-destructive',
    status: 'over' as const
  },
  {
    name: 'Books & Supplies',
    spent: 320,
    budget: 500,
    color: 'bg-secondary',
    status: 'good' as const
  },
  {
    name: 'Personal Care',
    spent: 150,
    budget: 200,
    color: 'bg-primary',
    status: 'good' as const
  }
];

export const BudgetOverview: React.FC = () => {
  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const overallProgress = (totalSpent / totalBudget) * 100;

  const getStatusColor = (status: 'good' | 'warning' | 'over') => {
    switch (status) {
      case 'good': return 'bg-secondary text-secondary-foreground';
      case 'warning': return 'bg-accent text-accent-foreground';
      case 'over': return 'bg-destructive text-destructive-foreground';
    }
  };

  const getStatusText = (status: 'good' | 'warning' | 'over') => {
    switch (status) {
      case 'good': return 'On Track';
      case 'warning': return 'Close to Limit';
      case 'over': return 'Over Budget';
    }
  };

  return (
    <Card className="financial-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Budget Overview
              <Badge variant="outline" className="text-xs">
                {Math.round(overallProgress)}% Used
              </Badge>
            </CardTitle>
            <CardDescription>
              ${totalSpent} of ${totalBudget} monthly budget used
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Adjust Budgets
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Budget Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Overall Budget</span>
            <span className="text-muted-foreground">
              ${totalSpent} / ${totalBudget}
            </span>
          </div>
          <Progress 
            value={overallProgress} 
            className="h-3"
            style={{
              ['--progress-background' as any]: overallProgress > 90 
                ? 'hsl(var(--destructive))' 
                : overallProgress > 75 
                  ? 'hsl(var(--accent))' 
                  : 'hsl(var(--primary))'
            }}
          />
        </div>

        {/* Category Budgets */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Category Breakdown</h4>
          <div className="space-y-3">
            {budgetCategories.map((category) => {
              const progress = (category.spent / category.budget) * 100;
              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{category.name}</span>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getStatusColor(category.status)}`}
                      >
                        {getStatusText(category.status)}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ${category.spent} / ${category.budget}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(progress, 100)} 
                    className="h-2"
                    style={{
                      ['--progress-background' as any]: category.status === 'over' 
                        ? 'hsl(var(--destructive))' 
                        : category.status === 'warning'
                          ? 'hsl(var(--accent))'
                          : 'hsl(var(--primary))'
                    }}
                  />
                  {category.status === 'over' && (
                    <div className="flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      Over budget by ${category.spent - category.budget}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Smart Recommendations */}
        <div className="rounded-lg bg-muted/50 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h4 className="font-medium text-sm">Smart Recommendations</h4>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Reduce entertainment spending by $100 to stay on track</li>
            <li>• You're doing great with transportation costs!</li>
            <li>• Consider meal planning to optimize food budget</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};