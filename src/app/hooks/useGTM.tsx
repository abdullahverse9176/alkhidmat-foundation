"use client";

export default function useGTM() {
  const pushEvent = (event: Record<string, unknown>) => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
  };

  const trackFormSubmit = (
    formName: string,
    utm?: {
      source?: string;
      medium?: string;
      campaign?: string;
      term?: string;
      content?: string;
    }
  ) => {
    pushEvent({
      event: "form_submit",
      form_name: formName,
      utm_source: utm?.source,
      utm_medium: utm?.medium,
      utm_campaign: utm?.campaign,
      utm_term: utm?.term,
      utm_content: utm?.content,
    });
  };

  const trackFormError = (formName: string, error?: string) => {
    pushEvent({
      event: "form_submit_failed",
      form_name: formName,
      error,
    });
  };

  return {
    trackFormSubmit,
    trackFormError,
  };
}