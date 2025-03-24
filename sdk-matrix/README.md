# SDK Matrix Component

A React component that displays code examples across different languages and frameworks with syntax highlighting.

## Overview

The SDK Matrix component is designed to be embedded in Webflow. It showcases code examples with beautiful syntax highlighting powered by Prism.

## Development

### Setup

1. Clone the repository and navigate to the component directory:
```bash
cd sdk-matrix
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```ini
VITE_ASSETS_BASE_URL=https://assets.wristband.dev/corp-site/webflow/components/sdk-matrix
```

### Local Development

Run the development server:
```bash
npm run dev
```

This will start a local development server at `http://localhost:3000` with hot module reloading.

### Build Process

#### Version Management

The component uses the version from `package.json` to determine the build output path. Update the version before building a new release:
```bash
npm version patch  # Increments version from 1.0.0 to 1.0.1
npm version minor  # Increments version from 1.0.0 to 1.1.0
npm version major  # Increments version from 1.0.0 to 2.0.0
```

#### Building for Production

Build the component for production:
```bash
npm run build
```

This creates a `dist` directory containing:

- `wristband-sdk-matrix.js` - Main entry point
- `assets/` directory containing:
  - `vendor.js` - Vendor dependencies (MUI, Emotion, Prism)
  - `vendor.css` - Vendor styles
  - Image assets (SVG, WebP, etc.)

#### Build Configuration

The build is configured to:

- Externalize React and ReactDOM (they're loaded separately in Webflow)
- Bundle third-party dependencies into a vendor chunk for better caching
- Apply the correct base URL for assets based on your environment variables and version


### Previewing the Production Build

You can preview how the component will appear before deploying it to Webflow by using the `preview.html` file. This file serves as a lightweight structure that embeds the component within a `<div>` block, allowing you to accurately visualize the final implementation on your local machine.

After building the component for production, run the following:
```bash
npm run preview
```

In the browser, open `http://localhost:3000/preview.html` to see the component.

> [!WARNING]
> Make sure NOT to bump the packge.json version for this component yet if you haven't already dpeloyed the assets to AWS S3 first. Otherwise, the image assets won't load in the browser since it will be pointing to the wrong location.


### Deployment

#### Manual Deployment to S3

1. Build the component as described above
2. Upload the contents of the `dist` directory to your S3 bucket, maintaining the directory structure:
```bash
aws s3 cp dist/ s3://<bucket_path>/[version]/ --recursive
```
For example:
```bash
aws s3 cp dist/ s3://assets.wristband.dev/corp-site/webflow/components/sdk-matrix/1.0.0/ --recursive
```
3. Make sure your CloudFront distribution is configured to serve these files with appropriate CORS settings

### Webflow Integration

#### Adding the Component to Webflow

In Webflow, navigate to the page where you want to embed the React component. Click the gear icon on that page.

Add the following to the page's `<head>` section:

```html
<!-- React dependencies (externalized) -->
<script defer src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
<script defer src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
```

Next, add the following to the page's `Before </body> tag` section:
```html
<!-- SDK Matrix component -->
<script defer src="https://assets.wristband.dev/corp-site/webflow/components/sdk-matrix/1.0.0/wristband-sdk-matrix.js"></script>
```

Then, add a mounting point where you want the component to appear (usually a `<div>` block):
```html
<div id="wristband-sdk-matrix"></div>
```

### Previewing the component in Webflow

In order to preview the component in Webflow, you will need to publish to your Webflow Staging domain. Using Webflow's Design Editor to preview the component doesn't work out of the box due to Webflow's restrictions.

### Understanding the Build Output

The build produces multiple files in the `dist/` folder:

1. **wristband-sdk-matrix.js**: The main entry point for your component (~68KB gzip)
2. **Asset files**: SVG and WebP images used by the component (~9KB gzip per image, on average)

### Troubleshooting

#### Images Not Loading

If images aren't loading, check that:

- The base URL in your environment variables is correct
- You've uploaded all files to S3 maintaining the directory structure
- Your CloudFront distribution is properly configured, including CORS headers

#### React Version Issues

Make sure the React version used for development matches the version loaded in Webflow (18.3.1).
