import stripe from 'stripe';

const client = new stripe(`${process.env.STRIPE_SECRET_KEY}`, {
  apiVersion: '2020-08-27',
});

export const Stripe = {
  connect: async (code: string) => {
    const response = await client.oauth.token({
      // @ts-ignore
      grand_type: 'authorization_code',
      code,
    });

    // if (!response) {
    //   return new Error('[App] failed to connect with Stripe');
    // }

    return response;
  },
  disconnect: async (stripeUserId: string) => {
    const response = await client.oauth.deauthorize({
      client_id: `${process.env.STRIPE_CONNECT_CLIENT_ID}`,
      stripe_user_id: stripeUserId,
    });

    return response;
  },
  charge: async (amount: number, source: string, stripeAccount: string) => {
    /* eslint-disable @typescript-eslint/camelcase */
    const res = await client.charges.create(
      {
        amount,
        currency: 'usd',
        source,
        application_fee_amount: Math.round(amount * 0.05),
      },
      {
        stripe_account: stripeAccount,
      }
    );
    /* eslint-enable @typescript-eslint/camelcase */

    if (res.status !== 'succeeded') {
      throw new Error('[App] failed to create with Stripe');
    }
  },
};
