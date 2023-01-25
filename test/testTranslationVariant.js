/*
 * testTranslationVariant.js - test the translation variant object.
 *
 * Copyright © 2023 JEDLSoft
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

import TranslationVariant from "../src/TranslationVariant.js";

export const testTranslationVariant = {
     testTranslationVariantConstructorEmpty: function(test) {
        test.expect(1);

        const tv = new TranslationVariant();
        test.ok(tv);
        test.done();
    },

     testTranslationVariantConstructor: function(test) {
        test.expect(1);

        const tv = new TranslationVariant({
            locale: "de-DE",
            string: "Zeichenfolge auf deutsch"
        });
        test.ok(tv);
        test.done();
    },

     testTranslationVariantRightFields: function(test) {
        test.expect(3);

        const tv = new TranslationVariant({
            locale: "de-DE",
            string: "Zeichenfolge auf deutsch"
        });
        test.ok(tv);

        test.equal(tv.locale, "de-DE");
        test.equal(tv.string, "Zeichenfolge auf deutsch");
        test.done();
    },
};
