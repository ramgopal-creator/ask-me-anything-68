import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock spending data
const monthlySpending = [
  { month: 'Jan', spending: 1980, income: 3200, savings: 1220 },
  { month: 'Feb', spending: 2100, income: 3200, savings: 1100 },
  { month: 'Mar', spending: 1850, income: 3400, savings: 1550 },
  { month: 'Apr', spending: 2250, income: 3200, savings: 950 },
  { month: 'May', spending: 2180, income: 3200, savings: 1020 },
  { month: 'Jun', spending: 2180, income: 3200, savings: 1020 }
];

const categorySpending = [
  { category: 'Food & Dining', amount: 650, budget: 800, color: '#ef4444' },
  { category: 'Transportation', amount: 280, budget: 300, color: '#f97316' },
  { category: 'Entertainment', amount: 420, budget: 400, color: '#eab308' },
  { category: 'Books & Supplies', amount: 320, budget: 500, color: '#22c55e' },
  { category: 'Personal Care', amount: 150, budget: 200, color: '#3b82f6' },
  { category: 'Other', amount: 360, budget: 400, color: '#8b5cf6' }
];

export const SpendingChart: React.FC = () => {
  return (
    <Card className="financial-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Spending Analytics
          <span className="text-sm font-normal text-muted-foreground">AI-Powered Insights</span>
        </CardTitle>
        <CardDescription>
          Track your spending patterns and get predictive insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="trends">Spending Trends</TabsTrigger>
            <TabsTrigger value="categories">Category Breakdown</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trends" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySpending}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="spending" 
                    stroke="hsl(var(--expense))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--expense))', strokeWidth: 2, r: 6 }}
                    name="Spending"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    stroke="hsl(var(--income))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Income"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="savings" 
                    stroke="hsl(var(--savings))" 
                    strokeWidth={2}
                    name="Savings"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Avg. Monthly Spending</p>
                <p className="text-xl font-bold text-expense">$2,090</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Predicted Next Month</p>
                <p className="text-xl font-bold text-primary">$2,250</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Savings Rate</p>
                <p className="text-xl font-bold text-secondary">32%</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categorySpending} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    type="number"
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    type="category"
                    dataKey="category"
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    width={120}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="hsl(var(--primary))" 
                    radius={[0, 4, 4, 0]}
                    name="Spent"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">AI Insights:</p>
              <ul className="space-y-1">
                <li>• You spend 30% more on dining out than average students</li>
                <li>• Transportation costs are well-controlled this month</li>
                <li>• Consider setting a stricter entertainment budget</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};