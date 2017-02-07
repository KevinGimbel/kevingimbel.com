---
date: 2017-02-06T10:50:17+02:00
title: colog
language: "Go"
project_url: https://github.com/kevingimbel/colog
---
Create colorful terminal logs with configurable defaults for Success, Warning, Error, and Info levels as well as time and log formats. Wraps around the excellent color.go package by [fatih](https://github.com/fatih/color/).

### Example

```go
package main

import (
	"fmt"
	"github.com/kevingimbel/colog"
)

var logConfig = make(map[string]string)

// Assign the configuration inside the init function
// This is run before main
func init() {
	logConfig["TimeFormat"] = "2006-Jan-2"
	logConfig["LogFormat"] = "[%s][%s] -- %s"
}

func main() {
	// Create a new Logger with the config assigned above
	Log := colog.NewColog(logConfig)

	fmt.Println(Log.Success("Yay, this is a success message!"))
	fmt.Println(Log.Info("Hello, here we have a Info. Take note!"))
	fmt.Println(Log.Error("Whoops! Looks like an error!"))
	fmt.Println(Log.Warn("Heads up! There is something wonky."))
}
```

## API

You can find the API documentation on [godoc.org](https://godoc.org/github.com/kevingimbel/colog)
