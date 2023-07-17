import { Sidebar } from '@components/Sidebar';
import { ProfileNavbar } from '@components/ProfileNavbar';

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => (
  <Sidebar navigation={<ProfileNavbar />}>{children}</Sidebar>
);

export default ProfileLayout;
