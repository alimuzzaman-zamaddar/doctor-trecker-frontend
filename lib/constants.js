/**
 * These lists must stay in sync with the enums in the backend models:
 * backend/src/models/Doctor.js and backend/src/models/Patient.js.
 */

export const SPECIALIZATIONS = [
  'General Medicine',
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Gynecology',
  'ENT',
  'Ophthalmology',
  'Dentistry',
  'Psychiatry',
  'Other',
];

export const CONDITIONS = [
  'Diabetes',
  'Hypertension',
  'Asthma',
  'Arthritis',
  'Heart Disease',
  'Skin Allergy',
  'Migraine',
  'Kidney Disease',
  'Thyroid Disorder',
  'Other',
];

export const GENDERS = ['Male', 'Female', 'Other'];

export const PAGE_SIZE = 8;
export const DOCTOR_OPTIONS_LIMIT = 100;

export const SPECIALIZATION_OPTIONS = SPECIALIZATIONS.map((value) => ({
  value,
  label: value,
}));

export const CONDITION_OPTIONS = CONDITIONS.map((value) => ({
  value,
  label: value,
}));

export const GENDER_OPTIONS = GENDERS.map((value) => ({ value, label: value }));

/** Consistent colours for condition badges across tables and detail pages. */
export const CONDITION_TONES = {
  Diabetes: 'amber',
  Hypertension: 'rose',
  Asthma: 'blue',
  Arthritis: 'violet',
  'Heart Disease': 'rose',
  'Skin Allergy': 'amber',
  Migraine: 'violet',
  'Kidney Disease': 'blue',
  'Thyroid Disorder': 'emerald',
  Other: 'slate',
};
