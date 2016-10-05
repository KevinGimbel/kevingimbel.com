---
date: 2015-09-30T15:23:17+02:00
title: portcheck
language: bash
project_url: https://github.com/kevingimbel/portcheck
---
A small utility script to check for open ports using TCP.

Taken from [StackOverflow](http://stackoverflow.com/a/35337930/2777153) and wrapped inside a little function.

### Install
Clone this repository to some place on your computer.

```bash
$ cd ~/github
$ git clone git@github.com:kevingimbel/portcheck.git
```

Then make the script executable and link it somewhere into your `$PATH`.

```bash
$ chmod +x portcheck
$ (sudo) ln -s /full/path/to/portcheck /usr/local/bin/
```

Now you can run `portcheck -v` to see if it was installed correctly.

### Usage
Call the script and pass `--host` and `--port` as parameter.

```bash
$ portcheck --host mywebsite.com --port 80
$ portcheck --host 123.456.789 --port 22
```
