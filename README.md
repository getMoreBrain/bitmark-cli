@gmb/bitmark-cli
=================

![Build & Test](https://github.com/getMoreBrain/bitmark-cli/actions/workflows/build-test.yml/badge.svg?branch=main)

bitmark command line tool.

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @gmb/bitmark-cli
$ bitmark COMMAND
running command...
$ bitmark (--version)
@gmb/bitmark-cli/1.0.15 darwin-x64 node-v16.19.1
$ bitmark --help [COMMAND]
USAGE
  $ bitmark COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bitmark convert [INPUT]`](#bitmark-convert-input)
* [`bitmark help [COMMANDS]`](#bitmark-help-commands)

## `bitmark convert [INPUT]`

Convert between bitmark formats

```
USAGE
  $ bitmark convert [INPUT] [-v 2|3] [-f bitmark|json|ast] [-a -o <value>] [-w] [-p] [--indent <value>]
    [--plainText] [--excludeUnknownProperties] [--explicitTextFormat] [--cardSetVersion 1|2] [--parser antlr|peggy]

ARGUMENTS
  INPUT  file to read, or bitmark or json string. If not specified, input will be from <stdin>

FLAGS
  -a, --append            append to the output file (default is to overwrite)
  -f, --format=<option>   output format. If not specified, bitmark is converted to JSON, and JSON / AST is converted to
                          bitmark
                          <options: bitmark|json|ast>
  -o, --output=FILE       output file. If not specified, output will be to <stdout>
  -v, --version=<option>  version of bitmark to use (default: latest)
                          <options: 2|3>
  -w, --warnings          enable warnings in the output

JSON FORMATTING FLAGS
  -p, --pretty                prettify the JSON output with indent
  --excludeUnknownProperties  exclude unknown properties in the JSON output
  --indent=INDENT             [default: 2] prettify indent
  --plainText                 output text as plain text rather than JSON (default: set by bitmark version)

BITMARK FORMATTING FLAGS
  --cardSetVersion=<option>  version of card set to use in bitmark (default: set by bitmark version)
                             <options: 1|2>
  --explicitTextFormat       include bitmark text format in bitmark even if it is the default (bitmark--)

PARSER OPTIONS FLAGS
  --parser=<option>  [default: peggy] parser to use
                     <options: antlr|peggy>

DESCRIPTION
  Convert between bitmark formats

EXAMPLES
  $ bitmark convert '[.article] Hello World'

  $ bitmark convert '[{"bitmark": "[.article] Hello World","bit": { "type": "article", "format": "bitmark--", "body": "Hello World" }}]'

  $ bitmark convert input.json -o output.bit

  $ bitmark convert input.bit -o output.json

  $ bitmark convert -f ast input.json -o output.ast.json
```

_See code: [dist/commands/convert.ts](https://github.com/getMoreBrain/bitmark-cli/blob/v1.0.12/dist/commands/convert.ts)_

## `bitmark help [COMMANDS]`

Display help for bitmark.

```
USAGE
  $ bitmark help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for bitmark.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.10/src/commands/help.ts)_
<!-- commandsstop -->
