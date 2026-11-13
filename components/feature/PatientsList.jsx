'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { patientService } from '@/services/patientService';
import { cn } from '@/lib/utils';
import { DataTable } from '@/components/ui/DataTable';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { SPECIALIZATIONS } from '@/lib/constants';
import { getFieldErrors } from '@/lib/api';
import { useSearchParams, useRouter } from 'next/navigation';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { SearchInput } from '@/components/ui/SearchInput';
import useDebounce from '@/hooks/useDebounce';
import Button from '@/components/ui/Button';

export default function PatientsList() {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterCondition, setFilterCondition] = useState('');
  const search = useDebounce('');

  const router = useRouter();
  const params = useSearchParams();

  /** Pull URL params, then debounce the search value. */
  const rawDoctor = params.get('doctor') || filterDoctor || '';
  const rawCondition = params.get('condition') || filterCondition || '';
  const rawSearch = params.get('search') || search || '';

  useEffect(() => {
    setFilterDoctor(rawDoctor);
    setFilterCondition(rawCondition);
    setSearch(rawSearch);
  }, [rawDoctor, rawCondition, rawSearch]);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const data = await patientService.getPatients({
        search: rawSearch,
        doctor: rawDoctor,
        condition: rawCondition,
        page,
        limit: 8,
      });

      setPatients(data.patients || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch patients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [user, rawSearch, rawDoctor, rawCondition, page]);

  /** Navigation - add query params while remembering current page. */
  const handleDoctorChange = (val) => {
    setFilterDoctor(val !== '' ? val : '');
    const newParams = new URLSearchParams();
    if (rawSearch) newParams.set('search', rawSearch);
    if (val) newParams.set('doctor', val);
    if (rawCondition) newParams.set('condition', rawCondition);
    newParams.set('page', '1');
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const handleConditionChange = (val) => {
    setFilterCondition(val !== '' ? val : '');
    const newParams = new URLSearchParams();
    if (rawSearch) newParams.set('search', rawSearch);
    if (rawDoctor) newParams.set('doctor', rawDoctor);
    if (val) newParams.set('condition', val);
    newParams.set('page', '1');
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const handleSearchChange = (val) => {
    setSearch(val || '');
    const newParams = new URLSearchParams();
    if (val) newParams.set('search', val);
    newParams.set('page', '1');
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this patient?')) return;
    try {
      await patientService.deletePatient(id);
      setPatients((prev) => prev.filter((p) => p._id !== id));
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
          Patients
        </h1>
        <Button
          variant="secondary"
          onClick={() => router.push('/patients/add', { scroll: false })}
          className="flex items-center gap-1"
        >
          Add Patient
        </Button>
      </div>

      {/* Filters row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 md:grid-cols-8 gap-2">
        <div className="sm:col-span-2">
          <FilterDropdown
            label="Doctor"
            value={rawDoctor}
            onChange={handleDoctorChange}
            options={[]}
            allLabel="All doctors"
          />
        </div>

        <div className="sm:col-span-2">
          <FilterDropdown
            label="Condition"
            value={rawCondition}
            onChange={handleConditionChange}
            options={['Diabetes', 'Hypertension', 'Asthma', 'Arthritis', 'Heart Disease', 'Skin Allergy', 'Migraine', 'Kidney Disease', 'Thyroid Disorder', 'Other']}
            allLabel="All conditions"
          />
        </div>

        <div className="sm:col-span-2">
          <SearchInput
            value={rawSearch}
            onChange={handleSearchChange}
            placeholder="Search patients…"
            label="Search"
          />
        </div>

        <div />
        <div />
      </div>

      {/* Empty state + loading */}
      {loading ? (
        <LoadingSpinner label="Fetching patients…" />
      ) : rawSearch !== '' || rawDoctor !== '' || rawCondition !== '' ? null : (
        <EmptyState
          title="No patients found"
          description="Adjust filters or add a patient to get started."
        />
      )}

      <DataTable
        rows={patients}
        columns={[
          {
            key: 'firstName',
            header: 'First Name',
            className: 'font-medium text-slate-700',
          },
          {
            key: 'lastName',
            header: 'Last Name',
            className: 'text-slate-500 text-xs',
          },
          {
            key: 'doctorName',
            header: 'Doctor',
            className: 'text-slate-500 text-xs',
          },
          {
            key: 'condition',
            header: 'Condition',
            className: 'text-slate-500 text-xs uppercase',
          },
          {
            key: 'email',
            header: 'Email',
            className: 'text-slate-500 text-xs',
          },
          {
            key: 'dateOfBirth',
            header: 'DOB',
            className: 'text-slate-500 text-xs',
          },
        ]}
        emptyTitle="No patients found"
        emptyDescription="Adjust filters or add a patient to get started."
        loading={loading}
        className="mt-4"
      />
    </section>
  );
}