"use client";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export function useRecaptcha() {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const getToken = async (action: string = "submit") => {
        if (!executeRecaptcha) {
            throw new Error("reCAPTCHA is not ready yet.");
        }

        return await executeRecaptcha(action);
    };

    return { getToken };
}