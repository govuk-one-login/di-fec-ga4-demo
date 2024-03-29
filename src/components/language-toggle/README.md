<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  
<h3 align="center">GOV UK One Login Language Toggle</h3>
  <p align="center">
    This package enables GOV UK LOGIN frontend Node.js applications to add a language toggle.
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

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

The GDS One Login Language toggle node package is a shared, reusable nunjuck component created to facilitate the integration of a language toggle.

The purpose of this component is to make it as easy as possible for the various pods that make up the One Login journey to configure and add a configurable language toggle.

The package is owned by the DI Frontend Capability team, part of the development of this tool involves ongoing discovery with the pods responsible for maintaining the frontend repositories that make up the One Login journey. As more information is collated, the package and documentation will be updated. As such, it is considered a WIP and the pods will be notified when a stable release is ready.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Installation

1. Install NPM package
   ```sh
   npm install one-login-language-toggle
   ```
2. Configure your node application's startup file (example: app.js or index.js) and add a new path view to your configureNunjucks viewspath parameter:

   ```js
   path.resolve("node_modules/one-login-language-toggle");
   ```

   [!WARNING] Check if the path to your node module folder is the correct one. [!WARNING]

3. Import this macro into your base nunjucks template:

   ```js
    {% from "language-toggle/macro.njk" import oneloginLanguageSelect %}
   ```

4. Add the nunjuck component where you need:

   ```js
   {
     {
       oneloginLanguageSelect({
         ariaLabel: "Choose a language",
         class: "",
         activeLanguage: htmlLang,
         languages: [
           {
             code: "en",
             text: "English",
              visuallyHidden: "Change to English"
           },
           {
             code: "cy",
             text: "Cymraeg",
             visuallyHidden: "Newid yr iaith ir Gymraeg"
           }
         ]
       });
     }
   }
   ```

5. Ensure the config view engine is set up

   ```js
   app.set(
     "view engine",
     configureNunjucks(app, [
       path.resolve("node_modules/one-login-language-toggle")
     ])
   );
   ```

6. Include the stylesheet from one-login-language-toggle/stylesheet/styles.css in your front-end application.

[!NOTE]

- `ariaLabel` is a brief description of the purpose of the navigation, omitting the term "navigation", as the screen reader will read both the role and the contents of the label.
- `activeLanguage` contains the language code of your i18next active language e.g 'en'
- `class` lets you add any css class to the nunjuck component.
- `languages` is an array of all the languages you support in your application.
- Language toggle to be placed above the back button.
  [!NOTE]

### Prerequisites

- Having set the local variable htmlLang in your app.js file or in a middleware function.
- Having define translation value for ariaLabel property.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
