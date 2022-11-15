/*
 * ResourcePlural.js - represents an array of plural strings in a resource file
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

import Resource from "./Resource.js";
import { cleanString } from "./utils.js";
import log4js from "@log4js-node/log4js-api";

const logger = log4js.getLogger("tools-common.ResourcePlural");

/**
 * @class A class that models a resource that handles translations of
 * plurals.
 * @extends Resource
 */
class ResourcePlural extends Resource {
    /**
     * Construct a new instance of a plural resource.
     *
     * Hashes of strings are used in Android apps to specify translations
     * of the various categories of plurals.<p>
     *
     * The props may contain any
     * of properties from the Resource constructor and additionally,
     * these properties:
     *
     * <ul>
     * <li><i>strings</i> {Object} A hash of strings that map the categories
     * to translations.
     * </ul>
     *
     * The properties of the strings hash can be any of the categories supported
     * by the Unicode CLDR data:
     *
     * <ul>
     * <li>zero
     * <li>one
     * <li>two
     * <li>few
     * <li>many
     * </ul>
     *
     * @constructor
     * @param {Object} props Any of the properties given above
     */
    constructor(props) {
        super(props);
    
        this.sourceStrings = {};
    
        // deep copy this so that the props can have a different set of
        // plural forms than this instance
        if (props) {
            const strings = props.sourceStrings || props.sourcePlurals || props.strings;
            if (strings) {
                for (let p in strings) {
                    this.sourceStrings[p] = strings[p];
                }
            }
    
            const targetStrings = props.targetStrings || props.targetPlurals;
            if (targetStrings) {
                this.targetStrings = {};
                for (let p in targetStrings) {
                    this.targetStrings[p] = targetStrings[p];
                }
            }
        }
    
        this.datatype = this.datatype || "x-android-resource";
        this.resType = ResourcePlural.resClass;
    }
    
    /**
     * Return the source plurals hash of this plurals resource.
     *
     * @returns {Object} the source hash
     */
    getSourcePlurals() {
        return this.sourceStrings;
    }
    
    /**
     * Return the target plurals hash of this plurals resource.
     *
     * @returns {Object} the target hash
     */
    getTargetPlurals() {
        return this.targetStrings;
    }
    
    /**
     * Set the source plurals hash of this plurals resource.
     *
     * @param {Object} plurals the source hash
     */
    setSourcePlurals(plurals) {
        this.sourceStrings = plurals;
    }
    
    /**
     * Set the target plurals hash of this plurals resource.
     *
     * @param {Object} plurals the target hash
     */
    setTargetPlurals(plurals) {
        this.targetStrings = plurals;
    }
    
    /**
     * Return the source string of the given plural category.
     *
     * @returns {String} the source string for the given
     * plural category
     */
    getSource(pluralClass) {
        return this.sourceStrings && this.sourceStrings[pluralClass];
    }
    
    /**
     * Return the target string of the given plural category.
     *
     * @returns {String} the target string for the given
     * plural category
     */
    getTarget(pluralClass) {
        return this.targetStrings && this.targetStrings[pluralClass];
    }
    
    /**
     * Return an array of names of source categories of plurals
     * that are used in this resource.
     *
     * @deprecated Use getCategories instead
     *
     * @returns {Array.<string>} an array of source categories
     */
    getClasses() {
        return this.getCategories();
    }
    
    /**
     * Return an array of names of source categories of plurals
     * that are used in this resource.
     *
     * @returns {Array.<string>} an array of source categories
     */
    getCategories() {
        return this.sourceStrings && Object.keys(this.sourceStrings);
    }
    
    /**
     * Return an array of names of all possible categories
     * of plurals, even if they are not currently used in this
     * plural instance.
     *
     * @returns {Array.<string>} an array of category names
     */
    getAllValidCategories() {
        return ResourcePlural.validPluralCategories;
    }
    
    /**
     * Add a string with the given plural category to the source of
     * this plural resource.
     *
     * @param {String} pluralCategory the CLDR category of this string
     * @param {String} str the source string to add for the category
     */
    addSource(pluralCategory, str) {
        logger.trace("Adding string '" + str + "' with category " + pluralCategory);
        if (!pluralCategory || !str) return;
        if (!this.sourceStrings) {
            this.sourceStrings = {};
        }
        this.sourceStrings[pluralCategory] = str;
    }
    
    /**
     * Add a string with the given plural category to the target of
     * this plural resource.
     *
     * @param {String} pluralCategory the CLDR category of this string
     * @param {String} str the target string to add for the category
     */
    addTarget(pluralCategory, str) {
        logger.trace("Adding string '" + str + "' with category " + pluralCategory);
        // have to have a source plural string in order to add the target
        if (!pluralCategory || !str || !this.sourceStrings) return;
        if (!this.targetStrings) {
            this.targetStrings = {};
        }
        this.targetStrings[pluralCategory] = str;
    }
    
