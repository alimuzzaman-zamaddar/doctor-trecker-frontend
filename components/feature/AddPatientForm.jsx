'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPatient } from '@/services/patientService';
import { cn } from '@/lib/utils';
import { FormInput, SelectInput } from '@/components/ui';
import { SPECIALIZATIONS } from '@/lib/constants';
import Button from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function AddPatientForm({ onSuccess, existingDoctors }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    condition: 'Diabetes',
    doctorId: '',
    notes: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (existingDoctors && existingDoctors.length > 0) {
      setForm({ ...form, doctorId: existingDoctors[0]._id });
    }
  }, [existingDoctors]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await createPatient(form);
      onSuccess();
      router.push('/patients');
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
      <h2 className="text-xl font-bold text-slate-900">Add Patient</h2>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <FormInput
        label="First Name"
        name="firstName"
        required
        value={form.firstName}
        onChange={handleChange}
      />
      <FormInput
        label="Last Name"
        name="lastName"
        required
        value={form.lastName}
        onChange={handleChange}
      />
      <FormInput
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        required
        value={form.dateOfBirth}
        onChange={handleChange}
      />
      <SelectInput
        label="Gender"
        name="gender"
        options={['Male', 'Female', 'Other']}
        value={form.gender}
        onChange={(value) => setForm({ ...form, gender: value })}
      />
      <SelectInput
        label="Condition"
        name="condition"
        options={['Diabetes', 'Hypertension', 'Asthma', 'Arthritis', 'Heart Disease', 'Skin Allergy', 'Migraine', 'Kidney Disease', 'Thyroid Disorder', 'Other']}
        value={form.condition}
        onChange={(value) => setForm({ ...form, condition: value })}
      />
      <SelectInput
        label="Doctor"
        name="doctorId"
        options={existingDoctors || []}
        placeholder="Select a doctor"
        value={form.doctorId || ''}
        onChange={(value) => setForm({ ...form, doctorId: value })}
      />
      <FormInput
        label="Notes"
        name="notes"
        rows={3}
        value={form.notes}
        onChange={handleChange}
      />

      <Button type="submit" className="w-full">
        Add Patient
      </Button>
    </form>
  );
}