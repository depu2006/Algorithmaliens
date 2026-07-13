import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
  const siteName = "AlgorithmAliens Pvt. Ltd.";
  const defaultTitle = "AlgorithmAliens Pvt. Ltd. | Engineering Innovation. Empowering Futures.";
  const defaultDesc = "AlgorithmAliens Pvt. Ltd. is a technology company specializing in software development, mobile applications, AI automation, training, internships, and ANX student innovation clubs.";
  
  const metaTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const metaDesc = description || defaultDesc;
  const metaKeywords = keywords || "algorithmaliens, software development, mobile apps, AI automation, coding clubs, ANX clubs, tech internships, coding course, hyderabad tech startup";

  return (
    <Helmet>
      {/* General Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="AlgorithmAliens Pvt. Ltd." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content="https://algorithmaliens.com/assets/og-banner.png" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content="https://algorithmaliens.com/assets/og-banner.png" />
      <meta name="twitter:site" content="@algorithmaliens" />
    </Helmet>
  );
};

export default SEO;
