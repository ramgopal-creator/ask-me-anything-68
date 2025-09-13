import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Coffee, 
  Car, 
  ShoppingBag, 
  BookOpen, 
  Gamepad2, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Receipt
} from 'lucide-react';

const recentTransactions = [
  {
    id: 1,
    name: 'Starbucks Coffee',
    category: 'Food & Dining',
    amount: -4.85,
    date: '2 hours ago',
    icon: Coffee,
    status: 'completed' as const,
    isRecurring: false
  },
  {
    id: 2,
    name: 'Gas Station',
    category: 'Transportation',
    amount: -32.50,
    date: '1 day ago',
    icon: Car,
    status: 'completed' as const,
    isRecurring: false
  },
  {
    id: 3,
    name: 'Netflix Subscription',
    category: 'Entertainment',
    amount: -15.99,
    date: '2 days ago',
    icon: Gamepad2,
    status: 'completed' as const,
    isRecurring: true
  },
  {
    id: 4,
    name: 'Part-time Job Payment',
    category: 'Income',
    amount: 850.00,
    date: '3 days ago',
    icon: ArrowUpRight,
    status: 'completed' as const,
    isRecurring: false
  },
  {
    id: 5,
    name: 'Campus Bookstore',
    category: 'Books & Supplies',
    amount: -89.99,
    date: '4 days ago',
    icon: BookOpen,
    status: 'pending' as const,
    isRecurring: false
  },
  {
    id: 6,
    name: 'Target Shopping',
    category: 'Personal Care',
    amount: -23.47,
    date: '5 days ago',
    icon: ShoppingBag,
    status: 'completed' as const,
    isRecurring: false
  }
];

export const RecentTransactions: React.FC = () => {
  const getCategoryColor = (category: string) => {
    const colors = {
      'Food & Dining': 'bg-red-100 text-red-800',
      'Transportation': 'bg-orange-100 text-orange-800',
      'Entertainment': 'bg-purple-100 text-purple-800',
      'Books & Supplies': 'bg-green-100 text-green-800',
      'Personal Care': 'bg-blue-100 text-blue-800',
      'Income': 'bg-emerald-100 text-emerald-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    return status === 'pending' ? 'text-accent' : 'text-muted-foreground';
  };

  return (
    <Card className="financial-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" />
              Recent Transactions
            </CardTitle>
            <CardDescription>
              Your latest financial activity
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentTransactions.map((transaction) => {
          const IconComponent = transaction.icon;
          const isIncome = transaction.amount > 0;
          
          return (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-3 rounded-lg bg-gradient-card border border-border/50 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isIncome ? 'bg-secondary/20' : 'bg-muted'}`}>
                  <IconComponent 
                    className={`h-4 w-4 ${isIncome ? 'text-secondary' : 'text-muted-foreground'}`} 
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{transaction.name}</h4>
                    {transaction.isRecurring && (
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        Recurring
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getCategoryColor(transaction.category)}`}
                    >
                      {transaction.category}
                    </Badge>
                    <span className={`text-xs ${getStatusColor(transaction.status)}`}>
                      {transaction.date}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`font-semibold ${
                  isIncome 
                    ? 'text-secondary' 
                    : 'text-foreground'
                }`}>
                  {isIncome ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </div>
                <div className={`text-xs ${getStatusColor(transaction.status)}`}>
                  {transaction.status === 'pending' ? 'Pending' : 'Completed'}
                </div>
              </div>
            </div>
          );
        })}

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Receipt className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <ArrowDownRight className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* AI Categorization Notice */}
        <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-sm">
          <p className="text-muted-foreground">
            <strong className="text-primary">AI Auto-Categorization:</strong> 
            {' '}Transactions are automatically categorized using machine learning. 
            Tap any transaction to correct the category and improve accuracy.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};