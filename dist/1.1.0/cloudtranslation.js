var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Translations = (function () {
    function Translations() {
        this.Translation = [];
    }
    return Translations;
}());
var TranslationValue = (function () {
    function TranslationValue() {
    }
    return TranslationValue;
}());
var Language = (function () {
    function Language() {
    }
    Object.defineProperty(Language.prototype, "Direction", {
        get: function () {
            if (this._direction === undefined)
                return 'ltr';
            return this._direction;
        },
        set: function (value) {
            this._direction = value;
        },
        enumerable: true,
        configurable: true
    });
    return Language;
}());
var TranslationStatusResult;
(function (TranslationStatusResult) {
    TranslationStatusResult[TranslationStatusResult["Ignored"] = 1] = "Ignored";
    TranslationStatusResult[TranslationStatusResult["Succeeded"] = 2] = "Succeeded";
    TranslationStatusResult[TranslationStatusResult["Failed"] = 3] = "Failed";
})(TranslationStatusResult || (TranslationStatusResult = {}));
var TranslationStatus = (function () {
    function TranslationStatus(element, result, text) {
        this.Element = element;
        this.Result = result;
        this.Text = text;
    }
    return TranslationStatus;
}());
var CloudTranslation = (function () {
    function CloudTranslation() {
    }
    Object.defineProperty(CloudTranslation, "TranslationsList", {
        get: function () {
            if (this._translationsList === undefined)
                this._translationsList = [];
            return this._translationsList;
        },
        enumerable: true,
        configurable: true
    });
    CloudTranslation.AddTranslationValue = function (languageCode, defaultText, translatedText) {
        var translations = this.GetTranslations(languageCode);
        if (translations === undefined) {
            translations = new Translations();
            translations.LanguageCode = languageCode;
            this._translationsList.push(translations);
        }
        var translationValue = new TranslationValue();
        translationValue.Default = defaultText;
        translationValue.Text = translatedText;
        translations.Translation.push(translationValue);
    };
    CloudTranslation.GetTranslations = function (languageCode) {
        var t;
        this.TranslationsList.forEach(function (translations) {
            if (translations.LanguageCode === languageCode)
                t = translations;
        });
        return t;
    };
    Object.defineProperty(CloudTranslation, "NonTranslatedElements", {
        get: function () {
            return ['code', 'html', 'head', 'head > *'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudTranslation, "StylePropertiesToSwitch", {
        get: function () {
            return ['padding-left', 'padding-right', 'margin-left', 'margin-right', 'border-left-width', 'border-right-width'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudTranslation, "StylePropertiesToOpposite", {
        get: function () {
            return ['text-align', 'float', 'background-position-x'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudTranslation, "TranslatorProviderKey", {
        get: function () {
            return this.ConfigurationData.Settings.TranslatorProviderKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudTranslation, "TranslatorProvider", {
        get: function () {
            return this.ConfigurationData.Settings.TranslatorProvider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudTranslation, "UrlLanguageLocation", {
        get: function () {
            return this.ConfigurationData.Settings.UrlLanguageLocation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudTranslation, "LogTranslationsFromProvider", {
        get: function () {
            if (this.ConfigurationData.Settings.LogTranslationsFromProvider === undefined)
                return false;
            return this.ConfigurationData.Settings.LogTranslationsFromProvider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudTranslation, "SupportsTranslateAttribute", {
        get: function () {
            if (this._supportsTranslateAttribute !== undefined)
                return this._supportsTranslateAttribute;
            return this._supportsTranslateAttribute = $('body')[0].translate !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    CloudTranslation.DoTranslateElement = function (element) {
        if (this.SupportsTranslateAttribute) {
            if (element.translate === false || ($(element).closest('*[translate]')[0] !== undefined && $(element).closest('*[translate]')[0].translate === false))
                return false;
            else
                return true;
        }
        var attribute = $(element).attr('translate');
        if (attribute === undefined) {
            if ($(element).closest('*[translate]')[0] !== undefined && $(element).closest('*[translate]').attr('translate').toLowerCase() === 'no')
                return false;
            else
                return true;
        }
        if (attribute.toLowerCase() === 'no')
            return false;
        return true;
    };
    Object.defineProperty(CloudTranslation, "ConfigurationData", {
        get: function () {
            if (CloudTranslation._configurationData !== undefined)
                return CloudTranslation._configurationData;
            CloudTranslation._configurationData = JSON.parse($('#cloudtranslation-config').html());
            $('#cloudtranslation-config').remove();
            return CloudTranslation._configurationData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudTranslation, "DefaultLanguage", {
        get: function () {
            var _this = this;
            if (this._defaultLanguage !== undefined)
                return this._defaultLanguage;
            this.Languages.forEach(function (language) {
                if (language.Code.toLowerCase() === _this.ConfigurationData.Settings.DefaultLanguage.toLowerCase())
                    _this._defaultLanguage = language;
            });
            return this._defaultLanguage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudTranslation, "Languages", {
        get: function () {
            if (CloudTranslation._languages !== undefined)
                return CloudTranslation._languages;
            CloudTranslation._languages = [];
            $.each(CloudTranslation.ConfigurationData.Languages, function (key, value) {
                var language = new Language();
                language.Code = value.Code;
                language.DisplayName = value.DisplayName;
                language.Direction = value.Direction;
                CloudTranslation._languages.push(language);
            });
            return CloudTranslation._languages;
        },
        enumerable: true,
        configurable: true
    });
    CloudTranslation.ParseLanguage = function (requestLanguage) {
        requestLanguage = requestLanguage.trim().toLowerCase();
        var result;
        this.Languages.forEach(function (language) {
            if (language.Code.toLowerCase() === requestLanguage)
                result = language;
        });
        if (result !== undefined)
            return result;
        if (requestLanguage.indexOf('-') !== -1)
            this.Languages.forEach(function (language) {
                if (language.Code.toLowerCase() === requestLanguage.split('-')[0])
                    result = language;
            });
        if (result !== undefined)
            return result;
        return this.DefaultLanguage;
    };
    Object.defineProperty(CloudTranslation, "Direction", {
        get: function () {
            return this.CurrentLanguage.Direction || 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    CloudTranslation.Translations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var translations, jsonPath, fetchResponse, nullTranslations, data, _i, data_1, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        translations = this.GetTranslations(CloudTranslation.CurrentLanguage.Code);
                        if (translations !== undefined && translations.Translation === null)
                            return [2, undefined];
                        else if (translations !== undefined)
                            return [2, translations];
                        jsonPath = 'translation/' + this.CurrentLanguage.Code.toLowerCase() + '.json';
                        return [4, fetch(jsonPath)];
                    case 1:
                        fetchResponse = _a.sent();
                        if (!fetchResponse.ok) {
                            nullTranslations = new Translations();
                            nullTranslations.LanguageCode = CloudTranslation.CurrentLanguage.Code;
                            nullTranslations.Translation = null;
                            this._translationsList.push(nullTranslations);
                            return [2, undefined];
                        }
                        return [4, fetchResponse.json()];
                    case 2:
                        data = _a.sent();
                        for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                            value = data_1[_i];
                            this.AddTranslationValue(CloudTranslation.CurrentLanguage.Code, value['o'], value['t']);
                        }
                        return [2, this.GetTranslations(CloudTranslation.CurrentLanguage.Code)];
                }
            });
        });
    };
    ;
    CloudTranslation.GetTranslation = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var translation, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.CurrentLanguage.Code === this.DefaultLanguage.Code)
                            return [2, text];
                        translation = null;
                        return [4, CloudTranslation.Translations()];
                    case 1:
                        results = _a.sent();
                        if (results === undefined)
                            return [2, undefined];
                        results.Translation.forEach(function (t) {
                            if (t.Default.trim() === text.trim())
                                translation = t;
                        });
                        if (translation === null)
                            return [2, undefined];
                        return [2, translation.Text.replace(text.trim(), translation.Text)];
                }
            });
        });
    };
    CloudTranslation.TranslateElement = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            var style, rtlStyle, i, propertyName, originalStyle, elementHref, translationStatuses, status_1, e_1, status_2, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (element === undefined)
                            return [2, []];
                        if (CloudTranslation.Direction === 'rtl') {
                            style = element.style.cssText;
                            if (style !== undefined) {
                                $(element).data('_ctoriginalstyle', style);
                                rtlStyle = '';
                                for (i = 0; i < element.style.length; i++) {
                                    propertyName = element.style[i];
                                    if (CloudTranslation.StylePropertiesToOpposite.indexOf(propertyName) !== -1)
                                        rtlStyle += CloudTranslation.OppositeRTLCSSValues(element, propertyName);
                                    else if (CloudTranslation.StylePropertiesToSwitch.indexOf(propertyName) !== -1)
                                        rtlStyle += CloudTranslation.SwitchRTLCSSValues(element, propertyName);
                                    else
                                        rtlStyle += propertyName + ': ' + element.style[propertyName] + '; ';
                                }
                                if (rtlStyle !== style) {
                                    $(element).data('_ctoriginalstyle', style);
                                    element.style.cssText = rtlStyle;
                                }
                            }
                        }
                        else {
                            originalStyle = $(element).data('_ctoriginalstyle');
                            if (originalStyle !== '') {
                                $(element).attr('style', originalStyle);
                                $(element).removeData('_ctoriginalstyle');
                            }
                        }
                        if (!this.DoTranslateElement(element))
                            return [2, []];
                        if (element.tagName === 'A') {
                            elementHref = element.getAttribute('href');
                            if (elementHref.indexOf(':') !== -1) {
                                elementHref = elementHref.split(':')[0].toLowerCase();
                                if (elementHref === 'mailto' || elementHref === 'tel') {
                                    element.setAttribute('dir', 'ltr');
                                    return [2, []];
                                }
                            }
                        }
                        translationStatuses = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, CloudTranslation.TranslateElementText(element)];
                    case 2:
                        status_1 = _a.sent();
                        translationStatuses.push(status_1);
                        return [3, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3, 4];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4, CloudTranslation.TranslateElementTitle(element)];
                    case 5:
                        status_2 = _a.sent();
                        translationStatuses.push(status_2);
                        return [3, 7];
                    case 6:
                        e_2 = _a.sent();
                        return [3, 7];
                    case 7: return [2, translationStatuses];
                }
            });
        });
    };
    CloudTranslation.OnlyUnique = function (value, index, self) {
        return self.indexOf(value) === index;
    };
    CloudTranslation.TranslateElementText = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            var childNode, translationStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (element.tagName.toLowerCase() == 'script')
                            return [2, new TranslationStatus(element, TranslationStatusResult.Ignored)];
                        childNode = element.childNodes[0];
                        if (childNode === undefined)
                            return [2, new TranslationStatus(element, TranslationStatusResult.Ignored)];
                        if (childNode.nodeValue === null)
                            return [2, new TranslationStatus(element, TranslationStatusResult.Ignored)];
                        if (childNode.nodeValue.trim() === '')
                            return [2, new TranslationStatus(element, TranslationStatusResult.Ignored)];
                        return [4, CloudTranslation.Translate(element, '_ctoriginaltext', childNode.nodeValue)];
                    case 1:
                        translationStatus = _a.sent();
                        switch (translationStatus.Result) {
                            case TranslationStatusResult.Succeeded:
                                childNode.nodeValue = translationStatus.Text;
                                return [2, translationStatus];
                            case TranslationStatusResult.Failed:
                                childNode.nodeValue = translationStatus.Text;
                                translationStatus.Attribute = 'text';
                                return [2, translationStatus];
                            default:
                                return [2, translationStatus];
                        }
                        return [2];
                }
            });
        });
    };
    CloudTranslation.TranslateElementTitle = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            var translationStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, CloudTranslation.Translate(element, '_ctoriginaltitle', element.title)];
                    case 1:
                        translationStatus = _a.sent();
                        switch (translationStatus.Result) {
                            case TranslationStatusResult.Succeeded:
                                element.title = translationStatus.Text;
                                return [2, translationStatus];
                            case TranslationStatusResult.Failed:
                                element.title = translationStatus.Text;
                                translationStatus.Attribute = 'title';
                                return [2, translationStatus];
                            default:
                                return [2, translationStatus];
                        }
                        return [2];
                }
            });
        });
    };
    CloudTranslation.Translate = function (element, dataValueName, currentValue) {
        return __awaiter(this, void 0, void 0, function () {
            var originalText, translatedText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ($(element).data(dataValueName) !== undefined)
                            originalText = $(element).data(dataValueName);
                        if ((originalText === undefined || originalText.trim() === '') && (currentValue === null || currentValue.trim() === ''))
                            return [2, new TranslationStatus(element, TranslationStatusResult.Ignored)];
                        if (originalText === undefined || originalText.trim() === '')
                            originalText = currentValue;
                        return [4, CloudTranslation.GetTranslation(originalText)];
                    case 1:
                        translatedText = _a.sent();
                        if (translatedText === undefined) {
                            $(element).removeData(dataValueName);
                            return [2, new TranslationStatus(element, TranslationStatusResult.Failed, originalText)];
                        }
                        if (translatedText !== originalText)
                            $(element).data(dataValueName, originalText);
                        else
                            $(element).removeData(dataValueName);
                        return [2, new TranslationStatus(element, TranslationStatusResult.Succeeded, translatedText)];
                }
            });
        });
    };
    CloudTranslation.AddRTLCSS = function () {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = CloudTranslation.GenerateRTLCSS();
        document.getElementsByTagName('head')[0].appendChild(style);
    };
    CloudTranslation.GenerateRTLCSS = function () {
        var style = 'html[dir="rtl"] {direction: rtl;}';
        $.each(document.styleSheets, function (index, sheet) {
            try {
                style += CloudTranslation.GetRulesStyle(sheet['cssRules'] || sheet['rules']);
            }
            catch (e) { }
        });
        return style;
    };
    CloudTranslation.GetRulesStyle = function (rules) {
        var result = '';
        $.each(rules, function (index, rule) {
            if (rule.type === 4) {
                var mediaStyle = void 0;
                try {
                    mediaStyle = CloudTranslation.GetRulesStyle(rule['cssRules'] || rule['rules']);
                }
                catch (e) {
                    return;
                }
                if (mediaStyle !== '') {
                    result += '@media ' + rule.conditionText + '{';
                    result += mediaStyle;
                    result += '}';
                }
            }
            if (rule.style === undefined)
                return;
            var selectorStyle = '';
            CloudTranslation.StylePropertiesToOpposite.forEach(function (property) {
                selectorStyle += CloudTranslation.OppositeRTLCSSValues(rule, property);
            });
            CloudTranslation.StylePropertiesToSwitch.forEach(function (property) {
                selectorStyle += CloudTranslation.SwitchRTLCSSValues(rule, property);
            });
            if (selectorStyle !== '')
                result += 'html[dir=rtl] ' + rule.selectorText + '{' + selectorStyle + '}';
        });
        return result;
    };
    CloudTranslation.SwitchRTLCSSValues = function (rule, name) {
        var value = rule.style[name];
        if (value === '')
            return '';
        var style = '';
        if (name.indexOf('left') !== -1)
            name = name.replace('left', 'right');
        else
            name = name.replace('right', 'left');
        style += name + ': ' + value + ';';
        return style;
    };
    CloudTranslation.OppositeRTLCSSValues = function (rule, name) {
        var value = rule.style[name];
        if (value === '')
            return '';
        var style = '';
        if (value === 'left')
            style += name + ': right;';
        else if (value === 'right')
            style += name + ': left;';
        else if (CloudTranslation.CanBeNegative(value)) {
            if (value.indexOf('-') === 0)
                style += name + ': ' + value.substr(1) + ';';
            else
                style += name + ': -' + value + ';';
        }
        return style;
    };
    CloudTranslation.CanBeNegative = function (value) {
        var unites = ['px', 'pt', 'pc', 'cm', 'mm', 'in', 'em', 'rem', 'vw', 'vh', 'ex', 'ch', 'vmin', 'vmax', '%'];
        var isTrue = false;
        unites.forEach(function (unit) {
            if (value.indexOf(unit) > 0 && value.indexOf(' ') === -1)
                isTrue = true;
        });
        return isTrue;
    };
    CloudTranslation.AzureAutoTranslate = function (texts) {
        return __awaiter(this, void 0, void 0, function () {
            var bodyData, translatedTexts, data, jsonTranslations_1, e_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (texts.length === 0)
                            return [2, []];
                        bodyData = '';
                        texts.forEach(function (text) { bodyData += '{"Text": "' + text + '"},'; });
                        translatedTexts = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, $.ajax({
                                url: 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=' + this.DefaultLanguage.Code + '&to=' + this.CurrentLanguage.Code,
                                type: "POST",
                                dataType: 'json',
                                data: '[' + bodyData + ']',
                                cache: true,
                                beforeSend: function (xhrObj) {
                                    xhrObj.setRequestHeader("Content-Type", "application/json");
                                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", _this.TranslatorProviderKey);
                                },
                            })];
                    case 2:
                        data = _a.sent();
                        jsonTranslations_1 = [];
                        $.each(data, function (index, translations) {
                            translatedTexts[index] = translations.translations[0].text;
                            if (_this.LogTranslationsFromProvider)
                                jsonTranslations_1.push('{"o": "' + texts[index].trim() + '", "t": "' + translatedTexts[index].trim() + '"}');
                        });
                        if (this.LogTranslationsFromProvider)
                            console.log('[' + jsonTranslations_1.join(',') + ']');
                        return [3, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.log(e_3.responseJSON.error.message);
                        console.log(bodyData);
                        return [3, 4];
                    case 4: return [2, translatedTexts];
                }
            });
        });
    };
    CloudTranslation.UpdateCurrentLanguage = function () {
        var localStorageLanguage;
        var urlLanguage;
        var browserLanguage;
        var result;
        try {
            result = localStorage.getItem('lang');
        }
        catch (_a) {
            console.log('localStorage is not supported.');
            result = null;
        }
        if (result !== null)
            localStorageLanguage = this.ParseLanguage(result);
        if (this.UrlLanguageLocation !== undefined) {
            var urlValue_1;
            if (this.UrlLanguageLocation === 'Subdirectory')
                urlValue_1 = window.location.pathname.split('/')[1];
            if (urlValue_1 !== undefined)
                if (urlValue_1.length === 2 || (urlValue_1.length === 5 && urlValue_1.indexOf('-') === 2)) {
                    this.Languages.forEach(function (language) {
                        if (language.Code.toLowerCase() === urlValue_1.toLowerCase())
                            result = language.Code;
                    });
                    if (urlValue_1.indexOf('-') !== -1 && result === undefined) {
                        urlValue_1 = urlValue_1.split('-')[0];
                        this.Languages.forEach(function (language) {
                            if (language.Code.toLowerCase() === urlValue_1.toLowerCase())
                                result = language.Code;
                        });
                    }
                    if (result !== undefined)
                        urlLanguage = this.ParseLanguage(result);
                }
        }
        result = navigator['language'] || navigator['userLanguage'];
        if (result !== undefined)
            browserLanguage = this.ParseLanguage(result);
        if (urlLanguage !== undefined)
            this.SetCurrentLanguage(urlLanguage.Code);
        else if (localStorageLanguage !== undefined)
            this.SetCurrentLanguage(localStorageLanguage.Code);
        else if (browserLanguage !== undefined)
            this.SetCurrentLanguage(browserLanguage.Code);
        else
            this.SetCurrentLanguage(this.DefaultLanguage.Code);
    };
    Object.defineProperty(CloudTranslation, "CurrentLanguage", {
        get: function () {
            if (this._currentLanguage !== undefined)
                return this._currentLanguage;
            this.UpdateCurrentLanguage();
            return this._currentLanguage;
        },
        enumerable: true,
        configurable: true
    });
    CloudTranslation.UpdateUrlLanguage = function () {
        if (this.UrlLanguageLocation === undefined)
            return;
        if (this.UrlLanguageLocation === 'Subdirectory') {
            var pathnameSplitted = window.location.pathname.split('/');
            var currentLanguageCode = pathnameSplitted[1];
            if (currentLanguageCode.length === 2 || (currentLanguageCode.length === 5 && currentLanguageCode.indexOf('-') === 2))
                pathnameSplitted[1] = this.CurrentLanguage.Code;
            else
                pathnameSplitted.splice(1, 0, this.CurrentLanguage.Code);
            history.replaceState(null, null, pathnameSplitted.join('/'));
        }
    };
    CloudTranslation.SetCurrentLanguage = function (languageCode) {
        this._currentLanguage = this.ParseLanguage(languageCode);
        try {
            localStorage.setItem('lang', this._currentLanguage.Code);
        }
        catch (_a) {
            console.log('localStorage is not supported.');
        }
        this.UpdateUrlLanguage();
    };
    CloudTranslation.TranslateDOM = function () {
        return __awaiter(this, void 0, void 0, function () {
            var styleSheet, selection, translationStatuses, _i, _a, e, results, e_4, originalTexts_1, translatedTexts, e_5, _b, translationStatuses_1, status_3, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        $('html').attr('lang', CloudTranslation.CurrentLanguage.Code);
                        $('html').attr('dir', CloudTranslation.Direction);
                        $.each(document.styleSheets, function (index, sheet) {
                            try {
                                $.each(sheet['cssRules'] || sheet['rules'], function (ruleIndex, rule) {
                                    if (rule.cssText === 'html[dir="rtl"] { direction: rtl; }')
                                        styleSheet = sheet;
                                });
                            }
                            catch (e) { }
                        });
                        if (CloudTranslation.Direction === 'rtl' && styleSheet === undefined)
                            CloudTranslation.AddRTLCSS();
                        selection = '*';
                        CloudTranslation.NonTranslatedElements.forEach(function (element) {
                            selection += ':not(' + '"' + element + '"' + ')';
                        });
                        translationStatuses = [];
                        _i = 0, _a = $(selection).toArray();
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 6];
                        e = _a[_i];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 5]);
                        return [4, CloudTranslation.TranslateElement(e)];
                    case 3:
                        results = _d.sent();
                        results.forEach(function (status) {
                            translationStatuses.push(status);
                        });
                        return [3, 5];
                    case 4:
                        e_4 = _d.sent();
                        return [3, 5];
                    case 5:
                        _i++;
                        return [3, 1];
                    case 6:
                        ;
                        if (!(this.CurrentLanguage.Code !== this.DefaultLanguage.Code)) return [3, 20];
                        originalTexts_1 = [];
                        translationStatuses.forEach(function (status) {
                            try {
                                switch (status.Result) {
                                    case TranslationStatusResult.Failed:
                                        originalTexts_1.push(status.Text.replace(/"/g, '\\"'));
                                        break;
                                    default:
                                        break;
                                }
                            }
                            catch (e) { }
                        });
                        originalTexts_1 = originalTexts_1.filter(this.OnlyUnique);
                        if (!(this.TranslatorProvider.toLowerCase() === 'azure' && CloudTranslation.GetTranslations(CloudTranslation.CurrentLanguage.Code).Translation === null)) return [3, 10];
                        _d.label = 7;
                    case 7:
                        _d.trys.push([7, 9, , 10]);
                        return [4, this.AzureAutoTranslate(originalTexts_1)];
                    case 8:
                        translatedTexts = _d.sent();
                        $.each(translatedTexts, function (index, text) {
                            try {
                                CloudTranslation.AddTranslationValue(CloudTranslation.CurrentLanguage.Code, originalTexts_1[index], text);
                            }
                            catch (e) { }
                        });
                        return [3, 10];
                    case 9:
                        e_5 = _d.sent();
                        return [3, 10];
                    case 10:
                        _b = 0, translationStatuses_1 = translationStatuses;
                        _d.label = 11;
                    case 11:
                        if (!(_b < translationStatuses_1.length)) return [3, 19];
                        status_3 = translationStatuses_1[_b];
                        _c = status_3.Result;
                        switch (_c) {
                            case TranslationStatusResult.Failed: return [3, 12];
                        }
                        return [3, 17];
                    case 12:
                        if (!(status_3.Attribute === 'title')) return [3, 14];
                        return [4, CloudTranslation.TranslateElementTitle(status_3.Element)];
                    case 13:
                        _d.sent();
                        return [3, 16];
                    case 14: return [4, CloudTranslation.TranslateElementText(status_3.Element)];
                    case 15:
                        _d.sent();
                        _d.label = 16;
                    case 16: return [3, 18];
                    case 17: return [3, 18];
                    case 18:
                        _b++;
                        return [3, 11];
                    case 19:
                        ;
                        _d.label = 20;
                    case 20:
                        this._currentLanguage = undefined;
                        return [2];
                }
            });
        });
    };
    CloudTranslation.FillInLanguages = function () {
        var selection = $('.cloudtranslation-selection');
        if (selection.length === 0)
            return;
        selection.attr('translate', 'no');
        selection.html('');
        var currentLanguage = this.CurrentLanguage.Code;
        CloudTranslation.Languages.forEach(function (language) {
            $('.cloudtranslation-selection').append('<option value="' + language.Code + '"' + (language.Code === currentLanguage ? ' selected ' : '') + '>' + language.DisplayName + '</option>');
        });
    };
    return CloudTranslation;
}());
$(function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    CloudTranslation.UpdateCurrentLanguage();
                    CloudTranslation.FillInLanguages();
                    return [4, CloudTranslation.TranslateDOM()];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
});
$(document).on('change', '.cloudtranslation-selection', function () {
    return __awaiter(this, void 0, void 0, function () {
        var languageCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    languageCode = $(this).val().toString();
                    if (languageCode !== '')
                        CloudTranslation.SetCurrentLanguage(languageCode);
                    return [4, CloudTranslation.TranslateDOM()];
                case 1:
                    _a.sent();
                    $('html, body, #body, .body, #Body, .Body').animate({ scrollTop: 0 }, 'fast');
                    return [2];
            }
        });
    });
});
