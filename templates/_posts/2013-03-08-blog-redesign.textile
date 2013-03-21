---
layout: post
title: "Blog Redesign"
summary: I redesigned the blog because why blog about things when you could just endlessly fiddle with code?
---
I've been working on this off and on, and I finally decided just to launch it since a) it will never be perfect, and b) I will not be getting significantly more free time any time in the near future.

h2. We're responsive!

I'd like to note that back in 2006, I read a post by some guy about some JavaScript he wrote that would change the body class based on the width of the browser window. He had a demo that showed a web page adjusting the number of columns in its layout based on the window size. I bookmarked it and briefly tried to create a design for my blog based around that idea, but then I probably got bored and watched some Simpsons episodes.

Seven years later, responsive design has taken over the internet. To be fair, it matters a lot more now that we're using tons of mobile devices. But it's interesting to remember that lots of things don't take off when they become possible, they take off when they matter.

h2. @font-face

We're rocking custom fonts, just like the rest of the internet.

h2. Grunt JS

I'm using Grunt to automate everything I can. It compiles my scss, minifies my js, runs jekyll, and irons my laundry.

h2. No longer served by Github Pages

I thought it was fun to use Github's pages to host my site last time. Then I realized that it didn't really matter because I'm paying for a VPS anyway. Also I'm doing all my compilation on my own with Grunt, so the fact that Github will run a Jekyll process on its side wasn't really a perk anymore.

It is, of course, still _on_ Github. You can check out "the repo":https://github.com/neagle/nateeagle.com if you feel like it.

h2. And actual posts, maybe

But no promises.
