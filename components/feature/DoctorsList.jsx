'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { doctorService } from '@/services/doctorService';
import { cn } from '@/lib/utils';
import { DataTable } from '@/components/ui/DataTable';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { SPECIALIZATIONS } from '@/lib/constants';
import { getFieldErrors } from '@/lib/api';
import { useSearchParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import useDebounce from '@/hooks/useDebounce';

export default function DoctorsList() {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filterSpecialization, setFilterSpecialization] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const router = useRouter();
  const params = useSearchParams();

  /** Read URL query params, then debounce the search value. */
  const debouncedSearch = useDebounce(search, 300);
  const rawSpecialization = params.get('specialization') || filterSpecialization || '';
  const rawSearch = params.get('search') || debouncedSearch || '';
  const rawSortBy = params.get('sortBy') || sortBy || 'name';
  const rawSortOrder = params.get('sortOrder') || sortOrder || 'asc';

  useEffect(() => {
    setFilterSpecialization(rawSpecialization);
    setSearch(rawSearch);
    setSortBy(rawSortBy);
    setSortOrder(rawSortOrder);
  }, [rawSpecialization, rawSearch, rawSortBy, rawSortOrder]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const data = await doctorService.getDoctors({
        search: debouncedSearch,
        specialization: filterSpecialization,
        sortBy,
        sortOrder,
        page,
        limit: 10,
      });

      setDoctors(data.doctors || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [user, debouncedSearch, filterSpecialization, sortBy, sortOrder, page]);

  /** Navigation - append query params and remember current page. */
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    const newParams = new URLSearchParams();
    if (debouncedSearch) newParams.set('search', debouncedSearch);
    if (filterSpecialization) newParams.set('specialization', filterSpecialization);
    newParams.set('sortBy', newSortBy);
    newParams.set('sortOrder', sortOrder);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const newParams = new URLSearchParams();
    if (debouncedSearch) newParams.set('search', debouncedSearch);
    if (filterSpecialization) newParams.set('specialization', filterSpecialization);
    newParams.set('sortBy', sortBy);
    newParams.set('sortOrder', sortOrder);
    newParams.set('page', newPage.toString());
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;
    try {
      await doctorService.deleteDoctor(id);
      setDoctors((prev) => prev.filter((d) => d._id !== id));
      setTotal((prev) => prev - 1);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (!user) {
    return null;
  }

  return (
    <section className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Doctors
        </h1>
        <Button
          variant="secondary"
          onClick={() => router.push('/doctors/add', { scroll: false })}
          className="flex items-center gap-1"
        >
          Add Doctor
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5 gap-2">
        <div>
          <select
            onChange={(e) => {
              const val = e.target.value;
              setFilterSpecialization(val === '' ? '' : val);
              const newParams = new URLSearchParams();
              if (debouncedSearch) newParams.set('search', debouncedSearch);
              if (val) newParams.set('specialization', val);
              newParams.set('page', '1');
              router.push(`?${newParams.toString()}`, { scroll: false });
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 appearance-none pl-3 pr-8"
          >
            <option value="">All</option>
            {SPECIALIZATIONS.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        <div>
          <SearchInput
            value={rawSearch}
            onChange={(val) => setSearch(val)}
            placeholder="Search doctors..."
            label="Search"
            className="w-full sm:w-64"
          />
        </div>

        <div />
        <div />
        <div />
      </div>

      {loading && <LoadingSpinner label="Fetching doctors…" />}

      {!loading && doctors.length === 0 && (
        <EmptyState
          title="No doctors found"
          description="Add a doctor to get started, or adjust your filters."
        />
      )}

      <DataTable
        rows={doctors}
        columns={[
          {
            key: 'name',
            header: 'Name',
            className: 'font-medium text-slate-700',
          },
          {
            key: 'specialization',
            header: 'Specialization',
            className: 'text-slate-500 text-xs uppercase',
          },
          {
            key: 'hospital',
            header: 'Hospital',
            className: 'text-slate-500 text-xs truncate',
          },
          {
            key: 'email',
            header: 'Email',
            className: 'text-slate-500 text-xs',
          },
          {
            key: 'patientCount',
            header: 'Patients',
            className: 'text-slate-500 text-xs',
          },
        ]}
        emptyTitle="No doctors found"
        emptyDescription="Add a doctor to get started, or adjust your filters."
        loading={loading}
        className="mt-4"
      />
    </section>
  );
}