import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, Zap, Calendar } from 'lucide-react';

interface Goal {
  name: string;
  current: number;
  target: number;
  progress: number;
}

interface GoalTrackerProps {
  goals: Goal[];
}

export const GoalTracker: React.FC<GoalTrackerProps> = ({ goals }) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'hsl(var(--secondary))';
    if (progress >= 50) return 'hsl(var(--primary))';
    if (progress >= 25) return 'hsl(var(--accent))';
    return 'hsl(var(--muted-foreground))';
  };

  const getTimeToGoal = (current: number, target: number) => {
    const remaining = target - current;
    const monthlyContribution = 150; // Assume average $150/month savings
    const months = Math.ceil(remaining / monthlyContribution);
    return months;
  };

  return (
    <Card className="financial-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Savings Goals
            </CardTitle>
            <CardDescription>
              Track your progress towards financial milestones
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal, index) => {
          const timeToGoal = getTimeToGoal(goal.current, goal.target);
          return (
            <div key={index} className="space-y-3 p-4 rounded-lg bg-gradient-card border border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{goal.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    ${goal.current} of ${goal.target}
                  </p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant="secondary"
                    className="mb-1"
                    style={{ 
                      backgroundColor: `${getProgressColor(goal.progress)}20`,
                      color: getProgressColor(goal.progress),
                      border: `1px solid ${getProgressColor(goal.progress)}30`
                    }}
                  >
                    {goal.progress}%
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {timeToGoal} months left
                  </div>
                </div>
              </div>
              
              <Progress 
                value={goal.progress} 
                className="h-3"
                style={{
                  ['--progress-background' as any]: getProgressColor(goal.progress)
                }}
              />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>${goal.target - goal.current} remaining</span>
                <span>~${Math.ceil((goal.target - goal.current) / timeToGoal)}/month</span>
              </div>

              {goal.progress >= 80 && (
                <div className="flex items-center gap-2 text-sm text-secondary bg-secondary/10 rounded-md p-2">
                  <Zap className="h-4 w-4" />
                  <span>Almost there! You're doing great!</span>
                </div>
              )}
            </div>
          );
        })}

        {/* AI Insights */}
        <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <h4 className="font-medium text-sm">AI Goal Insights</h4>
          </div>
          <ul className="text-sm space-y-1">
            <li className="text-muted-foreground">• You're on track to reach your Spring Break goal 2 weeks early!</li>
            <li className="text-muted-foreground">• Consider increasing Emergency Fund contributions by $50/month</li>
            <li className="text-muted-foreground">• Your laptop goal could be reached faster with better entertainment budgeting</li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            Auto Save
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Adjust Goals
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};