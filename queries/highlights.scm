; Keywords and delimiters
"$c" @keyword
"$v" @keyword
"$d" @keyword
"$f" @keyword
"$e" @keyword
"$a" @keyword
"$p" @keyword
"$=" @keyword
"$." @punctuation.delimiter
"${" @punctuation.bracket
"$}" @punctuation.bracket
"$[" @keyword.import
"$]" @keyword.import

; Labels
(floatingstmt (label) @function)
(essentialstmt (label) @function)
(axiomstmt (label) @function.definition)
(provablestmt (label) @function.definition)

; Types
(typecode) @type

; Variables and constants
(constant) @constant
(variable) @variable

; Proofs
(uncompressedproof (label) @function.call)
(compressedproofblock) @string

; Comments
(comment) @comment

; Parentheses in math expressions
(lparen) @punctuation.bracket
(rparen) @punctuation.bracket

; File includes
(filename) @string.special.path
