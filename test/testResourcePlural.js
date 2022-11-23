/*
 * testResourcePlural.js - test the resource plural object.
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

import ResourcePlural from "../src/ResourcePlural.js";

export const testResourcePlural = {
    testResourcePluralConstructorEmpty: function(test) {
        test.expect(1);

        const rp = new ResourcePlural();
        test.ok(rp);

        test.done();
    },

    testResourcePluralConstructorNoProps: function(test) {
        test.expect(1);

        const rp = new ResourcePlural({});
        test.ok(rp);

        test.done();
    },

    testResourcePluralConstructor: function(test) {
        test.expect(1);

        const rp = new ResourcePlural({
            key: "asdf",
            sourceLocale: "en-US",
            pathName: "a/b/c.java",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            }
        });
        test.ok(rp);

        test.done();
    },

    testResourcePluralConstructorRightContents: function(test) {
        test.expect(5);

        const rp = new ResourcePlural({
            key: "asdf",
            sourceLocale: "en-US",
            pathName: "a/b/c.java",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            }
        });
        test.ok(rp);

        test.equal(rp.getKey(), "asdf");
        test.deepEqual(rp.getSource(), {
            "one": "This is singular",
            "two": "This is double",
            "few": "This is the few case",
            "many": "This is the many case"
        });
        test.equal(rp.getSourceLocale(), "en-US");
        test.equal(rp.pathName, "a/b/c.java");

        test.done();
    },

    testResourcePluralConstructorFull: function(test) {
        test.expect(1);

        const rp = new ResourcePlural({
            key: "asdf",
            sourceLocale: "en-US",
            pathName: "a/b/c.java",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            },
            targetLocale: "de-DE",
            target: {
                "one": "Dies ist einzigartig",
                "two": "Dies ist doppelt",
                "few": "Dies ist der wenige Fall",
                "many": "Dies ist der viele Fall"
            }
        });
        test.ok(rp);

        test.done();
    },

    testResourcePluralConstructorRightContentsFull: function(test) {
        test.expect(7);

        const rp = new ResourcePlural({
            key: "asdf",
            sourceLocale: "en-US",
            pathName: "a/b/c.java",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            },
            targetLocale: "de-DE",
            target: {
                "one": "Dies ist einzigartig",
                "two": "Dies ist doppelt",
                "few": "Dies ist der wenige Fall",
                "many": "Dies ist der viele Fall"
            }
        });
        test.ok(rp);

        test.equal(rp.getKey(), "asdf");
        test.deepEqual(rp.getSource(), {
            "one": "This is singular",
            "two": "This is double",
            "few": "This is the few case",
            "many": "This is the many case"
        });
        test.equal(rp.getSourceLocale(), "en-US");
        test.equal(rp.pathName, "a/b/c.java");
        test.equal(rp.getTargetLocale(), "de-DE");
        test.deepEqual(rp.getTarget(), {
            "one": "Dies ist einzigartig",
            "two": "Dies ist doppelt",
            "few": "Dies ist der wenige Fall",
            "many": "Dies ist der viele Fall"
        });

        test.done();
    },

    testResourcePluralConstructorBackwardsCompatible: function(test) {
        test.expect(7);

        const rp = new ResourcePlural({
            key: "asdf",
            sourceLocale: "en-US",
            pathName: "a/b/c.java",
            sourceStrings: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            },
            targetLocale: "de-DE",
            targetStrings: {
                "one": "Dies ist einzigartig",
                "two": "Dies ist doppelt",
                "few": "Dies ist der wenige Fall",
                "many": "Dies ist der viele Fall"
            }
        });
        test.ok(rp);

        test.equal(rp.getKey(), "asdf");
        test.deepEqual(rp.getSourceStrings(), {
            "one": "This is singular",
            "two": "This is double",
            "few": "This is the few case",
            "many": "This is the many case"
        });
        test.equal(rp.getSourceLocale(), "en-US");
        test.equal(rp.pathName, "a/b/c.java");
        test.equal(rp.getTargetLocale(), "de-DE");
        test.deepEqual(rp.getTargetStrings(), {
            "one": "Dies ist einzigartig",
            "two": "Dies ist doppelt",
            "few": "Dies ist der wenige Fall",
            "many": "Dies ist der viele Fall"
        });

        test.done();
    },

    testResourcePluralConstructorDefaults: function(test) {
        test.expect(5);

        const rp = new ResourcePlural({
            key: "asdf",
            pathName: "a/b/c.java",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            }
        });
        test.ok(rp);

        // got the right one?
        test.equal(rp.getKey(), "asdf");

        // now the defaults
        test.equal(rp.getSourceLocale(), "en-US");
        test.equal(rp.datatype, "x-android-resource");
        test.equal(rp.resType, "plural");

        test.done();
    },

    testResourcePluralGetKey: function(test) {
        test.expect(2);

        const rp = new ResourcePlural({
            key: "foo",
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            }
        });
        test.ok(rp);
        test.equal(rp.getKey(), "foo");

        test.done();
    },

    testResourcePluralGetSource: function(test) {
        test.expect(5);

        const rp = new ResourcePlural({
            key: "foo",
            pathName: "a/b/c.txt",
            sourceLocale: "en-US",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            }
        });
        test.ok(rp);
        test.equal(rp.getSourcePlural("one"), "This is singular");
        test.equal(rp.getSourcePlural("two"), "This is double");
        test.equal(rp.getSourcePlural("few"), "This is the few case");
        test.equal(rp.getSourcePlural("many"), "This is the many case");

        test.done();
    },

    testResourcePluralGetTarget: function(test) {
        test.expect(5);

        const rp = new ResourcePlural({
            key: "foo",
            pathName: "a/b/c.txt",
            sourceLocale: "en-US",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            },
            targetLocale: "de-DE",
            target: {
                "one": "Dies ist einzigartig",
                "two": "Dies ist doppelt",
                "few": "Dies ist der wenige Fall",
                "many": "Dies ist der viele Fall"
            }
        });
        test.ok(rp);
        test.equal(rp.getTargetPlural("one"), "Dies ist einzigartig");
        test.equal(rp.getTargetPlural("two"), "Dies ist doppelt");
        test.equal(rp.getTargetPlural("few"), "Dies ist der wenige Fall");
        test.equal(rp.getTargetPlural("many"), "Dies ist der viele Fall");

        test.done();
    },

    testResourcePluralGetNonExistent: function(test) {
        test.expect(3);

        const rp = new ResourcePlural({
            key: "foo",
            pathName: "a/b/c.txt",
            sourceLocale: "en-US",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            }
        });
        test.ok(rp);
        test.ok(!rp.getSourcePlural("zero"));
        test.ok(!rp.getTargetPlural("zero"));

        test.done();
    },

    testResourcePluralGetKeyEmpty: function(test) {
        test.expect(2);

        const rp = new ResourcePlural();
        test.ok(rp);
        test.ok(!rp.getKey());

        test.done();
    },

    testResourcePluralGetContext: function(test) {
        test.expect(2);

        const rp = new ResourcePlural({
            key: "foo",
            pathName: "a/b/c.txt",
            sourceLocale: "en-US",
            context: "landscape",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            }
        });
        test.ok(rp);
        test.equal(rp.getContext(), "landscape");

        test.done();
    },

    testResourcePluralGetContextEmpty: function(test) {
        test.expect(2);

        const rp = new ResourcePlural({
            key: "foo",
            pathName: "a/b/c.txt",
            sourceLocale: "en-US",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            }
        });
        test.ok(rp);
        test.ok(!rp.getContext());

        test.done();
    },

    testResourcePluralGetSourcePlurals: function(test) {
        test.expect(2);

        const rp = new ResourcePlural({
            key: "foo",
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            }
        });
        test.ok(rp);
        test.deepEqual(rp.getSource(), {
            "one": "This is singular",
            "two": "This is double",
            "few": "This is the few case",
            "many": "This is the many case"
        });

        test.done();
    },

    testResourcePluralGetTargetPlurals: function(test) {
        test.expect(2);

        const rp = new ResourcePlural({
            key: "foo",
            pathName: "a/b/c.txt",
            sourceLocale: "de-DE",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            },
            targetLocale: "de-DE",
            target: {
                "one": "Dies ist einzigartig",
                "two": "Dies ist doppelt",
                "few": "Dies ist der wenige Fall",
                "many": "Dies ist der viele Fall"
            }
        });
        test.ok(rp);
        test.deepEqual(rp.getTarget(), {
            "one": "Dies ist einzigartig",
            "two": "Dies ist doppelt",
            "few": "Dies ist der wenige Fall",
            "many": "Dies ist der viele Fall"
        });

        test.done();
    },


    testResourcePluralGetPluralsEmpty: function(test) {
        test.expect(2);

        const rp = new ResourcePlural();
        test.ok(rp);
        const plurals = rp.getSource();
        const count = 0;
        for (const p in plurals) {
            count++;
        }
        test.equal(count, 0);

        test.done();
    },

    testResourcePluralClone: function(test) {
        test.expect(10);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        const rp2 = rp.clone();

        test.ok(rp2);
        test.equal(rp2.project, rp.project);
        test.equal(rp2.context, rp.context);
        test.equal(rp2.getSourceLocale(), rp.getSourceLocale());
        test.equal(rp2.reskey, rp.reskey);
        test.deepEqual(rp2.strings, rp.strings);
        test.equal(rp2.pathName, rp.pathName);
        test.equal(rp2.comment, rp.comment);
        test.equal(rp2.state, rp.state);

        test.done();
    },

    testResourcePluralCloneWithOverrides: function(test) {
        test.expect(10);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        const rp2 = rp.clone({
            sourceLocale: "fr-FR",
            state: "asdfasdf"
        });

        test.ok(rp2);
        test.equal(rp2.project, rp.project);
        test.equal(rp2.context, rp.context);
        test.equal(rp2.getSourceLocale(), "fr-FR");
        test.equal(rp2.reskey, rp.reskey);
        test.deepEqual(rp2.strings, rp.strings);
        test.equal(rp2.pathName, rp.pathName);
        test.equal(rp2.comment, rp.comment);
        test.equal(rp2.state, "asdfasdf");

        test.done();
    },

    testResourcePluralAddSource: function(test) {
        test.expect(3);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        test.ok(!rp.getSourcePlural("zero"));

        rp.addSourcePlural("zero", "This is the zero one")

        test.equal(rp.getSourcePlural("zero"), "This is the zero one");

        test.done();
    },

    testResourcePluralAddSourceReplace: function(test) {
        test.expect(3);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        test.equal(rp.getSourcePlural("two"), "This is double");

        rp.addSourcePlural("two", "This is two at a time")

        test.equal(rp.getSourcePlural("two"), "This is two at a time");

        test.done();
    },

    testResourcePluralAddSourceSize: function(test) {
        test.expect(3);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        test.equal(rp.size(), 3);

        rp.addSourcePlural("many", "This is the many one")

        test.equal(rp.size(), 4);

        test.done();
    },

    testResourcePluralAddSourceUndefined: function(test) {
        test.expect(3);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        test.equal(rp.getSourcePlural("one"), "This is singular");

        rp.addSourcePlural("one", undefined)

        test.equal(rp.getSourcePlural("one"), "This is singular");

        test.done();
    },

    testResourcePluralAddSourceNoClass: function(test) {
        test.expect(3);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        test.equal(rp.size(), 3);

        rp.addSourcePlural(undefined, "foobar")

        test.equal(rp.size(), 3);

        test.done();
    },

    testResourcePluralAddSourceEmpty: function(test) {
        test.expect(3);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        test.equal(rp.size(), 0);

        rp.addSourcePlural("one", "foobar")

        test.equal(rp.size(), 1);

        test.done();
    },

    testResourcePluralAddSourceEmptyRightContents: function(test) {
        test.expect(3);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        test.ok(!rp.getSourcePlural("one"));

        rp.addSourcePlural("one", "foobar")

        test.equal(rp.getSourcePlural("one"), "foobar");

        test.done();
    },

    testResourcePluralAddSourceMultiple: function(test) {
        test.expect(6);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        test.ok(rp);

        rp.addSourcePlural("one", "This is singular");
        rp.addSourcePlural("zero", "This is the zero one");

        test.equal(rp.getSourcePlural("zero"), "This is the zero one");
        test.equal(rp.getSourcePlural("one"), "This is singular");
        test.equal(rp.getSourcePlural("two"), "This is double");
        test.equal(rp.getSourcePlural("few"), "This is the few case");
        test.equal(rp.getSourcePlural("many"), "This is the many case");

        test.done();
    },

    testResourcePluralAddTarget: function(test) {
        test.expect(3);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            },
            targetLocale: "de-DE",
            target: {
                "one": "Dies ist einzigartig",
                "two": "Dies ist doppelt",
                "few": "Dies ist der wenige Fall",
                "many": "Dies ist der viele Fall"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        test.ok(!rp.getTargetPlural("zero"));

        rp.addTargetPlural("zero", "This is the zero one")

        test.equal(rp.getTargetPlural("zero"), "This is the zero one");

        test.done();
    },

    testResourcePluralAddTargetReplace: function(test) {
        test.expect(3);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case",
                "many": "This is the many case"
            },
            targetLocale: "de-DE",
            target: {
                "one": "Dies ist einzigartig",
                "two": "Dies ist doppelt",
                "few": "Dies ist der wenige Fall",
                "many": "Dies ist der viele Fall"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        test.equal(rp.getTargetPlural("two"), "Dies ist doppelt");

        rp.addTargetPlural("two", "This is two at a time")

        test.equal(rp.getTargetPlural("two"), "This is two at a time");

        test.done();
    },

    testResourcePluralAddTargetSize: function(test) {
        test.expect(3);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            targetLocale: "de-DE",
            target: {
                "one": "Dies ist einzigartig",
                "two": "Dies ist doppelt",
                "few": "Dies ist der wenige Fall"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        test.equal(rp.size(), 3);

        rp.addTargetPlural("many", "This is the many one")

        test.equal(rp.size(), 4);

        test.done();
    },

    testResourcePluralAddTargetUndefined: function(test) {
        test.expect(3);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            targetLocale: "de-DE",
            target: {
                "one": "Dies ist einzigartig",
                "two": "Dies ist doppelt",
                "few": "Dies ist der wenige Fall",
                "many": "Dies ist der viele Fall"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        test.equal(rp.getTargetPlural("one"), "Dies ist einzigartig");

        rp.addTargetPlural("one", undefined)

        test.equal(rp.getTargetPlural("one"), "Dies ist einzigartig");

        test.done();
    },

    testResourcePluralAddTargetNoClass: function(test) {
        test.expect(3);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            targetLocale: "de-DE",
            target: {
                "one": "Dies ist einzigartig",
                "two": "Dies ist doppelt",
                "few": "Dies ist der wenige Fall"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        test.equal(rp.size(), 3);

        rp.addTargetPlural(undefined, "foobar")

        test.equal(rp.size(), 3);

        test.done();
    },

    testResourcePluralAddTargetEmpty: function(test) {
        test.expect(3);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        test.equal(rp.size(), 0);

        rp.addTargetPlural("one", "foobar")

        test.equal(rp.size(), 1);

        test.done();
    },

    testResourcePluralAddTargetEmptyRightContents: function(test) {
        test.expect(3);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        test.ok(!rp.getTargetPlural("one"));

        rp.addTargetPlural("one", "foobar")

        test.equal(rp.getTargetPlural("one"), "foobar");

        test.done();
    },

    testResourcePluralEqualsSourceOnly: function(test) {
        test.expect(3);

        const ra1 = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(ra1.equals(ra2));

        test.done();
    },

    testResourcePluralEqualsFull: function(test) {
        test.expect(3);

        const ra1 = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            targetLocale: "de-DE",
            target: {
                "one": "Dies ist einzigartig",
                "two": "Dies ist doppelt",
                "few": "Dies ist der wenige Fall",
                "many": "Dies ist der viele Fall"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            targetLocale: "de-DE",
            target: {
                "one": "Dies ist einzigartig",
                "two": "Dies ist doppelt",
                "few": "Dies ist der wenige Fall",
                "many": "Dies ist der viele Fall"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(ra1.equals(ra2));

        test.done();
    },

    testResourcePluralEqualsSourceOnlyNot: function(test) {
        test.expect(3);

        const ra1 = new ResourcePlural({
            project: "foo",
            context: "asdf",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(!ra1.equals(ra2));

        test.done();
    },

    testResourcePluralEqualsFullNot: function(test) {
        test.expect(3);

        const ra1 = new ResourcePlural({
            project: "foo",
            context: "asdf",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            targetLocale: "de-DE",
            target: {
                "one": "Dies ist einzigartig",
                "two": "Dies ist doppelt",
                "few": "Dies ist der wenige Fall",
                "many": "Dies ist der viele Fall"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourcePlural({
            project: "foo",
            context: "asdf",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            targetLocale: "de-DE",
            target: {
                "one": "Dies ist einzigartig",
                "two": "Dies ist ",
                "few": "Dies ist der wenige Fall",
                "many": "Dies ist der viele Fall"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(!ra1.equals(ra2));

        test.done();
    },

    testResourcePluralEqualsIgnoreSomeFields: function(test) {
        test.expect(3);

        const ra1 = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            pathName: "x.java",
            comment: "asdf asdf asdf asdf asdf",
            state: "done"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(ra1.equals(ra2));

        test.done();
    },

    testResourcePluralEqualsContentDifferent: function(test) {
        test.expect(3);

        const ra1 = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is the few case"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        const ra2 = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "de-DE",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is a different case"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });

        test.ok(ra1);
        test.ok(ra2);

        test.ok(!ra1.equals(ra2));

        test.done();
    },

    testResourcePluralStaticHashKey: function(test) {
        test.expect(1);

        test.equal(ResourcePlural.hashKey("androidapp", "foo", "de-DE", "This is a test"), "rp_androidapp_foo_de-DE_This is a test");

        test.done();
    },

    testResourcePluralStaticHashKeyMissingParts: function(test) {
        test.expect(1);

        test.equal(ResourcePlural.hashKey(undefined, undefined, "de-DE", undefined), "rp___de-DE_");

        test.done();
    },

    testResourcePluralSourceOnlyHashKey: function(test) {
        test.expect(2);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "en-US",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is a different case"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        test.equal(rp.hashKey(), "rp_foo_blah_en-US_asdf");

        test.done();
    },

    testResourcePluralFullHashKey: function(test) {
        test.expect(2);

        const rp = new ResourcePlural({
            project: "foo",
            context: "blah",
            sourceLocale: "en-US",
            key: "asdf",
            source: {
                "one": "This is singular",
                "two": "This is double",
                "few": "This is a different case"
            },
            targetLocale: "de-DE",
            target: {
                "one": "Dies ist einzigartig",
                "two": "Dies ist ",
                "few": "Dies ist der wenige Fall",
                "many": "Dies ist der viele Fall"
            },
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rp);

        test.equal(rp.hashKey(), "rp_foo_blah_de-DE_asdf");

        test.done();
    },

    testResourcePluralIsInstanceSame: function(test) {
        test.expect(3);

        const rs = new ResourcePlural({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: {
                one: "This is a test",
                other: "These are tests"
            }
        });
        test.ok(rs);

        const dup = new ResourcePlural({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: {
                one: "This is a test",
                other: "These are tests"
            }
        });
        test.ok(dup);

        test.ok(rs.isInstance(dup));

        test.done();
    },

    testResourcePluralIsInstanceDifferingOnlyInWhitespace: function(test) {
        test.expect(3);

        const rs = new ResourcePlural({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: {
                one: "This is a test ",
                other: " These are tests"
            }
        });
        test.ok(rs);

        const dup = new ResourcePlural({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: {
                one: "This is a \ttest    ",
                other: " These  are tests "
            }
        });
        test.ok(dup);

        test.ok(rs.isInstance(dup));

        test.done();
    },

    testResourcePluralIsInstanceDifferingInSource: function(test) {
        test.expect(3);

        const rs = new ResourcePlural({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: {
                one: "This is a test",
                other: "These are tests"
            }
        });
        test.ok(rs);

        const dup = new ResourcePlural({
            context: "a",
            datatype: "markdown",
            dnt: false,
            flavor: "asdf",
            project: "foo",
            reskey: "test.string",
            sourceLocale: "en-US",
            targetLocale: "ja-JP",
            source: {
                one: "This is a test",
                other: "These are tests."
            }
        });
        test.ok(dup);

        test.ok(!rs.isInstance(dup));

        test.done();
    }
};
