interface Env {
  RESEND_API_KEY?: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const data = await context.request.json() as {
      name: string;
      email: string;
      phone?: string;
      budget?: string;
      message: string;
      apiKey?: string;
    };

    const { name, email, phone, budget, message, apiKey } = data;

    // Use environment variable or passed key
    const resendKey = context.env.RESEND_API_KEY || apiKey;

    if (!resendKey) {
      return new Response(
        JSON.stringify({ 
          error: 'Resend API key missing.' 
        }),
        { status: 400, headers }
      );
    }

    // Email to Agency Admin (dijadia211@gmail.com)
    const adminEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Yakaar Web <onboarding@resend.dev>',
        to: ['dijadia211@gmail.com'],
        reply_to: email,
        subject: `🚀 Nouveau Devis de ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 25px; color: #123A34; background-color: #FAF9F6; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0;">
            <h2 style="color: #1FB199; border-bottom: 2px solid #1FB199; padding-bottom: 10px; margin-top: 0;">
              Nouveau Message Devis - Yakaar Web
            </h2>
            <p style="font-size: 16px;"><strong>Nom complet :</strong> ${name}</p>
            <p style="font-size: 16px;"><strong>Email :</strong> <a href="mailto:${email}" style="color: #1FB199; text-decoration: none;">${email}</a></p>
            <p style="font-size: 16px;"><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
            <p style="font-size: 16px;"><strong>Budget approximatif :</strong> ${budget || 'Non spécifié'}</p>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
            <h3 style="color: #F2965A; margin-bottom: 8px;">Message du client :</h3>
            <div style="white-space: pre-wrap; background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #dcdcdc; font-size: 15px; line-height: 1.5; color: #333333;">${message}</div>
            <div style="margin-top: 25px; text-align: center; font-size: 13px; color: #888888;">
              Envoyé depuis le site Yakaar Web (Cloudflare Edge Function)
            </div>
          </div>
        `,
      }),
    });

    if (!adminEmailRes.ok) {
      const errText = await adminEmailRes.text();
      return new Response(
        JSON.stringify({ error: `Erreur Resend: ${errText}` }),
        { status: adminEmailRes.status, headers }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email envoyé avec succès !' }),
      { status: 200, headers }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || 'Erreur lors de l\'envoi de l\'email.' }),
      { status: 500, headers }
    );
  }
};
