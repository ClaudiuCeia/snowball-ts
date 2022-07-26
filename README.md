# snowball-ts

This is a TypeScript interface to the [stemming algorithms from the Snowball project](https://snowballstem.org/).
The library includes the original Snowball algorithms compiled to Javascript, and provides a very thin layer on top 
of that in order to:

  * Provide a way to only load the desired algorithm
  * Provide typings
  * Hide methods meant to be private, only exposing a single `stem` function

## Usage

```ts
  // load desired algorithm
  const porter = await getStemmer("porter"); 
  const stemmed = porter.stem("cars"); 
```

Since the `getStemmer` function uses dynamic imports, you'll need to pass the `--allow-read` permission to Deno.

## Contributing

This library should strive to match the Snowball release calendar, so whenever a new Snowball version is released, 
the source files should be updated. Minor versions can be released to include new algorithms (if required, and without breaking
changes to existing algorithms). 

**Updating source algorithms:**

  * Compile the algorithms [using the Snowball CLI](https://snowballstem.org/runtime/use.html)
  * Modify the generated file to:
    - Import the base stemmer: `import BaseStemmer from "./base/base-stemmer.js";`
    - Export the function, instead of `Algorithm = function() {` do `export default function() {`
    - If it's a new algorithm, make sure to update the mapping in [`stemmers.ts`](./src/stemmers.ts)

**Changes to the interface:**
  * Breaking changes to the interface should mirror Snowball major releases
  * Non-breaking additions can be made at any point if justified in a GitHub issue, with a minor release
  * Bug fixes and other improvements to the existing interface can be made at any point, with a patch release

PRs are welcome. If unsure about the scope of the changes, feel free to open a GitHub issue first, to discuss.

## What is Snowball?

Snowball is a small string processing language for creating stemming algorithms for use in Information Retrieval, plus a collection of stemming algorithms implemented using it.

It was originally designed and built by Martin Porter. Martin retired from development in 2014 and Snowball is now maintained as a community project. Martin originally chose the name Snowball as a tribute to SNOBOL, the excellent string handling language from the 1960s. It now also serves as a metaphor for how the project grows by gathering contributions over time.

The Snowball compiler translates a Snowball program into source code in another language - currently Ada, ISO C, C#, Go, Java, Javascript, Object Pascal, Python and Rust are supported. 

## What is Stemming?

 Stemming maps different forms of the same word to a common "stem" - for example, the English stemmer maps connection, connections, connective, connected, and connecting to connect. So a searching for connected would also find documents which only have the other forms.

This stem form is often a word itself, but this is not always the case as this is not a requirement for text search systems, which are the intended field of use. We also aim to conflate words with the same meaning, rather than all words with a common linguistic root (so awe and awful don't have the same stem), and over-stemming is more problematic than under-stemming so we tend not to stem in cases that are hard to resolve. If you want to always reduce words to a root form and/or get a root form which is itself a word then Snowball's stemming algorithms likely aren't the right answer.

## License

snowball-ts is copyright (c) 2022, Claudiu Ceia, and is licensed under the MIT license: see the file ["LICENSE"](./LICENSE) for the full text of this. 

The snowball algorithms, and the snowball library, are [licensed under the BSD license, included in the `source` directory](./src/source/COPYING).