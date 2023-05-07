export const RegexConsts = {
    REGEX_CHINESE: new RegExp(String.raw`
    [\u{FA0E}\u{FA0F}\u{FA11}\u{FA13}\u{FA14}\u{FA1F}\u{FA21}\u{FA23}\u{FA24}\u{FA27}-\u{FA29}]
    |[\u{4E00}-\u{9FCC}]
    |[\u{3400}-\u{4DB5}]
    |[\u{20000}-\u{2A6D6}]
    |[\u{2A700}-\u{2B734}]
    |[\u{2B740}-\u{2B81D}]
    |[\u{2B820}-\u{2CEAF}]
    |[\u{2CEB0}-\u{2EBEF}]
  `.replace(/\s+/g, ''), 'u'),
};
