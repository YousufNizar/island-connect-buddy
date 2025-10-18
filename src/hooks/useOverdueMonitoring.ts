// Hook to monitor overdue tourists
import { useEffect } from 'react';
import { checkOverdueTourists } from '../services/qrTrackingService';

/**
 * Background hook to check for overdue tourists every 5 minutes
 * This should be used at the app level to ensure continuous monitoring
 */
export const useOverdueMonitoring = () => {
  useEffect(() => {
    // Check immediately on mount
    checkOverdueTourists().catch(console.error);

    // Then check every 5 minutes
    const interval = setInterval(() => {
      checkOverdueTourists().catch(console.error);
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);
};
