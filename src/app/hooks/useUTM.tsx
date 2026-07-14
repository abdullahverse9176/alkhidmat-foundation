"use client";

import { useEffect, useState } from "react";

export default function useUTM() {
  const [utm, setUtm] = useState({
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setUtm({
      source: params.get("utm_source") ?? "",
      medium: params.get("utm_medium") ?? "",
      campaign: params.get("utm_campaign") ?? "",
      term: params.get("utm_term") ?? "",
      content: params.get("utm_content") ?? "",
    });
  }, []);

  return utm;
}