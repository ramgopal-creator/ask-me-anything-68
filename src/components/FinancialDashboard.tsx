import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  PiggyBank, 
  CreditCard,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { SpendingChart } from './SpendingChart';
import { BudgetOverview } from './BudgetOverview';
import { RecentTransactions } from './RecentTransactions';
import { GoalTracker } from './GoalTracker';

// Mock data for demonstration
const financialData = {
  balance: 2450.75,
  monthlyIncome: 3200.00,
  monthlyExpenses: 2180.50,
  savings: 1270.25,
  budgetUsed: 68,
  goals: [
    { name: 'Emergency Fund', current: 1200, target: 5000, progress: 24 },
    { name: 'Spring Break Trip', current: 850, target: 1500, progress: 57 },
    { name: 'New Laptop', current: 320, target: 1200, progress: 27 }
  ]
};

export const FinancialDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-dashboard p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Finance Manager</h1>
            <p className="text-muted-foreground">Manage your money smarter with AI-powered insights</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
            <Button className="bg-gradient-primary" size="sm">
              <Target className="mr-2 h-4 w-4" />
              Set Goal
            </Button>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="financial-card border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${financialData.balance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 text-secondary mr-1" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="financial-card border-l-4 border-l-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-income">${financialData.monthlyIncome.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">From part-time job & financial aid</p>
            </CardContent>
          </Card>

          <Card className="financial-card border-l-4 border-l-destructive">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-expense">${financialData.monthlyExpenses.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-destructive">↑8%</span> vs last month
              </p>
            </CardContent>
          </Card>

          <Card className="financial-card border-l-4 border-l-savings">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
              <PiggyBank className="h-4 w-4 text-savings" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-savings">${financialData.savings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Across 3 savings goals</p>
            </CardContent>
          </Card>
        </div>

        {/* Budget Alert */}
        <Card className="financial-card border-l-4 border-l-accent bg-accent/5">
          <CardContent className="flex items-center gap-4 pt-6">
            <AlertTriangle className="h-5 w-5 text-accent" />
            <div className="flex-1">
              <h3 className="font-semibold">Budget Alert</h3>
              <p className="text-sm text-muted-foreground">
                You've used {financialData.budgetUsed}% of your monthly budget. Consider reducing dining out expenses.
              </p>
            </div>
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              {financialData.budgetUsed}% Used
            </Badge>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Charts and Analytics */}
          <div className="space-y-6 lg:col-span-2">
            <SpendingChart />
            <BudgetOverview />
          </div>

          {/* Right Column - Goals and Transactions */}
          <div className="space-y-6">
            <GoalTracker goals={financialData.goals} />
            <RecentTransactions />
          </div>
        </div>
      </div>
    </div>
  );
};