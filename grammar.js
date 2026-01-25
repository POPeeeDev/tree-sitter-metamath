/**
 * @file metamath grammar for tree-sitter
 * @author Auto-converted from metamath.g4
 * @license MIT
 * 
 * Generated: 2026-01-24T14:48:49.300Z
 * Source: metamath.g4
 * Parser rules: 23
 * Lexer rules: 7
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'metamath',

  extras: $ => [
    /\s/,
    $.comment,
  ],

  conflicts: $ => [
    [$.mathsymbol],
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

    mathsymbol: $ => repeat1(choice(
      $.printablecharacter,
      $.lparen,
      $.rparen
    )),

    printablecharacter: $ => choice(
      $._printablecharacter,
      $.label
    ),

    filename: $ => $.mathsymbol,

    constant: $ => $.mathsymbol,

    variable: $ => $.mathsymbol,

    // ========== LEXER TOKENS ==========

    lparen: _ => "(",

    rparen: _ => ")",

    label: _ => /[A-Za-z0-9.\-_]+/,

    _printablecharacter: _ => /[\x21-\x27\x2a-\x7e]+/,

    compressedproofblock: _ => /[A-Z?]+/,

    comment: _ => /\$\([^$]*(\$[^)][^$]*)*\$\)/,
  },
});
