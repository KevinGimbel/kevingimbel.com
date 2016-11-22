---
date: 2016-04-30T15:23:17+02:00
title: isup
language: "Go"
project_url: https://github.com/kevingimbel/isup.go
---
Go executable to check if a remote host is available or not. First argument passed is the URL to check.

### Install
1. [Install Go](https://golang.org/doc/install#install).
2. Clone the repo `git clone https://github.com/kevingimbel/isup.go.git`
3. Run `go build isup.go` from within the new directory.

### Usage
`isup` can be used from the command line as follows:

```bash
$ ./path/to/isup "https://kevingimbel.com"
```
If you want to use it globally, create a symlink to the executable somewhere inside your `$PATH`.
