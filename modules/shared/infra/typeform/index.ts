import { fetcher } from '@shared/application/fetcher';
import { RetriveForm } from './typeform-form.interface';
import { RetriveResponse } from './typeform-response.interface';

const BASE_URL = 'https://api.typeform.com';

const retrieveForm = async (formId: string) => {
  const url = `${BASE_URL}/forms/${formId}`;

  const res = await fetcher<RetriveForm>(url, {
    headers: {
      Authorization: `Bearer ${process.env.TYPEFORM_SECRET}`,
    },
  });

  return res;
};

const retrieveResponses = async (formId: string, responseId: string) => {
  const url = `${BASE_URL}/forms/${formId}/responses?included_response_ids=${responseId}`;

  const res = await fetcher<RetriveResponse>(url, {
    headers: {
      Authorization: `Bearer ${process.env.TYPEFORM_SECRET}`,
    },
  });

  return res;
};

const mapToFormResult = (response: RetriveResponse, form: RetriveForm) => {
  const questionsAndResponses = response.items[0].answers.map(answer => {
    const questionRef = answer.field.ref;
    const question = form.fields.find(field => field.ref === questionRef);

    return {
      answer: answer.choice?.label || answer.text || 'NONE_ANSWER',
      question: question?.title || 'NONE_QUESTION',
      questionType: answer.field.type,
    };
  });

  return {
    lang: form.settings.language,
    formResult: questionsAndResponses,
  };
};

export const getFormResult = async (formId: string, responseId: string) => {
  try {
    const [response, form] = await Promise.all([
      retrieveResponses(formId, responseId),
      retrieveForm(formId),
    ]);

    const result = mapToFormResult(response, form);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Could not get the result of the Typeform form. ${error.message}`;
    }

    throw error;
  }
};
