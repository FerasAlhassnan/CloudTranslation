import { CloudTranslationSettings } from "./settings";
import { TranslatorProvider, UrlLanguageLocation, LanguageDirection, TranslationStatusResult } from "./enums";
import { Translations, Language, TranslationValue, TranslationStatus } from "./classes";

const cloudTranslation = (settings?: CloudTranslationSettings) => new CloudTranslation(settings);
export default cloudTranslation;

export class CloudTranslation{

    public constructor(settings: CloudTranslationSettings){
        
    CloudTranslation._settings = this.mergeSettings(settings);

        CloudTranslation.updateCurrentLanguage();
        CloudTranslation.fillInLanguages();
        CloudTranslation.translateDOM();

        $(document).on('change', '.cloudtranslation-selection', async function () {

            let languageCode = $(this).val().toString();

            if (languageCode !== '')
                CloudTranslation.setCurrentLanguage(languageCode);

            CloudTranslation.scrollToTop(200);
            await CloudTranslation.translateDOM();
        });
    }
    
    private mergeSettings(_settings: CloudTranslationSettings): CloudTranslationSettings {
        const settings : CloudTranslationSettings = {
            defaultLanguage: 'en',
            logTranslationsFromProvider: false,
            translatorProvider: TranslatorProvider.none ,
            translatorProviderKey: '',
            urlLanguageLocation: UrlLanguageLocation.none,

            languages: []
        };

        for (const attrname in _settings) 
        settings[attrname] = _settings[attrname];
        
        return settings;
    }

    // Private Variables

    private static _translationsList: Translations[];
    private static _defaultLanguage: Language;
    private static _currentLanguage: Language;
    private static _supportsTranslateAttribute;
    private static _settings : CloudTranslationSettings;

    private static get translationsList(): Translations[] {

        if (this._translationsList === undefined)
            this._translationsList = [];

        return this._translationsList;
    }

    private static addTranslationValue(languageCode: string, defaultText: string, translatedText: string): void {

        let translations = this.getTranslations(languageCode);

        if (translations === undefined) {
            translations = new Translations();
            translations.languageCode = languageCode;
            this._translationsList.push(translations);
        }

        let translationValue = new TranslationValue();
        translationValue.default = defaultText;
        translationValue.text = translatedText;

        translations.translation.push(translationValue)
    }

    private static getTranslations(languageCode: string): Translations {
        let t: Translations;

        this.translationsList.forEach((translations) => {
            
            if (translations.languageCode === languageCode)
                t = translations;
        });

        return t;
    }

    // Private Properties

    private static get nonTranslatedElements(): string[] {
        return ['code', 'html', 'head', 'head > *'];
    }

    private static get stylePropertiesToSwitch(): string[] {
        let properties = ['padding', 'margin'];
        let results = [];

        properties.forEach((property) =>{
            results.push(property + '-left');
            results.push(property + '-right');
        });

        return results;
    }

    private static get stylePropertiesToOpposite(): string[] {
        return ['text-align', 'justify-content', 'justify-self', 'float', 'background-position-x'];
    }

    private static get translatorProviderKey(): string {
        return this._settings.translatorProviderKey;
    }

    private static get translatorProvider(): TranslatorProvider {
        return this._settings.translatorProvider;
    }

    private static get urlLanguageLocation(): UrlLanguageLocation {
        return this._settings.urlLanguageLocation;
    }

    private static get logTranslationsFromProvider(): boolean {

        return this._settings.logTranslationsFromProvider;
    }

    private static get supportsTranslateAttribute() {

        if (this._supportsTranslateAttribute !== undefined)
            return this._supportsTranslateAttribute;

        return this._supportsTranslateAttribute = $('body')[0].translate !== undefined;
    }

