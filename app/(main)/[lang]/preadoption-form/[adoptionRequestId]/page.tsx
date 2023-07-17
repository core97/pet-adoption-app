import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { preadoptionFormFinder } from '@user/application/preadoption-form-finder';
import { PreadoptionFormResponses } from '@user/presentation/components/PreadoptionFormResponses';
import { getSession } from '@shared/presentation/services/auth-service';
import { PAGES } from '@shared/application/pages';

const PreadoptionFormPreview = async ({
  params,
}: {
  params: { adoptionRequestId: string };
}) => {
  const session = await getSession(headers().get('cookie') ?? '');

  if (!session?.user?.id) {
    redirect(PAGES.SIGN_IN);
  }

  const { formResult, lang } = await preadoptionFormFinder({
    adoptionRequestId: params.adoptionRequestId,
    requestingUserId: session.user.id,
  });

  return <PreadoptionFormResponses formResult={formResult} lang={lang} />;
};

export default PreadoptionFormPreview;
