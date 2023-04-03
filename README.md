@bitmark-standard/bitmark-cli
=================

![Build & Test](https://github.com/getMoreBrain/bitmark-cli/actions/workflows/build-test.yml/badge.svg?branch=main)

Bitmark command line tool.

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g bitmark-cli
$ bitmark COMMAND
running command...
$ bitmark (--version)
bitmark-cli/0.0.2 darwin-x64 node-v16.19.1
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
  $ bitmark convert [INPUT] [-f bitmark|json|ast] [-a -o <value>] [-p] [--indent <value>]
    [--explicitTextFormat]

ARGUMENTS
  INPUT  file to read, or bitmark or json string. If not specified, input will be from <stdin>

FLAGS
  -a, --append           append to the output file (default is to overwrite)
  -f, --format=<option>  output format. If not specified, bitmark is converted to JSON, and JSON / AST is converted to
                         bitmark
                         <options: bitmark|json|ast>
  -o, --output=FILE      output file. If not specified, output will be to <stdout>

JSON FORMATTING FLAGS
  -p, --pretty     prettify the JSON output with indent
  --indent=INDENT  [default: 2] prettify indent

BITMARK FORMATTING FLAGS
  --explicitTextFormat  Include bitmark text format in bitmark even if it is the default value

DESCRIPTION
  Convert between bitmark formats

EXAMPLES
  $ bitmark convert '[.article] Hello World'

  $ bitmark convert '[{"bitmark": "[.article] Hello World","bit": { "type": "article", "format": "bitmark--", "body": "Hello World" }}]'
```

_See code: [dist/commands/convert.ts](https://github.com/bitmark-standard/bitmark-cli/blob/v0.0.2/dist/commands/convert.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.8/src/commands/help.ts)_
<!-- commandsstop -->