    private static doTranslateElement(element: HTMLElement): boolean {

        if (this.supportsTranslateAttribute) {
            if (element.translate === false || ($(element).closest('*[translate]')[0] !== undefined && $(element).closest('*[translate]')[0].translate === false))
                return false;
            else return true;
        }

        let attribute = $(element).attr('translate');

        if (attribute === undefined) {
            if ($(element).closest('*[translate]')[0] !== undefined && $(element).closest('*[translate]').attr('translate').toLowerCase() === 'no')
                return false;
            else return true;
        }

        if (attribute.toLowerCase() === 'no')
            return false;

        return true;
    }

    // Public Properties

    static get defaultLanguage(): Language {

        if (this._defaultLanguage !== undefined)
            return this._defaultLanguage;

        this.languages.forEach((language) => {
            if (language.code.toLowerCase() === this._settings.defaultLanguage.toLowerCase())
                this._defaultLanguage = language;
        });

        return this._defaultLanguage;
    }

    static get languages(): Language[] {

        return this._settings.languages;
    }

    // Private Methods

    private static parseLanguage(requestLanguage: string): Language {

        requestLanguage = requestLanguage.trim().toLowerCase();

        let result: Language;

        this.languages.forEach((language) => {
            if (language.code.toLowerCase() === requestLanguage)
                result = language;
        });

        if (result !== undefined)
            return result;

        if (requestLanguage.indexOf('-') !== - 1)
            this.languages.forEach((language) => {

                if (language.code.toLowerCase() === requestLanguage.split('-')[0])
                    result = language;
            });

        if (result !== undefined)
            return result;

        return this.defaultLanguage;
    }

    static get direction(): LanguageDirection {

        return this.currentLanguage.direction;
    }

    private static async translations(): Promise<Translations> {

        let translations = this.getTranslations(CloudTranslation.currentLanguage.code);

        if (translations !== undefined && translations.translation === null)
            return undefined;
        else if (translations !== undefined)
            return translations;

        let jsonPath = 'translation/' + this.currentLanguage.code.toLowerCase() + '.json';

        let fetchResponse = await fetch(jsonPath);

        if (!fetchResponse.ok) {

                jsonPath = location.protocol + '//' + location.host +'/' + jsonPath;

                fetchResponse = await fetch(jsonPath);

                if (!fetchResponse.ok) {

                let nullTranslations = new Translations();
                nullTranslations.languageCode = CloudTranslation.currentLanguage.code;
                nullTranslations.translation = null;

                this._translationsList.push(nullTranslations);

                return undefined;
            }
        }

        const data = await fetchResponse.json();

        for (const value of data)
            this.addTranslationValue(CloudTranslation.currentLanguage.code, value['o'], value['t']);

        return this.getTranslations(CloudTranslation.currentLanguage.code);
    };

    private static async getTranslation(text: string): Promise<string> {

        if (this.currentLanguage.code === this.defaultLanguage.code)
            return text;

        var translation: TranslationValue = null;

        const results = await CloudTranslation.translations();

        if (results === undefined)
            return undefined;

        results.translation.forEach((t) => {

            if (t.default.trim() === text.trim())
                translation = t;
        })

        if (translation === null)
            return undefined;

        return translation.text.replace(text.trim(), translation.text);
    }

