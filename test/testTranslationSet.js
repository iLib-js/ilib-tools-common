/*
 * testTranslationSet.js - test the Translation Set object.
 *
 * Copyright © 2016-2017, 2022 HealthTap, Inc. and JEDLSoft
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

import TranslationSet from "../src/TranslationSet.js";
import ResourceString from "../src/ResourceString.js";
import ResourceArray from "../src/ResourceArray.js";

export const testTranslationSet = {
     testTranslationSetConstructor: function(test) {
        test.expect(1);

        const ts = new TranslationSet();
        test.ok(ts);
        test.done();
    },

    testTranslationSetRightSourceLocaleDefault: function(test) {
        test.expect(1);

        const ts = new TranslationSet();

        test.equal(ts.sourceLocale, "zxx-XX");
        test.done();
    },

    testTranslationSetGetEmpty: function(test) {
        test.expect(1);

        const ts = new TranslationSet();

        const r = ts.get("asdf");

        test.ok(!r);
        test.done();
    },

    testTranslationSetGet: function(test) {
        test.expect(2);

        const ts = new TranslationSet();
        const res = new ResourceString({
            key: "asdf",
            project: "foo",
            source: "This is a test",
            target: "Dies ist einen Test.",
            datatype: "html"
        });

        ts.add(res);

        const r = ts.get(ResourceString.hashKey("foo", res.getSourceLocale(), "asdf", "html"));

        test.equal(r.getKey(), "asdf");
        test.equal(r.getSource(), "This is a test");
        test.done();
    },

    testTranslationIsDirtyNew: function(test) {
        test.expect(1);

        const ts = new TranslationSet();

        test.ok(!ts.isDirty());

        test.done();
    },

    testTranslationIsDirtyTrue: function(test) {
        test.expect(1);

        const ts = new TranslationSet();
        const res = new ResourceString({
            key: "asdf",
            source: "This is a test"
        });

        ts.add(res);

        test.ok(ts.isDirty());

        test.done();
    },

    testTranslationIsDirtyFalse: function(test) {
        test.expect(1);

        const ts = new TranslationSet();
        const res = new ResourceString({
            key: "asdf",
            source: "This is a test"
        });

        ts.add(res);
        ts.setClean();

        test.ok(!ts.isDirty());

        test.done();
    },

    testTranslationIsDirtyTrue2: function(test) {
        test.expect(2);

        const ts = new TranslationSet();
        let res = new ResourceString({
            key: "asdf",
            source: "This is a test"
        });

        ts.add(res);
        ts.setClean();

        test.ok(!ts.isDirty());

        res = new ResourceString({
            key: "asdfasdfasdf",
            source: "This is another test"
        });

        ts.add(res);

        test.ok(ts.isDirty());

        test.done();
    },

    testTranslationIsDirtyAddSameResourceTwice: function(test) {
        test.expect(2);

        const ts = new TranslationSet();
        const res = new ResourceString({
            key: "asdf",
            source: "This is a test"
        });

        ts.add(res);
        ts.setClean();

        test.ok(!ts.isDirty());

        // should not set the flag to dirty because the resource
        // is already there, so nothing is added
        ts.add(res);

        test.ok(!ts.isDirty());

        test.done();
    },

    testTranslationIsDirtyUpdateSource: function(test) {
        test.expect(2);

        const ts = new TranslationSet();
        let res = new ResourceString({
            key: "asdf",
            project: "foo",
            sourceLocale: "en-US",
            source: "This is a test"
        });

        ts.add(res);
        ts.setClean();

        test.ok(!ts.isDirty());

        res = new ResourceString({
            key: "asdf",
            project: "foo",
            sourceLocale: "en-US",
            source: "This is a new test"
        });

        // should not set the flag to dirty because the resource
        // is already there, so nothing is added
        ts.add(res);

        test.ok(ts.isDirty());

        test.done();
    },

    testTranslationSetGetIgnoreContext: function(test) {
        test.expect(3);

        const ts = new TranslationSet();
        let res = new ResourceString({
            key: "asdf",
            source: "This is a test"
            // no context
        });

        ts.add(res);

        // should not overwrite the one above
        res = new ResourceString({
            key: "asdf",
            source: "This is a test",
            target: "Dies ist einen Test.",
            context: "different"
        });

        ts.add(res);

        const r = ts.get(ResourceString.hashKey(undefined, res.getSourceLocale(), "asdf", "plaintext"));

        test.equal(r.getKey(), "asdf");
        test.equal(r.getSource(), "This is a test");
        test.ok(!r.getContext());

        test.done();
    },

    testTranslationSetGetDifferentTypesSameKeyIsOkay: function(test) {
        test.expect(6);

        const ts = new TranslationSet();
        const res1 = new ResourceArray({
            key: "asdf",
            sourceArray: ["This is a test", "this too"]
        });

        ts.add(res1);

        const res2 = new ResourceString({
            key: "asdf", // same key
            source: "This is a test"
        });

        ts.add(res2);

        // default type is string
        let r = ts.get(ResourceString.hashKey(undefined, res2.getSourceLocale(), "asdf", "plaintext"));

        test.equal(r.getKey(), "asdf");
        test.equal(r.resType, "string");
        test.equal(r.getSource(), "This is a test");

        r = ts.get(ResourceArray.hashKey(undefined, undefined, res1.getSourceLocale(), "asdf"));

        test.equal(r.getKey(), "asdf");
        test.equal(r.resType, "array");
        test.deepEqual(r.getSource(), ["This is a test", "this too"]);

        test.done();
    },

    testTranslationSetGetUndefined: function(test) {
        test.expect(1);

        const ts = new TranslationSet();
        const r = ts.get();

        test.ok(!r);
        test.done();
    },

    testTranslationSetGetFromMany: function(test) {
        test.expect(4);

        const ts = new TranslationSet();
        let res = new ResourceString({
            key: "asdf",
            source: "This is a test"
        });

        ts.add(res);

        res = new ResourceString({
            key: "qwerty",
            source: "This is another test"
        });

        ts.add(res);

        let r = ts.get(ResourceString.hashKey(undefined, res.getSourceLocale(), "asdf", "plaintext"));

        test.equal(r.getKey(), "asdf");
        test.equal(r.getSource(), "This is a test");

        r = ts.get(ResourceString.hashKey(undefined, res.getSourceLocale(), "qwerty", "plaintext"));

        test.equal(r.getKey(), "qwerty");
        test.equal(r.getSource(), "This is another test");
        test.done();
    },

    testTranslationSetGetBySource: function(test) {
        test.expect(2);

        const ts = new TranslationSet();
        const res = new ResourceString({
            key: "asdf",
            autoKey: true,
            source: "This is a test"
        });

        ts.add(res);

        const r = ts.getBySource("This is a test");

        test.equal(r.getKey(), "asdf");
        test.equal(r.getSource(), "This is a test");
        test.done();
    },

    testTranslationSetGetBySourceNonAutoKey: function(test) {
        test.expect(1);

        const ts = new TranslationSet();
        const res = new ResourceString({
            key: "asdf",
            source: "This is a test"
        });

        ts.add(res);

        const r = ts.getBySource("This is a test");

        test.ok(!r);

        test.done();
    },

    testTranslationSetGetBySourceFromMany: function(test) {
        test.expect(4);

        const ts = new TranslationSet();
        let res = new ResourceString({
            key: "asdf",
            autoKey: true,
            source: "This is a test"
        });

        ts.add(res);

        res = new ResourceString({
            key: "qwerty",
            autoKey: true,
            source: "This is another test"
        });

        ts.add(res);

        let r = ts.getBySource("This is a test");

        test.equal(r.getKey(), "asdf");
        test.equal(r.getSource(), "This is a test");

        r = ts.getBySource("This is another test");

        test.equal(r.getKey(), "qwerty");
        test.equal(r.getSource(), "This is another test");
        test.done();
    },

    testTranslationSetGetBySourceUndefined: function(test) {
        test.expect(1);

        const ts = new TranslationSet();
        const r = ts.getBySource();

        test.ok(!r);
        test.done();
    },

    testTranslationSetGetBySourceWithContext: function(test) {
        test.expect(6);

        const ts = new TranslationSet();
        let res = new ResourceString({
            key: "asdf",
            autoKey: true,
            source: "This is a test"
            // no context
        });

        ts.add(res);

        res = new ResourceString({
            key: "asdf",
            autoKey: true,
            source: "This is a test",
            target: "Dies ist einen Test.",
            context: "foo"
        });

        ts.add(res);

        let r = ts.getBySource("This is a test");

        test.equal(r.getKey(), "asdf");
        test.equal(r.getSource(), "This is a test");
        test.ok(!r.getContext());

        r = ts.getBySource("This is a test", "foo");

        test.equal(r.getKey(), "asdf");
        test.equal(r.getSource(), "This is a test");
        test.equal(r.getContext(), "foo");

        test.done();
    },

    testTranslationSetGetBySourceOnlyAutoKeys: function(test) {
        test.expect(6);

        const ts = new TranslationSet();
        let res = new ResourceString({
            key: "r3423423",
            autoKey: true,
            source: "This is a test"
        });

        ts.add(res);

        res = new ResourceString({
            key: "explicit_id",
            source: "This is a test"
        });

        ts.add(res);

        let r = ts.getBySource("This is a test");

        test.equal(r.getKey(), "r3423423");
        test.equal(r.getSource(), "This is a test");

        r = ts.get(ResourceString.hashKey(undefined, res.getSourceLocale(), "explicit_id", "plaintext"));

        test.equal(r.getKey(), "explicit_id");
        test.equal(r.getSource(), "This is a test");

        r = ts.get(ResourceString.hashKey(undefined, res.getSourceLocale(), "r3423423", "plaintext"));

        test.equal(r.getKey(), "r3423423");
        test.equal(r.getSource(), "This is a test");

        test.done();
    },

    testTranslationSetGetAll: function(test) {
        test.expect(6);

        const ts = new TranslationSet();
        let res = new ResourceString({
            key: "asdf",
            source: "This is a test"
        });

        ts.add(res);

        res = new ResourceString({
            key: "qwerty",
            source: "This is another test"
        });

        ts.add(res);

        const resources = ts.getAll();
        test.ok(resources);
        test.equal(resources.length, 2);

        let r = resources[0];

        test.equal(r.getKey(), "asdf");
        test.equal(r.getSource(), "This is a test");

        r = resources[1];

        test.equal(r.getKey(), "qwerty");
        test.equal(r.getSource(), "This is another test");
        test.done();
    },

    testTranslationSetGetAllEmpty: function(test) {
        test.expect(2);

        const ts = new TranslationSet();
        const r = ts.getAll();
        test.ok(r);
        test.equal(r.length, 0);

        test.done();
    },

    testTranslationSetAddTranslationMerged: function(test) {
        test.expect(2);

        const ts = new TranslationSet();
        let res = new ResourceString({
            key: "asdf",
            source: "This is a test"
        });

        ts.add(res);

        res = new ResourceString({
            key: "asdf",
            source: "This is another test",
            target: "Dies ist nochmals einen Test",
            targetLocale: "de-DE"
        });

        ts.add(res);

        const resources = ts.getAll();
        test.ok(resources);
        test.equal(resources.length, 2);
        test.done();
    },

    testTranslationSetAddTranslationDifferentContext: function(test) {
        test.expect(2);

        const ts = new TranslationSet();
        let res = new ResourceString({
            key: "asdf",
            source: "This is a test",
            target: "Dies ist einen Test.",
            sourceLocale: "en-US"
        });

        ts.add(res);

        res = new ResourceString({
            key: "asdf",
            source: "This is another test",
            target: "Dies ist nochmals einen Test",
            targetLocale: "de-DE",
            context: "foo"
        });

        ts.add(res);

        const resources = ts.getAll();
        test.ok(resources);
        test.equal(resources.length, 2);
        test.done();
    },

    testTranslationSetAddAll: function(test) {
        test.expect(2);

        const ts = new TranslationSet();

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test"
            })
        ]);

        const r = ts.get(ResourceString.hashKey(undefined, "en-US", "asdf", "plaintext"));

        test.equal(r.getKey(), "asdf");
        test.equal(r.getSource(), "This is a test");
        test.done();
    },

    testTranslationSetAddAllDifferentContexts: function(test) {
        test.expect(8);

        const ts = new TranslationSet();

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test"
            }),
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                context: "foo"
            })
        ]);

        const resources = ts.getAll();
        test.ok(resources);
        test.equal(resources.length, 2);

        let r = resources[0];

        test.equal(r.getKey(), "asdf");
        test.equal(r.getSource(), "This is a test");
        test.ok(!r.getContext());

        r = resources[1];

        test.equal(r.getKey(), "asdf");
        test.equal(r.getSource(), "This is a test");
        test.equal(r.getContext(), "foo");
        test.done();
    },

    testTranslationSetAddAllRightSize: function(test) {
        test.expect(2);

        const ts = new TranslationSet();

        test.equal(ts.size(), 0);

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test"
            })
        ]);

        test.equal(ts.size(), 2);

        test.done();
    },

    testTranslationSetAddTranslationUndefined: function(test) {
        test.expect(2);

        const ts = new TranslationSet();

        try {
            test.equal(ts.size(), 0);
            ts.add(undefined);
            test.equal(ts.size(), 0);
        } catch (e) {
            test.fail();
        }

        test.done();
    },

    testTranslationSetAddAllEmpty: function(test) {
        test.expect(2);

        const ts = new TranslationSet();

        test.equal(ts.size(), 0);

        ts.addAll([]);

        test.equal(ts.size(), 0);

        test.done();
    },

    testTranslationSetAddAllUndefined: function(test) {
        test.expect(2);

        const ts = new TranslationSet();

        test.equal(ts.size(), 0);

        ts.addAll(undefined);

        test.equal(ts.size(), 0);

        test.done();
    },

    testTranslationSetSize: function(test) {
        test.expect(1);

        const ts = new TranslationSet();
        const res = new ResourceString({
            key: "asdf",
            source: "This is a test"
        });

        ts.add(res);

        test.equal(ts.size(), 1);
        test.done();
    },

    testTranslationSetSizeMultiple: function(test) {
        test.expect(1);

        const ts = new TranslationSet();
        let res = new ResourceString({
            key: "asdf",
            source: "This is a test"
            // no context
        });

        ts.add(res);

        res = new ResourceString({
            key: "asdf",
            source: "This is a test",
            target: "Dies ist einen Test.",
            context: "different"
        });

        ts.add(res);

        test.equal(ts.size(), 2);

        test.done();
    },

    testTranslationSetEmpty: function(test) {
        test.expect(1);

        const ts = new TranslationSet();

        test.equal(ts.size(), 0);
        test.done();
    },

    testTranslationSetSizeMerged: function(test) {
        test.expect(3);

        const ts = new TranslationSet();

        test.equal(ts.size(), 0);

        let res = new ResourceString({
            key: "asdf",
            source: "This is a test"
        });

        ts.add(res);

        test.equal(ts.size(), 1);

        res = new ResourceString({
            key: "asdf",
            source: "This is another test",
            target: "Dies ist nochmals einen Test",
            targetLocale: "de-DE"
        });

        ts.add(res);

        test.equal(ts.size(), 2);

        test.done();
    },

    testTranslationSetSizeAddAll: function(test) {
        test.expect(2);

        const ts = new TranslationSet();

        test.equal(ts.size(), 0);

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test"
            })
        ]);

        test.equal(ts.size(), 2);

        test.done();
    },

    testTranslationSetAddSet: function(test) {
        test.expect(2);

        const ts1 = new TranslationSet(),
            ts2 = new TranslationSet();

        ts1.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test"
            })
        ]);

        ts2.addAll([
            new ResourceString({
                key: "foobar",
                source: "This is yet another test"
            }),
            new ResourceString({
                key: "blahblah",
                source: "One of its feet is both the same."
            })
        ]);

        test.equal(ts1.size(), 2);

        ts1.addSet(ts2);

        test.equal(ts1.size(), 4);

        test.done();
    },

    testTranslationSetAddSetRightContents: function(test) {
        test.expect(10);

        const ts1 = new TranslationSet(),
            ts2 = new TranslationSet();

        ts1.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test"
            })
        ]);

        ts2.addAll([
            new ResourceString({
                key: "foobar",
                source: "This is yet another test"
            }),
            new ResourceString({
                key: "blahblah",
                source: "One of its feet is both the same."
            })
        ]);

        ts1.addSet(ts2);

        const r = ts1.getAll();

        test.ok(r);
        test.equal(r.length, 4);

        test.equal(r[0].reskey, "asdf");
        test.equal(r[0].getSource(), "This is a test");

        test.equal(r[1].reskey, "qwerty");
        test.equal(r[1].getSource(), "This is another test");

        test.equal(r[2].reskey, "foobar");
        test.equal(r[2].getSource(), "This is yet another test");

        test.equal(r[3].reskey, "blahblah");
        test.equal(r[3].getSource(), "One of its feet is both the same.");

        test.done();
    },

    testTranslationSetAddSetMerge: function(test) {
        test.expect(2);

        const ts1 = new TranslationSet(),
            ts2 = new TranslationSet();

        ts1.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test"
            })
        ]);

        ts2.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test"
            }),
            new ResourceString({
                key: "blahblah",
                source: "One of its feet is both the same."
            })
        ]);

        test.equal(ts1.size(), 2);

        ts1.addSet(ts2);

        test.equal(ts1.size(), 3);

        test.done();
    },

    testTranslationSetAddSetMergeRightContents: function(test) {
        test.expect(8);

        const ts1 = new TranslationSet(),
            ts2 = new TranslationSet();

        ts1.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test"
            })
        ]);

        ts2.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test"
            }),
            new ResourceString({
                key: "blahblah",
                source: "One of its feet is both the same."
            })
        ]);

        ts1.addSet(ts2);

        const r = ts1.getAll();

        test.ok(r);
        test.equal(r.length, 3);

        test.equal(r[0].reskey, "asdf");
        test.equal(r[0].getSource(), "This is a test");

        test.equal(r[1].reskey, "qwerty");
        test.equal(r[1].getSource(), "This is another test");

        test.equal(r[2].reskey, "blahblah");
        test.equal(r[2].getSource(), "One of its feet is both the same.");

        test.done();
    },

    testTranslationSetAddSetEmpty: function(test) {
        test.expect(2);

        const ts1 = new TranslationSet(),
            ts2 = new TranslationSet();

        ts1.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test"
            })
        ]);

        test.equal(ts1.size(), 2);

        ts1.addSet(ts2);

        test.equal(ts1.size(), 2);

        test.done();
    },

    testTranslationSetAddSetEmptyRightContents: function(test) {
        test.expect(6);

        const ts1 = new TranslationSet(),
            ts2 = new TranslationSet();

        ts1.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test"
            })
        ]);

        ts1.addSet(ts2);

        const r = ts1.getAll();

        test.ok(r);
        test.equal(r.length, 2);

        test.equal(r[0].reskey, "asdf");
        test.equal(r[0].getSource(), "This is a test");

        test.equal(r[1].reskey, "qwerty");
        test.equal(r[1].getSource(), "This is another test");

        test.done();
    },

    testTranslationSetAddSetUndefined: function(test) {
        test.expect(2);

        const ts1 = new TranslationSet();

        ts1.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test"
            })
        ]);

        test.equal(ts1.size(), 2);

        ts1.addSet(undefined);

        test.equal(ts1.size(), 2);

        test.done();
    },

    testTranslationSetAddSetUndefinedRightContents: function(test) {
        test.expect(6);

        const ts1 = new TranslationSet();

        ts1.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test"
            })
        ]);

        ts1.addSet(undefined);

        const r = ts1.getAll();

        test.ok(r);
        test.equal(r.length, 2);

        test.equal(r[0].reskey, "asdf");
        test.equal(r[0].getSource(), "This is a test");

        test.equal(r[1].reskey, "qwerty");
        test.equal(r[1].getSource(), "This is another test");

        test.done();
    },

    testTranslationSetGetBySingleField: function(test) {
        test.expect(6);

        const ts = new TranslationSet();

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is yet another test",
                target: "Dies ist noch einen Test.",
                project: "foo",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                source: "test test",
                target: "test test blah",
                key: "foobarfoo",
                project: "asdf",
                context: "bar",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "test test",
                target: "test test blah",
                key: "foobarfoo",
                project: "asdf",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "test test",
                target: "blah blah blah",
                key: "llashdfoi",
                project: "yowza",
                context: "bar",
                targetLocale: "en-US"
            }),
            new ResourceString({
                source: "test test",
                target: "blah blah blah en espanol",
                key: "ajajsdjdsj",
                project: "yowza",
                targetLocale: "es-ES"
            })
        ]);

        const r = ts.getBy({
            project: "yowza"
        });

        test.ok(r);
        test.equal(r.length, 2);

        test.equal(r[0].reskey, "llashdfoi");
        test.equal(r[0].getTarget(), "blah blah blah");

        test.equal(r[1].reskey, "ajajsdjdsj");
        test.equal(r[1].getTarget(), "blah blah blah en espanol");

        test.done();
    },

    testTranslationSetGetByDoubleFields: function(test) {
        test.expect(17);

        const ts = new TranslationSet();

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is yet another test",
                target: "Dies ist noch einen Test.",
                project: "foo",
                targetLocale: "pt-BR"
            }),
            new ResourceString({
                source: "test test blah",
                key: "foobarfoo",
                project: "asdf",
                context: "bar",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "test test d blah",
                key: "foobarfoo",
                project: "asdf",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "blah blah blah",
                key: "llashdfoi",
                project: "yowza",
                context: "bar",
                targetLocale: "en-US"
            }),
            new ResourceString({
                source: "blah blah blah en espanol",
                key: "ajajsdjdsj",
                project: "yowza",
                targetLocale: "es-ES"
            })
        ]);

        const r = ts.getBy({
            project: "foo",
            targetLocale: "de-DE"
        });

        test.ok(r);
        test.equal(r.length, 3);

        test.equal(r[0].reskey, "asdf");
        test.equal(r[0].getSource(), "This is a test");
        test.equal(r[0].getProject(), "foo");
        test.equal(r[0].getTargetLocale(), "de-DE");
        test.equal(r[0].getContext(), "bar");

        test.equal(r[1].reskey, "qwerty");
        test.equal(r[1].getSource(), "This is another test");
        test.equal(r[1].getProject(), "foo");
        test.equal(r[1].getTargetLocale(), "de-DE");
        test.equal(r[1].getContext(), "bar");

        test.equal(r[2].reskey, "qwerty");
        test.equal(r[2].getSource(), "This is another test");
        test.equal(r[2].getProject(), "foo");
        test.equal(r[2].getTargetLocale(), "de-DE");
        test.ok(!r[2].getContext());

        test.done();
    },

    testTranslationSetGetByOrOperator: function(test) {
        test.expect(17);

        const ts = new TranslationSet();

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is yet another test",
                target: "Dies ist noch einen Test.",
                project: "foo",
                targetLocale: "de-DE",
                context: "ajajajaj"
            }),
            new ResourceString({
                source: "test test blah",
                key: "foobarfoo",
                project: "asdf",
                context: "bar",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "test test d blah",
                key: "foobarfoo",
                project: "asdf",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "blah blah blah",
                key: "llashdfoi",
                project: "yowza",
                context: "bar",
                targetLocale: "en-US"
            }),
            new ResourceString({
                source: "blah blah blah en espanol",
                key: "ajajsdjdsj",
                project: "yowza",
                targetLocale: "es-ES"
            })
        ]);

        // should match one or the other
        const r = ts.getBy({
            targetLocale: ["en-US", "de-DE"]
        });

        test.ok(r);
        test.equal(r.length, 5);

        test.equal(r[0].reskey, "asdf");
        test.equal(r[0].getSource(), "This is a test");
        test.equal(r[0].getTargetLocale(), "de-DE");

        test.equal(r[1].reskey, "qwerty");
        test.equal(r[1].getSource(), "This is another test");
        test.equal(r[1].getTargetLocale(), "de-DE");

        test.equal(r[2].reskey, "qwerty");
        test.equal(r[2].getSource(), "This is another test");
        test.equal(r[2].getTargetLocale(), "de-DE");

        test.equal(r[3].reskey, "qwerty");
        test.equal(r[3].getSource(), "This is yet another test");
        test.equal(r[3].getTargetLocale(), "de-DE");

        test.equal(r[4].reskey, "llashdfoi");
        test.equal(r[4].getSource(), "blah blah blah");
        test.equal(r[4].getTargetLocale(), "en-US");

        test.done();
    },

    testTranslationSetGetProjects: function(test) {
        test.expect(5);

        const ts = new TranslationSet();

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is yet another test",
                target: "Dies ist noch einen Test.",
                project: "foo",
                targetLocale: "pt-BR"
            }),
            new ResourceString({
                source: "test test blah",
                key: "foobarfoo",
                project: "asdf",
                context: "bar",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "test test d blah",
                key: "foobarfoo",
                project: "asdf",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "blah blah blah",
                key: "llashdfoi",
                project: "yowza",
                context: "bar",
                targetLocale: "en-US"
            }),
            new ResourceString({
                source: "blah blah blah en espanol",
                key: "ajajsdjdsj",
                project: "yowza",
                targetLocale: "es-ES"
            })
        ]);

        const projects = ts.getProjects();

        test.ok(projects);
        test.equal(projects.length, 3);

        test.equal(projects[0], "foo");
        test.equal(projects[1], "asdf");
        test.equal(projects[2], "yowza");

        test.done();
    },

    testTranslationSetGetProjectsEmpty: function(test) {
        test.expect(1);

        const ts = new TranslationSet();

        const projects = ts.getProjects();

        test.ok(!projects);

        test.done();
    },

    testTranslationSetGetContexts: function(test) {
        test.expect(4);

        const ts = new TranslationSet();

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is yet another test",
                target: "Dies ist noch einen Test.",
                project: "foo",
                targetLocale: "pt-BR"
            }),
            new ResourceString({
                source: "test test blah",
                key: "foobarfoo",
                project: "asdf",
                context: "bar",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "test test d blah",
                key: "foobarfoo",
                project: "asdf",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "blah blah blah",
                key: "llashdfoi",
                project: "yowza",
                context: "bar",
                targetLocale: "en-US"
            }),
            new ResourceString({
                source: "blah blah blah en espanol",
                key: "ajajsdjdsj",
                project: "yowza",
                targetLocale: "es-ES"
            })
        ]);

        const contexts = ts.getContexts("foo");

        test.ok(contexts);
        test.equal(contexts.length, 2);

        test.equal(contexts[0], "bar");
        test.equal(contexts[1], "");

        test.done();
    },

    testTranslationSetGetContextsEmpty: function(test) {
        test.expect(1);

        const ts = new TranslationSet();

        const contexts = ts.getContexts("foo");

        test.ok(!contexts);

        test.done();
    },

    testTranslationSetGetContextsOnlyRoot: function(test) {
        test.expect(3);

        const ts = new TranslationSet();

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is yet another test",
                target: "Dies ist noch einen Test.",
                project: "foo",
                targetLocale: "pt-BR"
            }),
            new ResourceString({
                source: "test test blah",
                key: "foobarfoo",
                project: "asdf",
                context: "bar",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "test test d blah",
                key: "foobarfoo",
                project: "asdf",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "blah blah blah",
                key: "llashdfoi",
                project: "yowza",
                targetLocale: "en-US"
            }),
            new ResourceString({
                source: "blah blah blah en espanol",
                key: "ajajsdjdsj",
                project: "yowza",
                targetLocale: "es-ES"
            })
        ]);

        const contexts = ts.getContexts("yowza");

        test.ok(contexts);
        test.equal(contexts.length, 1);

        test.equal(contexts[0], "");

        test.done();
    },

    testTranslationSetGetLocales: function(test) {
        test.expect(5);

        const ts = new TranslationSet();

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is yet another test",
                target: "Dies ist noch einen Test.",
                project: "foo",
                targetLocale: "pt-BR"
            }),
            new ResourceString({
                source: "test test blah",
                key: "foobarfoo",
                project: "asdf",
                context: "bar",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "test test d blah",
                key: "foobarfoo",
                project: "asdf",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "blah blah blah",
                key: "llashdfoi",
                project: "yowza",
                context: "bar",
                targetLocale: "en-US"
            }),
            new ResourceString({
                source: "blah blah blah en espanol",
                key: "ajajsdjdsj",
                project: "yowza",
                targetLocale: "es-ES"
            })
        ]);

        const locales = ts.getLocales("foo", "bar");

        test.ok(locales);
        test.equal(locales.length, 3);

        test.equal(locales[0], "de-DE");
        test.equal(locales[1], "fr-FR");
        test.equal(locales[2], "nl-NL");

        test.done();
    },

    testTranslationSetGetLocalesEmpty: function(test) {
        test.expect(1);

        const ts = new TranslationSet();

        const locales = ts.getLocales("foo", "bar");

        test.ok(!locales);

        test.done();
    },

    testTranslationSetClear: function(test) {
        test.expect(2);

        const ts = new TranslationSet();

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is yet another test",
                target: "Dies ist noch einen Test.",
                project: "foo",
                targetLocale: "pt-BR"
            }),
            new ResourceString({
                source: "test test blah",
                key: "foobarfoo",
                project: "asdf",
                context: "bar",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "test test d blah",
                key: "foobarfoo",
                project: "asdf",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "blah blah blah",
                key: "llashdfoi",
                project: "yowza",
                context: "bar",
                targetLocale: "en-US"
            }),
            new ResourceString({
                source: "blah blah blah en espanol",
                key: "ajajsdjdsj",
                project: "yowza",
                targetLocale: "es-ES"
            })
        ]);

        test.equal(ts.size(), 10);

        ts.clear();

        test.equal(ts.size(), 0);

        test.done();
    },

    testTranslationSetClearReallyGone: function(test) {
        test.expect(4);

        const ts = new TranslationSet();

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is yet another test",
                target: "Dies ist noch einen Test.",
                project: "foo",
                targetLocale: "pt-BR"
            }),
            new ResourceString({
                source: "test test blah",
                key: "foobarfoo",
                project: "asdf",
                context: "bar",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "test test d blah",
                key: "foobarfoo",
                project: "asdf",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "blah blah blah",
                key: "llashdfoi",
                project: "yowza",
                context: "bar",
                targetLocale: "en-US"
            }),
            new ResourceString({
                source: "blah blah blah en espanol",
                key: "ajajsdjdsj",
                project: "yowza",
                targetLocale: "es-ES"
            })
        ]);

        let resources = ts.getBy({project: "yowza"})

        test.ok(resources);
        test.equal(resources.length, 2);

        ts.clear();

        resources = ts.getBy({project: "yowza"})

        test.ok(resources);
        test.equal(resources.length, 0);

        test.done();
    },

    testTranslationSetRemoveRightSize: function(test) {
        test.expect(3);

        const ts = new TranslationSet();

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is yet another test",
                target: "Dies ist noch einen Test.",
                project: "foo",
                targetLocale: "pt-BR"
            }),
            new ResourceString({
                source: "test test blah",
                key: "foobarfoo",
                project: "asdf",
                context: "bar",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "test test d blah",
                key: "foobarfoo",
                project: "asdf",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "blah blah blah",
                key: "llashdfoi",
                project: "yowza",
                targetLocale: "en-US"
            }),
            new ResourceString({
                source: "blah blah blah en espanol",
                key: "ajajsdjdsj",
                project: "yowza",
                targetLocale: "es-ES"
            })
        ]);

        test.equal(ts.size(), 10);

        test.ok(ts.remove(new ResourceString({
            project: "asdf",
            context: "bar",
            targetLocale: "ja-JP",
            key: "foobarfoo"
        })));

        test.equal(ts.size(), 9);

        test.done();
    },

    testTranslationSetRemoveReallyGone: function(test) {
        test.expect(10);

        const ts = new TranslationSet();

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is yet another test",
                target: "Dies ist noch einen Test.",
                project: "foo",
                targetLocale: "pt-BR"
            }),
            new ResourceString({
                source: "test test blah",
                key: "foobarfoo",
                project: "asdf",
                context: "bar",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "test test d blah",
                key: "foobarfoo",
                project: "asdf",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "blah blah blah",
                key: "llashdfoi",
                project: "yowza",
                targetLocale: "en-US"
            }),
            new ResourceString({
                source: "blah blah blah en espanol",
                key: "ajajsdjdsj",
                project: "yowza",
                targetLocale: "es-ES"
            })
        ]);

        let res = ts.getBy({
            project: "asdf",
            context: "bar",
            targetLocale: "ja-JP",
            reskey: "foobarfoo",
            resType: "string"
        });

        test.ok(res);
        test.equal(res.length, 1);
        test.equal(res[0].getProject(), "asdf");
        test.equal(res[0].getContext(), "bar");
        test.equal(res[0].getTargetLocale(), "ja-JP");
        test.equal(res[0].getKey(), "foobarfoo");
        test.equal(res[0].getSource(), "test test blah");

        test.ok(ts.remove(new ResourceString({
            project: "asdf",
            context: "bar",
            targetLocale: "ja-JP",
            key: "foobarfoo"
        })));

        res = ts.getBy({
            project: "asdf",
            context: "bar",
            targetLocale: "ja-JP",
            reskey: "foobarfoo",
            resType: "string"
        });

        test.ok(res);
        test.equal(res.length, 0);

        test.done();
    },

    testTranslationSetRemoveInsufficientFields: function(test) {
        test.expect(3);

        const ts = new TranslationSet();

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is yet another test",
                target: "Dies ist noch einen Test.",
                project: "foo",
                targetLocale: "pt-BR"
            }),
            new ResourceString({
                source: "test test blah",
                key: "foobarfoo",
                project: "asdf",
                context: "bar",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "test test d blah",
                key: "foobarfoo",
                project: "asdf",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "blah blah blah",
                key: "llashdfoi",
                project: "yowza",
                targetLocale: "en-US"
            }),
            new ResourceString({
                source: "blah blah blah en espanol",
                key: "ajajsdjdsj",
                project: "yowza",
                targetLocale: "es-ES"
            })
        ]);

        test.equal(ts.size(), 10);

        // have to specify everything needed to identify a single resource
        test.ok(!ts.remove(ResourceString.hashKey(undefined, "bar", "ja-JP", "foobarfoo")));

        test.equal(ts.size(), 10);

        test.done();
    },

    testTranslationSetRemoveBogusInput: function(test) {
        test.expect(3);

        const ts = new TranslationSet();

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is yet another test",
                target: "Dies ist noch einen Test.",
                project: "foo",
                targetLocale: "pt-BR"
            }),
            new ResourceString({
                source: "test test blah",
                key: "foobarfoo",
                project: "asdf",
                context: "bar",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "test test d blah",
                key: "foobarfoo",
                project: "asdf",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "blah blah blah",
                key: "llashdfoi",
                project: "yowza",
                targetLocale: "en-US"
            }),
            new ResourceString({
                source: "blah blah blah en espanol",
                key: "ajajsdjdsj",
                project: "yowza",
                targetLocale: "es-ES"
            })
        ]);

        test.equal(ts.size(), 10);

        // have to specify everything needed to identify a single resource
        test.ok(!ts.remove(undefined));

        test.equal(ts.size(), 10);

        test.done();
    },

    testTranslationSetRemoveNoMatch: function(test) {
        test.expect(3);

        const ts = new TranslationSet();

        ts.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is yet another test",
                target: "Dies ist noch einen Test.",
                project: "foo",
                targetLocale: "pt-BR"
            }),
            new ResourceString({
                source: "test test blah",
                key: "foobarfoo",
                project: "asdf",
                context: "bar",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "test test d blah",
                key: "foobarfoo",
                project: "asdf",
                targetLocale: "ja-JP"
            }),
            new ResourceString({
                source: "blah blah blah",
                key: "llashdfoi",
                project: "yowza",
                targetLocale: "en-US"
            }),
            new ResourceString({
                source: "blah blah blah en espanol",
                key: "ajajsdjdsj",
                project: "yowza",
                targetLocale: "es-ES"
            })
        ]);

        test.equal(ts.size(), 10);

        // does not match anything
        test.ok(!ts.remove(ResourceString.hashKey("ai jai jai", "blech", "en-NZ", "juicy")));

        test.equal(ts.size(), 10);

        test.done();
    },

    testTranslationSetDiffRightSize: function(test) {
        test.expect(2);

        const ts1 = new TranslationSet();
        const ts2 = new TranslationSet();

        ts1.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            })
        ]);

        ts2.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            })
        ]);

        const diff = ts1.diff(ts2);

        test.ok(diff);
        test.equal(diff.size(), 2);

        test.done();
    },

    testTranslationSetDiffRightContents: function(test) {
        test.expect(14);

        const ts1 = new TranslationSet();
        const ts2 = new TranslationSet();

        ts1.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            })
        ]);

        ts2.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            })
        ]);

        const diff = ts1.diff(ts2);

        test.ok(diff);

        let resources = diff.getAll();
        test.ok(resources);
        test.equal(resources.length, 2);

        // guarantee the order of the array elements
        resources = resources.sort(function(left, right) {return left.getTarget() < right.getTarget() ? 1 : (left.getTarget() > right.getTarget() ? -1 : 0)})

        test.equal(resources[0].getKey(), "qwerty");
        test.equal(resources[0].getSource(), "This is another test");
        test.equal(resources[0].getProject(), "foo");
        test.equal(resources[0].getContext(), "bar");
        test.equal(resources[0].getTargetLocale(), "nl-NL");
        test.equal(resources[0].getTarget(), "gossie");

        test.equal(resources[1].getKey(), "qwerty");
        test.equal(resources[1].getSource(), "This is another test");
        test.equal(resources[1].getTarget(), "Dies ist nochmals einen Test");
        test.equal(resources[1].getProject(), "foo");
        test.equal(resources[1].getTargetLocale(), "de-DE");

        test.done();
    },

    testTranslationSetDiffNoOverlap: function(test) {
        test.expect(14);

        const ts1 = new TranslationSet();
        const ts2 = new TranslationSet();

        ts1.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            })
        ]);

        ts2.addAll([
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "gossie",
                project: "foo",
                context: "bar",
                targetLocale: "nl-NL"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                targetLocale: "de-DE"
            })
        ]);

        const diff = ts1.diff(ts2);

        test.ok(diff);

        let resources = diff.getAll();
        test.ok(resources);
        test.equal(resources.length, 2);

        // guarantee the order of the array elements
        resources = resources.sort(function(left, right) {return left.getTarget() < right.getTarget() ? 1 : (left.getTarget() > right.getTarget() ? -1 : 0)})

        test.equal(resources[0].getKey(), "qwerty");
        test.equal(resources[0].getSource(), "This is another test");
        test.equal(resources[0].getTarget(), "gossie");
        test.equal(resources[0].getProject(), "foo");
        test.equal(resources[0].getContext(), "bar");
        test.equal(resources[0].getTargetLocale(), "nl-NL");

        test.equal(resources[1].getKey(), "qwerty");
        test.equal(resources[1].getSource(), "This is another test");
        test.equal(resources[1].getProject(), "foo");
        test.equal(resources[1].getTarget(), "Dies ist nochmals einen Test");
        test.equal(resources[1].getTargetLocale(), "de-DE");

        test.done();
    },

    testTranslationSetDiffNoDiff: function(test) {
        test.expect(2);

        const ts1 = new TranslationSet();
        const ts2 = new TranslationSet();

        ts1.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            })
        ]);

        ts2.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            })
        ]);

        const diff = ts1.diff(ts2);

        test.ok(diff);

        test.equal(diff.size(), 0);

        test.done();
    },

    testTranslationSetDiffChangedFields: function(test) {
        test.expect(8);

        const ts1 = new TranslationSet();
        const ts2 = new TranslationSet();

        ts1.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is another test",
                target: "Dies ist nochmals einen Test",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            })
        ]);

        ts2.addAll([
            new ResourceString({
                key: "asdf",
                source: "This is a test",
                target: "Dies ist einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "This is yet another test",
                target: "Dies ist noch einen Test.",
                project: "foo",
                context: "bar",
                targetLocale: "de-DE"
            }),
            new ResourceString({
                key: "qwerty",
                source: "ooo la la",
                target: "Ou, la, la.",
                project: "foo",
                context: "bar",
                targetLocale: "fr-FR"
            })
        ]);

        const diff = ts1.diff(ts2);

        test.ok(diff);

        const resources = diff.getAll();
        test.ok(resources);
        test.equal(resources.length, 1);

        test.equal(resources[0].getKey(), "qwerty");
        test.equal(resources[0].getSource(), "This is yet another test");
        test.equal(resources[0].getProject(), "foo");
        test.equal(resources[0].getContext(), "bar");
        test.equal(resources[0].getTargetLocale(), "de-DE");

        test.done();
    }
};
