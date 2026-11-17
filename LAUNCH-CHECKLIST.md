# OddHours launch checklist

Everything below is a placeholder to fill in. Search the project for the text in `code` to find each one.

## 1. Your domain
Buy a domain, then replace `YOUR-DOMAIN.com` with it in:
- `index.html` (canonical link, `og:url`, `og:image`, `twitter:image`)
- `robots.txt`
- `sitemap.xml`

Free hosting that works with this site as it is (just upload the folder): GitHub Pages, Netlify, Cloudflare Pages, Vercel.

## 2. Make the contact form send real messages
Until you do this, "Send it over" opens the visitor's email app instead.
1. Create a free form on a service such as Formspree, then copy its URL (for example `https://formspree.io/f/xxxxxxxx`).
2. Paste it into `CONFIG.formEndpoint` at the top of `script.js`.

## 3. WhatsApp chat button
Put your number into `CONFIG.whatsappNumber` at the top of `script.js`: country code plus number, digits only (for India, `91` then your 10-digit number, e.g. `919876543210`). Until then the button scrolls to the contact form.

## 4. Content placeholders
- `[X–Y days]`: typical turnaround for Basic, Standard and Premium (in the package cards and the FAQ).
- `[YOUR PAYMENT TERMS, ...]`: the "How does payment work?" FAQ answer.
- `[Project name]`, `[CATEGORY]`, `[YEAR]` and the image boxes in the Work section: replace with real projects, or remove the section until you have some.
- Logo and Branding prices: currently "Pricing on request" / "coming soon".

## 5. Already done
Favicon and home-screen icon, link-preview image (`og-image.png`), page title and description, social-share tags, search-engine data, `robots.txt`, `sitemap.xml`, privacy line next to the form, ₹ prices.
