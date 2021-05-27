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
};
