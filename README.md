# ilib-tools-common

Common code shared between the command-line tools such as loctool and i18nlint

## License

Copyright © 2022-2023, JEDLSoft

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and
limitations under the License.

## Release Notes

### v1.4.0

- Added TranslationUnit and TranslationVariant classes
- added hashKey function to the utilities
- fixed missing import for makeDirs() utility function

### v1.3.0

- Added more utility functions:
    - isEmpty - return whether or not an object is empty
    - cleanString - removing differences that are inconsequential for translation such as leading whitespace
    - makeDirs - create directories on disk
    - containsActualText - test if there is text left over after HTML and entities are stripped
    - objectMap - visitor pattern for objects

### v1.2.0

- Added formatPath and getLocaleFromPath utility function

### v1.1.0

- Added ResourceXliff class (represents an xliff file as a list of Resource instances)
- Added TranslationSet class (sets of Resources)
- Introduced some backwards compatibility support so that this library
  can be used with loctool plugins.
    - added some deprecated methods and accept some deprecated
      constructor parameters

### v1.0.0

- Initial code copied from loctool 2.18.0:
    - Resource
    - ResourceString
    - ResourceArray
    - ResourcePlural
