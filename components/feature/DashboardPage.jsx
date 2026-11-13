'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { dashboardService } from '@/services/dashboardService';
import { formatDate, formatDateTime } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { StatCard } from '@/components/ui/StatCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ChartCard } from '@/components/ui/ChartCard';
import Pagination from '@/components/ui/Pagination';
import { getFieldErrors } from '@/lib/api';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filterSpecialization, setFilterSpecialization] = useState('');
  const [filterCondition, setFilterCondition] = useState('');

  /** Fetch stats from the backend. */
  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (err) {
      console.error('Dashboard stats error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [user]);

  /** Filter-based fetch for patient-per-doctor chart. */
  const reFetch = async () => {
    fetchStats();
  };

  if (!user) {
    return null;
  }

  return (
    <section className="p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats && !isLoading && (
          <>
            <StatCard
              label="Total Doctors"
              value={stats.totalDoctors || 0}
              icon={undefined}
              accent="teal"
            />
            <StatCard
              label="Total Patients"
              value={stats.totalPatients || 0}
              icon={undefined}
              accent="blue"
            />
            <StatCard
              label="Avg. Patients/Doctor"
              value={
                stats.totalDoctors > 0
                  ? Math.round(stats.totalPatients / stats.totalDoctors)
                  : 0
              }
              hint={stats.totalDoctors > 0 ? `(${stats.totalPatients} patients ÷ ${stats.totalDoctors} doctors)` : 'No doctors yet'}
              accent="violet"
            />
            <StatCard
              label="New This Month"
              value={stats.newThisMonth || 0}
              icon={undefined}
              accent="amber"
            />
          </>
        )}

        {!stats || isLoading && (
          <div className="rounded-2xl border border-slate-200 bg-white shadow-card p-4 animate-pulse">
            <div className="h-8 w-20 animate-pulse rounded bg-slate-100 mx-auto my-3" />
          </div>
        )}
      </div>

      {/* Chart cards - patient per doctor and condition distribution */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-4">
        <ChartCard title="Patients per Doctor">
          <div className="h-48">
            <div className="flex items-baseline justify-center text-sm text-slate-500">
              <span>Loading patient per doctor data…</span>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Condition Distribution">
          <div className="h-48">
            <div className="flex items-baseline justify-center text-sm text-slate-500">
              <span>Loading condition distribution…</span>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Pagination for dashboard */}
      {isLoading ? (
        <LoadingSpinner label="Fetching dashboard data…" />
      ) : null}
    </section>
  );
}