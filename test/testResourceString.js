/*
 * testResourceString.js - test the resource string object.
 *
 * Copyright © 2022-2023 JEDLSoft
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

import ResourceString from "../src/ResourceString.js";

export const testResourceString = {
    testResourceStringConstructorEmpty: function(test) {
        test.expect(1);

        const rs = new ResourceString();
        test.ok(rs);

        test.done();
    },

    testResourceStringConstructorNoProps: function(test) {
        test.expect(1);

        const rs = new ResourceString({});
        test.ok(rs);

        test.done();
    },

    testResourceStringConstructor: function(test) {
        test.expect(1);

        const rs = new ResourceString({
            key: "asdf",
            source: "This is a test",
            sourceLocale: "de-DE",
            pathName: "a/b/c.java"
        });
        test.ok(rs);

        test.done();
    },

    testResourceStringConstructorWithContext: function(test) {
        test.expect(1);

        const rs = new ResourceString({
            key: "asdf",
            source: "This is a test",
            sourceLocale: "de-DE",
            pathName: "a/b/c.java",
            context: "landscape"
        });
        test.ok(rs);

        test.done();
    },

    testResourceStringConstructorWithSourceAndTarget: function(test) {
        test.expect(1);

        const rs = new ResourceString({
            key: "asdf",
            source: "This is a test",
            sourceLocale: "en-US",
            pathName: "a/b/c.java",
            target: "Dies ist einen Test.",
            targetLocale: "de-DE"
        });
        test.ok(rs);

        test.done();
    },

    testResourceStringConstructorRightContents: function(test) {
        test.expect(7);

        const rs = new ResourceString({
            key: "asdf",
            source: "This is a test",
            sourceLocale: "de-DE",
            pathName: "a/b/c.java"
        });
        test.ok(rs);

        test.equal(rs.getKey(), "asdf");
        test.equal(rs.getSource(), "This is a test");
        test.equal(rs.getSourceLocale(), "de-DE");
        test.equal(rs.pathName, "a/b/c.java");
        test.ok(!rs.getTarget()); // source-only string
        test.ok(!rs.getTargetLocale());

        test.done();
    },

    testResourceStringConstructorSourceTargetRightContents: function(test) {
        test.expect(7);

        const rs = new ResourceString({
            key: "asdf",
            source: "This is a test",
            sourceLocale: "en-US",
            pathName: "a/b/c.java",
            target: "Dies ist einen Test.",
            targetLocale: "de-DE"
        });
        test.ok(rs);

        test.equal(rs.getKey(), "asdf");
        test.equal(rs.getSource(), "This is a test");
        test.equal(rs.sourceLocale, "en-US");
        test.equal(rs.pathName, "a/b/c.java");
        test.equal(rs.getTarget(), "Dies ist einen Test.");
        test.equal(rs.getTargetLocale(), "de-DE");

        test.done();
    },

    testResourceStringConstructorDefaults: function(test) {
        test.expect(6);

        const rs = new ResourceString({
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java"
        });
        test.ok(rs);

        // got the right one?
        test.equal(rs.getKey(), "asdf");

        // now the defaults
        test.equal(rs.sourceLocale, "en-US");
        test.equal(rs.origin, "source");
        test.equal(rs.datatype, "plaintext");
        test.equal(rs.resType, "string");

        test.done();
    },

    testResourceStringGetKey: function(test) {
        test.expect(2);

        const rs = new ResourceString({
            key: "foo",
            source: "source string",
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE"
        });
        test.ok(rs);
        test.equal(rs.getKey(), "foo");

        test.done();
    },

    testResourceStringAutoKey: function(test) {
        test.expect(2);

        const rs = new ResourceString({
            key: "foo",
            source: "source string",
            autoKey: true,
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE"
        });
        test.ok(rs);
        test.ok(rs.getAutoKey());

        test.done();
    },

    testResourceStringNotAutoKey: function(test) {
        test.expect(2);

        const rs = new ResourceString({
            key: "foo",
            source: "source string",
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE"
        });
        test.ok(rs);
        test.ok(!rs.getAutoKey());

        test.done();
    },

    testResourceStringGetKeyEmpty: function(test) {
        test.expect(2);

        const rs = new ResourceString();
        test.ok(rs);
        test.ok(!rs.getKey());

        test.done();
    },

    testResourceStringGetContext: function(test) {
        test.expect(2);

        const rs = new ResourceString({
            key: "foo",
            source: "source string",
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE",
            context: "landscape"
        });
        test.ok(rs);
        test.equal(rs.getContext(), "landscape");

        test.done();
    },

    testResourceStringGetContextEmpty: function(test) {
        test.expect(2);

        const rs = new ResourceString({
            key: "foo",
            source: "source string",
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE"
        });
        test.ok(rs);
        test.ok(!rs.getContext());

        test.done();
    },

    testResourceStringGetSource: function(test) {
        test.expect(2);

        const rs = new ResourceString({
            key: "foo",
            source: "source string",
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE"
        });
        test.ok(rs);
        test.equal(rs.getSource(), "source string");

        test.done();
    },

    testResourceStringSize: function(test) {
        test.expect(2);

        const rs = new ResourceString({
            key: "foo",
            source: "source string",
            pathName: "a/b/c.txt",
            locale: "de-DE"
        });

        test.ok(rs);
        test.equal(rs.size(), 1); // should always be 1

        test.done();
    },

    testResourceStringGetSourceEmpty: function(test) {
        test.expect(2);

        const rs = new ResourceString();
        test.ok(rs);
        test.ok(!rs.getSource());

        test.done();
    },

    testResourceStringClone: function(test) {
        test.expect(10);

        const rs = new ResourceString({
            project: "foo",
            context: "blah",
            targetLocale: "de-DE",
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rs);

        const rs2 = rs.clone();

        test.ok(rs2);
        test.equal(rs2.project, rs.project);
        test.equal(rs2.context, rs.context);
        test.equal(rs2.sourceLocale, rs.sourceLocale);
        test.equal(rs2.reskey, rs.reskey);
        test.deepEqual(rs2.getSource(), rs.getSource());
        test.equal(rs2.pathName, rs.pathName);
        test.equal(rs2.comment, rs.comment);
        test.equal(rs2.state, rs.state);

        test.done();
    },

    testResourceStringCloneWithOverrides: function(test) {
        test.expect(13);

        const rs = new ResourceString({
            project: "foo",
            context: "blah",
            key: "asdf",
            source: "This is a test",
            sourceLocale: "en-US",
            target: "Dies ist einen Test.",
            targetLocale: "de-DE",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rs);

        const rs2 = rs.clone({
            targetLocale: "fr-FR",
            target: "Ceci est une teste.",
            state: "asdfasdf"
        });

        test.ok(rs2);
        test.equal(rs2.project, rs.project);
        test.equal(rs2.context, rs.context);
        test.equal(rs2.sourceLocale, rs.sourceLocale);
        test.equal(rs2.reskey, rs.reskey);
        test.deepEqual(rs2.getSource(), rs.getSource());
        test.deepEqual(rs2.getTarget(), "Ceci est une teste.");
        test.equal(rs2.pathName, rs.pathName);
        test.equal(rs2.comment, rs.comment);
        test.equal(rs2.state, "asdfasdf");

        test.ok(rs2.getTargetLocale() !== rs.getTargetLocale());
        test.ok(rs2.getTarget() !== rs.getTarget());

        test.done();
    },

    testResourceStringEquals: function(test) {
        test.expect(3);

        const ra1 = new ResourceString({
            project: "foo",
            context: "blah",
            sourceLocale: "en-US",
            targetLocale: "de-DE",
            key: "asdf",
            source: "This is a test",
            target: "Eine Test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourceString({
            project: "foo",
            context: "blah",
            sourceLocale: "en-US",
            targetLocale: "de-DE",
            key: "asdf",
            source: "This is a test",
            target: "Eine Test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(ra1.equals(ra2));

        test.done();
    },

    testResourceStringEqualsNot: function(test) {
        test.expect(3);

        const ra1 = new ResourceString({
            project: "foo",
            context: "asdf",
            sourceLocale: "en-US",
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourceString({
            project: "foo",
            context: "blah",
            sourceLocale: "en-US",
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(!ra1.equals(ra2));

        test.done();
    },

    testResourceStringEqualsNotTarget: function(test) {
        test.expect(3);

        const ra1 = new ResourceString({
            project: "foo",
            context: "blah",
            sourceLocale: "en-US",
            key: "asdf",
            source: "This is a test",
            targetLocale: "de-DE",
            target: "Einen Test!",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourceString({
            project: "foo",
            context: "blah",
            sourceLocale: "en-US",
            key: "asdf",
            source: "This is a test",
            targetLocale: "de-AT",
            target: "Einen Test!",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(!ra1.equals(ra2));

        test.done();
    },

    testResourceStringEqualsDifferentFlavor: function(test) {
        test.expect(3);

        const ra1 = new ResourceString({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted",
            flavor: "vanilla"
        });

        const ra2 = new ResourceString({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: "This is a test",
            pathName: "x.java",
            comment: "asdf asdf asdf asdf asdf",
            state: "done"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(!ra1.equals(ra2));

        test.done();
    },

    testResourceStringEqualsIgnoreSomeFields: function(test) {
        test.expect(3);

        const ra1 = new ResourceString({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourceString({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: "This is a test",
            pathName: "x.java",
            comment: "asdf asdf asdf asdf asdf",
            state: "done"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(ra1.equals(ra2));

        test.done();
    },

    testResourceStringEqualsContentDifferent: function(test) {
        test.expect(3);

        const ra1 = new ResourceString({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourceString({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: "This is not a test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(!ra1.equals(ra2));

        test.done();
    },

    testResourceStringStaticHashKey: function(test) {
        test.expect(1);

        test.equal(ResourceString.hashKey("iosapp", "de-DE", "This is a test", "html", "chocolate"), "rs_iosapp_de-DE_This is a test_html_chocolate_");

        test.done();
    },

    testResourceStringStaticHashKeyWithContext: function(test) {
        test.expect(1);

        test.equal(ResourceString.hashKey("iosapp", "de-DE", "This is a test", "html", "chocolate", "context"), "rs_iosapp_de-DE_This is a test_html_chocolate_context");

        test.done();
    },

    testResourceStringStaticHashKeyMissingParts: function(test) {
        test.expect(1);

        test.equal(ResourceString.hashKey(undefined, "de-DE", undefined, undefined), "rs__de-DE____");

        test.done();
    },

    testResourceStringHashKey: function(test) {
        test.expect(2);

        const rs = new ResourceString({
            project: "iosapp",
            key: "This is a test",
            source: "This is a test",
            sourceLocale: "en-US",
            target: "Dies ist einen Test.",
            targetLocale: "de-DE",
            pathName: "a/b/c.java",
            datatype: "html"
        });
        test.ok(rs);

        test.equal(rs.hashKey(), "rs_iosapp_de-DE_This is a test_html__");

        test.done();
    },

    testResourceStringHashKeyWithFlavor: function(test) {
        test.expect(2);

        const rs = new ResourceString({
            project: "iosapp",
            key: "This is a test",
            source: "This is a test",
            sourceLocale: "en-US",
            target: "Dies ist einen Test.",
            targetLocale: "de-DE",
            pathName: "a/b/c.java",
            datatype: "html",
            flavor: "chocolate"
        });
        test.ok(rs);

        test.equal(rs.hashKey(), "rs_iosapp_de-DE_This is a test_html_chocolate_");

        test.done();
    },

    testResourceStringHashKeyWithFlavorAndContext: function(test) {
        test.expect(2);

        const rs = new ResourceString({
            project: "iosapp",
            key: "This is a test",
            source: "This is a test",
            sourceLocale: "en-US",
            target: "Dies ist einen Test.",
            targetLocale: "de-DE",
            pathName: "a/b/c.java",
            datatype: "html",
            flavor: "chocolate",
            context: "context"
        });
        test.ok(rs);

        test.equal(rs.hashKey(), "rs_iosapp_de-DE_This is a test_html_chocolate_context");

        test.done();
    },

    testResourceStringSourceOnlyHashKey: function(test) {
        test.expect(2);

        const rs = new ResourceString({
            project: "iosapp",
            key: "This is a test",
            source: "This is a test",
            sourceLocale: "en-US",
            pathName: "a/b/c.java",
            datatype: "html"
        });
        test.ok(rs);

        test.equal(rs.hashKey(), "rs_iosapp_en-US_This is a test_html__");

        test.done();
    },

    testResourceStringIsInstanceSame: function(test) {
        test.expect(3);

        const rs = new ResourceString({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            resType: "string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: "This is a test"
        });
        test.ok(rs);

        const dup = new ResourceString({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            resType: "string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: "This is a test"
        });
        test.ok(dup);

        test.ok(rs.isInstance(dup));

        test.done();
    },

    testResourceStringIsInstanceDifferingOnlyInWhitespace: function(test) {
        test.expect(3);

        const rs = new ResourceString({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            resType: "string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: "This is a test "
        });
        test.ok(rs);

        const dup = new ResourceString({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            resType: "string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: "This \tis a   test    "
        });
        test.ok(dup);

        test.ok(rs.isInstance(dup));

        test.done();
    },

    testResourceStringIsInstanceDifferingInSource: function(test) {
        test.expect(3);

        const rs = new ResourceString({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            resType: "string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: "This is a test"
        });
        test.ok(rs);

        const dup = new ResourceString({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            resType: "string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: "This is a test."
        });
        test.ok(dup);

        test.ok(!rs.isInstance(dup));

        test.done();
    },

    testResourceStringSetSource: function(test) {
        test.expect(3);

        const rs = new ResourceString({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            resType: "string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: "source string",
            target: "target string"
        });
        test.ok(rs);

        test.deepEqual(rs.getSource(), "source string");
        rs.setSource("other source");
        test.deepEqual(rs.getSource(), "other source");

        test.done();
    },

    testResourceStringSetSourceIsDirty: function(test) {
        test.expect(4);

        const rs = new ResourceString({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            resType: "string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: "source string",
            target: "target string"
        });
        test.ok(rs);

        test.deepEqual(rs.getSource(), "source string");
        test.ok(!rs.isDirty());

        rs.setSource("other source");
        test.ok(rs.isDirty());

        test.done();
    },

    testResourceStringSetTarget: function(test) {
        test.expect(3);

        const rs = new ResourceString({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            resType: "string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: "source string",
            target: "target string"
        });
        test.ok(rs);

        test.deepEqual(rs.getTarget(), "target string");
        rs.setTarget("other target");
        test.deepEqual(rs.getTarget(), "other target");

        test.done();
    },

    testResourceStringSetTargetIsDirty: function(test) {
        test.expect(4);

        const rs = new ResourceString({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            resType: "string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: "source string",
            target: "target string"
        });
        test.ok(rs);

        test.deepEqual(rs.getTarget(), "target string");
        test.ok(!rs.isDirty());

        rs.setTarget("other target");
        test.ok(rs.isDirty());

        test.done();
    }

};