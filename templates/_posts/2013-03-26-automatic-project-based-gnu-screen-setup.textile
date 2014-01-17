---
layout: post
title: "Automatic, Grunt-Project-Based GNU Screen Setup"
summary: "Wish list: the ability to type <code>screen</code> in the root directory of a Grunt project to start up a screen session with screens automatically set up for the key files."
tags:
- screen
- grunt
---
This is a wish list item: I'm writing about it now so that I remember what I wanted. Hopefully, I'll find a chance to come back to this and actually build what I want. If I do, I'll update the post.

I love using GNU Screen to manage my workflow on projects. If you work entirely in the terminal, it's great to have screens open with the different processes and files you need to juggle while working on something.

For example, I might have these screens going simultaneously:

* A grunt watch process
* Gruntfile.js
* My main plugin JS file
* My main plugin SCSS file
* A command line for compiling Grunt, maneuvering files around, etc.

Inside screen, the shortcut @Ctrl+A, "@ brings up a list of open screens. Inside any individual screen, you can change the name with @Ctrl+A, A@. This is a great window-management feature that doesn't rely on any OS Chrome, but it has a further advantage when you're working remotely. Any time you get disconnected because you got up for lunch or, I don't know, you stopped working for a while out of the desire to sleep during the dark period of the earth's rotation, you can log back in and just @screen -r@ to hop back in exactly where you left off, all of your screens and processes just as you left them.

You can also name your screen sessions with @screen -S name@, then disconnect and reconnect to them according to what you're working on.

The process of setting up your project initially is still a bit of a pain, and it's especially a pain on your Mac, where you lose any active screen sessions whenever the Mac gets restarted. Since my whole life as a developer is structured around Grunt projects, I'd love to have an automatic startup for screen that takes advantage of this predictable structure.

So my wishlist item:

# I go to the root directory of a Grunt project.
# I type "grunt screen" (or @screen@, or whatever).
# Grunt, or my startup script, or whatever checks to see if I'm in a screen session already. If I am, it aborts with a nice message.
# Then it checks to see if there's an active screen session for this project.
# If there is, it resumes it.
# If not, it starts a new one.
# It also spins up some default screens - one for a grunt watch process, and a few others based on my Gruntfile.js. There could be logic to figure out what some key files are, or there could just be a section of the config where important files are listed explicitly.
# If I'm not inside a Grunt project, screen starts as normal.
