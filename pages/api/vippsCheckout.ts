// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = {
    "merchantInfo": {
      "callbackPrefix": "https://example.com/vipps/callbacks-for-payment-update-from-vipps",
      "returnUrl": "https://example.com/vipps/fallback-result-page-for-both-success-and-failure/acme-shop-123-order123abc",
      "callbackAuthorizationToken": "ec0f7214-0aaa-423c-96dc-8ae3919bd16a",
      "termsAndConditionsUrl": "https://example.com/vipps/terms-and-conditions"
    },
    "transaction": {
      "amount": {
        "currency": "NOK",
        "value": 1000
      },
      "reference": "2661491668015044537",
      "paymentDescription": "This payment is for testing :)"
    },
      "contactFields": false,
      "addressFields": false,
  }


  if (req.method === 'POST') {
    if (req.body.membership == "semester"){

      fetch('https://apitest.vipps.no/checkout/v2/session', {
        method: 'POST',
        headers: {
          'Vipps-System-Name': 'NextTest',
          'Vipps-System-Version': 1.0,
          'Vipps-System-Plugin-Name': 'vipps-test',
          'Vipps-System-Plugin-Version': 2.0,
          'client_id': process.env.CLIENT_ID,
          'client_secret': process.env.CLIENT_SECRET,
          'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
          'Merchant-Serial-Number': process.env.MSN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        }).then((response) => response.json())
        .then((data) => {
          res.status(200).json({token: data.token, url: data.checkoutFrontendUrl})
          console.log(data)
          //For later use?
          //const pollingUrl = data.pollingUrl
        })
        .catch((error) => {
          res.status(418).json({ status: 'error' })
        });
    }
    else{
      res.status(418).json({ status: 'Invalid product' })
    }
  }
  else{
    res.status(418).json({ status: 'Bad request' })
  }
}
