<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  
<h3 align="center">GOV UK One Login Common Headers</h3>
  <p align="center">
    This package enables GOV UK LOGIN frontend Node.js applications to add one login common headers.
    <br />
    <a href=""><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/govuk-one-login/di-fec-ga4-demo">View Demo</a>
    ·
    <a href="https://github.com/govuk-one-login/di-fec-ga4-demo/issues">Report Bug</a>
    ·
    <a href="https://github.com/govuk-one-login/di-fec-ga4-demo/issues">Request Feature</a>
  </p>
</div>

## About The Project

The GDS One Login Language toggle node package is a shared, reusable middleware function to add common headers to the request..

The purpose of this component is to make it as easy as possible for the various pods that make up the One Login journey to add common headers.

The package is owned by the DI Frontend Capability team, part of the development of this tool involves ongoing discovery with the pods responsible for maintaining the frontend repositories that make up the One Login journey. As more information is collated, the package and documentation will be updated. As such, it is considered a WIP and the pods will be notified when a stable release is ready.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Installation

1. Install NPM package
   ```sh
   npm install one-login-common-headers
   ```

2. Import middleware function
   ```js
   const commonHeader = require("@govuk-one-login/one-login-common-headers");
   ```

3. Configure your node application's startup file (example: app.js or index.js) and add a new middleware functions to your router:
   ```js
   router.use(commonHeader.txmaAuditEncoded);
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>