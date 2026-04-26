/**
 * @file Tree-sitter grammar for Metamath proof language
 * @author POPeeeDev
 * @license CC0-1.0
 *
 * Based on the Metamath specification from "Metamath: A Computer Language
 * for Pure Mathematics" by Norman Megill & David A. Wheeler.
 *
 * @see https://us.metamath.org/downloads/metamath.pdf (Appendix: EBNF)
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "metamath",

  extras: $ => [
    /\s/,
    $.comment,
  ],

  rules: {
    database: $ => repeat($.outermostscopestmt),

    outermostscopestmt: $ => choice(
      $.includestmt,
      $.constantstmt,
      $.stmt
    ),

    includestmt: $ => seq("$[", $.filename, "$]"),

    constantstmt: $ => seq("$c", repeat1($.constant), "$."),

    stmt: $ => choice(
      $.block,
      $.variablestmt,
      $.disjointstmt,
      $.hypothesisstmt,
      $.assertstmt
    ),

    block: $ => seq("${", repeat($.stmt), "$}"),

    variablestmt: $ => seq("$v", repeat1($.variable), "$."),

    disjointstmt: $ => seq("$d", $.variable, $.variable, repeat($.variable), "$."),

    hypothesisstmt: $ => choice(
      $.floatingstmt,
      $.essentialstmt
    ),

    floatingstmt: $ => seq($.label, "$f", $.typecode, $.variable, "$."),

    essentialstmt: $ => seq($.label, "$e", $.typecode, repeat($.mathsymbol), "$."),

    assertstmt: $ => choice(
      $.axiomstmt,
      $.provablestmt
    ),

    axiomstmt: $ => seq($.label, "$a", $.typecode, repeat($.mathsymbol), "$."),

    provablestmt: $ => seq($.label, "$p", $.typecode, repeat($.mathsymbol), "$=", $.proof, "$."),

    proof: $ => choice(
      $.uncompressedproof,
      $.compressedproof
    ),

    uncompressedproof: $ => repeat1(choice(
      $.label,
      "?"
    )),

    compressedproof: $ => seq("(", repeat($.label), ")", repeat1($.compressedproofblock)),

    typecode: $ => $.constant,

    filename: $ => $.mathsymbol,
    constant: $ => choice("|-", "wff", "setvar", "class", $.mathsymbol),
    variable: $ => $.mathsymbol,

    // ========== TERMINAL TOKENS ==========

    // MATH-SYMBOL ::= (_PRINTABLE-CHARACTER - '$')+
    mathsymbol: $ => /[\x21-\x23\x25-\x7e]+/,

    // LABEL ::= (_LETTER-OR-DIGIT | '.' | '-' | '_')+
    label: _ => /[A-Za-z0-9.\-_]+/,

    // COMPRESSED-PROOF-BLOCK ::= ([A-Z] | '?')+
    compressedproofblock: _ => /[A-Z?]+/,

    // Comments: $( ... $) and do not nest
    comment: _ => /\$\([^$]*(\$[^)][^$]*)*\$\)/,
  },
});
