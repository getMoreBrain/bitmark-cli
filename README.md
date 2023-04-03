@bitmark-standard/bitmark-cli
=================

[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/getMoreBrain/bitmark-cli/blob/main/package.json)

Bitmark command line tool.

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @bitmark-standard/bitmark-cli
$ bitmark COMMAND
running command...
$ bitmark (--version)
@bitmark-standard/bitmark-cli/0.0.2 darwin-x64 node-v16.19.1
$ bitmark --help [COMMAND]
USAGE
  $ bitmark COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bitmark help [COMMANDS]`](#bitmark-help-commands)
* [`bitmark plugins`](#bitmark-plugins)
* [`bitmark plugins:install PLUGIN...`](#bitmark-pluginsinstall-plugin)
* [`bitmark plugins:inspect PLUGIN...`](#bitmark-pluginsinspect-plugin)
* [`bitmark plugins:install PLUGIN...`](#bitmark-pluginsinstall-plugin-1)
* [`bitmark plugins:link PLUGIN`](#bitmark-pluginslink-plugin)
* [`bitmark plugins:uninstall PLUGIN...`](#bitmark-pluginsuninstall-plugin)
* [`bitmark plugins:uninstall PLUGIN...`](#bitmark-pluginsuninstall-plugin-1)
* [`bitmark plugins:uninstall PLUGIN...`](#bitmark-pluginsuninstall-plugin-2)
* [`bitmark plugins update`](#bitmark-plugins-update)

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

## `bitmark plugins`

List installed plugins.

```
USAGE
  $ bitmark plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ bitmark plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.3/src/commands/plugins/index.ts)_

## `bitmark plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ bitmark plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ bitmark plugins add

EXAMPLES
  $ bitmark plugins:install myplugin 

  $ bitmark plugins:install https://github.com/someuser/someplugin

  $ bitmark plugins:install someuser/someplugin
```

## `bitmark plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ bitmark plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ bitmark plugins:inspect myplugin
```

## `bitmark plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ bitmark plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ bitmark plugins add

EXAMPLES
  $ bitmark plugins:install myplugin 

  $ bitmark plugins:install https://github.com/someuser/someplugin

  $ bitmark plugins:install someuser/someplugin
```

## `bitmark plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ bitmark plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ bitmark plugins:link myplugin
```

## `bitmark plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ bitmark plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ bitmark plugins unlink
  $ bitmark plugins remove
```

## `bitmark plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ bitmark plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ bitmark plugins unlink
  $ bitmark plugins remove
```

## `bitmark plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ bitmark plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ bitmark plugins unlink
  $ bitmark plugins remove
```

## `bitmark plugins update`

Update installed plugins.

```
USAGE
  $ bitmark plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
