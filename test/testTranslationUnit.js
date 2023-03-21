/*
 * testTranslationUnit.js - test the translation unit object.
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

import TranslationUnit from "../src/TranslationUnit.js";
import TranslationVariant from "../src/TranslationVariant.js";

export const testTranslationUnit = {
     testTranslationUnitConstructor: function(test) {
        test.expect(1);

        const tu = new TranslationUnit();
        test.ok(tu);
        test.done();
    },

    testTranslationUnitConstructorWithFields: function(test) {
        test.expect(1);

        const tu = new TranslationUnit({
            source: "a",
            sourceLocale: "en-US",
            key: "key",
            file: "a/b/c.js",
            project: "bigproject",
            target: "b",
            targetLocale: "de-DE",
            resType: "string",
            state: "translated",
            comment: "no comment",
            datatype: "javascript",
            flavor: "chocolate"
        });
        test.ok(tu);
        test.done();
    },

    testTranslationUnitConstructorWithMissingRequiredFields: function(test) {
        test.expect(1);

        test.throws(() => {
            const tu = new TranslationUnit({
                source: "a",
                target: "b",
                targetLocale: "de-DE",
                resType: "string",
                state: "translated",
                comment: "no comment",
                datatype: "javascript",
                flavor: "chocolate"
            });
        });
        test.done();
    },

    testTranslationUnitConstructorWithMissingOptionalFields: function(test) {
        test.expect(1);

        const tu = new TranslationUnit({
            source: "a",
            sourceLocale: "en-US",
            key: "key",
            file: "a/b/c.js",
            project: "bigproject"
        });
        test.ok(tu);
        test.done();
    },

    testTranslationUnitRightFields: function(test) {
        test.expect(13);

        const tu = new TranslationUnit({
            source: "a",
            sourceLocale: "en-US",
            key: "key",
            file: "a/b/c.js",
            project: "bigproject",
            target: "b",
            targetLocale: "de-DE",
            resType: "string",
            state: "translated",
            comment: "no comment",
            datatype: "javascript",
            flavor: "chocolate"
        });
        test.ok(tu);

        test.equal(tu.source, "a");
        test.equal(tu.sourceLocale, "en-US");
        test.equal(tu.key, "key");
        test.equal(tu.file, "a/b/c.js");
        test.equal(tu.project, "bigproject");
        test.equal(tu.target, "b");
        test.equal(tu.targetLocale, "de-DE");
        test.equal(tu.resType, "string");
        test.equal(tu.state, "translated");
        test.equal(tu.comment, "no comment");
        test.equal(tu.datatype, "javascript");
        test.equal(tu.flavor, "chocolate");

        test.done();
    },

    testTranslationUnitAddVariant: function(test) {
        test.expect(5);

        const tu = new TranslationUnit();
        test.ok(tu);

        let variants = tu.getVariants();
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 0);

        tu.addVariant(new TranslationVariant({
            locale: "de-DE",
            string: "Zeichenfolge"
        }));

        variants = tu.getVariants();
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 1);

        test.done();
    },

    testTranslationUnitAddVariantRightOne: function(test) {
        test.expect(5);

        const tu = new TranslationUnit();
        test.ok(tu);

        let variants;

        tu.addVariant(new TranslationVariant({
            locale: "de-DE",
            string: "Zeichenfolge"
        }));

        variants = tu.getVariants();
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 1);

        test.equal(variants[0].locale, "de-DE");
        test.equal(variants[0].string, "Zeichenfolge");

        test.done();
    },

    testTranslationUnitAddVariants: function(test) {
        test.expect(5);

        const tu = new TranslationUnit();
        test.ok(tu);

        let variants = tu.getVariants();
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 0);

        tu.addVariants([
            new TranslationVariant({
                locale: "de-DE",
                string: "Zeichenfolge"
            }),
            new TranslationVariant({
                locale: "nl-NL",
                string: "string"
            })
        ]);

        variants = tu.getVariants();
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 2);

        test.done();
    },

    testTranslationUnitGetVariantsWithLocale: function(test) {
        test.expect(13);

        const tu = new TranslationUnit();
        test.ok(tu);

        let variants = tu.getVariants();
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 0);

        tu.addVariants([
            new TranslationVariant({
                locale: "de-DE",
                string: "Zeichenfolge"
            }),
            new TranslationVariant({
                locale: "nl-NL",
                string: "string"
            })
        ]);

        variants = tu.getVariants("nl-NL");
        test.ok(variants);
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 1);
        test.equal(variants[0].locale, "nl-NL");
        test.equal(variants[0].string, "string");

        variants = tu.getVariants("de-DE");
        test.ok(variants);
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 1);
        test.equal(variants[0].locale, "de-DE");
        test.equal(variants[0].string, "Zeichenfolge");

        test.done();
    },

    testTranslationUnitGetVariantsMultipleWithLocale: function(test) {
        test.expect(10);

        const tu = new TranslationUnit();
        test.ok(tu);

        let variants = tu.getVariants();
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 0);

        tu.addVariants([
            new TranslationVariant({
                locale: "de-DE",
                string: "Zeichenfolge"
            }),
            new TranslationVariant({
                locale: "nl-NL",
                string: "string"
            }),
            new TranslationVariant({
                locale: "de-DE",
                string: "String"
            }),
        ]);

        variants = tu.getVariants("de-DE");
        test.ok(variants);
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 2);
        test.equal(variants[0].locale, "de-DE");
        test.equal(variants[0].string, "Zeichenfolge");

        test.equal(variants[1].locale, "de-DE");
        test.equal(variants[1].string, "String");

        test.done();
    },

    testTranslationUnitGetVariantsNotThere: function(test) {
        test.expect(6);

        const tu = new TranslationUnit();
        test.ok(tu);

        let variants = tu.getVariants();
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 0);

        tu.addVariants([
            new TranslationVariant({
                locale: "de-DE",
                string: "Zeichenfolge"
            }),
            new TranslationVariant({
                locale: "nl-NL",
                string: "string"
            })
        ]);

        variants = tu.getVariants("ja-JP");
        test.ok(variants);
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 0);

        test.done();
    },

    testTranslationUnitGetVariantsNoneThere: function(test) {
        test.expect(6);

        const tu = new TranslationUnit();
        test.ok(tu);

        let variants = tu.getVariants();
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 0);

        const variant = tu.getVariants("ja-JP");
        test.ok(variants);
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 0);

        test.done();
    },

    testTranslationUnitNoProperties: function(test) {
        test.expect(2);

        const tu = new TranslationUnit();
        test.ok(tu);

        test.deepEqual(tu.getProperties(), {});

        test.done();
    },

    testTranslationUnitAddProperties: function(test) {
        test.expect(3);

        const tu = new TranslationUnit();
        test.ok(tu);

        test.deepEqual(tu.getProperties(), {});
        tu.addProperties({
            foo: "bar",
            asdf: "asdf"
        });
        test.deepEqual(tu.getProperties(), {
            foo: "bar",
            asdf: "asdf"
        });

        test.done();
    },

    testTranslationUnitAddPropertiesAdditive: function(test) {
        test.expect(3);

        const tu = new TranslationUnit();
        test.ok(tu);

        test.deepEqual(tu.getProperties(), {});
        tu.addProperties({
            foo: "bar",
            asdf: "asdf"
        });
        tu.addProperties({
            x: "y",
            m: "n"
        });
        test.deepEqual(tu.getProperties(), {
            foo: "bar",
            asdf: "asdf",
            x: "y",
            m: "n"
        });

        test.done();
    },

    testTranslationUnitHashKey: function(test) {
        test.expect(2);

        const tu = new TranslationUnit({
            source: "a",
            sourceLocale: "en-US",
            key: "key",
            file: "a/b/c.js",
            project: "bigproject",
            target: "b",
            targetLocale: "de-DE",
            resType: "string",
            state: "translated",
            comment: "no comment",
            datatype: "javascript",
            flavor: "chocolate"
        });
        test.ok(tu);
        test.equal(tu.hashKey(), "r6355537_en-US_javascript");
        test.done();
    }
};