    static async translateElement(element: HTMLElement): Promise<TranslationStatus[]> {

        if (element === undefined)
            return [];

        if (CloudTranslation.direction === LanguageDirection.rtl) {
            let style = element.style.cssText;

            if (style !== undefined) {

                $(element).data('_ctoriginalstyle', style);

                let rtlStyle = '';

                for (let i = 0; i < element.style.length; i++) {
                    let propertyName = element.style[i];

                    if (CloudTranslation.stylePropertiesToOpposite.indexOf(propertyName) !== -1)
                        rtlStyle += CloudTranslation.oppositeRTLCSSValues(element, propertyName);
                    else if (CloudTranslation.stylePropertiesToSwitch.indexOf(propertyName) !== -1)
                        rtlStyle += CloudTranslation.switchRTLCSSValues(element, propertyName);
                    else rtlStyle += propertyName + ': ' + element.style[propertyName] + '; ';
                }

                if (rtlStyle !== style) {
                    $(element).data('_ctoriginalstyle', style);
                    element.style.cssText = rtlStyle;
                }
            }

        } else {
            let originalStyle = $(element).data('_ctoriginalstyle');

            if (originalStyle !== '') {
                $(element).attr('style', originalStyle);
                $(element).removeData('_ctoriginalstyle');
            }
        }

        // Ignore attribute: translate="no"

        if (!this.doTranslateElement(element))
            return [];

        // Ignore links with mailto: and tel:

        if (element.tagName === 'A') {

            let elementHref = element.getAttribute('href');
            if (elementHref.indexOf(':') !== -1) {
                elementHref = elementHref.split(':')[0].toLowerCase();

                if (elementHref === 'mailto' || elementHref === 'tel') {
                    element.setAttribute('dir', 'ltr');

                    return [];
                }
            }
        }

        // Proceed with the translation

        let translationStatuses: TranslationStatus[] = [];

        try {
            let status = await CloudTranslation.translateElementText(element);
            translationStatuses.push(status);
        } catch (e) { }

        try {
            let status = await CloudTranslation.translateElementTitle(element);
            translationStatuses.push(status);
        } catch (e) { }

        if (element.tagName === 'INPUT')
            try {
                let status = await CloudTranslation.translateElementPlaceholder(element as HTMLInputElement);
                translationStatuses.push(status);
            } catch (e) { }

        return translationStatuses;
    }

    private static onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    private static async translateElementText(element: HTMLElement): Promise<TranslationStatus> {

        if (element.tagName.toLowerCase() == 'script')
        return new TranslationStatus(element, TranslationStatusResult.ignored);
        
        let childNode = element.childNodes[0];

        if (childNode === undefined)
            return new TranslationStatus(element, TranslationStatusResult.ignored);

        if (childNode.nodeValue === null)
            return new TranslationStatus(element, TranslationStatusResult.ignored);

        if (childNode.nodeValue.trim() === '')
            return new TranslationStatus(element, TranslationStatusResult.ignored);

        let translationStatus = await CloudTranslation.translate(element, '_ctoriginaltext', childNode.nodeValue);

        switch (translationStatus.result) {

            case TranslationStatusResult.succeeded:
                childNode.nodeValue = translationStatus.text;
                return translationStatus;

            case TranslationStatusResult.failed:
                childNode.nodeValue = translationStatus.text;
                translationStatus.attribute = 'text';
                return translationStatus;

            default:
                return translationStatus;
        }
    }

    private static async translateElementTitle(element: HTMLElement): Promise<TranslationStatus> {

        let translationStatus = await CloudTranslation.translate(element, '_ctoriginaltitle', element.title);

        switch (translationStatus.result) {

            case TranslationStatusResult.succeeded:
                element.title = translationStatus.text;
                return translationStatus;

            case TranslationStatusResult.failed:
                element.title = translationStatus.text;
                translationStatus.attribute = 'title';
                return translationStatus;

            default:
                return translationStatus;
        }
    }

    private static async translateElementPlaceholder(element: HTMLInputElement): Promise<TranslationStatus> {

        let translationStatus = await CloudTranslation.translate(element, '_ctoriginalplaceholder', element.placeholder);

        switch (translationStatus.result) {

            case TranslationStatusResult.succeeded:
                element.placeholder = translationStatus.text;
                return translationStatus;

            case TranslationStatusResult.failed:
                element.placeholder = translationStatus.text;
                translationStatus.attribute = 'placeholder';
                return translationStatus;

            default:
                return translationStatus;
        }
    }

    private static async translate(element: HTMLElement, dataValueName: string, currentValue: string): Promise<TranslationStatus> {

        let originalText: string;

        if ($(element).data(dataValueName) !== undefined)
            originalText = $(element).data(dataValueName);

        if ((originalText === undefined || originalText.trim() === '') && (currentValue === null || currentValue.trim() === ''))
            return new TranslationStatus(element, TranslationStatusResult.ignored);

        if (originalText === undefined || originalText.trim() === '')
            originalText = currentValue;

        let translatedText = await CloudTranslation.getTranslation(originalText);

        if (translatedText === undefined) {

            $(element).removeData(dataValueName);

            return new TranslationStatus(element, TranslationStatusResult.failed, originalText);
        }

        if (translatedText !== originalText)
            $(element).data(dataValueName, originalText);
        else
            $(element).removeData(dataValueName);

        return new TranslationStatus(element, TranslationStatusResult.succeeded, translatedText);
    }

