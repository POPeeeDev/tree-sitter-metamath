# tree-sitter-metamath

[![CI](https://github.com/POPeeeDev/tree-sitter-metamath/actions/workflows/ci.yml/badge.svg)](https://github.com/POPeeeDev/tree-sitter-metamath/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/tree-sitter-metamath)](https://www.npmjs.com/package/tree-sitter-metamath)

A [tree-sitter](https://tree-sitter.github.io/tree-sitter/) grammar for [Metamath](http://metamath.org/), a language for developing strictly formalized mathematical definitions and proofs.

## Overview

Metamath is a tiny language that can express theorems in abstract mathematics, accompanied by proofs that can be verified by a computer program. This tree-sitter grammar enables fast, incremental parsing of Metamath files (`.mm`) for use in editors, syntax highlighters, and code analysis tools.

## Installation

### Node.js

```bash
npm install tree-sitter-metamath
```

### Rust

Add to your `Cargo.toml`:

```toml
[dependencies]
tree-sitter-metamath = "1.0.1"
```

## Usage

### Node.js

```javascript
const Parser = require('tree-sitter');
const Metamath = require('tree-sitter-metamath');

const parser = new Parser();
parser.setLanguage(Metamath);

const sourceCode = `
$c wff $.
$v ph $.
wph $f wff ph $.
`;

const tree = parser.parse(sourceCode);
console.log(tree.rootNode.toString());
```

### Rust

```rust
use tree_sitter::Parser;

fn main() {
    let mut parser = Parser::new();
    parser.set_language(&tree_sitter_metamath::LANGUAGE.into())
      .expect("Error loading Metamath parser");

    let source_code = r#"
        $c wff $.
        $v ph $.
        wph $f wff ph $.
    "#;

    let tree = parser.parse(source_code, None).unwrap();
    println!("{}", tree.root_node().to_sexp());
}
```

## Grammar

The grammar supports the full Metamath specification:

- **Constants** (`$c ... $.`)
- **Variables** (`$v ... $.`)
- **Disjoint variable restrictions** (`$d ... $.`)
- **Floating hypotheses** (`label $f typecode variable $.`)
- **Essential hypotheses** (`label $e typecode symbols $.`)
- **Axioms** (`label $a typecode symbols $.`)
- **Provable assertions** (`label $p typecode symbols $= proof $.`)
- **Scoping blocks** (`${ ... $}`)
- **File includes** (`$[ filename $]`)
- **Comments** (`$( ... $)`)
- **Compressed proofs**

It parses `set.mm` successfully without erorrs.

## Development

### Prerequisites

- Node.js (v18+)
- tree-sitter CLI (`npm install -g tree-sitter-cli`)

### Building

With Node:

```bash
npm install
npm run generate
```

Or with tree-sitter CLI:

```bash
tree-sitter generate
```

### Testing

With Node:

```bash
npm test
```

Or with tree-sitter CLI:

```bash
tree-sitter test
```

### Parsing a file

With Node:

```bash
npm run parse -- path/to/file.mm
```

Or with tree-sitter CLI:

```bash
tree-sitter parse path/to/file.mm
```

## References

- [Metamath Home Page](http://metamath.org/)
- [Metamath Proof Explorer](http://us.metamath.org/mpeuni/mmset.html)
- [The Metamath Solitaire applet](http://us.metamath.org/mmsolitaire/mms.html)
- [Metamath Book (PDF)](http://us.metamath.org/downloads/metamath.pdf)
- [Tree-sitter Documentation](https://tree-sitter.github.io/tree-sitter/)

## License

[CC0 1.0 Universal (Public Domain)](LICENSE)
