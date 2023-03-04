import Document, { Html, Head, Main, NextScript, type DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="es" className="bg-white dark:bg-neutral-900 dark:text-white">
        <Head />
        {/* Must  */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Diccionario de jerga dominicana." />
        <meta
          name="keywords"
          content="dictionary, slang, dominican republic, dominican, culture, language"
        />

        {/* Twitter */}
        {/* The optimal size is 1200 x 630 (1.91:1 ratio). */}
        {/* <meta name="twitter:image" content="https://pinilo.com/og.png" />
				<meta name="twitter:card" content="summary_large_image" /> */}
        <meta name="twitter:site:domain" content="pinilo.xyz" />
        <meta name="twitter:url" content="https://pinilo.xyz" />
        {/* should be between 30-60 characters, with a maximum of 70 */}
        <meta name="twitter:title" content="Pinilo: Diccionario de jerga dominicana." />
        {/* should be between 55 and 200 characters long */}
        <meta name="twitter:description" content="Diccionario de jerga dominicana." />
        {/* <meta name="twitter:site" content="@pinilo" /> */}

        {/* OG - https://ogp.me/ */}
        {/* https://www.opengraph.xyz/ */}
        {/* should be between 30-60 characters, with a maximum of 90 */}
        <meta name="og:title" content="Pinilo: Diccionario de jerga dominicana." />
        <meta property="og:type" content="website" />
        <meta property="og:determiner" content="the" />
        <meta property="og:locale" content="es" />
        <meta property="og:locale:alternate" content="en" />
        {/* Make sure the important part of your description is within the first 110 characters, so it doesn't get cut off on mobile. */}
        <meta property="og:description" content="Diccionario de jerga dominicana." />
        <meta property="og:site_name" content="Pinilo" />
        <meta property="og:url" content="https://pinilo.xyz" />
        {/* The optimal size is 1200 x 630 (1.91:1 ratio). */}
        {/* <meta property="og:image" content="https://pinilo.xyz/og.png" />
				<meta property="og:image:type" content="image/png" />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta property="og:image:alt" content="" /> */}

        {/* PWA   */}
        {/* <link href="/manifest.json" rel="manifest" />
				<meta name="theme-color" content="#fafafa" /> */}

        <body className="bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
