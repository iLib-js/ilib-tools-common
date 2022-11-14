/*
 * utils.js - utility functions to support the other code
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


/**
 * Clean a string for matching against other strings by removing
 * differences that are inconsequential for translation.
 *
 * @param {String} str string to clean
 * @returns {String} the cleaned string
 */
export function cleanString(str) {
    if (typeof(str) !== 'string') {
        return undefined;
    }
    return str.toLowerCase().
        replace(/\\n/g, " ").
        replace(/\\t/g, " ").
        replace(/\\/g, "").
        replace(/\s+/g, " ").
        trim().
        replace(/&apos;/g, "'").
        replace(/&quot;/g, '"').
        replace(/&lt;/g, "<").
        replace(/&gt;/g, ">").
        replace(/&amp;/g, "&").
        replace(/’/g, "'");
};
