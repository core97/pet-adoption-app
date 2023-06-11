import { getFormResult } from '@shared/infra/typeform';

export type PreadoptionFormResponsesProps = Awaited<
  ReturnType<typeof getFormResult>
>;
