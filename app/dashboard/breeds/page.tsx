import Link from 'next/link';
import { DASHBOARD_PAGES } from '@shared/application/pages';

const Breeds = () => (
  <Link href={`${DASHBOARD_PAGES.BREEDS}/creation`}>Crear raza</Link>
);

export default Breeds;
