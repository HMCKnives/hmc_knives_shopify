# HMC Knives Shopify Theme

Custom Shopify theme for [hmcknives.com](https://hmcknives.com), based on Dawn 15.5 with HMC-branded sections that faithfully recreate the WordPress storefront.

## Getting started

1. Create or open a Shopify development store.
2. Push this theme with Shopify CLI:

```bash
shopify theme push --path .
# or for local preview:
shopify theme dev --path .
```

3. In **Online Store → Themes → Customize**, assign page templates:
   - About Me → `page.about` (optional; `/pages/about-me` also uses the About layout on the default page template)
   - Media → `page.media` (optional; `/pages/media` also uses the media layout on the default page template)
   - Knife Spa/Warranty → `page.warranty`
   - Contact Us → `page.contact`
   - Newsletter / Drop Alerts → `page.newsletter`
   - Knife Spa product → `product.spa`

4. Upload the HMC logo in Theme settings, set social links, and fill homepage section images (hero, value props, CTAs).
5. **Media page** (`/pages/media`):
   - Upload the top photo in **Theme settings → HMC Brand → Media page hero image** (leave blank to use the default photo).
   - Add a page metafield named **gallery** (`custom.gallery`, list of files/images) on the Media page. Until images are uploaded, placeholder tiles are shown.
6. **About Me page:** edit the body copy in **Online Store → Pages → About Me**. The theme reads that page content for the bio column.

## Key custom sections

| Section | Use |
|---------|-----|
| `hmc-hero` | Homepage drop hero (image, overlay opacity, CTA) |
| `hmc-icon-cards` | “New Here?” cards |
| `hmc-value-props` | “What you get” band |
| `hmc-about-split` | Homepage maker story (circular portrait) |
| `hmc-about-page` | About Me page (bio + photo collage) |
| `hmc-testimonials` / `hmc-reviews` / `hmc-faq` | Social proof + FAQ |
| `hmc-image-cta` | Shop / BTS CTAs |
| `hmc-newsletter-band` | Drop alert signup |
| `hmc-collection-grid` | Collection product grid |
| `hmc-product` | Product PDP (+ notes field for spa) |
| `hmc-footer` | Dark footer (links, contact, Made in USA) |

All homepage copy, images, overlays, and spacing are editable in the theme editor.

## Out of scope (later)

- WooCommerce product/customer import
- Klaviyo / drop-alert app wiring
- Domain cutover and URL redirects

## License

Dawn base theme: MIT (Shopify). HMC customizations for Hellion Machine Collective / HMC Knives.
