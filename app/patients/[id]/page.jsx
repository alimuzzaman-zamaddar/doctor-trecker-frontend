'use client';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ErrorState } from '@/components/ui/ErrorState';

export default function PatientDetail() {
  const { id } = useParams();
  const router = useRouter();

  if (!id) {
    return (
      <section className="p-6">
        <ErrorState
          title="Patient ID missing"
          message="Please access this page via the patients list."
          onRetry={() => router.back()}
        />
      </section>
    );
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold text-slate-900">
        Patient {id}
      </h1>
      <p className="text-sm text-slate-500">
        Viewing patient record {id}. Details will be populated when patient data is available.
      </p>
      <Button
        variant="secondary"
        onClick={() => router.back()}
        className="mt-3"
      >
        Back to Patients
      </Button>
    </section>
  );
}