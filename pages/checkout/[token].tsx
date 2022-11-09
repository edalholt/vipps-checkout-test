import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Script from 'next/script'


function checkout() {
    const router = useRouter();
    const {token} = router.query;
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!loading && token) {
        const vippsCheckout = VippsCheckout({
            checkoutFrontendUrl: 'https://checkout-mt.vipps.no/',
            iFrameContainerId: 'vipps-checkout-frame-container',
            language: 'no',
            token: token,
        })
    }
    }, [loading, token])

  return (
    <>
    <Script src="https://checkout.vipps.no/vippsCheckoutSDK.js" onLoad={() => {setLoading(false); console.log("ok")}} />
    <section id="vipps-checkout-frame-container">
    </section>
    <p onClick={() => (router.reload(window.location.pathname))}>Click here if vipps does not show</p>
    </>
  )
}

export default checkout