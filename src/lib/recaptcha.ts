export async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not defined in environment variables");
    return { success: false, score: 0, error: "missing-secret" };
  }

  try {
    const params = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    const data = await response.json();

    if (!data.success) {
      const errorCode = data["error-codes"]?.[0] || "verification-failed";
      console.warn("reCAPTCHA validation failed:", data["error-codes"]);
      return { success: false, score: 0, error: errorCode };
    }

    return {
      success: true,
      score: data.score ?? 0,
      action: data.action,
    };
  } catch (error: any) {
    console.error("Error during reCAPTCHA verification:", error);
    return { success: false, score: 0, error: error.message || "network-error" };
  }
}
