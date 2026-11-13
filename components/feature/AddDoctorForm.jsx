'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createDoctor } from '@/services/doctorService';
import { cn } from '@/lib/utils';
import { FormInput, SelectInput } from '@/components/ui';
import Button from '@/components/ui/Button';

export default function AddDoctorForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    specialization: 'General Medicine',
    hospital: '',
    phone: '',
    email: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await createDoctor(form);
      setForm({
        name: '',
        specialization: 'General Medicine',
        hospital: '',
        phone: '',
        email: '',
      });
      onSuccess();
      router.push('/doctors');
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
      <h2 className="text-xl font-bold text-slate-900">Add Doctor</h2>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <FormInput
        label="Name"
        name="name"
        required
        value={form.name}
        onChange={handleChange}
      />
      <FormInput
        label="Phone"
        name="phone"
        type="tel"
        placeholder="+1 (555) 123-4567"
        value={form.phone}
        onChange={handleChange}
      />
      <FormInput
        label="Email"
        name="email"
        type="email"
        placeholder="doctor@example.com"
        required
        value={form.email}
        onChange={handleChange}
      />
      <SelectInput
        label="Specialization"
        name="specialization"
        options={['General Medicine', 'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Gynecology', 'ENT', 'Ophthalmology', 'Dentistry', 'Psychiatry', 'Other']}
        value={form.specialization}
        onChange={(value) => setForm({ ...form, specialization: value })}
      />
      <FormInput
        label="Hospital"
        name="hospital"
        value={form.hospital}
        onChange={handleChange}
      />

      <Button type="submit" className="w-full">
        Add Doctor
      </Button>
    </form>
  );
}