    private static addRTLCSS(): void {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = CloudTranslation.generateRTLCSS();
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    private static generateRTLCSS(): string {

        let style = 'html[dir="rtl"] {direction: rtl;}';

        $.each(document.styleSheets, function (index, sheet) {

            try {
                style += CloudTranslation.getRulesStyle(sheet['cssRules'] || sheet['rules']);
            } catch (e) { }
        });

        return style;
    }

    private static getRulesStyle(rules): string {

        let result = '';

        $.each(rules, function (index, rule) {

            if (rule.type === 4) {
                let mediaStyle;

                try {
                    mediaStyle = CloudTranslation.getRulesStyle(rule['cssRules'] || rule['rules']);
                } catch (e) { return; }

                if (mediaStyle !== '') {
                    result += '@media ' + rule.conditionText + '{';
                    result += mediaStyle;
                    result += '}';
                }
            }

            if (rule.style === undefined)
                return;

            let selectorStyle = '';

            CloudTranslation.stylePropertiesToOpposite.forEach((property) => {
                selectorStyle += CloudTranslation.oppositeRTLCSSValues(rule, property);
            });

            CloudTranslation.stylePropertiesToSwitch.forEach((property) => {
                selectorStyle += CloudTranslation.switchRTLCSSValues(rule, property);
            });

            // Insert Class

            if (selectorStyle !== '')
                result += 'html[dir=rtl] ' + rule.selectorText + '{' + selectorStyle + '}';

        });

        return result;
    }

    private static switchRTLCSSValues(rule, name: string): string {

        name = name.split('-')[0];
        
        const leftProperty = name + '-left';
        const rightProperty = name + '-right';
        let leftValue = rule.style[leftProperty];
        let rightValue = rule.style[rightProperty];

        if (leftValue === '' && rightValue === '')
            return '';

        if (leftValue === rightValue)
            return '';

        if (leftValue === '')
            leftValue = 'initial';

        if (rightValue === '')
            rightValue = 'initial';

        let style = leftProperty + ': ' + rightValue + ';' + rightProperty + ': ' + leftValue + ';';

        return style;
    }

    private static oppositeRTLCSSValues(rule, name: string): string {

        let value: string = rule.style[name];

        if (value === '')
            return '';

        let style = '';

        if (value === 'left')
            style += name + ': right;'
        else if (value === 'right')
            style += name + ': left;'
        else if (CloudTranslation.canBeNegative(value)) {

            if (value.indexOf('-') === 0)
                style += name + ': ' + value.substr(1) + ';'
            else
                style += name + ': -' + value + ';'
        }

        return style;
    }

    private static canBeNegative(value: string): boolean {
        let unites: string[] = ['px', 'pt', 'pc', 'cm', 'mm', 'in', 'em', 'rem', 'vw', 'vh', 'ex', 'ch', 'vmin', 'vmax', '%'];

        let isTrue = false;

        unites.forEach((unit) => {
            if (value.indexOf(unit) > 0 && value.indexOf(' ') === -1)
                isTrue = true;
        });

        return isTrue;
    }

    private static async azureAutoTranslate(texts: string[]): Promise<string[]> {

        if (texts.length === 0)
            return [];

        let bodyData = '';

        texts.forEach((text) => { bodyData += '{"Text": "' + text + '"},' });

        let translatedTexts: string[] = [];

        try {
            let data = await $.ajax({
                url: 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=' + this.defaultLanguage.code + '&to=' + this.currentLanguage.code,
                type: "POST",
                dataType: 'json',
                data: '[' + bodyData + ']',
                cache: true,

                beforeSend: (xhrObj) => {
                    xhrObj.setRequestHeader("Content-Type", "application/json");
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", this.translatorProviderKey);
                },
            });


            let jsonTranslations = [];

            $.each(data, (index, translations) => {
                translatedTexts[index] = translations.translations[0].text;

                if (this.logTranslationsFromProvider)
                    jsonTranslations.push('{"o": "' + texts[index].trim() + '", "t": "' + translatedTexts[index].trim() + '"}');
            });


            if (this.logTranslationsFromProvider)
                console.log('[' + jsonTranslations.join(',') + ']');

        } catch (e) {
            console.log(e.responseJSON.error.message);
            console.log(bodyData);
        }

        return translatedTexts;
    }

    private static scrollToTop(scrollDuration: number): void {

        const scrollTo = 0;
                
        // Declarations
    
        let cosParameter = (window.pageYOffset - scrollTo) / 2,
            scrollCount = 0,
            oldTimestamp = window.performance.now();
    
        function step(newTimestamp: number): void {
    
            let tsDiff = newTimestamp - oldTimestamp;
    
            // Performance.now() polyfill loads late so passed-in timestamp is a larger offset
            // on the first go-through than we want so I'm adjusting the difference down here.
            // Regardless, we would rather have a slightly slower animation than a big jump so a good
            // safeguard, even if we're not using the polyfill.
    
            if (tsDiff > 100)
                tsDiff = 30;
    
            scrollCount += Math.PI / (scrollDuration / tsDiff);
    
            // As soon as we cross over Pi, we're about where we need to be
    
            if (scrollCount >= Math.PI)
                return;
    
            const moveStep = Math.round(scrollTo + cosParameter + cosParameter * Math.cos(scrollCount));
            window.scrollTo(0, moveStep);
            oldTimestamp = newTimestamp;
            window.requestAnimationFrame(step);
        }
    
        window.requestAnimationFrame(step);
    }

    // Public Methods

    static updateCurrentLanguage(): void {
        let localStorageLanguage: Language;
        let urlLanguage: Language;
        let browserLanguage: Language;

        let result: string;

        // Local Storage
        try {
            result = localStorage.getItem('lang');
        } catch{
            console.log('localStorage is not supported.');
            result = null;
        }

        if (result !== null)
            localStorageLanguage = this.parseLanguage(result);

        // URL

        if (this.urlLanguageLocation !== undefined) {

            let urlValue: string;

            if (this.urlLanguageLocation === UrlLanguageLocation.subdirectory)
                urlValue = window.location.pathname.split('/')[1];

            if (urlValue !== undefined)
                if (urlValue.length === 2 || (urlValue.length === 5 && urlValue.indexOf('-') === 2)) {

                    this.languages.forEach((language) => {
                        if (language.code.toLowerCase() === urlValue.toLowerCase())
                            result = language.code;
                    });

                    if (urlValue.indexOf('-') !== -1 && result === undefined) {

                        urlValue = urlValue.split('-')[0];

                        this.languages.forEach((language) => {
                            if (language.code.toLowerCase() === urlValue.toLowerCase())
                                result = language.code;
                        });
                    }

                    if (result !== undefined)
                        urlLanguage = this.parseLanguage(result);
                }
        }

        // Browser

        result = navigator['language'] || navigator['userLanguage'];

        if (result !== undefined)
            browserLanguage = this.parseLanguage(result);

        // Consolidation

        if (urlLanguage !== undefined)
            this.setCurrentLanguage(urlLanguage.code);

        else if (localStorageLanguage !== undefined)
            this.setCurrentLanguage(localStorageLanguage.code);

        else if (browserLanguage !== undefined)
            this.setCurrentLanguage(browserLanguage.code);

        else this.setCurrentLanguage(this.defaultLanguage.code);
    }

    static get currentLanguage(): Language {

        if (this._currentLanguage !== undefined)
            return this._currentLanguage;

        this.updateCurrentLanguage();
        return this._currentLanguage;
    }

    private static updateUrlLanguage(): void {

        if (this.urlLanguageLocation === undefined)
            return;

        if (this.urlLanguageLocation === UrlLanguageLocation.subdirectory) {
            let pathnameSplitted = window.location.pathname.split('/');

            let currentLanguageCode = pathnameSplitted[1];

            if (currentLanguageCode.length === 2 || (currentLanguageCode.length === 5 && currentLanguageCode.indexOf('-') === 2))
                pathnameSplitted[1] = this.currentLanguage.code;
            else pathnameSplitted.splice(1, 0, this.currentLanguage.code);

            history.replaceState(null, null, pathnameSplitted.join('/'));
        }
    }

    static setCurrentLanguage(languageCode: string): void {
        this._currentLanguage = this.parseLanguage(languageCode);

        try {
            localStorage.setItem('lang', this._currentLanguage.code);
        } catch{
            console.log('localStorage is not supported.');
        }
        this.updateUrlLanguage();
    }

    static async translateDOM(): Promise<void> {

        $('html').attr('lang', CloudTranslation.currentLanguage.code);

        if (CloudTranslation.direction === LanguageDirection.rtl)
            $('html').attr('dir', 'rtl');
        else $('html').removeAttr('dir');

        let styleSheet: StyleSheet;

        $.each(document.styleSheets, function (index, sheet) {
            try {
                $.each(sheet['cssRules'] || sheet['rules'], function (ruleIndex, rule) {

                    if (rule.cssText === 'html[dir="rtl"] { direction: rtl; }')
                        styleSheet = sheet;
                });
            } catch (e) { }
        });

        if (CloudTranslation.direction === LanguageDirection.rtl && styleSheet === undefined)
            CloudTranslation.addRTLCSS();

        var selection = '*';
        CloudTranslation.nonTranslatedElements.forEach((element) => {
            selection += ':not(' + '"' + element + '"' + ')'
        });

        let translationStatuses: TranslationStatus[] = [];

        for (const e of $(selection).toArray()) {
            try {

                const results = await CloudTranslation.translateElement(e);

                results.forEach((status) => {
                    translationStatuses.push(status);
                });
            } catch (e) { }
        };

        if (this.currentLanguage.code !== this.defaultLanguage.code) {

            let originalTexts: string[] = [];

            translationStatuses.forEach((status) => {

                try {
                    switch (status.result) {

                        case TranslationStatusResult.failed:

                            originalTexts.push(status.text.replace(/"/g, '\\"'))
                            break;

                        default:
                            break;
                    }
                } catch (e) { }
            });

            originalTexts = originalTexts.filter(this.onlyUnique);

            if (this.translatorProvider === 1) {
                try {
                    let translatedTexts = await this.azureAutoTranslate(originalTexts);

                    let translations = this.getTranslations(CloudTranslation.currentLanguage.code).translation;

                    if (translations === null)
                        this.getTranslations(CloudTranslation.currentLanguage.code).translation = [];

                    $.each(translatedTexts, (index, text) => {

                        try {
                            CloudTranslation.addTranslationValue(CloudTranslation.currentLanguage.code, originalTexts[index], text);
                        } catch (e) { }
                    });
                } catch (e) { console.log(e); }
            }

            for (const status of translationStatuses) {

                switch (status.result) {

                    case TranslationStatusResult.failed:

                        if (status.attribute === 'title')
                            await CloudTranslation.translateElementTitle(status.element);
                        else
                            await CloudTranslation.translateElementText(status.element);
                        break;

                    default:
                        break;
                }
            };

        }

        this._currentLanguage = undefined;
    }

    static fillInLanguages(): void {

        let selection = $('.cloudtranslation-selection');

        if (selection.length === 0)
            return;

        selection.attr('translate', 'no');

        selection.html('');

        let currentLanguage: string = this.currentLanguage.code;

        CloudTranslation.languages.forEach((language) => {
            $('.cloudtranslation-selection').append('<option value="' + language.code + '"' + (language.code === currentLanguage ? ' selected ' : '') + '>' + language.displayName + '</option>')
        });
    }
}