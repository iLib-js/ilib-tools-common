/*
 * testUtils.js - test the utility functions
 *
 * Copyright © 2022 JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    formatPath,
    getLocaleFromPath,
    cleanString,
    isEmpty,
    makeDirs,
    containsActualText,
    objectMap
} from "../src/utils.js";

export const testUtils = {
    testUtilsIsEmpty: function(test) {
        test.expect(1);

        test.ok(isEmpty({}));

        test.done();
    },

    testUtilsIsEmptyNot: function(test) {
        test.expect(1);

        test.ok(!isEmpty({a: "a"}));

        test.done();
    },

    testUtilsIsEmptyUndefined: function(test) {
        test.expect(1);

        test.ok(isEmpty());

        test.done();
    },

    testUtilsIsEmptyNull: function(test) {
        test.expect(1);

        test.ok(isEmpty(null));

        test.done();
    },

    testUtilsIsEmptyNumber: function(test) {
        test.expect(1);

        test.ok(isEmpty(2));

        test.done();
    },

    testUtilsIsEmptyArray: function(test) {
        test.expect(1);

        test.ok(!isEmpty(["a", "b"]));

        test.done();
    },

    testUtilsIsEmptyArray2: function(test) {
        test.expect(1);

        test.ok(isEmpty([]));

        test.done();
    },

    testUtilsCleanString: function(test) {
        test.expect(1);

        test.equals(cleanString(' \n \t \\    &quot;a    b&apos;s &lt;b&gt;&amp; c’s     '), "\"a b's <b>& c's");

        test.done();
    },

    testUtilsCleanStringBadInput: function(test) {
        test.expect(6);

        test.equals(cleanString(''), '');
        test.ok(!cleanString(null));
        test.ok(!cleanString(undefined));
        test.ok(!cleanString(345));
        test.ok(!cleanString(true));
        test.ok(!cleanString({'obj': 'foo'}));

        test.done();
    },

    testGetLocalizedPathLocaleDir: function(test) {
        test.expect(1);

        test.equals(formatPath('resources/[localeDir]/strings.json', {
            sourcepath: "x/y/strings.json",
            locale: "de-DE"
        }), "resources/de/DE/strings.json");

        test.done();
    },

    testGetLocalizedPathDir: function(test) {
        test.expect(1);

        test.equals(formatPath('[dir]/[localeDir]/strings.json', {
            sourcepath: "x/y/strings.json",
            locale: "de-DE"
        }), "x/y/de/DE/strings.json");

        test.done();
    },

    testGetLocalizedPathBasename: function(test) {
        test.expect(1);

        test.equals(formatPath('[localeDir]/tr-[basename].j', {
            sourcepath: "x/y/strings.json",
            locale: "de-DE"
        }), "de/DE/tr-strings.j");

        test.done();
    },

    testGetLocalizedPathBasenameAlternateExtension: function(test) {
        test.expect(1);

        test.equals(formatPath('[localeDir]/tr-[basename].j', {
            sourcepath: "x/y/strings.md",
            locale: "de-DE"
        }), "de/DE/tr-strings.j");

        test.done();
    },

    testGetLocalizedPathFilename: function(test) {
        test.expect(1);

        test.equals(formatPath('[localeDir]/tr-[filename]', {
            sourcepath: "x/y/strings.json",
            locale: "de-DE"
        }), "de/DE/tr-strings.json");

        test.done();
    },

    testGetLocalizedPathExtension: function(test) {
        test.expect(1);

        test.equals(formatPath('[localeDir]/tr-foobar.[extension]', {
            sourcepath: "x/y/strings.jsn",
            locale: "de-DE"
        }), "de/DE/tr-foobar.jsn");

        test.done();
    },

    testGetLocalizedPathExtensionNotThere: function(test) {
        test.expect(1);

        test.equals(formatPath('[localeDir]/tr-foobar.[extension]', {
            sourcepath: "x/y/strings",
            locale: "de-DE"
        }), "de/DE/tr-foobar.");

        test.done();
    },

    testGetLocalizedPathLocale: function(test) {
        test.expect(1);

        test.equals(formatPath('[dir]/[locale]/strings.json', {
            sourcepath: "x/y/strings.json",
            locale: "de-DE"
        }), "x/y/de-DE/strings.json");

        test.done();
    },

    testGetLocalizedPathLanguage: function(test) {
        test.expect(1);

        test.equals(formatPath('[dir]/[language]/strings.json', {
            sourcepath: "x/y/strings.json",
            locale: "de-DE"
        }), "x/y/de/strings.json");

        test.done();
    },

    testGetLocalizedPathLanguageNotThere: function(test) {
        test.expect(1);

        test.equals(formatPath('[dir]/[language]/strings.json', {
            sourcepath: "x/y/strings.json",
            locale: "DE"
        }), "x/y/strings.json");

        test.done();
    },

    testGetLocalizedPathRegion: function(test) {
        test.expect(1);

        test.equals(formatPath('[dir]/[region]/strings.json', {
            sourcepath: "x/y/strings.json",
            locale: "de-DE"
        }), "x/y/DE/strings.json");

        test.done();
    },

    testGetLocalizedPathRegionNotThere: function(test) {
        test.expect(1);

        test.equals(formatPath('[dir]/[region]/strings.json', {
            sourcepath: "x/y/strings.json",
            locale: "de"
        }), "x/y/strings.json");

        test.done();
    },

    testGetLocalizedPathScript: function(test) {
        test.expect(1);

        test.equals(formatPath('[dir]/[script]/strings.json', {
            sourcepath: "x/y/strings.json",
            locale: "zh-Hans-CN"
        }), "x/y/Hans/strings.json");

        test.done();
    },

    testGetLocalizedPathScriptNotThere: function(test) {
        test.expect(1);

        test.equals(formatPath('[dir]/[script]/strings.json', {
            sourcepath: "x/y/strings.json",
            locale: "zh-CN"
        }), "x/y/strings.json");

        test.done();
    },

    testGetLocalizedPathLocaleUnder: function(test) {
        test.expect(1);

        test.equals(formatPath('[dir]/strings_[localeUnder].json', {
            sourcepath: "x/y/strings.json",
            locale: "zh-Hans-CN"
        }), "x/y/strings_zh_Hans_CN.json");

        test.done();
    },

    testGetLocalizedPathLocaleLower: function(test) {
        test.expect(1);

        test.equals(formatPath('[dir]/strings_[localeLower].json', {
            sourcepath: "x/y/strings.json",
            locale: "zh-Hans-CN"
        }), "x/y/strings_zh-hans-cn.json");

        test.done();
    },

    testGetLocaleFromPathDir: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/strings.json', "x/y/strings.json"), "");

        test.done();
    },

    testGetLocaleFromPathBasename: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/[basename].json', "x/y/strings.json"), "");

        test.done();
    },

    testGetLocaleFromPathBasenameAlternateExtension: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/[basename].md', "x/y/strings.md"), "");

        test.done();
    },

    testGetLocaleFromPathBasenameWithLocaleDir: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/[locale]/[basename].json', "x/y/zh-Hans-CN/strings.json"), "zh-Hans-CN");

        test.done();
    },

    testGetLocaleFromPathBasenameWithLocaleAlternateExtension: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/[locale]/[basename].md', "x/y/de-DE/strings.md"), "de-DE");

        test.done();
    },

    testGetLocaleFromPathBasenameAndLocaleTogether1: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/[basename]_[locale].[extension]', "x/y/strings_de-DE.json"), "de-DE");

        test.done();
    },

    testGetLocaleFromPathBasenameAndLocaleTogether2: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/[basename]_[localeUnder].[extension]', "x/y/strings_de_DE.json"), "de-DE");

        test.done();
    },

    testGetLocaleFromPathFilename: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/[filename]', "x/y/strings.json"), "");

        test.done();
    },

    testGetLocaleFromPathLocale: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/[locale]/strings.json', "x/y/de-DE/strings.json"), "de-DE");

        test.done();
    },

    testGetLocaleFromPathLocaleLong: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/[locale]/strings.json', "x/y/zh-Hans-CN/strings.json"), "zh-Hans-CN");

        test.done();
    },

    testGetLocaleFromPathLocaleShort: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/[locale]/strings.json', "x/y/fr/strings.json"), "fr");

        test.done();
    },

    testGetLocaleFromPathLanguage: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/[language]/strings.json', "x/y/de/strings.json"), "de");

        test.done();
    },

    testGetLocaleFromPathScript: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/[language]-[script]/strings.json', "x/y/zh-Hans/strings.json"), "zh-Hans");

        test.done();
    },

    testGetLocaleFromPathRegion: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/[region]/strings.json', "x/y/JP/strings.json"), "JP");

        test.done();
    },

    testGetLocaleFromPathLocaleDir: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/[localeDir]/strings.json', "x/y/de/DE/strings.json"), "de-DE");

        test.done();
    },

    testGetLocaleFromPathLocaleDirShort: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/[localeDir]/strings.json', "x/y/de/strings.json"), "de");

        test.done();
    },

    testGetLocaleFromPathLocaleDirLong: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/[localeDir]/strings.json', "x/y/zh/Hans/CN/strings.json"), "zh-Hans-CN");

        test.done();
    },

    testGetLocaleFromPathLocaleDirStart: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[localeDir]/strings.json', "de/DE/strings.json"), "de-DE");

        test.done();
    },

    testGetLocaleFromPathLocaleUnder: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/strings_[localeUnder].json', "x/y/strings_de_DE.json"), "de-DE");

        test.done();
    },

    testGetLocaleFromPathLocaleUnderShort: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/strings_[localeUnder].json', "x/y/strings_de.json"), "de");

        test.done();
    },

    testGetLocaleFromPathLocaleUnderLong: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/strings_[localeUnder].json', "x/y/strings_zh_Hans_CN.json"), "zh-Hans-CN");

        test.done();
    },

    testGetLocaleFromPathLocaleLower: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/strings_[localeLower].json', "x/y/strings_de-de.json"), "de-DE");

        test.done();
    },

    testGetLocaleFromPathLocaleLowerShort: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/strings_[localeLower].json', "x/y/strings_de.json"), "de");

        test.done();
    },

    testGetLocaleFromPathLocaleLowerLong: function(test) {
        test.expect(1);

        test.equals(getLocaleFromPath('[dir]/strings_[localeLower].json', "x/y/strings_zh-hans-cn.json"), "zh-Hans-CN");

        test.done();
    },

    testContainsActualTextHtml: function(test) {
        test.expect(1);

        test.ok(containsActualText(`<html><body>text</body></html>`));

        test.done();
    },

    testContainsActualTextHtml: function(test) {
        test.expect(1);

        test.ok(!containsActualText(`<html><body><img src="This is a test"/></body></html>`));

        test.done();
    },

    testContainsActualTextEntities: function(test) {
        test.expect(1);

        test.ok(containsActualText(`&uuml; text &lt;`));

        test.done();
    },

    testContainsActualTextEntitiesFalse: function(test) {
        test.expect(1);

        test.ok(!containsActualText(`&uuml; &lt;`));

        test.done();
    },

    testObjectMapCount: function(test) {
        test.expect(1);

        const obj = {
            subobj: {
                number: 4,
                bool: true
            },
            another: {
                yetAnother: {
                    text: "hey yeah"
                }
            }
        };
        const expected = {
            subobj: {
                number: "foo",
                bool: "foo"
            },
            another: {
                yetAnother: {
                    text: "foo"
                }
            }
        };
        const actual = objectMap(obj, (node) => {
            return "foo";
        });

        test.deepEqual(actual, expected);

        test.done();
    },

};
