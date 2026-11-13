'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { doctorService } from '@/services/doctorService';
import { DataTable } from '@/components/ui/DataTable';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { getFieldErrors } from '@/lib/api';
import { useNavigate, useSearchParams } from 'next/navigation';
import { SPECIALIZATIONS } from '@/lib/constants';
import { useSearchParams as useReactSearchParams } from 'react';
import { formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function DoctorDetailPage() {
  const { user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const fetchDoctor = async (id) => {
    setLoading(true);
    try {
      const data = await doctorService.getDoctor(id);
      setDoctor(data);
      setError('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctorPatients = async (id) => {
    try {
      const data = await doctorService.getDoctorPatients(id);
      setPatients(data.patients || []);
      // Also set totalPatients in metadata if available
    } catch (err) {
      console.error('Failed to fetch patients:', err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDoctor(id);
      fetchDoctorPatients(id);
    }
  }, [id, user]);

  if (!user) {
    return null;
  }

  if (!id) {
    return (
      <section className="p-4 sm:p-6">
        <ErrorState
          title="Doctor ID missing"
          message="Please access this page via the doctors list."
          onRetry={() => navigate('/doctors')}
        />
      </section>
    );
  }

  if (!doctor) {
    return (
      <section className="p-4 sm:p-6">
        <LoadingSpinner label="Loading doctor…" />
      </section>
    );
  }

  return (
    <section className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Doctor: {doctor.name}
        </h1>
        <Button
          variant="secondary"
          onClick={() => navigate('/doctors/add')}
          className="flex items-center gap-1"
        >
          Add New
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5 gap-2">
        <div className="text-sm text-slate-500 uppercase tracking-wider">
          Specialization
        </div>
        <div className="text-sm font-medium text-slate-700">{doctor.specialization}</div>

        <div className="text-sm text-slate-500 uppercase tracking-wider">
          Hospital
        </div>
        <div className="text-sm font-medium text-slate-700">{doctor.hospital}</div>

        <div className="text-sm text-slate-500 uppercase tracking-wider">
          Phone
        </div>
        <div className="text-sm font-medium text-slate-700">{doctor.phone}</div>

        <div className="text-sm text-slate-500 uppercase tracking-wider">
          Email
        </div>
        <div className="text-sm font-medium text-slate-700">{doctor.email}</div>
      </div>

      {/* Patient list */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-3">
          {patients.length} Patient{s}
          {patients.length !== 1 && 's'}
          {patients.length > 0 ? '' : ' (none yet)'}
        </h2>

        {loading ? (
          <LoadingSpinner label="Loading patients…" />
        ) : patients.length === 0 && (
          <EmptyState
            icon={undefined}
            title="No patients for this doctor"
            description="Add a patient to associate with this doctor."
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
          emptyDescription="No patients associated with this doctor."
          loading={loading}
          className="mt-3"
        />
      </div>
    </section>
  );
}