// ============================================================
// SUSTAINABILITY CARD COMPONENT
// ============================================================

import { TrendingUp, Leaf, Users, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RatingService } from '@/services/ratingService';

interface SustainabilityCardProps {
  score: number;
  metrics: {
    localOwnership: number;
    ecoFriendly: number;
    culturalValue: number;
    touristImpact: number;
  };
}

export const SustainabilityCard = ({ score, metrics }: SustainabilityCardProps) => {
  const level = RatingService.getSustainabilityLevel(score);
  const icon = RatingService.getSustainabilityIcon(level);
  const colorClass = RatingService.getSustainabilityColor(level);

  const metricItems = [
    {
      label: 'Local Ownership',
      value: metrics.localOwnership,
      icon: Users,
      color: 'text-blue-500',
      description: 'Community-managed business',
    },
    {
      label: 'Eco-Friendly',
      value: metrics.ecoFriendly,
      icon: Leaf,
      color: 'text-green-500',
      description: 'Environmental practices',
    },
    {
      label: 'Cultural Value',
      value: metrics.culturalValue,
      icon: AlertCircle,
      color: 'text-purple-500',
      description: 'Heritage preservation',
    },
    {
      label: 'Tourist Impact',
      value: metrics.touristImpact,
      icon: TrendingUp,
      color: 'text-orange-500',
      description: 'Sustainable visitor flow',
    },
  ];

  return (
    <div className={`rounded-xl p-6 border border-border shadow-card ${colorClass}`}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-bold text-lg flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            Sustainability Score
          </h3>
          <Badge className={colorClass}>{level}</Badge>
        </div>
        <p className="text-sm opacity-90">
          {level === 'High' &&
            '🌟 This destination excels in sustainable practices!'}
          {level === 'Moderate' &&
            '⚠️ Good practices, but room for improvement'}
          {level === 'Low' &&
            '⚠️ Limited sustainable practices'}
        </p>
      </div>

      {/* Main Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold">{score}/100</span>
          <span className="text-sm text-muted-foreground">
            {level === 'High' && 'Highly Sustainable'}
            {level === 'Moderate' && 'Moderately Sustainable'}
            {level === 'Low' && 'Needs Improvement'}
          </span>
        </div>
        <Progress value={score} className="h-3" />
      </div>

      {/* Metrics Breakdown */}
      <div className="space-y-3">
        {metricItems.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${metric.color}`} />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <span className="text-sm font-semibold">{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </div>
          );
        })}
      </div>

      {/* Tips */}
      <div className="mt-6 pt-6 border-t border-current/20">
        <p className="text-xs font-semibold mb-2">💡 Travel Tip:</p>
        <ul className="text-xs space-y-1 opacity-90">
          {level === 'High' && (
            <>
              <li>✓ Support local businesses while visiting</li>
              <li>✓ Follow eco-friendly guidelines</li>
              <li>✓ Respect cultural practices</li>
            </>
          )}
          {level === 'Moderate' && (
            <>
              <li>→ Ask about sustainable practices</li>
              <li>→ Support local employment</li>
              <li>→ Minimize waste during visit</li>
            </>
          )}
          {level === 'Low' && (
            <>
              <li>⚠️ Consider sustainability concerns</li>
              <li>⚠️ Engage responsibly with locals</li>
              <li>⚠️ Minimize environmental impact</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
