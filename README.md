@gmb/bitmark-cli
=================

![Build & Test](https://github.com/getMoreBrain/bitmark-cli/actions/workflows/build-test.yml/badge.svg?branch=main)

[Try out bitmark - visit the bitmark Playground](https://getmorebrain.github.io/bitmark-playground/)

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
@gmb/bitmark-cli/1.4.1 darwin-x64 node-v18.14.2
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
* [`bitmark info [INFO]`](#bitmark-info-info)

## `bitmark convert [INPUT]`

Convert between bitmark formats

```
USAGE
  $ bitmark convert [INPUT] [-v 2|3] [-f bitmark|json|ast] [-w] [--indent <value> -p] [--plainText]
    [--excludeUnknownProperties] [--explicitTextFormat] [--cardSetVersion 1|2] [-a -o <value>] [--parser peggy|antlr]

ARGUMENTS
  INPUT  file to read, or bitmark or json string. If not specified, input will be from <stdin>

FLAGS
  -f, --format=<option>   output format. If not specified, bitmark is converted to JSON, and JSON / AST is converted to
                          bitmark
                          <options: bitmark|json|ast>
  -v, --version=<option>  version of bitmark to use (default: latest)
                          <options: 2|3>
  -w, --warnings          enable warnings in the output

FILE OUTPUT FLAGS
  -a, --append       append to the output file (default is to overwrite)
  -o, --output=FILE  output file. If not specified, output will be to <stdout>

JSON FORMATTING FLAGS
  -p, --pretty                prettify the JSON output with indent
  --excludeUnknownProperties  exclude unknown properties in the JSON output
  --indent=INDENT             prettify indent (default:2)
  --plainText                 output text as plain text rather than JSON (default: set by bitmark version)

BITMARK FORMATTING FLAGS
  --cardSetVersion=<option>  version of card set to use in bitmark (default: set by bitmark version)
                             <options: 1|2>
  --explicitTextFormat       include bitmark text format in bitmark even if it is the default (bitmark--)

PARSER OPTIONS FLAGS
  --parser=<option>  [default: peggy] parser to use
                     <options: peggy|antlr>

DESCRIPTION
  Convert between bitmark formats

EXAMPLES
  $ bitmark convert '[.article] Hello World'

  $ bitmark convert '[{"bitmark": "[.article] Hello World","bit": { "type": "article", "format": "bitmark--", "body": "Hello World" }}]'

  $ bitmark convert input.json -o output.bit

  $ bitmark convert input.bit -o output.json

  $ bitmark convert -f ast input.json -o output.ast.json
```

_See code: [dist/commands/convert.ts](https://github.com/getMoreBrain/bitmark-cli/blob/v1.4.1/dist/commands/convert.ts)_

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

## `bitmark info [INFO]`

Display information about bitmark

```
USAGE
  $ bitmark info [INFO] [-f text|json] [--bit <value> | --all | --deprecated] [--indent <value> -p] [-a -o
    <value>]

ARGUMENTS
  INFO  (list|bit) [default: list] information to return. If not specified, a list of bits will be returned

FLAGS
  -f, --format=<option>  [default: text] output format. If not specified, the ouput will be text
                         <options: text|json>
  --all                  output all bits inlcuding deprecated
  --bit=<value>          bit to filter. If not specified, all bits will be returned
  --deprecated           output deprecated bits

FILE OUTPUT FLAGS
  -a, --append       append to the output file (default is to overwrite)
  -o, --output=FILE  output file. If not specified, output will be to <stdout>

JSON FORMATTING FLAGS
  -p, --pretty     prettify the JSON output with indent
  --indent=INDENT  prettify indent (default:2)

DESCRIPTION
  Display information about bitmark

EXAMPLES
  $ bitmark info

  $ bitmark info --all

  $ bitmark info list --deprecated

  $ bitmark info bit --bit=cloze

  $ bitmark info -f json -p bit --bit=still-image-film
```

_See code: [dist/commands/info.ts](https://github.com/getMoreBrain/bitmark-cli/blob/v1.4.1/dist/commands/info.ts)_
<!-- commandsstop -->
