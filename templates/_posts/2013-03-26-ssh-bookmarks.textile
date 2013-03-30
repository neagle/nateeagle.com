---
layout: bit
title: "SSH Bookmarks"
---
I've always wanted some command-line ssh bookmarks for servers I have to access frequently. I know, I could just set up a bunch of aliases, but then I have to remember arbitrary names for every server I want to access.

It turns out that you can "use @~/.ssh/config@":http://kb.mediatemple.net/questions/1625/Using+an+SSH+Config+File to set up shortcuts for frequently accessed servers.

<pre><code>Host nateeagle
    HostName        nateeagle.com
    User            neagle
    IdentityFile    ~/.ssh/id_rsa.pub</code></pre>

So now I just type @ssh nateeagle@ to access my VPS, for example. I still would love to be able to type @ssh ls@ or something like that to get a friendly, alphabetized list of all the sites I have shortcuts set up for. It's relatively easy to pull open the config file in vim, but I'm spoiled by things like @brew list@ and @bower list@.
