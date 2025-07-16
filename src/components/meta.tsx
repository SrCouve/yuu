import Head from "next/head";

export const Meta = () => {
  const title = "Yumia";
  const description =
    "Yumia is a 3D AI that converses with people. Interact using only your browser, microphone, text input, and speech synthesis. Customize your character personality to create unique conversations.";
  const url = "https://yumia.xyz";
  const imageUrl = "https://yumia.xyz/og-image.png";

  return (
    <Head>
      {/* Page Title */}
      <title>{title}</title>

      {/* Basic SEO Meta Tags */}
      <meta name="description" content={description} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Optional: additional meta tags */}
      {/* <meta name="keywords" content="AI, 3D, Chat, VRM, Conversation" /> */}
      {/* <link rel="canonical" href={url} /> */}
    </Head>
  );
};
