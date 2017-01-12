---
layout: post
title: "Progress on GoKibitz"
summary: "This is an update to last week's post: I'm getting something done."
---
I'm going to take a break from work to write a little. I'm happy to report that I've had a productive weekend on my most important personal project, [GoKibitz](http://gokibitz.com). For one thing, my compassionate wife read [my post](/2014/04/20/falling-to-pieces/) and has gone out of her way to make time for me to code when we're both home with our son. For another, there's been some [recent conversation on go-related development](http://www.lifein19x19.com/forum/viewtopic.php?f=10&t=10226) at Life in 19x19 that's ramped up my enthusiasm about getting some of the things I've worked on to a point that they could actually be used.

I also put up [the last version of GoKibitz](http://gokibitz.com/demos/2014-05-02/) that I had been working on, and was pleasantly surprised by how much work I had done.

However, I also found out about [WGo.js](http://wgo.waltheri.net/player), an SGF Player by Jan Prokop. As you can see from [the demo](http://wgo.waltheri.net/demo/player/1), it's got all the relevant features, but more importantly, it has a well-documented event system that will make it really easy to interact with. When I saw this, I thought, why the hell am I recreating all this? (Historical note: the origination of GoKibitz was my desire to add the ability for users viewing an embedded [Eidogo](http://eidogo.com/) player to add comments to individual move. When I found Eidigo too limited to do this easily, I decided to make my own player.) Why don't I just work on creating an API for saving and retrieving comments?

To do that, I had to finally figure out how to set up Express and MongoDB. These technologies should be really easy for me: I've worked with JavaScript for years. But I drown pretty easily when dropped into more complex, MVC-style structures. At work, I almost always work inside existing setups that involve adding features and modifying what's already present; that's not that difficult. But if things need to be reworked too much, I get out of my comfort zone quickly.

That frustrates and embarrasses me, by the way. Even admitting how much of a problem these kinds of abstractions pose for me reveals what a hack I am as a developer. But I started coding in JS with jQuery in an extremely linear fashion. I treated it like CSS: select something, then do something with it. I could add a lot of functionality to pages that way, and I got hooked quickly on the pleasure of being able to add so much to the behavior layer of a page. I've learned a lot over the years since then, but I haven't _really_ designed applications more complicated than widgets from scratch. (I've worked inside plenty, without trouble.)

But having blocks of time this weekend to focus helped me a lot: I worked my way through [two](http://www.codemag.com/Article/1210041) [excellent](http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local) tutorials and now have a functioning app powered by Node + Express that lets a user create an account, upload SGFs, and provides an API for making, listing, viewing, updating, and deleting comments associated with a game and move number. (Next up: allowing users to add variations.)

My brain is different: the Express setup really makes sense (though there will be plenty more to figure out about it). I got from wondering how in the hell routes worked at all to figuring out how to make successful logins redirect back to the original pages that redirected users away because of required authorization.

The only bad thing is that I haven't played any go or done many problems in the last week, but it doesn't matter. Advancing my development ability is at least as important as advancing my strength in go, and the thrill you get when you start to realize how much power Express gives you to develop your own applications is every bit as great as winning an important game in go.
