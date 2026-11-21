/**
 * @file Tree-sitter grammar for Metamath proof language
 * @author POPeeeDev
 * @author m4dh0rs3
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
  extras: $ => [/\s/, $.comment],
  rules: {
    database: $ => repeat($.outermost_scope_stmt),
    outermost_scope_stmt: $ =>
      choice($.include_stmt, $.constant_stmt, $.stmt),

    include_stmt: $ => seq("$[", $.filename, "$]"),
    constant_stmt: $ => seq("$c", repeat1($.constant), "$."),
    stmt: $ =>
      choice($.block, $.variable_stmt, $.disjoint_stmt, $.hypothesis_stmt, $.assert_stmt),

    block: $ => seq("${", repeat($.stmt), "$}"),

    variable_stmt: $ => seq("$v", repeat1($.variable), "$."),
    disjoint_stmt: $ => seq("$d", $.variable, $.variable, repeat($.variable), "$."),

    hypothesis_stmt: $ => choice($.floating_stmt, $.essential_stmt),
    floating_stmt: $ => seq($.label, "$f", $.typecode, $.variable, "$."),
    essential_stmt: $ => seq($.label, "$e", $.typecode, repeat($.mathsymbol), "$."),

    assert_stmt: $ => choice($.axiom_stmt, $.provable_stmt),
    axiom_stmt: $ => seq($.label, "$a", $.typecode, repeat($.mathsymbol), "$."),
    provable_stmt: $ =>
      seq($.label, "$p", $.typecode, repeat($.mathsymbol), "$=", $.proof, "$."),

    proof: $ => choice($.uncompressed_proof, $.compressed_proof),
    uncompressed_proof: $ => repeat1(choice($.label, "?")),
    compressed_proof: $ =>
      seq("(", repeat($.label), ")", repeat1($.compressed_proof_block)),

    filename: $ => $.mathsymbol,
    typecode: $ => $.constant,
    constant: $ => choice("|-", "wff", "setvar", "class", $.mathsymbol),
    variable: $ => $.mathsymbol,

    // TERMINAL TOKENS
    mathsymbol: $ => /[\x21-\x23\x25-\x7e]+/,
    label: _ => /[\w0-9\.\-]+/,
    compressed_proof_block: _ => /[A-Z\?]+/,
    // Comments: $( ... $) and do not nest
    comment: _ => /\$\([^$]*(\$[^)][^$]*)*\$\)/,
  },
});
