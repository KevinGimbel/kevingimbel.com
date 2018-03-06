---
title: "Why does every user agent string start with Mozilla?"
via:
  name: Reddit
  URL: https://www.reddit.com/r/programming/comments/81yq8b/why_every_user_agent_string_start_with_mozilla/
date: 2018-03-06T00:00:00Z
---

Did you ever wonder why every browser user-agent starts with "Mozilla"? Chrome on MacOS (version 64) for example has the following user agent string.

```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36
```

I did wonder, but never really bothered to look it up. The other day, however, I found a blog post which explains the history behind the "Mozilla" part of the user string and it's quite funny.

> In the beginning there was NCSA Mosaic, and Mosaic called itself NCSA_Mosaic/2.0 (Windows 3.1), and Mosaic displayed pictures along with text, and there was much rejoicing.

> And behold, then came a new web browser known as “Mozilla”, being short for “Mosaic Killer,” but Mosaic was not amused, so the public name was changed to Netscape, and Netscape called itself Mozilla/1.0 (Win3.1), and there was more rejoicing. And Netscape supported frames, and frames became popular among the people, but Mosaic did not support frames, and so came “user agent sniffing” and to “Mozilla” webmasters sent frames, but to other browsers they sent not frames.

It is quite a fun read about the history of browsers and the propbelems we still have today because of feature detection. Read the rest of the article the get the whole history at https://webaim.org/blog/user-agent-string-history/
