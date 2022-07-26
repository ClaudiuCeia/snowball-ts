import { stemmers } from "./src/stemmers.ts";

type Stemmer = {
  stem: (word: string) => string;
};

export async function getStemmer(
  language: keyof typeof stemmers
): Promise<Stemmer> {
  if (!(language in stemmers)) {
    throw new Error(`Language ${language} is not supported`);
  }

  const stemmer = await stemmers[language]();
  const instance = new stemmer.default();

  return {
    stem: (word: string) => instance.stemWord(word),
  };
}
