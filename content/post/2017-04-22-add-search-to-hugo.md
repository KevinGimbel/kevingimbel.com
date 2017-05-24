---
title: "Add search to Hugo"
categories: coding
tags:
  - search
  - hugo
  - "static site"
date: 2017-04-22T16:14:35+01:00
---

With the recent [release of Hugo v0.20](https://github.com/spf13/hugo/releases/tag/v0.20) Output Formats were introduced. Output Formats allow to create a variety of file formats from data like json, csv, calendar files, and more. What first came to my mind was building a Search for my blog with the new JSON format - and that's what I did. This post walks throuh the steps needed to add a JSON-based search.

## File structure

First of all we need some new files. A Template for the search page, a template for the JSON file and some JavaScript. To start I created a new section "search" by creating a file in `content/search/_index.md` with a short description.

```
---
title: "Search"
outputs:
  - json
  - html
scripts:
  - "/js/search.js"
---

Use the search to filter through articles. Both the title and content are matched in a loose way, you may read up more in my post ["Add search to Hugo"](/add-search-to-hugo/).
```

What's important here is the `outputs` array! By defining a list of output formats we can tell Hugo to render this page in multiple formats - in this case Hugo will render an HTML page and a JSON file. Next I created a `search.html` file inside `layouts/section`. This file is basically my default `single.html` and a search form.

```html
{{ define "main" }}
<section class="page wrap" aria-labeldyby="title" aria-describedby="desc">
  <header class="page-header">
    <h2 id="title">{{ .Title }}</h2>
  </header>
  <div class="page-body" id="desc">
    {{ .Content }}
    <div class="search-wrap">
      <input type="text" placeholder="Type to search" id="search" class="search-input" />
      <ul id="results" class="search-results"></ul>
    </div>
  </div>
</section>
{{ end }}
```

The `search.json.json` Template loops through all the posts and outputs them as JSON with the following template.

```go
[
{{- range where .Site.Pages "Section" "post" -}}
  {{- $title := (lower .Title) -}}
  {{- $content := (lower .Plain) -}}
  {{- $date := (.Date.Format "01.Jan 2006") -}}
    {{- dict "title" $title "content" $content "permalink" .Permalink "date" $date | jsonify -}},
  {{- end -}}
{}
]
```

There's quite a lot happening here so I'll go through each line:

- `range where .Site.Pages "Section" "post"` loops through all pages considered a "post"
- `$title := (lower .Title)` assigns the post title in lowercase to the variable `$title`
- `$content := (lower .Plain)` assigns the plain, lowercase post content to the variable `$content`
- `$date := (.Date.Format "01.Jan 2006")` assigns the post date in the format "Day.Month Year" to the variable `$date`
- The next line starting with `dict` uses Hugos [dict](https://gohugo.io/templates/functions/#dict) function to create a dictionary with key-value pairs which can then be converted to JSON by calling `jsonify`

You might wonder why I am using `{{- ` on each line. This is the Go way to remove whitespace from tempaltes. By using this tempalte I get a big JSON file containing all articles, as you can [see here "View search JSON file"](/search/index.json).

The last piece missing is the `search.js`. It holds the JavaScript to perform the actual search, which I am not going into detail here but [the source code is documented "View search.js on GitHub"](https://github.com/kevingimbel/kevingimbel.com/blob/master/themes/kevingimbel/src/js/search.js). 😬

The gist of it is: I load the `search/index.json` file, save it into a local variable and then on the keyup event on the search input I filter through all the values and find whatever matches. The search function itself is implemented like so:

```js
function findPosts(searchString) {
  // convert the search input text to lower case
  var term = searchString.toLowerCase();
  // filter searchData...
  return searchData.filter( function(data) {
    // ... by looking into the title and content of each entry. If they match, then
    // the item is returned.
    return data.title.indexOf(term) > -1 || data.content.indexOf(term) > -1;
  });
}
```

I am using some new-ish APIs like [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and  [`Promise`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise). These are not supported in Internet Explorer and therefore require a [Polyfill](https://remysharp.com/2010/10/08/what-is-a-polyfill). I chose [github/fetch](https://github.com/github/fetch) and for promises I chose [taylorhakes/promise-polyfill](https://github.com/taylorhakes/promise-polyfill). These two only take effect when there is no native support for `fetch` and `Promise`.

And that's it. Adding a search feature to Hugo with the new Output Formats.
