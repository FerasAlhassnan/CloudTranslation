# [Cloud Translation](https://angrymonkeycloud.com/translation)

A JavaScript library to translate HTML content into multiple languages.

# Contribution

For TypeScript compilation please install Cloud Mate from npm

```batch
npm i -g cloudmate
```

To generate testing JavaScript file and keep watching for changes run the below:

```batch
cloudmate -w
```

When you're done, pleae update the version under package.json and run the following for generating distribution files:

```batch
cloudmate dist
```

Check out <https://angrymonkeycloud.com/translation> for more information.

# Implementation

## Requirements

jQuery 2.x or 3.x: [jQuery CDN](https://code.jquery.com/), [download jQuery](https://jquery.com/download/).

## Cloud Translation Files

### Download

Cloud Translation JavaScript files: [Uncompressed](https://cdn.amcapi.com/translation/1.2.2/cloudtranslation.js), [Compressed](https://cdn.amcapi.com/translation/1.2.2/cloudtranslation.min.js).

### CDN

Cloud Translation JavaScript Compressed

```html
<script
  src="https://cdn.amcapi.com/translation/1.2.2/cloudtranslation.min.js"
  crossorigin="anonymous"
></script>
```

## Initialization

Initialize Cloud Translation as follows:

```js
cloudTranslation({
  defaultLanguage: "en", // optional | The main language used.
  urlLanguageLocation: UrlLanguageLocation.none, // optional | To append language in the url (ex: www.website.com/en/).
  translatorProvider: TranslatorProvider.none, // optional | Translate text using a translator provider.
  translatorProviderKey: "", // optional | The translator provider key.
  logTranslationsFromProvider: false, // optional | Set to true to log the translation output in the console.
  languages: [
    {
      code: "en",
      displayName: "English"
    },
    {
      code: "es",
      displayName: "Spanish"
    },
    {
      code: "fr",
      displayName: "Français"
    },
    {
      code: "fr-ca",
      displayName: "Français (Canada)"
    },
    {
      code: "ar",
      displayName: "العربية",
      direction: LanguageDirection.rtl
    }
  ]
});
```

## Predefined Languages

Add predefined languages as json files under 'translation' directory. each language code should have its own file named: languageCode.json.

o: Original text.

t: Translated text.

```json
[
  {
    "o": "Logo",
    "t": "شعار"
  },
  {
    "o": "Welcome",
    "t": "اهلا وسهلا"
  },
  {
    "o": "Home",
    "t": "الصفحة الرئيسية"
  }
]
```

## Languages Select (Optional)

You can add an empty select into your website having the class "cloudtranslation-selection", which will be filled in with the predefined languages automatically.

```html
<select class="cloudtranslation-selection"></select>
```

## Prevent Text Translation

Specify HTML attribute translate="no" to prevent the translation of inside text, check out more on [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/translate)
