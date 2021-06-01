import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            type="text/javascript"
            src="https://cdn1.stamped.io/files/widget.min.js"
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `//<![CDATA[ 
StampedFn.init({ apiKey: 'pubkey-KqC64avS5g436V0hyv17FiKXHr2432', storeUrl: 'mutt-couture.myshopify.com' }); 
// ]]`,
            }}
          />
          <link rel="stylesheet" href="https://use.typekit.net/sqd4kjb.css" />
        </Head>
        <body className="loading">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
