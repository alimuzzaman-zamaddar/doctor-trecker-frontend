import DoctorDetailPage from '@/components/feature/DoctorDetailPage';

export default function DoctorDetail({ params }) {
  return <DoctorDetailPage id={params.id} />;
}