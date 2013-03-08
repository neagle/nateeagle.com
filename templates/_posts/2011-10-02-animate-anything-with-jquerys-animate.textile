---
layout: post
title: "Animate Anything With jQuery's .animate()"
summary: "jQuery's .animate() function is closely wedded to CSS properties, but you can use a fake CSS property along with the step function to animate absolutely anything."
---
jQuery's .animate() function is lovely: it's got great queueing built in and makes animating in JS totally painless. But it's limited to CSS properties. You can animate opacity, position, and more, but if you want to animate something in a very customized way, it's not as obvious how .animate() can help you.

I'd been meaning to try working around this a while ago, but I never got around to it. This weekend at the jQuery conference in Boston, I saw "Corey Frang":http://gnarf.net/ give a nice talk about how animation works in jQuery. He pointed out that it'd be awfully nice to be able to be able to use .animate() without needing a CSS property and that he's hoping it can get worked into the 1.7 release for jQuery. He pointed out that it's possible to work around the requirement right now, though, by using a fake CSS property, and he showed an example by "Cowboy":http://benalman.com/ (Ben Alman) that animated a string of text in a really cool way: it began with all of the text hidden, then it progressively revealed the text as it if it were unrolling, or being typed in. It even used a bounce effect (via easing). This was a perfect example of a great effect that makes sense to use .animate() for, but sure as hell isn't a CSS property.

So I decided to try to recreate Cowboy's example on my own.

<iframe
    style="width: 600px; height: 600px"
    src="http://jsfiddle.net/nate/Grt5e/embedded/result,js,html,css"
    allowfullscreen="allowfullscreen" frameborder="0"
></iframe>

The animation itself is surprisingly smooth. I have it output the latter segment of the text string so that the element containing the text doesn't change shape and size as it appears. It also prevents having the first few letters of words at the ends of lines appear before dropping the word to the line below as it gets long enough to wrap. Sometimes this might be a desireable effect: if you want it to look like the words are being typed live, for instance. In that case, just omit the span and the second substring.

Anyway: I guess it's time to hunt down Cowboy's example and see how I could have made mine better. I'm also eager to try other inventive ways to animate page elements - now it's just a matter of getting the idea.
