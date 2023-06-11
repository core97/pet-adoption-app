import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { preadoptionFormFinder } from '@user/application/preadoption-form-finder';
import { PreadoptionFormResponses } from '@user/presentation/components/PreadoptionFormResponses';
import { getSession } from '@shared/presentation/services/auth-service';
import { PAGES } from '@shared/application/pages';

const PreadoptionFormPreview = async ({
  params,
}: {
  params: { petAd: string; user: string };
}) => {
  const session = await getSession(headers().get('cookie') ?? '');

  if (!session?.user?.id) {
    redirect(PAGES.SIGN_IN);
  }

  const { formResult, lang } = await preadoptionFormFinder({
    petAdId: params.petAd,
    preadoptionUserId: params.user,
    requestingUserId: session.user.id,
  });

  return <PreadoptionFormResponses formResult={formResult} lang={lang} />;
};

export default PreadoptionFormPreview;
