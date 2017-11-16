---
date: 2017-11-08T10:50:17+02:00
title: license
language: "Go"
project_url: https://github.com/kevingimbel/license
---

`license` is a command line tool which allows you to download open source licenses from [osl.kevin.codes](http://osl.kevin.codes). The project uses [Goreleaser](https://goreleaser.com/ "Goreleaser website") to cross-compile binaries for all kinds of operating systems and architectures, including Microsoft Windows, MacOS, and various Linux distributions. A full list of all binaries can be found in [the release archive on GitHub](https://github.com/kevingimbel/license/releases "license release archive on GitHub")

## Usage

Using `license` is straightforward. Once it has been installed [as described on GitHub](https://github.com/kevingimbel/license#install "Read installation instructions on GitHub") it can be used from a terminal as `$ license` command.

### Download a license

If you want to download the MIT license, type `license get MIT` and the MIT license will be downloaded to the current directory. The output file is named `LICENSE` without a file extension. To add a file extension use `license get -f md MIT` and the file will be saved as `LICENSE.md`.

See `license help` for a full list of all commands.

### Technology used

License is programmed in [Go](https://golang.org "Go Project website"), a C-like language developed by Google. It uses the excellent [cobra](https://github.com/spf13/cobra) Go library to handle command line arguments and flags.

The license data is downloaded from [osl.kevin.codes](http://osl.kevin.codes), which is a fork of the [choosealicense.com](https://github.com/github/choosealicense.com "choosealicense repository") project by GitHub. [choosealicense.com](https://choosealicense.com) is a Jekyll based website that helps developers choosing licenses by providing information on each license. I forked the repository and re-wrote the templates so that each page returns JSON which is then consumed by my Go script.

The release process is automated with [Goreleaser](https://goreleaser.com/ "Goreleaser website"), a tool to cross-compile Go binaries and publish them as release to GitHub. All it takes is a configuration file, [.goreleaser.yml](https://github.com/kevingimbel/license/blob/master/.goreleaser.yml).
