var TranslationStatusResult,__awaiter=this&&this.__awaiter||function(t,e,n,a){return new(n||(n=Promise))(function(r,i){function o(t){try{s(a.next(t))}catch(t){i(t)}}function u(t){try{s(a.throw(t))}catch(t){i(t)}}function s(t){t.done?r(t.value):new n(function(e){e(t.value)}).then(o,u)}s((a=a.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){var n,a,r,i,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,a&&(r=2&i[0]?a.return:i[0]?a.throw||((r=a.return)&&r.call(a),0):a.next)&&!(r=r.call(a,i[1])).done)return r;switch(a=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,a=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(r=(r=o.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){o=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){o.label=i[1];break}if(6===i[0]&&o.label<r[1]){o.label=r[1],r=i;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(i);break}r[2]&&o.ops.pop(),o.trys.pop();continue}i=e.call(t,o)}catch(t){i=[6,t],a=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},Translation=function(){return function(){this.Translations=[]}}(),TranslationValue=function(){return function(t,e){this.Language=t,this.Text=e}}(),Language=function(){function t(){}return Object.defineProperty(t.prototype,"Direction",{get:function(){return void 0===this._direction?"ltr":this._direction},set:function(t){this._direction=t},enumerable:!0,configurable:!0}),t}();!function(t){t[t.Ignored=1]="Ignored",t[t.Succeeded=2]="Succeeded",t[t.Failed=3]="Failed"}(TranslationStatusResult||(TranslationStatusResult={}));var TranslationStatus=function(){return function(t,e,n){this.Element=t,this.Result=e,this.Text=n}}(),CloudTranslation=function(){function t(){}return Object.defineProperty(t,"NonTranslatedElements",{get:function(){return["code","html","head","head > *"]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"StylePropertiesToSwitch",{get:function(){return["padding-left","padding-right","margin-left","margin-right","border-left-width","border-right-width"]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"StylePropertiesToOpposite",{get:function(){return["text-align","float","background-position-x"]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"TranslatorProviderKey",{get:function(){return this.ConfigurationData.Settings.TranslatorProviderKey},enumerable:!0,configurable:!0}),Object.defineProperty(t,"TranslatorProvider",{get:function(){return this.ConfigurationData.Settings.TranslatorProvider},enumerable:!0,configurable:!0}),Object.defineProperty(t,"UrlLanguageLocation",{get:function(){return this.ConfigurationData.Settings.UrlLanguageLocation},enumerable:!0,configurable:!0}),Object.defineProperty(t,"LogTranslationsFromProvider",{get:function(){return void 0!==this.ConfigurationData.Settings.LogTranslationsFromProvider&&this.ConfigurationData.Settings.LogTranslationsFromProvider},enumerable:!0,configurable:!0}),Object.defineProperty(t,"SupportsTranslateAttribute",{get:function(){return void 0!==this._supportsTranslateAttribute?this._supportsTranslateAttribute:this._supportsTranslateAttribute=void 0!==$("body")[0].translate},enumerable:!0,configurable:!0}),t.DoTranslateElement=function(t){if(this.SupportsTranslateAttribute)return!1!==t.translate&&(void 0===$(t).closest("*[translate]")[0]||!1!==$(t).closest("*[translate]")[0].translate);var e=$(t).attr("translate");return void 0===e?void 0===$(t).closest("*[translate]")[0]||"no"!==$(t).closest("*[translate]").attr("translate").toLowerCase():"no"!==e.toLowerCase()},Object.defineProperty(t,"ConfigurationData",{get:function(){return void 0!==t._configurationData?t._configurationData:(t._configurationData=JSON.parse($("#CloudTranslationConfig").html()),$("#CloudTranslationConfig").remove(),t._configurationData)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"DefaultLanguage",{get:function(){var t=this;return void 0!==this._defaultLanguage?this._defaultLanguage:(this.Languages.forEach(function(e){e.Code.toLowerCase()===t.ConfigurationData.Settings.DefaultLanguage.toLowerCase()&&(t._defaultLanguage=e)}),this._defaultLanguage)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"Languages",{get:function(){return void 0!==t._languages?t._languages:(t._languages=[],$.each(t.ConfigurationData.Languages,function(e,n){var a=new Language;a.Code=n.Code,a.DisplayName=n.DisplayName,a.Direction=n.Direction,t._languages.push(a)}),t._languages)},enumerable:!0,configurable:!0}),t.ParseLanguage=function(t){var e;return t=t.trim().toLowerCase(),this.Languages.forEach(function(n){n.Code.toLowerCase()===t&&(e=n)}),void 0!==e?e:(-1!==t.indexOf("-")&&this.Languages.forEach(function(n){n.Code.toLowerCase()===t.split("-")[0]&&(e=n)}),void 0!==e?e:this.DefaultLanguage)},Object.defineProperty(t,"Direction",{get:function(){return this.CurrentLanguage.Direction||"ltr"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"Translations",{get:function(){return void 0!==t._translations?t._translations:(t._translations=[],$.each(t.ConfigurationData.Translations,function(e,n){var a=new Translation;a.Default=new TranslationValue(t.DefaultLanguage.Code,n[t.DefaultLanguage.Code]);var r=t.CurrentLanguage.Code;void 0===n[r]&&(-1!==r.indexOf("-")&&(r=r.split("-")[0]),void 0===n[r])||(a.Translations.push(new TranslationValue(t.CurrentLanguage.Code,n[r])),t._translations.push(a))}),t._translations)},enumerable:!0,configurable:!0}),t.GetTranslation=function(e){if(this.CurrentLanguage.Code===this.DefaultLanguage.Code)return e;var n=null;return t.Translations.forEach(function(t){t.Default.Text.trim()===e.trim()&&(n=t)}),null!==n?(n.Translations.forEach(function(n){n.Language===t.CurrentLanguage.Code&&(e=e.replace(e.trim(),n.Text))}),e):void 0},t.TranslateElement=function(e){if(void 0===e)return[];if("rtl"===t.Direction){var n=e.style.cssText;if(void 0!==n){$(e).data("_ctoriginalstyle",n);for(var a="",r=0;r<e.style.length;r++){var i=e.style[r];-1!==t.StylePropertiesToOpposite.indexOf(i)?a+=t.OppositeRTLCSSValues(e,i):-1!==t.StylePropertiesToSwitch.indexOf(i)?a+=t.SwitchRTLCSSValues(e,i):a+=i+": "+e.style[i]+"; "}a!==n&&($(e).data("_ctoriginalstyle",n),e.style.cssText=a)}}else{var o=$(e).data("_ctoriginalstyle");""!==o&&($(e).attr("style",o),$(e).removeData("_ctoriginalstyle"))}if(!this.DoTranslateElement(e))return[];if("A"===e.tagName){var u=e.getAttribute("href");if(-1!==u.indexOf(":")&&("mailto"===(u=u.split(":")[0].toLowerCase())||"tel"===u))return e.setAttribute("dir","ltr"),[]}var s=[];try{s.push(t.TranslateElementText(e))}catch(t){}try{s.push(t.TranslateElementTitle(e))}catch(t){}return s},t.OnlyUnique=function(t,e,n){return n.indexOf(t)===e},t.TranslateElementText=function(e){var n=e.childNodes[0];if(void 0===n)return new TranslationStatus(e,TranslationStatusResult.Ignored);if(null===n.nodeValue)return new TranslationStatus(e,TranslationStatusResult.Ignored);if(""===n.nodeValue.trim())return new TranslationStatus(e,TranslationStatusResult.Ignored);var a=t.Translate(e,"_ctoriginaltext",n.nodeValue);switch(a.Result){case TranslationStatusResult.Succeeded:return n.nodeValue=a.Text,a;case TranslationStatusResult.Failed:return n.nodeValue=a.Text,a.Attribute="text",a;default:return a}},t.TranslateElementTitle=function(e){var n=t.Translate(e,"_ctoriginaltitle",e.title);switch(n.Result){case TranslationStatusResult.Succeeded:return e.title=n.Text,n;case TranslationStatusResult.Failed:return e.title=n.Text,n.Attribute="title",n;default:return n}},t.Translate=function(e,n,a){var r;if(void 0!==$(e).data(n)&&(r=$(e).data(n)),!(void 0!==r&&""!==r.trim()||null!==a&&""!==a.trim()))return new TranslationStatus(e,TranslationStatusResult.Ignored);void 0!==r&&""!==r.trim()||(r=a);var i=t.GetTranslation(r);return void 0===i?($(e).removeData(n),new TranslationStatus(e,TranslationStatusResult.Failed,r)):(i!==r?$(e).data(n,r):$(e).removeData(n),new TranslationStatus(e,TranslationStatusResult.Succeeded,i))},t.AddRTLCSS=function(){var e=document.createElement("style");e.type="text/css",e.innerHTML=t.GenerateRTLCSS(),document.getElementsByTagName("head")[0].appendChild(e)},t.GenerateRTLCSS=function(){var e='html[dir="rtl"] {direction: rtl;}';return $.each(document.styleSheets,function(n,a){try{e+=t.GetRulesStyle(a.cssRules||a.rules)}catch(t){}}),e},t.GetRulesStyle=function(e){var n="";return $.each(e,function(e,a){if(4===a.type){var r=void 0;try{r=t.GetRulesStyle(a.cssRules||a.rules)}catch(t){return}""!==r&&(n+="@media "+a.conditionText+"{",n+=r,n+="}")}if(void 0!==a.style){var i="";t.StylePropertiesToOpposite.forEach(function(e){i+=t.OppositeRTLCSSValues(a,e)}),t.StylePropertiesToSwitch.forEach(function(e){i+=t.SwitchRTLCSSValues(a,e)}),""!==i&&(n+="html[dir=rtl] "+a.selectorText+"{"+i+"}")}}),n},t.SwitchRTLCSSValues=function(t,e){var n=t.style[e];if(""===n)return"";var a="";return a+=(e=-1!==e.indexOf("left")?e.replace("left","right"):e.replace("right","left"))+": "+n+";"},t.OppositeRTLCSSValues=function(e,n){var a=e.style[n];if(""===a)return"";var r="";return"left"===a?r+=n+": right;":"right"===a?r+=n+": left;":t.CanBeNegative(a)&&(0===a.indexOf("-")?r+=n+": "+a.substr(1)+";":r+=n+": -"+a+";"),r},t.CanBeNegative=function(t){var e=!1;return["px","pt","pc","cm","mm","in","em","rem","vw","vh","ex","ch","vmin","vmax","%"].forEach(function(n){t.indexOf(n)>0&&-1===t.indexOf(" ")&&(e=!0)}),e},t.AzureAutoTranslate=function(t){return __awaiter(this,void 0,void 0,function(){var e,n,a,r,i=this;return __generator(this,function(o){switch(o.label){case 0:return 0===t.length?[2,[]]:(e="",t.forEach(function(t){e+='{"Text": "'+t+'"},'}),[4,$.ajax({url:"https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from="+this.DefaultLanguage.Code+"&to="+this.CurrentLanguage.Code,type:"POST",dataType:"json",data:"["+e+"]",cache:!0,beforeSend:function(t){t.setRequestHeader("Content-Type","application/json"),t.setRequestHeader("Ocp-Apim-Subscription-Key",i.TranslatorProviderKey)}})]);case 1:return n=o.sent(),a=[],r="",$.each(n,function(e,n){a[e]=n.translations[0].text,i.LogTranslationsFromProvider&&(r+='{"'+i.DefaultLanguage.Code+'": "'+t[e]+'", "'+i.CurrentLanguage.Code+'": "'+a[e]+'"},')}),this.LogTranslationsFromProvider&&console.log(r),[2,a]}})})},t.UpdateCurrentLanguage=function(){var t,e,n,a,r;(null!==(a=localStorage.getItem("lang"))&&(t=this.ParseLanguage(a)),void 0!==this.UrlLanguageLocation)&&("Subdirectory"===this.UrlLanguageLocation?r=window.location.pathname.split("/")[1]:-1!==this.UrlLanguageLocation.indexOf("QueryString")&&(r=-1!==this.UrlLanguageLocation.indexOf("{")?this.UrlLanguageLocation.split("{")[1].split("}")[0]:"lang",r=new URLSearchParams(window.location.search).get("urlValue")),void 0!==r&&(2===r.length||5===r.length&&2===r.indexOf("-"))&&(this.Languages.forEach(function(t){t.Code.toLowerCase()===r.toLowerCase()&&(a=t.Code)}),-1!==r.indexOf("-")&&void 0===a&&(r=r.split("-")[0],this.Languages.forEach(function(t){t.Code.toLowerCase()===r.toLowerCase()&&(a=t.Code)})),void 0!==a&&(e=this.ParseLanguage(a))));void 0!==(a=navigator.language||navigator.userLanguage)&&(n=this.ParseLanguage(a)),void 0!==e?this.SetCurrentLanguage(e.Code):void 0!==t?this.SetCurrentLanguage(t.Code):void 0!==n?this.SetCurrentLanguage(n.Code):this.SetCurrentLanguage(this.DefaultLanguage.Code)},Object.defineProperty(t,"CurrentLanguage",{get:function(){return void 0!==this._currentLanguage?this._currentLanguage:(this.UpdateCurrentLanguage(),this._currentLanguage)},enumerable:!0,configurable:!0}),t.UpdateUrlLanguage=function(){if(void 0!==this.UrlLanguageLocation)if("Subdirectory"===this.UrlLanguageLocation){var t=window.location.pathname.split("/"),e=t[1];2===e.length||5===e.length&&2===e.indexOf("-")?t[1]=this.CurrentLanguage.Code:t.splice(1,0,this.CurrentLanguage.Code),history.replaceState(null,null,t.join("/"))}else this.UrlLanguageLocation.indexOf("QueryString")},t.SetCurrentLanguage=function(t){this._currentLanguage=this.ParseLanguage(t),localStorage.setItem("lang",this._currentLanguage.Code),this.UpdateUrlLanguage()},t.TranslateDOM=function(){return __awaiter(this,void 0,void 0,function(){var e,n,a,r,i,o=this;return __generator(this,function(u){switch(u.label){case 0:return $("html").attr("lang",t.CurrentLanguage.Code),$("html").attr("dir",t.Direction),$.each(document.styleSheets,function(t,n){try{$.each(n.cssRules||n.rules,function(t,a){'html[dir="rtl"] { direction: rtl; }'===a.cssText&&(e=n)})}catch(t){}}),"rtl"===t.Direction&&void 0===e&&t.AddRTLCSS(),n="*",t.NonTranslatedElements.forEach(function(t){n+=':not("'+t+'")'}),a=[],[4,$(n).toArray().forEach(function(e){return __awaiter(o,void 0,void 0,function(){return __generator(this,function(n){try{t.TranslateElement(e).forEach(function(t){a.push(t)})}catch(t){}return[2]})})})];case 1:if(u.sent(),this.CurrentLanguage.Code===this.DefaultLanguage.Code)return[3,7];if(r=[],a.forEach(function(t){try{switch(t.Result){case TranslationStatusResult.Failed:r.push(t.Text.replace(/"/g,'\\"'))}}catch(t){}}),r=r.filter(this.OnlyUnique),"azure"!==this.TranslatorProvider.toLowerCase())return[3,5];u.label=2;case 2:return u.trys.push([2,4,,5]),[4,this.AzureAutoTranslate(r)];case 3:return i=u.sent(),$.each(i,function(e,n){try{var a=new Translation;a.Default=new TranslationValue(t.DefaultLanguage.Code,r[e]),a.Translations.push(new TranslationValue(t.CurrentLanguage.Code,n)),t._translations.push(a)}catch(t){}}),[3,5];case 4:return u.sent(),[3,5];case 5:return[4,a.forEach(function(e){return __awaiter(o,void 0,void 0,function(){var n,r,i,o;return __generator(this,function(u){switch(u.label){case 0:switch(e.Result){case TranslationStatusResult.Failed:return[3,1]}return[3,6];case 1:return"title"!==e.Attribute?[3,3]:(r=(n=a).push,[4,t.TranslateElementTitle(e.Element)]);case 2:return r.apply(n,[u.sent()]),[3,5];case 3:return o=(i=a).push,[4,t.TranslateElementText(e.Element)];case 4:o.apply(i,[u.sent()]),u.label=5;case 5:case 6:return[3,7];case 7:return[2]}})})})];case 6:u.sent(),u.label=7;case 7:return this._currentLanguage=void 0,this._translations=void 0,[2]}})})},t.FillInLanguages=function(){var e=$(".CloudTranslationSelection");if(0!==e.length){e.attr("translate","no"),e.html("");var n=this.CurrentLanguage.Code;t.Languages.forEach(function(t){$(".CloudTranslationSelection").append('<option value="'+t.Code+'"'+(t.Code===n?" selected ":"")+">"+t.DisplayName+"</option>")})}},t}();$(function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return CloudTranslation.UpdateCurrentLanguage(),CloudTranslation.FillInLanguages(),[4,CloudTranslation.TranslateDOM()];case 1:return t.sent(),[2]}})})}),$(document).on("change",".CloudTranslationSelection",function(){var t=$(this).val().toString();""!==t&&CloudTranslation.SetCurrentLanguage(t),CloudTranslation.TranslateDOM(),$("html, body, #Body, .Body").animate({scrollTop:0},"fast")});
//# sourceMappingURL=cloudtranslation-min.js.map