    /**
     * Return the length of the array of strings in this resource.
     *
     * @returns {number} the length of the array of strings in this
     * resource
     */
    size() {
        let len = this.sourceStrings ? Object.keys(this.sourceStrings).length : 0;
        if (this.targetStrings) {
            len = Math.max(len, Object.keys(this.targetStrings).length);
        }
        return len;
    }
        
    /**
     * Clone this resource and override the properties with the given ones.
     *
     * @params {Object|undefined} overrides optional properties to override in
     * the cloned object
     * @returns {ResourceArray} a clone of this resource
     */
    clone(overrides) {
        const r = new ResourcePlural(this);
        if (overrides) {
            for (let p in overrides) {
                r[p] = overrides[p];
            }
        }
        return r;
    }
    
    /**
     * Return true if the other resources contains the same resources as
     * the current one. The pathName, state, and comment fields are
     * ignored as minor variations.
     * @param {Resource} other another resource to test against the current one
     * @returns {boolean} true if these represent the same resource, false otherwise
     */
    equals(other) {
        if (!other || !this.same(other)) return false;
    
        if (this.sourceStrings || other.sourceStrings) {
            if (this.sourceStrings && other.sourceStrings) {
                for (let p in this.sourceStrings) {
                    if (this.sourceStrings[p] !== other.sourceStrings[p]) {
                        return false;
                    }
                }
            } else {
                return false;
            }
        }
    
        if (this.targetStrings || other.targetStrings) {
            if (this.targetStrings && other.targetStrings) {
                for (let p in this.targetStrings) {
                    if (this.targetStrings[p] !== other.targetStrings[p]) {
                        return false;
                    }
                }
            } else {
                return false;
            }
        }
    
        return true;
    }
    
    /**
     * Calculate a resource key string for this category of resource given the
     * parameters.
     *
     * @static
     * @return {String} a hash key
     */
    static hashKey(project, context, locale, reskey) {
        const key = ["rp", project, context, locale, reskey].join("_");
        logger.trace("Hashkey is " + key);
        return key;
    }
    
    /**
     * Return the a hash key that uniquely identifies this resource.
     *
     *  @return {String} a unique hash key for this resource
     */
    hashKey() {
        const locale = this.targetLocale || this.getSourceLocale();
        return ResourcePlural.hashKey(this.project, this.context, locale, this.reskey);
    }
    
    /**
     * Return the a hash key that uniquely identifies the translation of
     * this resource to the given locale.
     *
     * @param {String} locale a locale spec of the desired translation
     * @return {String} a unique hash key for this resource
     */
    hashKeyForTranslation(locale) {
        return ResourcePlural.hashKey(this.project, this.context, locale, this.reskey);
    }
    
    /**
     * Return the a hash key that uniquely identifies this resource.
     *
     *  @return {String} a unique hash key for this resource
     */
    cleanHashKey() {
        const cleaned = this.reskey && this.reskey.replace(/\s+/g, " ").trim() || "";
        const locale = this.targetLocale || this.getSourceLocale();
        return ResourcePlural.hashKey(this.project, this.context, locale, cleaned);
    }
    
    /**
     * Return the a hash key that uniquely identifies the translation of
     * this resource to the given locale.
     *
     * @param {String} locale a locale spec of the desired translation
     * @return {String} a unique hash key for this resource
     */
    cleanHashKeyForTranslation(locale) {
        const cleaned = this.reskey && this.reskey.replace(/\s+/g, " ").trim() || "";
        return ResourcePlural.hashKey(this.project, this.context, locale, cleaned);
    }
    
    /**
     * Check if the given resource is an instance of the current
     * resource.
     *
     * @override
     * @param {Resource} a resource to check
     * @returns {boolean} true if this is an instance of
     * the current resource, false otherwise.
     */
    isInstance(resource) {
        if (!super.isInstance(resource)) {
            return false;
        }
    
        // now check the properties specific to this resource subclass
        return Object.keys(this.sourceStrings).every(prop => {
            return cleanString(this.sourceStrings[prop]) === cleanString(resource.sourceStrings[prop]);
        });
    }
}

/**
 * The class of this kind of string plural.
 *
 * @static
 * @const
 */
ResourcePlural.resClass = "plural";

/**
 * Acceptable values for plural categories
 *
 * @static
 * @const
 */
ResourcePlural.validPluralCategories = ['zero', 'one', 'two', 'few', 'many', 'other'];

export default ResourcePlural;
