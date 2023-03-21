/*
 * testXliff.js - test the Xliff object.
 *
 * Copyright © 2016-2017, 2019-2022 HealthTap, Inc. and JEDLSoft
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

import fs from "fs";

import ResourceArray from "../src/ResourceArray.js";
import ResourcePlural from "../src/ResourcePlural.js";
import ResourceString from "../src/ResourceString.js";
import ResourceXliff from "../src/ResourceXliff.js";

function diff(a, b) {
    const min = Math.min(a.length, b.length);

    for (let i = 0; i < min; i++) {
        if (a[i] !== b[i]) {
            console.log("Found difference at character " + i);
            console.log("a: " + a.substring(i));
            console.log("b: " + b.substring(i));
            break;
        }
    }
}

export const testResourceXliff = {
    testResourceXliffConstructor: function(test) {
        test.expect(1);

        const x = new ResourceXliff();
        test.ok(x);

        test.done();
    },

    testResourceXliffConstructorIsEmpty: function(test) {
        test.expect(2);

        const x = new ResourceXliff();
        test.ok(x);

        test.equal(x.size(), 0);

        test.done();
    },

    testResourceXliffConstructorFull: function(test) {
        test.expect(7);

        const x = new ResourceXliff({
            "tool-id": "loctool",
            "tool-name": "Localization Tool",
            "tool-version": "1.2.34",
            "tool-company": "My Company, Inc.",
            copyright: "Copyright 2016, My Company, Inc. All rights reserved.",
            path: "a/b/c.xliff"
        });
        test.ok(x);

        test.equal(x["tool-id"], "loctool");
        test.equal(x["tool-name"], "Localization Tool"),
        test.equal(x["tool-version"], "1.2.34"),
        test.equal(x["tool-company"], "My Company, Inc."),
        test.equal(x.copyright, "Copyright 2016, My Company, Inc. All rights reserved."),
        test.equal(x.path, "a/b/c.xliff");

        test.done();
    },

    testResourceXliffGetPath: function(test) {
        test.expect(2);

        const x = new ResourceXliff({
            path: "foo/bar/x.xliff"
        });
        test.ok(x);

        test.equal(x.getPath(), "foo/bar/x.xliff");

        test.done();
    },


    testResourceXliffSetPath: function(test) {
        test.expect(3);

        const x = new ResourceXliff({
            path: "foo/bar/x.xliff"
        });
        test.ok(x);

        test.equal(x.getPath(), "foo/bar/x.xliff");

        x.setPath("asdf/asdf/y.xliff");

        test.equal(x.getPath(), "asdf/asdf/y.xliff");

        test.done();
    },

    testResourceXliffSetPathInitiallyEmpty: function(test) {
        test.expect(3);

        const x = new ResourceXliff();
        test.ok(x);

        test.ok(!x.getPath());

        x.setPath("asdf/asdf/y.xliff");

        test.equal(x.getPath(), "asdf/asdf/y.xliff");

        test.done();
    },

    testResourceXliffAddResource: function(test) {
        test.expect(11);

        const x = new ResourceXliff();
        test.ok(x);

        const res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            autoKey: false,
            state: "new",
            context: "asdf",
            comment: "this is a comment",
            project: "webapp"
        });

        x.addResource(res);

        const reslist = x.getResources({
            reskey: "foobar"
        });

        test.ok(reslist);

        test.equal(reslist.length, 1);
        test.equal(reslist[0].getSource(), "Asdf asdf");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getState(), "new");
        test.equal(reslist[0].getContext(), "asdf");
        test.equal(reslist[0].getComment(), "this is a comment");
        test.equal(reslist[0].getProject(), "webapp");

        test.done();
    },

    testResourceXliffSize: function(test) {
        test.expect(3);

        const x = new ResourceXliff();
        test.ok(x);

        const res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            autoKey: false,
            state: "new",
            context: "asdf",
            comment: "this is a comment",
            project: "webapp"
        });

        test.equal(x.size(), 0);

        x.addResource(res);

        test.equal(x.size(), 1);

        test.done();
    },

    testResourceXliffAddMultipleResources: function(test) {
        test.expect(8);

        const x = new ResourceXliff();
        test.ok(x);

        let res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "webapp"
        });

        x.addResource(res);

        res = new ResourceString({
            source: "baby baby",
            sourceLocale: "en-US",
            key: "huzzah",
            pathName: "foo/bar/j.java",
            project: "webapp"
        });

        x.addResource(res);

        const reslist = x.getResources({
            reskey: "foobar"
        });

        test.ok(reslist);

        test.equal(reslist.length, 1);
        test.equal(reslist[0].getSource(), "Asdf asdf");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "webapp");

        test.done();
    },

    testResourceXliffAddMultipleResourcesRightSize: function(test) {
        test.expect(3);

        const x = new ResourceXliff();
        test.ok(x);
        test.equal(x.size(), 0);

        let res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "webapp"
        });

        x.addResource(res);

        res = new ResourceString({
            source: "baby baby",
            sourceLocale: "en-US",
            key: "huzzah",
            pathName: "foo/bar/j.java",
            project: "webapp"
        });

        x.addResource(res);

        test.equal(x.size(), 2);

        test.done();
    },

    testResourceXliffAddMultipleResourcesAddInstance: function(test) {
        test.expect(17);

        const x = new ResourceXliff();
        test.ok(x);

        let res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "webapp"
        });

        x.addResource(res);

        // this one has the same source, locale, key, and pathName
        // so it should add an instance
        res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            comment: "blah blah blah",
            project: "webapp"
        });

        x.addResource(res);

        const reslist = x.getResources({
            reskey: "foobar"
        });

        test.ok(reslist);

        test.equal(reslist.length, 1);
        test.equal(reslist[0].getSource(), "Asdf asdf");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "webapp");
        test.ok(!reslist[0].getComment());

        const inst = reslist[0].getInstances();
        test.ok(inst);

        test.equal(inst.length, 1);
        test.equal(inst[0].getSource(), "Asdf asdf");
        test.equal(inst[0].getSourceLocale(), "en-US");
        test.equal(inst[0].getKey(), "foobar");
        test.equal(inst[0].getPath(), "foo/bar/asdf.java");
        test.equal(inst[0].getProject(), "webapp");
        test.equal(inst[0].getComment(), "blah blah blah");

        test.done();
    },

    testResourceXliffAddMultipleResourcesOverwriteRightSize: function(test) {
        test.expect(4);

        const x = new ResourceXliff();
        test.ok(x);

        test.equal(x.size(), 0);

        let res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "webapp"
        });

        x.addResource(res);

        test.equal(x.size(), 1);

        // this one has the same source, locale, key, and file
        // so it should overwrite the one above
        res = new ResourceString({
            source: "baby baby",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            comment: "blah blah blah",
            project: "webapp"
        });

        x.addResource(res);

        test.equal(x.size(), 1);

        test.done();
    },

    testResourceXliffAddMultipleResourcesNoOverwrite: function(test) {
        test.expect(13);

        const x = new ResourceXliff();
        test.ok(x);

        let res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "webapp"
        });

        x.addResource(res);

        // this one has a different locale
        // so it should not overwrite the one above
        res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "fr-FR",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            comment: "blah blah blah",
            project: "webapp"
        });

        x.addResource(res);

        const reslist = x.getResources({
            reskey: "foobar"
        });

        test.ok(reslist);

        test.equal(reslist.length, 2);

        test.equal(reslist[0].getSource(), "Asdf asdf");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.ok(!reslist[0].getComment());

        test.equal(reslist[1].getSource(), "Asdf asdf");
        test.equal(reslist[1].getSourceLocale(), "fr-FR");
        test.equal(reslist[1].getKey(), "foobar");
        test.equal(reslist[1].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[1].getComment(), "blah blah blah");

        test.done();
    },

    testResourceXliffAddResourceDontAddSourceLocaleAsTarget: function(test) {
        test.expect(2);

        const x = new ResourceXliff({
            sourceLocale: "en-US"
        });
        test.ok(x);

        let res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "webapp"
        });

        x.addResource(res);

        // should not add this one
        res = new ResourceString({
            source: "baby baby",
            target: "babes babes",
            targetLocale: "en-US",
            key: "huzzah",
            pathName: "foo/bar/j.java",
            project: "webapp",
            origin: "target"
        });

        x.addResource(res);

        test.equal(x.size(), 1);

        test.done();
    },

    testResourceXliffGetResourcesMultiple: function(test) {
        test.expect(11);

        const x = new ResourceXliff();
        test.ok(x);

        let res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "webapp",
            origin: "source"
        });

        x.addResource(res);

        res = new ResourceString({
            source: "baby baby",
            sourceLocale: "en-US",
            key: "huzzah",
            pathName: "foo/bar/j.java",
            project: "webapp",
            origin: "origin"
        });

        x.addResource(res);

        const reslist = x.getResources({
            sourceLocale: "en-US"
        });

        test.ok(reslist);

        test.equal(reslist.length, 2);

        test.equal(reslist[0].getSource(), "Asdf asdf");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");

        test.equal(reslist[1].getSource(), "baby baby");
        test.equal(reslist[1].getSourceLocale(), "en-US");
        test.equal(reslist[1].getKey(), "huzzah");
        test.equal(reslist[1].getPath(), "foo/bar/j.java");

        test.done();
    },

    testResourceXliffGetTextWithExplicitIds: function(test) {
        test.expect(2);

        const x = new ResourceXliff();
        test.ok(x);

        let res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            target: "baby baby",
            targetLocale: "nl-NL",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "androidapp",
            origin: "target",
            id: 4444444
        });

        x.addResource(res);

        res = new ResourceString({
            source: "abcdef",
            sourceLocale: "en-US",
            target: "hijklmn",
            targetLocale: "nl-NL",
            key: "asdf",
            pathName: "foo/bar/asdf.java",
            project: "androidapp",
            origin: "target"
        });

        x.addResource(res);

        const actual = x.getText();
        const expected =
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="nl-NL" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="4444444" resname="foobar" restype="string" datatype="plaintext">\n' +
                '        <source>Asdf asdf</source>\n' +
                '        <target>baby baby</target>\n' +
                '      </trans-unit>\n' +
                '      <trans-unit id="4444445" resname="asdf" restype="string" datatype="plaintext">\n' +
                '        <source>abcdef</source>\n' +
                '        <target>hijklmn</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>';
        diff(actual, expected);
        test.equal(actual, expected);

        test.done();
    },

    testResourceXliffGetTextWithSourceAndTarget: function(test) {
        test.expect(2);

        const x = new ResourceXliff();
        test.ok(x);

        let res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            target: "foobarfoo",
            targetLocale: "de-DE",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "webapp",
            origin: "target"
        });

        x.addResource(res);

        res = new ResourceString({
            source: "baby baby",
            sourceLocale: "en-US",
            target: "bebe bebe",
            targetLocale: "fr-FR",
            key: "huzzah",
            pathName: "foo/bar/j.java",
            project: "webapp",
            origin: "target"
        });

        x.addResource(res);

        diff(x.getText(),
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="de-DE" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="string" datatype="plaintext">\n' +
                '        <source>Asdf asdf</source>\n' +
                '        <target>foobarfoo</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="fr-FR" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah" restype="string" datatype="plaintext">\n' +
                '        <source>baby baby</source>\n' +
                '        <target>bebe bebe</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        test.equal(x.getText(),
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="de-DE" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="string" datatype="plaintext">\n' +
                '        <source>Asdf asdf</source>\n' +
                '        <target>foobarfoo</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="fr-FR" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah" restype="string" datatype="plaintext">\n' +
                '        <source>baby baby</source>\n' +
                '        <target>bebe bebe</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        test.done();
    },

    testResourceXliffGetTextWithSourceAndTargetAndComment: function(test) {
        test.expect(2);

        const x = new ResourceXliff();
        test.ok(x);

        let res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            target: "foobarfoo",
            targetLocale: "de-DE",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "webapp",
            comment: "foobar is where it's at!"
        });

        x.addResource(res);

        res = new ResourceString({
            source: "baby baby",
            sourceLocale: "en-US",
            target: "bebe bebe",
            targetLocale: "fr-FR",
            key: "huzzah",
            pathName: "foo/bar/j.java",
            project: "webapp",
            comment: "come & enjoy it with us"
        });

        x.addResource(res);

        const expected =
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="de-DE" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="string" datatype="plaintext">\n' +
                '        <source>Asdf asdf</source>\n' +
                '        <target>foobarfoo</target>\n' +
                '        <note>foobar is where it\'s at!</note>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="fr-FR" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah" restype="string" datatype="plaintext">\n' +
                '        <source>baby baby</source>\n' +
                '        <target>bebe bebe</target>\n' +
                '        <note>come &amp; enjoy it with us</note>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>';

        const actual = x.getText();

        diff(actual, expected);
        test.equal(actual, expected);

        test.done();
    },

    testResourceXliffGetTextWithHeader: function(test) {
        test.expect(2);

        const x = new ResourceXliff({
            "tool-id": "loctool",
            "tool-name": "Localization Tool",
            "tool-version": "1.2.34",
            "tool-company": "My Company, Inc.",
            copyright: "Copyright 2016, My Company, Inc. All rights reserved.",
            path: "a/b/c.xliff"
        });
        test.ok(x);

        const res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            target: "baby baby",
            targetLocale: "nl-NL",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "webapp",
            origin: "target"
        });

        x.addResource(res);

        const actual = x.getText();
        const expected =
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="nl-NL" product-name="webapp">\n' +
                '    <header>\n' +
                '      <tool tool-id="loctool" tool-name="Localization Tool" tool-version="1.2.34" tool-company="My Company, Inc." copyright="Copyright 2016, My Company, Inc. All rights reserved."/>\n' +
                '    </header>\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="string" datatype="plaintext">\n' +
                '        <source>Asdf asdf</source>\n' +
                '        <target>baby baby</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>';

        diff(actual, expected);
        test.equal(actual, expected);
        test.done();
    },

    testResourceXliffGetTextWithPlurals: function(test) {
        test.expect(2);

        const x = new ResourceXliff();
        test.ok(x);

        let res = new ResourcePlural({
            source: {
                "one": "There is 1 object.",
                "other": "There are {n} objects."
            },
            sourceLocale: "en-US",
            target: {
                "one": "Da gibts 1 Objekt.",
                "other": "Da gibts {n} Objekten."
            },
            targetLocale: "de-DE",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "androidapp",
            resType: "plural",
            origin: "target",
            autoKey: true,
            state: "new",
            datatype: "ruby"
        });

        x.addResource(res);

        const actual = x.getText();
        const expected =
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="de-DE" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="plural" datatype="ruby" extype="one">\n' +
                '        <source>There is 1 object.</source>\n' +
                '        <target state="new">Da gibts 1 Objekt.</target>\n' +
                '        <note>{"pluralForm":"one","pluralFormOther":"foobar"}</note>\n' +
                '      </trans-unit>\n' +
                '      <trans-unit id="2" resname="foobar" restype="plural" datatype="ruby" extype="other">\n' +
                '        <source>There are {n} objects.</source>\n' +
                '        <target state="new">Da gibts {n} Objekten.</target>\n' +
                '        <note>{"pluralForm":"other","pluralFormOther":"foobar"}</note>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>';
        diff(actual, expected);
        test.equal(actual, expected);

        test.done();
    },

    testResourceXliffGetTextWithPluralsToLangWithMorePluralsThanEnglish: function(test) {
        test.expect(2);

        const x = new ResourceXliff();
        test.ok(x);

        const res = new ResourcePlural({
            source: {
                "one": "There is 1 object.",
                "other": "There are {n} objects."
            },
            sourceLocale: "en-US",
            target: {
                "one": "Имеется {n} объект.",
                "few": "Есть {n} объекта.",
                "other": "Всего {n} объектов."
            },
            targetLocale: "ru-RU",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "androidapp",
            resType: "plural",
            origin: "target",
            autoKey: true,
            state: "new",
            datatype: "ruby"
        });

        x.addResource(res);

        const actual = x.getText();
        const expected =
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="ru-RU" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="plural" datatype="ruby" extype="one">\n' +
                '        <source>There is 1 object.</source>\n' +
                '        <target state="new">Имеется {n} объект.</target>\n' +
                '        <note>{"pluralForm":"one","pluralFormOther":"foobar"}</note>\n' +
                '      </trans-unit>\n' +
                '      <trans-unit id="2" resname="foobar" restype="plural" datatype="ruby" extype="few">\n' +
                '        <source>There are {n} objects.</source>\n' +
                '        <target state="new">Есть {n} объекта.</target>\n' +
                '        <note>{"pluralForm":"few","pluralFormOther":"foobar"}</note>\n' +
                '      </trans-unit>\n' +
                '      <trans-unit id="3" resname="foobar" restype="plural" datatype="ruby" extype="other">\n' +
                '        <source>There are {n} objects.</source>\n' +
                '        <target state="new">Всего {n} объектов.</target>\n' +
                '        <note>{"pluralForm":"other","pluralFormOther":"foobar"}</note>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>';
        diff(actual, expected);
        test.equal(actual, expected);

        test.done();
    },

    testResourceXliffGetTextWithArrays: function(test) {
        test.expect(2);

        const x = new ResourceXliff();
        test.ok(x);

        const res = new ResourceArray({
            source: ["Zero", "One", "Two"],
            sourceLocale: "en-US",
            targetArray: ["Zero", "Eins", "Zwei"],
            targetLocale: "de-DE",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "androidapp",
            origin: "target"
        });

        x.addResource(res);

        const actual = x.getText();
        const expected =
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="de-DE" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="array" datatype="x-android-resource" extype="0">\n' +
                '        <source>Zero</source>\n' +
                '        <target>Zero</target>\n' +
                '      </trans-unit>\n' +
                '      <trans-unit id="2" resname="foobar" restype="array" datatype="x-android-resource" extype="1">\n' +
                '        <source>One</source>\n' +
                '        <target>Eins</target>\n' +
                '      </trans-unit>\n' +
                '      <trans-unit id="3" resname="foobar" restype="array" datatype="x-android-resource" extype="2">\n' +
                '        <source>Two</source>\n' +
                '        <target>Zwei</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>';
        diff(actual, expected)
        test.equal(actual, expected);
        test.done();
    },

    testResourceXliffGetTextWithXMLEscaping: function(test) {
        test.expect(2);

        const x = new ResourceXliff();
        test.ok(x);

        let res = new ResourceString({
            source: "Asdf <b>asdf</b>",
            sourceLocale: "en-US",
            target: "Asdf 'quotes'",
            targetLocale: "de-DE",
            key: 'foobar "asdf"',
            pathName: "foo/bar/asdf.java",
            project: "androidapp",
            origin: "target"
        });

        x.addResource(res);

        res = new ResourceString({
            source: "baby &lt;b&gt;baby&lt;/b&gt;",
            sourceLocale: "en-US",
            target: "baby #(test)",
            targetLocale: "de-DE",
            key: "huzzah &quot;asdf&quot; #(test)",
            pathName: "foo/bar/j.java",
            project: "webapp",
            origin: "target"
        });

        x.addResource(res);

        const actual = x.getText();
        const expected =
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="de-DE" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar &quot;asdf&quot;" restype="string" datatype="plaintext">\n' +
                '        <source>Asdf &lt;b&gt;asdf&lt;/b&gt;</source>\n' +
                '        <target>Asdf \'quotes\'</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="de-DE" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah &amp;quot;asdf&amp;quot; #(test)" restype="string" datatype="plaintext">\n' +
                '        <source>baby &amp;lt;b&amp;gt;baby&amp;lt;/b&amp;gt;</source>\n' +   // double escaped!
                '        <target>baby #(test)</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>';

        diff(actual, expected);
        test.equal(actual, expected);
        test.done();
    },

    testResourceXliffGetTextWithXMLEscapingInResname: function(test) {
        test.expect(2);

        const x = new ResourceXliff();
        test.ok(x);

        let res = new ResourceString({
            source: "Asdf <b>asdf</b>",
            sourceLocale: "en-US",
            target: "Asdf 'quotes'",
            targetLocale: "de-DE",
            key: 'foobar <i>asdf</i>',
            pathName: "foo/bar/asdf.java",
            project: "androidapp",
            origin: "target"
        });

        x.addResource(res);

        res = new ResourceString({
            source: "baby &lt;b&gt;baby&lt;/b&gt;",
            sourceLocale: "en-US",
            target: "baby #(test)",
            targetLocale: "de-DE",
            key: "huzzah <b>asdf</b> #(test)",
            pathName: "foo/bar/j.java",
            project: "webapp",
            origin: "target"
        });

        x.addResource(res);

        const actual = x.getText();
        const expected =
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="de-DE" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar &lt;i>asdf&lt;/i>" restype="string" datatype="plaintext">\n' +
                '        <source>Asdf &lt;b&gt;asdf&lt;/b&gt;</source>\n' +
                '        <target>Asdf \'quotes\'</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="de-DE" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah &lt;b>asdf&lt;/b> #(test)" restype="string" datatype="plaintext">\n' +
                '        <source>baby &amp;lt;b&amp;gt;baby&amp;lt;/b&amp;gt;</source>\n' +   // double escaped!
                '        <target>baby #(test)</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>';

        diff(actual, expected);
        test.equal(actual, expected);
        test.done();
    },

    testResourceXliffGetTextWithXMLEscapingWithQuotes: function(test) {
        test.expect(2);

        const x = new ResourceXliff();
        test.ok(x);

        const res = new ResourceString({
            source: "Here are \"double\" and 'single' quotes.",
            sourceLocale: "en-US",
            target: "Hier zijn \"dubbel\" en 'singel' quotaties.",
            targetLocale: "nl-NL",
            key: '"double" and \'single\'',
            pathName: "foo/bar/asdf.java",
            project: "androidapp",
            origin: "target"
        });

        x.addResource(res);

        test.equal(x.getText(),
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="nl-NL" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="&quot;double&quot; and &apos;single&apos;" restype="string" datatype="plaintext">\n' +
                '        <source>Here are "double" and \'single\' quotes.</source>\n' +
                '        <target>Hier zijn "dubbel" en \'singel\' quotaties.</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        test.done();
    },

    testResourceXliffGetTextWithEscapeCharsInResname: function(test) {
        test.expect(2);

        const x = new ResourceXliff();
        test.ok(x);

        let res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            target: "Asdf translated",
            targetLocale: "de-DE",
            key: 'asdf \\n\\nasdf',
            pathName: "foo/bar/asdf.java",
            project: "androidapp",
            origin: "target"
        });

        x.addResource(res);

        res = new ResourceString({
            source: "asdf \\t\\n\\n asdf\\n",
            sourceLocale: "en-US",
            target: "fdsa \\t\\n\\n fdsa\\n",
            targetLocale: "de-DE",
            key: "asdf \\t\\n\\n asdf\\n",
            pathName: "foo/bar/j.java",
            project: "webapp",
            origin: "target"
        });

        x.addResource(res);

        const actual = x.getText();
        const expected =
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="de-DE" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="asdf \\n\\nasdf" restype="string" datatype="plaintext">\n' +
                '        <source>Asdf asdf</source>\n' +
                '        <target>Asdf translated</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="de-DE" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="asdf \\t\\n\\n asdf\\n" restype="string" datatype="plaintext">\n' +
                '        <source>asdf \\t\\n\\n asdf\\n</source>\n' +
                '        <target>fdsa \\t\\n\\n fdsa\\n</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>';

        diff(actual, expected);
        test.equal(actual, expected);
        test.done();
    },

    testResourceXliffGetTextWithComments: function(test) {
        test.expect(2);

        const x = new ResourceXliff();
        test.ok(x);

        let res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            target: "baby baby",
            targetLocale: "nl-NL",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "androidapp",
            comment: "A very nice string",
            origin: "target"
        });

        x.addResource(res);

        test.equal(x.getText(),
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="nl-NL" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="string" datatype="plaintext">\n' +
                '        <source>Asdf asdf</source>\n' +
                '        <target>baby baby</target>\n' +
                '        <note>A very nice string</note>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        test.done();
    },

    testResourceXliffParseWithSourceOnly: function(test) {
        test.expect(21);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="de-DE" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="string" datatype="plaintext">\n' +
                '        <source>Asdf asdf</source>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="fr-FR" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah" restype="string" datatype="plaintext">\n' +
                '        <source>baby baby</source>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 2);

        test.equal(reslist[0].getSource(), "Asdf asdf");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.ok(!reslist[0].getTarget());
        test.equal(reslist[0].getTargetLocale(), "de-DE");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "androidapp");
        test.equal(reslist[0].resType, "string");
        test.equal(reslist[0].getId(), "1");

        test.equal(reslist[1].getSource(), "baby baby");
        test.equal(reslist[1].getSourceLocale(), "en-US");
        test.ok(!reslist[1].getTarget());
        test.equal(reslist[1].getTargetLocale(), "fr-FR");
        test.equal(reslist[1].getKey(), "huzzah");
        test.equal(reslist[1].getPath(), "foo/bar/j.java");
        test.equal(reslist[1].getProject(), "webapp");
        test.equal(reslist[1].resType, "string");
        test.equal(reslist[1].getId(), "2");

        test.done();
    },

    testResourceXliffParseWithSourceAndTarget: function(test) {
        test.expect(21);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="de-DE" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="string">\n' +
                '        <source>Asdf asdf</source>\n' +
                '        <target>foobarfoo</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="fr-FR" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah" restype="string">\n' +
                '        <source>baby baby</source>\n' +
                '        <target>bebe bebe</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        // console.log("x is " + JSON.stringify(x, undefined, 4));
        const reslist = x.getResources();
        // console.log("x is now " + JSON.stringify(x, undefined, 4));

        test.ok(reslist);

        test.equal(reslist.length, 2);

        test.equal(reslist[0].getSource(), "Asdf asdf");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "androidapp");
        test.equal(reslist[0].resType, "string");
        test.equal(reslist[0].getId(), "1");
        test.equal(reslist[0].getTarget(), "foobarfoo");
        test.equal(reslist[0].getTargetLocale(), "de-DE");

        test.equal(reslist[1].getSource(), "baby baby");
        test.equal(reslist[1].getSourceLocale(), "en-US");
        test.equal(reslist[1].getKey(), "huzzah");
        test.equal(reslist[1].getPath(), "foo/bar/j.java");
        test.equal(reslist[1].getProject(), "webapp");
        test.equal(reslist[1].resType, "string");
        test.equal(reslist[1].getId(), "2");
        test.equal(reslist[1].getTarget(), "bebe bebe");
        test.equal(reslist[1].getTargetLocale(), "fr-FR");

        test.done();
    },

    testResourceXliffParseWithXMLUnescaping: function(test) {
        test.expect(19);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="string">\n' +
                '        <source>Asdf &lt;b&gt;asdf&lt;/b&gt;</source>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah" restype="string">\n' +
                '        <source>baby &amp;lt;b&amp;gt;baby&amp;lt;/b&amp;gt;</source>\n' +   // double escaped!
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 2);

        test.equal(reslist[0].getSource(), "Asdf <b>asdf</b>");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "androidapp");
        test.equal(reslist[0].resType, "string");
        test.equal(reslist[0].getId(), "1");
        test.ok(!reslist[0].getTarget());

        test.equal(reslist[1].getSource(), "baby &lt;b&gt;baby&lt;/b&gt;");
        test.equal(reslist[1].getSourceLocale(), "en-US");
        test.equal(reslist[1].getKey(), "huzzah");
        test.equal(reslist[1].getPath(), "foo/bar/j.java");
        test.equal(reslist[1].getProject(), "webapp");
        test.equal(reslist[1].resType, "string");
        test.equal(reslist[1].getId(), "2");
        test.ok(!reslist[1].getTarget());

        test.done();
    },

    testResourceXliffParseWithXMLUnescapingInResname: function(test) {
        test.expect(19);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar &lt;a>link&lt;/a>" restype="string">\n' +
                '        <source>Asdf &lt;b&gt;asdf&lt;/b&gt;</source>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="&lt;b>huzzah&lt;/b>" restype="string">\n' +
                '        <source>baby &amp;lt;b&amp;gt;baby&amp;lt;/b&amp;gt;</source>\n' +   // double escaped!
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 2);

        test.equal(reslist[0].getSource(), "Asdf <b>asdf</b>");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar <a>link</a>");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "androidapp");
        test.equal(reslist[0].resType, "string");
        test.equal(reslist[0].getId(), "1");
        test.ok(!reslist[0].getTarget());

        test.equal(reslist[1].getSource(), "baby &lt;b&gt;baby&lt;/b&gt;");
        test.equal(reslist[1].getSourceLocale(), "en-US");
        test.equal(reslist[1].getKey(), "<b>huzzah</b>");
        test.equal(reslist[1].getPath(), "foo/bar/j.java");
        test.equal(reslist[1].getProject(), "webapp");
        test.equal(reslist[1].resType, "string");
        test.equal(reslist[1].getId(), "2");
        test.ok(!reslist[1].getTarget());

        test.done();
    },

    testResourceXliffParseWithEscapedNewLines: function(test) {
        test.expect(17);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="en-CA" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="string">\n' +
                '        <source>a\\nb</source>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="en-CA" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah" restype="string">\n' +
                '        <source>e\\nh</source>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 2);

        test.equal(reslist[0].getSource(), "a\\nb");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "androidapp");
        test.equal(reslist[0].resType, "string");
        test.equal(reslist[0].getId(), "1");

        test.equal(reslist[1].getSource(), "e\\nh");
        test.equal(reslist[1].getSourceLocale(), "en-US");
        test.equal(reslist[1].getKey(), "huzzah");
        test.equal(reslist[1].getPath(), "foo/bar/j.java");
        test.equal(reslist[1].getProject(), "webapp");
        test.equal(reslist[1].resType, "string");
        test.equal(reslist[1].getId(), "2");

        test.done();
    },

    testResourceXliffParseWithEscapedNewLinesInResname: function(test) {
        test.expect(17);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="en-CA" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar\\n\\nasdf" restype="string">\n' +
                '        <source>a\\nb</source>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="en-CA" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah\\t\\n" restype="string">\n' +
                '        <source>e\\nh</source>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 2);

        test.equal(reslist[0].getSource(), "a\\nb");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar\\n\\nasdf");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "androidapp");
        test.equal(reslist[0].resType, "string");
        test.equal(reslist[0].getId(), "1");

        test.equal(reslist[1].getSource(), "e\\nh");
        test.equal(reslist[1].getSourceLocale(), "en-US");
        test.equal(reslist[1].getKey(), "huzzah\\t\\n");
        test.equal(reslist[1].getPath(), "foo/bar/j.java");
        test.equal(reslist[1].getProject(), "webapp");
        test.equal(reslist[1].resType, "string");
        test.equal(reslist[1].getId(), "2");

        test.done();
    },

    testResourceXliffParseWithPlurals: function(test) {
        test.expect(10);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="plural" datatype="x-android-resource" extype="one">\n' +
                '        <source>There is 1 object.</source>\n' +
                '      </trans-unit>\n' +
                '      <trans-unit id="2" resname="foobar" restype="plural" datatype="x-android-resource" extype="other">\n' +
                '        <source>There are {n} objects.</source>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        // console.log("x is " + JSON.stringify(x, undefined, 4));

        const reslist = x.getResources();

        // console.log("after get resources x is " + JSON.stringify(x, undefined, 4));

        test.ok(reslist);

        test.equal(reslist.length, 1);

        test.deepEqual(reslist[0].getSourcePlurals(), {
            one: "There is 1 object.",
            other: "There are {n} objects."
        });
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "androidapp");
        test.equal(reslist[0].resType, "plural");
        test.equal(reslist[0].getId(), "1");

        test.done();
    },

    testResourceXliffParseWithPluralsTranslated: function(test) {
        test.expect(13);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="es-US" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="plural" datatype="x-android-resource" extype="one">\n' +
                '        <source>There is 1 object.</source>\n' +
                '        <target>Hay 1 objeto.</target>\n' +
                '      </trans-unit>\n' +
                '      <trans-unit id="2" resname="foobar" restype="plural" datatype="x-android-resource" extype="other">\n' +
                '        <source>There are {n} objects.</source>\n' +
                '        <target>Hay {n} objetos.</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        // console.log("x is " + JSON.stringify(x, undefined, 4));

        const reslist = x.getResources();

        // console.log("after get resources x is " + JSON.stringify(x, undefined, 4));

        test.ok(reslist);

        test.equal(reslist.length, 1);

        test.deepEqual(reslist[0].getSourcePlurals(), {
            one: "There is 1 object.",
            other: "There are {n} objects."
        });
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "androidapp");
        test.equal(reslist[0].resType, "plural");
        test.equal(reslist[0].getId(), "1");
        test.equal(reslist[0].getOrigin(), "source");

        test.deepEqual(reslist[0].getTargetPlurals(), {
            one: "Hay 1 objeto.",
            other: "Hay {n} objetos."
        });
        test.equal(reslist[0].getTargetLocale(), "es-US");

        test.done();
    },

    testResourceXliffParseWithArrays: function(test) {
        test.expect(10);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="de-DE" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="array" datatype="x-android-resource" extype="0">\n' +
                '        <source>Zero</source>\n' +
                '      </trans-unit>\n' +
                '      <trans-unit id="2" resname="foobar" restype="array" datatype="x-android-resource" extype="1">\n' +
                '        <source>One</source>\n' +
                '      </trans-unit>\n' +
                '      <trans-unit id="3" resname="foobar" restype="array" datatype="x-android-resource" extype="2">\n' +
                '        <source>Two</source>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 1);

        test.deepEqual(reslist[0].getSourceArray(), ["Zero", "One", "Two"]);
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "androidapp");
        test.equal(reslist[0].resType, "array");
        test.ok(!reslist[0].getTargetArray());

        test.done();
    },

    testResourceXliffParseWithArraysTranslated: function(test) {
        test.expect(12);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="de-DE" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="array" datatype="x-android-resource" extype="0">\n' +
                '        <source>Zero</source>\n' +
                '        <target>Zero</target>\n' +
                '      </trans-unit>\n' +
                '      <trans-unit id="2" resname="foobar" restype="array" datatype="x-android-resource" extype="1">\n' +
                '        <source>One</source>\n' +
                '        <target>Eins</target>\n' +
                '      </trans-unit>\n' +
                '      <trans-unit id="3" resname="foobar" restype="array" datatype="x-android-resource" extype="2">\n' +
                '        <source>Two</source>\n' +
                '        <target>Zwei</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 1);

        test.deepEqual(reslist[0].getSourceArray(), ["Zero", "One", "Two"]);
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "androidapp");
        test.equal(reslist[0].resType, "array");
        test.equal(reslist[0].getOrigin(), "source");
        test.deepEqual(reslist[0].getTargetArray(), ["Zero", "Eins", "Zwei"]);
        test.equal(reslist[0].getTargetLocale(), "de-DE");

        test.done();
    },

    testResourceXliffParseWithArraysAndTranslations: function(test) {
        test.expect(20);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="res/values/arrays.xml" source-language="en-US" target-language="es-US" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah" restype="array" datatype="x-android-resource" extype="0">\n' +
                '        <source>This is element 0</source>\n' +
                '        <target>Este es 0</target>\n' +
                '      </trans-unit>\n' +
                '      <trans-unit id="3" resname="huzzah" restype="array" datatype="x-android-resource" extype="1">\n' +
                '        <source>This is element 1</source>\n' +
                '        <target>Este es 1</target>\n' +
                '      </trans-unit>\n' +
                '      <trans-unit id="4" resname="huzzah" restype="array" datatype="x-android-resource" extype="2">\n' +
                '        <source>This is element 2</source>\n' +
                '        <target>Este es 2</target>\n' +
                '      </trans-unit>\n' +
                '      <trans-unit id="5" resname="huzzah" restype="array" datatype="x-android-resource" extype="3">\n' +
                '        <source>This is element 3</source>\n' +
                '        <target>Este es 3</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 1);

        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getTargetLocale(), "es-US");
        test.equal(reslist[0].getKey(), "huzzah");
        test.equal(reslist[0].getPath(), "res/values/arrays.xml");
        test.equal(reslist[0].getProject(), "androidapp");
        test.equal(reslist[0].resType, "array");
        test.equal(reslist[0].getOrigin(), "source");

        let items = reslist[0].getSource();

        test.equal(items.length, 4);
        test.equal(items[0], "This is element 0");
        test.equal(items[1], "This is element 1");
        test.equal(items[2], "This is element 2");
        test.equal(items[3], "This is element 3");

        items = reslist[0].getTarget();

        test.equal(items.length, 4);
        test.equal(items[0], "Este es 0");
        test.equal(items[1], "Este es 1");
        test.equal(items[2], "Este es 2");
        test.equal(items[3], "Este es 3");

        test.done();
    },

    testResourceXliffParseWithArraysAndTranslationsPartial: function(test) {
        test.expect(20);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="res/values/arrays.xml" source-language="en-US" target-language="es-US" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="5" resname="huzzah" restype="array" datatype="x-android-resource" extype="3">\n' +
                '        <source>This is element 3</source>\n' +
                '        <target>Este es 3</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 1);

        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getTargetLocale(), "es-US");
        test.equal(reslist[0].getKey(), "huzzah");
        test.equal(reslist[0].getPath(), "res/values/arrays.xml");
        test.equal(reslist[0].getProject(), "androidapp");
        test.equal(reslist[0].resType, "array");
        test.equal(reslist[0].getOrigin(), "source");

        let items = reslist[0].getSourceArray();

        test.equal(items.length, 4);
        test.equal(items[0], null);
        test.equal(items[1], null);
        test.equal(items[2], null);
        test.equal(items[3], "This is element 3");

        items = reslist[0].getTargetArray();

        test.equal(items.length, 4);
        test.equal(items[0], null);
        test.equal(items[1], null);
        test.equal(items[2], null);
        test.equal(items[3], "Este es 3");

        test.done();
    },

    testResourceXliffParseWithComments: function(test) {
        test.expect(18);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="string">\n' +
                '        <source>Asdf asdf</source>\n' +
                '        <note>A very nice string</note>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah" restype="string">\n' +
                '        <source>baby baby</source>\n' +
                '        <note>Totally awesome.</note>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist[0].getSource(), "Asdf asdf");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "androidapp");
        test.equal(reslist[0].resType, "string");
        test.equal(reslist[0].getComment(), "A very nice string");
        test.equal(reslist[0].getId(), "1");

        test.equal(reslist[1].getSource(), "baby baby");
        test.equal(reslist[1].getSourceLocale(), "en-US");
        test.equal(reslist[1].getKey(), "huzzah");
        test.equal(reslist[1].getPath(), "foo/bar/j.java");
        test.equal(reslist[1].getProject(), "webapp");
        test.equal(reslist[1].resType, "string");
        test.equal(reslist[1].getComment(), "Totally awesome.");
        test.equal(reslist[1].getId(), "2");

        test.done();
    },

    testResourceXliffParseWithContext: function(test) {
        test.expect(19);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="de-DE" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="string" x-context="na na na">\n' +
                '        <source>Asdf asdf</source>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="fr-FR" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah" restype="string" x-context="asdf">\n' +
                '        <source>baby baby</source>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 2);

        test.equal(reslist[0].getSource(), "Asdf asdf");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "androidapp");
        test.equal(reslist[0].resType, "string");
        test.equal(reslist[0].getId(), "1");
        test.equal(reslist[0].getContext(), "na na na");

        test.equal(reslist[1].getSource(), "baby baby");
        test.equal(reslist[1].getSourceLocale(), "en-US");
        test.equal(reslist[1].getKey(), "huzzah");
        test.equal(reslist[1].getPath(), "foo/bar/j.java");
        test.equal(reslist[1].getProject(), "webapp");
        test.equal(reslist[1].resType, "string");
        test.equal(reslist[1].getId(), "2");
        test.equal(reslist[1].getContext(), "asdf");

        test.done();
    },

    testResourceXliffParseRealFile: function(test) {
        test.expect(3);

        const x = new ResourceXliff();
        test.ok(x);

        const str = fs.readFileSync("test/testfiles/test.xliff", "utf-8");

        x.parse(str);

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 4);

        test.done();
    },

    testResourceXliffParseEmptySource: function(test) {
        test.expect(12);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="de-DE" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="string" x-context="na na na">\n' +
                '        <source></source>\n' +
                '        <target>Baby Baby</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="fr-FR" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah" restype="string">\n' +
                '        <source>baby baby</source>\n' +
                '        <target>bebe bebe</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 1);

        test.equal(reslist[0].getSource(), "baby baby");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "huzzah");
        test.equal(reslist[0].getPath(), "foo/bar/j.java");
        test.equal(reslist[0].getProject(), "webapp");
        test.equal(reslist[0].resType, "string");
        test.equal(reslist[0].getId(), "2");

        test.equal(reslist[0].getTarget(), "bebe bebe");
        test.equal(reslist[0].getTargetLocale(), "fr-FR");

        test.done();
    },

    testResourceXliffParseEmptyTarget: function(test) {
        test.expect(19);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/asdf.java" source-language="en-US" target-language="de-DE" product-name="androidapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="1" resname="foobar" restype="string">\n' +
                '        <source>Asdf asdf</source>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="fr-FR" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah" restype="string">\n' +
                '        <source>baby baby</source>\n' +
                '        <target></target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 2);

        test.equal(reslist[0].getSource(), "Asdf asdf");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "androidapp");
        test.equal(reslist[0].resType, "string");
        test.equal(reslist[0].getId(), "1");
        test.equal(reslist[0].getOrigin(), "source");

        test.equal(reslist[1].getSource(), "baby baby");
        test.equal(reslist[1].getSourceLocale(), "en-US");
        test.equal(reslist[1].getKey(), "huzzah");
        test.equal(reslist[1].getPath(), "foo/bar/j.java");
        test.equal(reslist[1].getProject(), "webapp");
        test.equal(reslist[1].resType, "string");
        test.equal(reslist[1].getId(), "2");
        test.equal(reslist[1].getOrigin(), "source");

        test.done();
    },

    testResourceXliffParseWithMrkTagInTarget: function(test) {
        test.expect(12);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="fr-FR" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah" restype="string">\n' +
                '        <source>baby baby</source><seg-source><mrk mtype="seg" mid="4">baby baby</mrk></seg-source><target><mrk mtype="seg" mid="4">bebe bebe</mrk></target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 1);

        test.equal(reslist[0].getSource(), "baby baby");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "huzzah");
        test.equal(reslist[0].getPath(), "foo/bar/j.java");
        test.equal(reslist[0].getProject(), "webapp");
        test.equal(reslist[0].resType, "string");
        test.equal(reslist[0].getId(), "2");

        test.equal(reslist[0].getTarget(), "bebe bebe");
        test.equal(reslist[0].getTargetLocale(), "fr-FR");

        test.done();
    },

    testResourceXliffParseWithEmptyMrkTagInTarget: function(test) {
        test.expect(11);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="fr-FR" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah" restype="string">\n' +
                '        <source>baby baby</source><seg-source><mrk mtype="seg" mid="4">baby baby</mrk></seg-source><target><mrk mtype="seg" mid="4"/></target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 1);

        test.equal(reslist[0].getSource(), "baby baby");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "huzzah");
        test.equal(reslist[0].getPath(), "foo/bar/j.java");
        test.equal(reslist[0].getProject(), "webapp");
        test.equal(reslist[0].resType, "string");
        test.equal(reslist[0].getId(), "2");
        test.equal(reslist[0].getOrigin(), "source");

        test.done();
    },

    testResourceXliffParseWithMultipleMrkTagsInTargetEuro: function(test) {
        test.expect(12);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="fr-FR" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah" restype="string">\n' +
                '        <source>baby baby</source><seg-source><mrk mtype="seg" mid="4">baby baby</mrk></seg-source><target><mrk mtype="seg" mid="4">This is segment 1.</mrk> <mrk mtype="seg" mid="5">This is segment 2.</mrk> <mrk mtype="seg" mid="6">This is segment 3.</mrk></target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 1);

        test.equal(reslist[0].getSource(), "baby baby");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "huzzah");
        test.equal(reslist[0].getPath(), "foo/bar/j.java");
        test.equal(reslist[0].getProject(), "webapp");
        test.equal(reslist[0].resType, "string");
        test.equal(reslist[0].getId(), "2");

        test.equal(reslist[0].getTarget(), "This is segment 1. This is segment 2. This is segment 3.");
        test.equal(reslist[0].getTargetLocale(), "fr-FR");

        test.done();
    },

    testResourceXliffParseWithMultipleMrkTagsInTargetAsian: function(test) {
        test.expect(12);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="foo/bar/j.java" source-language="en-US" target-language="zh-Hans-CN" product-name="webapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="2" resname="huzzah" restype="string">\n' +
                '        <source>baby baby</source><seg-source><mrk mtype="seg" mid="4">baby baby</mrk></seg-source><target><mrk mtype="seg" mid="4">This is segment 1.</mrk> <mrk mtype="seg" mid="5">This is segment 2.</mrk> <mrk mtype="seg" mid="6">This is segment 3.</mrk></target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 1);

        test.equal(reslist[0].getSource(), "baby baby");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "huzzah");
        test.equal(reslist[0].getPath(), "foo/bar/j.java");
        test.equal(reslist[0].getProject(), "webapp");
        test.equal(reslist[0].resType, "string");
        test.equal(reslist[0].getId(), "2");

        test.equal(reslist[0].getTarget(), "This is segment 1.This is segment 2.This is segment 3.");
        test.equal(reslist[0].getTargetLocale(), "zh-Hans-CN");

        test.done();
    },

    testResourceXliffParsePreserveSourceWhitespace: function(test) {
        test.expect(9);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="UI/AddAnotherButtonView.m" source-language="en-US" target-language="es-US" product-name="iosapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="196" resname="      Add Another" restype="string" datatype="x-objective-c">\n' +
                '        <source>      Add Another</source>\n' +
                '        <target>Añadir Otro</target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 1);

        test.equal(reslist[0].getSource(), "      Add Another");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "      Add Another");
        test.equal(reslist[0].getPath(), "UI/AddAnotherButtonView.m");
        test.equal(reslist[0].getProject(), "iosapp");
        test.equal(reslist[0].resType, "string");

        test.done();
    },

    testResourceXliffParsePreserveTargetWhitespace: function(test) {
        test.expect(9);

        const x = new ResourceXliff();
        test.ok(x);

        x.parse(
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                '<xliff version="1.2">\n' +
                '  <file original="UI/AddAnotherButtonView.m" source-language="en-US" target-language="es-US" product-name="iosapp">\n' +
                '    <body>\n' +
                '      <trans-unit id="196" resname="      Add Another" restype="string" datatype="x-objective-c">\n' +
                '        <source>      Add Another</source>\n' +
                '        <target> Añadir    Otro  </target>\n' +
                '      </trans-unit>\n' +
                '    </body>\n' +
                '  </file>\n' +
                '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 1);

        test.equal(reslist[0].getTarget(), " Añadir    Otro  ");
        test.equal(reslist[0].getTargetLocale(), "es-US");
        test.equal(reslist[0].getKey(), "      Add Another");
        test.equal(reslist[0].getPath(), "UI/AddAnotherButtonView.m");
        test.equal(reslist[0].getProject(), "iosapp");
        test.equal(reslist[0].resType, "string");

        test.done();
    },

    testResourceXliffAddResourcesWithInstances: function(test) {
        test.expect(9);

        const x = new ResourceXliff({
            allowDups: true
        });
        test.ok(x);

        const res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "webapp"
        });

        const res2 = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "webapp",
            comment: "special translators note"
        });
        res.addInstance(res2);

        x.addResource(res);

        const reslist = x.getResources({
            reskey: "foobar"
        });

        test.ok(reslist);

        test.equal(reslist.length, 1);
        test.equal(reslist[0].getSource(), "Asdf asdf");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "webapp");
        test.ok(!reslist[0].getComment());

        test.done();
    },

    testResourceXliffAddMultipleResourcesAddInstances: function(test) {
        test.expect(17);

        const x = new ResourceXliff({
            allowDups: true
        });
        test.ok(x);

        let res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "webapp"
        });

        x.addResource(res);

        // this one has the same source, locale, key, and file
        // so it should create an instance of the first one
        res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            comment: "blah blah blah",
            project: "webapp"
        });

        x.addResource(res);

        const reslist = x.getResources({
            reskey: "foobar"
        });

        test.ok(reslist);

        test.equal(reslist.length, 1);
        test.equal(reslist[0].getSource(), "Asdf asdf");
        test.equal(reslist[0].getSourceLocale(), "en-US");
        test.equal(reslist[0].getKey(), "foobar");
        test.equal(reslist[0].getPath(), "foo/bar/asdf.java");
        test.equal(reslist[0].getProject(), "webapp");
        test.ok(!reslist[0].getComment());

        const instances = reslist[0].getInstances();
        test.ok(instances);
        test.equal(instances.length, 1);

        test.equal(instances[0].getSource(), "Asdf asdf");
        test.equal(instances[0].getSourceLocale(), "en-US");
        test.equal(instances[0].getKey(), "foobar");
        test.equal(instances[0].getPath(), "foo/bar/asdf.java");
        test.equal(instances[0].getProject(), "webapp");
        test.equal(instances[0].getComment(), "blah blah blah");

        test.done();
    },

    testResourceXliffGetTextWithResourcesWithInstances: function(test) {
        test.expect(2);

        const x = new ResourceXliff({
            allowDups: true
        });
        test.ok(x);

        let res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            project: "webapp"
        });

        x.addResource(res);

        // this one has the same source, locale, key, and file
        // so it should create an instance of the first one
        res = new ResourceString({
            source: "Asdf asdf",
            sourceLocale: "en-US",
            key: "foobar",
            pathName: "foo/bar/asdf.java",
            comment: "blah blah blah",
            project: "webapp"
        });

        x.addResource(res);

        const expected =
            '<?xml version="1.0" encoding="utf-8"?>\n' +
            '<xliff version="1.2">\n' +
            '  <file original="foo/bar/asdf.java" source-language="en-US" product-name="webapp">\n' +
            '    <body>\n' +
            '      <trans-unit id="1" resname="foobar" restype="string" datatype="plaintext">\n' +
            '        <source>Asdf asdf</source>\n' +
            '      </trans-unit>\n' +
            '      <trans-unit id="2" resname="foobar" restype="string" datatype="plaintext">\n' +
            '        <source>Asdf asdf</source>\n' +
            '        <note>blah blah blah</note>\n' +
            '      </trans-unit>\n' +
            '    </body>\n' +
            '  </file>\n' +
            '</xliff>';

        const actual = x.getText();
        diff(actual, expected);

        test.equal(actual, expected);

        test.done();
    },

    testResourceXliffParseCreateInstances: function(test) {
        test.expect(21);

        const x = new ResourceXliff({
            allowDups: true
        });
        test.ok(x);

        x.parse(
            '<?xml version="1.0" encoding="utf-8"?>\n' +
            '<xliff version="1.2">\n' +
            '  <file original="/a/b/asdf.js" source-language="en-US" target-language="fr-FR" product-name="iosapp">\n' +
            '    <body>\n' +
            '      <trans-unit id="2333" resname="asdf" restype="string" x-context="asdfasdf">\n' +
            '        <source>bababa</source>\n' +
            '        <target>ababab</target>\n' +
            '        <note>this is a comment</note>\n' +
            '      </trans-unit>\n' +
            '      <trans-unit id="2334" resname="asdf" restype="string" x-context="asdfasdf">\n' +
            '        <source>bababa</source>\n' +
            '        <target>ababab</target>\n' +
            '        <note>this is a different comment</note>\n' +
            '      </trans-unit>\n' +
            '    </body>\n' +
            '  </file>\n' +
            '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 1);

        test.equal(reslist[0].getTarget(), "ababab");
        test.equal(reslist[0].getTargetLocale(), "fr-FR");
        test.equal(reslist[0].getKey(), "asdf");
        test.equal(reslist[0].getPath(), "/a/b/asdf.js");
        test.equal(reslist[0].getProject(), "iosapp");
        test.equal(reslist[0].resType, "string");
        test.equal(reslist[0].context, "asdfasdf");
        test.equal(reslist[0].comment, "this is a comment");

        const instances = reslist[0].getInstances();
        test.ok(instances);
        test.equal(instances.length, 1);

        test.equal(instances[0].getTarget(), "ababab");
        test.equal(instances[0].getTargetLocale(), "fr-FR");
        test.equal(instances[0].getKey(), "asdf");
        test.equal(instances[0].getPath(), "/a/b/asdf.js");
        test.equal(instances[0].getProject(), "iosapp");
        test.equal(instances[0].resType, "string");
        test.equal(instances[0].context, "asdfasdf");
        test.equal(instances[0].comment, "this is a different comment");

        test.done();
    },

    testResourceXliffParseStillAcceptsAnnotatesAttr: function(test) {
        test.expect(21);

        const x = new ResourceXliff({
            allowDups: true
        });
        test.ok(x);

        x.parse(
            '<?xml version="1.0" encoding="utf-8"?>\n' +
            '<xliff version="1.2">\n' +
            '  <file original="/a/b/asdf.js" source-language="en-US" target-language="fr-FR" product-name="iosapp">\n' +
            '    <body>\n' +
            '      <trans-unit id="2333" resname="asdf" restype="string" x-context="asdfasdf">\n' +
            '        <source>bababa</source>\n' +
            '        <target>ababab</target>\n' +
            '        <note annotates="source">this is a comment</note>\n' +
            '      </trans-unit>\n' +
            '      <trans-unit id="2334" resname="asdf" restype="string" x-context="asdfasdf">\n' +
            '        <source>bababa</source>\n' +
            '        <target>ababab</target>\n' +
            '        <note annotates="source">this is a different comment</note>\n' +
            '      </trans-unit>\n' +
            '    </body>\n' +
            '  </file>\n' +
            '</xliff>');

        const reslist = x.getResources();

        test.ok(reslist);

        test.equal(reslist.length, 1);

        test.equal(reslist[0].getTarget(), "ababab");
        test.equal(reslist[0].getTargetLocale(), "fr-FR");
        test.equal(reslist[0].getKey(), "asdf");
        test.equal(reslist[0].getPath(), "/a/b/asdf.js");
        test.equal(reslist[0].getProject(), "iosapp");
        test.equal(reslist[0].resType, "string");
        test.equal(reslist[0].context, "asdfasdf");
        test.equal(reslist[0].comment, "this is a comment");

        const instances = reslist[0].getInstances();
        test.ok(instances);
        test.equal(instances.length, 1);

        test.equal(instances[0].getTarget(), "ababab");
        test.equal(instances[0].getTargetLocale(), "fr-FR");
        test.equal(instances[0].getKey(), "asdf");
        test.equal(instances[0].getPath(), "/a/b/asdf.js");
        test.equal(instances[0].getProject(), "iosapp");
        test.equal(instances[0].resType, "string");
        test.equal(instances[0].context, "asdfasdf");
        test.equal(instances[0].comment, "this is a different comment");

        test.done();
    }
};
