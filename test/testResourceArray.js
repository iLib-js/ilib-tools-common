/*
 * testResourceArray.js - test the resource array object.
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

import ResourceArray from "../src/ResourceArray.js";

export const testResourceArray = {
    testResourceArrayConstructorEmpty: function(test) {
        test.expect(1);

        const ra = new ResourceArray();
        test.ok(ra);

        test.done();
    },

    testResourceArrayConstructorNoProps: function(test) {
        test.expect(1);

        const ra = new ResourceArray({});
        test.ok(ra);

        test.done();
    },

    testResourceArrayConstructorEmptyNoSize: function(test) {
        test.expect(2);

        const ra = new ResourceArray();
        test.ok(ra);
        test.equal(ra.size(), 0);

        test.done();
    },

    testResourceArrayConstructor: function(test) {
        test.expect(1);

        const ra = new ResourceArray({
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            sourceLocale: "de-DE",
            pathName: "a/b/c.java"
        });
        test.ok(ra);

        test.done();
    },

    testResourceArrayConstructorRightContents: function(test) {
        test.expect(5);

        const ra = new ResourceArray({
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            sourceLocale: "de-DE",
            pathName: "a/b/c.java"
        });
        test.ok(ra);

        test.equal(ra.getKey(), "asdf");
        test.deepEqual(ra.getSource(), ["This is a test", "This is also a test", "This is not"]);
        test.equal(ra.getSourceLocale(), "de-DE");
        test.equal(ra.pathName, "a/b/c.java");

        test.done();
    },

    testResourceArrayConstructorFull: function(test) {
        test.expect(1);

        const ra = new ResourceArray({
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            sourceLocale: "en-US",
            target: ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."],
            targetLocale: "de-DE",
            pathName: "a/b/c.java"
        });
        test.ok(ra);

        test.done();
    },

    testResourceArrayConstructorFullRightContents: function(test) {
        test.expect(7);

        const ra = new ResourceArray({
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            sourceLocale: "en-US",
            target: ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."],
            targetLocale: "de-DE",
            pathName: "a/b/c.java"
        });
        test.ok(ra);

        test.equal(ra.getKey(), "asdf");
        test.deepEqual(ra.getSource(), ["This is a test", "This is also a test", "This is not"]);
        test.equal(ra.getSourceLocale(), "en-US");
        test.deepEqual(ra.getTarget(), ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."]);
        test.equal(ra.getTargetLocale(), "de-DE");
        test.equal(ra.pathName, "a/b/c.java");

        test.done();
    },

    testResourceArrayConstructorBackwardsCompatible: function(test) {
        test.expect(7);

        const ra = new ResourceArray({
            key: "asdf",
            sourceArray: ["This is a test", "This is also a test", "This is not"],
            sourceLocale: "en-US",
            targetArray: ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."],
            targetLocale: "de-DE",
            pathName: "a/b/c.java"
        });
        test.ok(ra);

        test.equal(ra.getKey(), "asdf");
        test.deepEqual(ra.getSourceArray(), ["This is a test", "This is also a test", "This is not"]);
        test.equal(ra.getSourceLocale(), "en-US");
        test.deepEqual(ra.getTargetArray(), ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."]);
        test.equal(ra.getTargetLocale(), "de-DE");
        test.equal(ra.pathName, "a/b/c.java");

        test.done();
    },

    testResourceArrayConstructorDefaults: function(test) {
        test.expect(8);

        const ra = new ResourceArray({
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.java"
        });
        test.ok(ra);

        // got the right one?
        test.equal(ra.getKey(), "asdf");

        // now the defaults
        test.equal(ra.getSourceLocale(), "en-US");
        test.equal(ra.origin, "source");
        test.equal(ra.datatype, "x-android-resource");
        test.equal(ra.resType, "array");

        test.ok(!ra.getTargetLocale());
        test.ok(!ra.target);

        test.done();
    },

    testResourceArrayConstructorRightSize: function(test) {
        test.expect(2);

        const ra = new ResourceArray({
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            sourceLocale: "de-DE",
            pathName: "a/b/c.java"
        });
        test.ok(ra);

        test.equal(ra.size(), 3);

        test.done();
    },

    testResourceArrayGetKey: function(test) {
        test.expect(2);

        const ra = new ResourceArray({
            key: "foo",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE"
        });
        test.ok(ra);
        test.equal(ra.getKey(), "foo");

        test.done();
    },

    testResourceArrayGetKeyEmpty: function(test) {
        test.expect(2);

        const ra = new ResourceArray();
        test.ok(ra);
        test.ok(!ra.getKey());

        test.done();
    },

    testResourceStringGetContext: function(test) {
        test.expect(2);

        const ra = new ResourceArray({
            key: "foo",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE",
            context: "landscape"
        });
        test.ok(ra);
        test.equal(ra.getContext(), "landscape");

        test.done();
    },

    testResourceStringGetContextEmpty: function(test) {
        test.expect(2);

        const ra = new ResourceArray({
            key: "foo",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE"
        });
        test.ok(ra);
        test.ok(!ra.getContext());

        test.done();
    },

    testResourceArrayGetSource: function(test) {
        test.expect(2);

        const ra = new ResourceArray({
            key: "foo",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE"
        });
        test.ok(ra);
        test.deepEqual(ra.getSource(), ["This is a test", "This is also a test", "This is not"]);

        test.done();
    },

    testResourceArrayGetItemArrayEmpty: function(test) {
        test.expect(2);

        const ra = new ResourceArray();
        test.ok(ra);
        test.deepEqual(ra.getSource(), []);

        test.done();
    },

    testResourceArrayGetTargetArrayEmpty: function(test) {
        test.expect(2);

        const ra = new ResourceArray();
        test.ok(ra);
        test.ok(!ra.getTarget());

        test.done();
    },

    testResourceArrayGetItem: function(test) {
        test.expect(4);

        const ra = new ResourceArray({
            key: "foo",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE"
        });
        test.ok(ra);
        test.equal(ra.getSourceItem(0), "This is a test");
        test.equal(ra.getSourceItem(1), "This is also a test");
        test.equal(ra.getSourceItem(2), "This is not");

        test.done();
    },

    testResourceArrayGetTarget: function(test) {
        test.expect(4);

        const ra = new ResourceArray({
            key: "foo",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.txt",
            sourceLocale: "en-US",
            target: ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."],
            targetLocale: "de-DE"
        });
        test.ok(ra);
        test.equal(ra.getTargetItem(0), "Dies ist einen Test.");
        test.equal(ra.getTargetItem(1), "Dies ist auch einen Test.");
        test.equal(ra.getTargetItem(2), "Dies ist nicht.");

        test.done();
    },

    testResourceArrayGetItemNegativeIndex: function(test) {
        test.expect(2);

        const ra = new ResourceArray({
            key: "foo",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE"
        });
        test.ok(ra);
        test.ok(!ra.getSourceItem(-1));

        test.done();
    },

    testResourceArrayGetTargetNegativeIndex: function(test) {
        test.expect(2);

        const ra = new ResourceArray({
            key: "foo",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.txt",
            sourceLocale: "en-US",
            target: ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."],
            targetLocale: "de-DE"
        });
        test.ok(ra);
        test.ok(!ra.getTargetItem(-1));

        test.done();
    },

    testResourceArrayGetItemIndexTooBig: function(test) {
        test.expect(2);

        const ra = new ResourceArray({
            key: "foo",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE"
        });
        test.ok(ra);
        test.ok(!ra.getSourceItem(6));

        test.done();
    },

    testResourceArrayGetTargetIndexTooBig: function(test) {
        test.expect(2);

        const ra = new ResourceArray({
            key: "foo",
            source: ["This is a test", "This is also a test", "This is not"],
            target: ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."],
            targetLocale: "de-DE",
            pathName: "a/b/c.txt",
            sourceLocale: "en-US"
        });
        test.ok(ra);
        test.ok(!ra.getTargetItem(6));

        test.done();
    },

    testResourceArrayGetIndexNotWhole: function(test) {
        test.expect(2);

        const ra = new ResourceArray({
            key: "foo",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE"
        });
        test.ok(ra);
        test.ok(!ra.getSourceItem(2.6));

        test.done();
    },

    testResourceArrayClone: function(test) {
        test.expect(12);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "en-US",
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted",
            target: ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."],
            targetLocale: "de-DE"
        });
        test.ok(ra);

        const ra2 = ra.clone();

        test.ok(ra2);
        test.equal(ra2.project, ra.project);
        test.equal(ra2.context, ra.context);
        test.equal(ra2.getSourceLocale(), ra.getSourceLocale());
        test.equal(ra2.reskey, ra.reskey);
        test.deepEqual(ra2.source, ra.source);
        test.equal(ra2.pathName, ra.pathName);
        test.equal(ra2.comment, ra.comment);
        test.equal(ra2.state, ra.state);
        test.equal(ra2.getTargetLocale(), ra.getTargetLocale());
        test.deepEqual(ra2.target, ra.target);

        test.done();
    },

    testResourceArrayCloneWithOverrides: function(test) {
        test.expect(12);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(ra);

        const ra2 = ra.clone({
            sourceLocale: "fr-FR",
            state: "asdfasdf",
            target: ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."],
            targetLocale: "de-DE"
        });

        test.ok(ra2);
        test.equal(ra2.project, ra.project);
        test.equal(ra2.context, ra.context);
        test.equal(ra2.getSourceLocale(), "fr-FR");
        test.equal(ra2.reskey, ra.reskey);
        test.deepEqual(ra2.array, ra.array);
        test.equal(ra2.pathName, ra.pathName);
        test.equal(ra2.comment, ra.comment);
        test.equal(ra2.state, "asdfasdf");
        test.equal(ra2.getTargetLocale(), "de-DE");
        test.deepEqual(ra2.target, ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."]);

        test.done();
    },

    testResourceArrayAddSourceString: function(test) {
        test.expect(2);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(ra);

        ra.addSource(3, "This is the third one")

        test.equal(ra.getSourceItem(3), "This is the third one");

        test.done();
    },

    testResourceArrayAddTargetString: function(test) {
        test.expect(2);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted",
            target: ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."],
            targetLocale: "de-DE"
        });
        test.ok(ra);

        ra.addTarget(3, "This is the third one")

        test.equal(ra.getTargetItem(3), "This is the third one");

        test.done();
    },

    testResourceArrayAddStringReplace: function(test) {
        test.expect(3);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(ra);

        test.equal(ra.getSourceItem(2), "This is not");

        ra.addSource(2, "This isn't a test")

        test.equal(ra.getSourceItem(2), "This isn't a test");

        test.done();
    },

    testResourceArrayAddTargetReplace: function(test) {
        test.expect(3);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted",
            target: ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."],
            targetLocale: "de-DE"
        });
        test.ok(ra);

        test.equal(ra.getTargetItem(2), "Dies ist nicht.");

        ra.addTarget(2, "Dies ist nicht einen Test.")

        test.equal(ra.getTargetItem(2), "Dies ist nicht einen Test.");

        test.done();
    },

    testResourceArrayAddStringSize: function(test) {
        test.expect(3);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(ra);

        test.equal(ra.size(), 3);

        ra.addSource(3, "This is the third one")

        test.equal(ra.size(), 4);

        test.done();
    },

    testResourceArrayAddTargetSize: function(test) {
        test.expect(3);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "en-US",
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted",
            target: ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."],
            targetLocale: "de-DE"
        });
        test.ok(ra);

        test.equal(ra.size(), 3);

        ra.addTarget(3, "This is the third one")

        test.equal(ra.size(), 4);

        test.done();
    },

    testResourceArrayAddStringUndefined: function(test) {
        test.expect(3);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(ra);

        test.equal(ra.getSourceItem(1), "This is also a test");

        ra.addSource(1, undefined)

        test.equal(ra.getSourceItem(1), "This is also a test");

        test.done();
    },

    testResourceArrayAddTargetUndefined: function(test) {
        test.expect(3);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted",
            target: ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."],
            targetLocale: "de-DE"
        });
        test.ok(ra);

        test.equal(ra.getTargetItem(1), "Dies ist auch einen Test.");

        ra.addTarget(1, undefined)

        test.equal(ra.getTargetItem(1), "Dies ist auch einen Test.");

        test.done();
    },

    testResourceArrayAddStringNoIndex: function(test) {
        test.expect(3);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(ra);

        test.equal(ra.size(), 3);

        ra.addSource(undefined, "foobar")

        test.equal(ra.size(), 3);

        test.done();
    },

    testResourceArrayAddTargetNoIndex: function(test) {
        test.expect(3);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted",
            target: ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."],
            targetLocale: "de-DE"
        });
        test.ok(ra);

        test.equal(ra.size(), 3);

        ra.addTarget(undefined, "foobar")

        test.equal(ra.size(), 3);

        test.done();
    },

    testResourceArrayAddStringEmpty: function(test) {
        test.expect(3);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(ra);

        test.equal(ra.size(), 0);

        ra.addSource(0, "foobar")

        test.equal(ra.size(), 1);

        test.done();
    },

    testResourceArrayAddStringEmptyRightContents: function(test) {
        test.expect(3);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(ra);

        test.ok(!ra.getSourceItem(0));

        ra.addSource(0, "foobar")

        test.equal(ra.getSourceItem(0), "foobar");

        test.done();
    },

    testResourceArrayAddTargetEmptyRightContents: function(test) {
        test.expect(3);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(ra);

        test.ok(!ra.getTargetItem(0));

        ra.addTarget(0, "foobar")

        test.equal(ra.getTargetItem(0), "foobar");

        test.done();
    },

    testResourceArrayAddStringMultiple: function(test) {
        test.expect(6);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["This is a test", "This is also a test", "This is not"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(ra);

        ra.addSource(3, "This is the third one")
        ra.addSource(4, "This is the fourth one")

        test.equal(ra.getSourceItem(0), "This is a test");
        test.equal(ra.getSourceItem(1), "This is also a test");
        test.equal(ra.getSourceItem(2), "This is not");
        test.equal(ra.getSourceItem(3), "This is the third one");
        test.equal(ra.getSourceItem(4), "This is the fourth one");

        test.done();
    },

    testResourceArrayEqualsSourceOnly: function(test) {
        test.expect(3);

        const ra1 = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["a", "b", "c"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["a", "b", "c"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(ra1.equals(ra2));

        test.done();
    },

    testResourceArrayEqualsFull: function(test) {
        test.expect(3);

        const ra1 = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["a", "b", "c"],
            target: ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."],
            targetLocale: "de-DE",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["a", "b", "c"],
            target: ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."],
            targetLocale: "de-DE",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(ra1.equals(ra2));

        test.done();
    },

    testResourceArrayEqualsSourceOnlyNot: function(test) {
        test.expect(3);

        const ra1 = new ResourceArray({
            project: "foo",
            context: "asdf",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["a", "b", "c"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["a", "b", "c"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(!ra1.equals(ra2));

        test.done();
    },

    testResourceArrayEqualsFullNot: function(test) {
        test.expect(3);

        const ra1 = new ResourceArray({
            project: "foo",
            context: "asdf",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["a", "b", "c"],
            target: ["Dies ist einen Test.", "Dies ist auch einen Test.", "Dies ist nicht."],
            targetLocale: "de-DE",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourceArray({
            project: "foo",
            context: "asdf",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["a", "b", "c"],
            target: ["Dies ist einen Test.", "Dies ist auch Test.", "Dies ist nicht."],
            targetLocale: "de-DE",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(!ra1.equals(ra2));

        test.done();
    },

    testResourceArrayEqualsIgnoreSomeFields: function(test) {
        test.expect(3);

        const ra1 = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["a", "b", "c"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["a", "b", "c"],
            pathName: "x.java",
            comment: "asdf asdf asdf asdf asdf",
            state: "done"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(ra1.equals(ra2));

        test.done();
    },

    testResourceArrayEqualsContentDifferent: function(test) {
        test.expect(3);

        const ra1 = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["a", "b", "c"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: ["a", "b", "d"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(!ra1.equals(ra2));

        test.done();
    },

    testResourceArrayStaticHashKey: function(test) {
        test.expect(1);

        test.equal(ResourceArray.hashKey("androidapp", "foo", "de-DE", "This is a test"), "ra_androidapp_foo_de-DE_This is a test");

        test.done();
    },

    testResourceArrayStaticHashKeyMissingParts: function(test) {
        test.expect(1);

        test.equal(ResourceArray.hashKey(undefined, undefined, "de-DE", undefined), "ra___de-DE_");

        test.done();
    },

    testResourceArrayHashKeySourceOnly: function(test) {
        test.expect(2);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "en-US",
            key: "asdf",
            source: ["a", "b", "c"],
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(ra);

        test.equal(ra.hashKey(), "ra_foo_blah_en-US_asdf");
        test.done();

    },

    testResourceArrayHashKeySourceOnly: function(test) {
        test.expect(2);

        const ra = new ResourceArray({
            project: "foo",
            context: "blah",
            sourceLocale: "en-US",
            key: "asdf",
            source: ["a", "b", "c"],
            target: ["Dies ist einen Test.", "Dies ist auch Test.", "Dies ist nicht."],
            targetLocale: "de-DE",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(ra);

        test.equal(ra.hashKey(), "ra_foo_blah_de-DE_asdf");

        test.done();
    },

    testResourceArrayIsInstanceSame: function(test) {
        test.expect(3);

        const rs = new ResourceArray({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            resType: "string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: ["a", "b", "c"]
        });
        test.ok(rs);

        const dup = new ResourceArray({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            resType: "string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: ["a", "b", "c"]
        });
        test.ok(dup);

        test.ok(rs.isInstance(dup));

        test.done();
    },

    testResourceArrayIsInstanceDifferingOnlyInWhitespace: function(test) {
        test.expect(3);

        const rs = new ResourceArray({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            resType: "string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: ["a b c", "b", "c"]
        });
        test.ok(rs);

        const dup = new ResourceArray({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            resType: "string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: [" a   b\t\tc  \t", " b", "c "]
        });
        test.ok(dup);

        test.ok(rs.isInstance(dup));

        test.done();
    },

    testResourceArrayIsInstanceDifferingInSource: function(test) {
        test.expect(3);

        const rs = new ResourceArray({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            resType: "string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: ["a", "b", "c"]
        });
        test.ok(rs);

        const dup = new ResourceArray({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            resType: "string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: ["a", "b", "cd"]
        });
        test.ok(dup);

        test.ok(!rs.isInstance(dup));

        test.done();
    }
};
