---
layout: post
title: "Falling To Pieces"
summary: The more I want to do, the less I get done.
---
Recently I've been feeling the stirrings of ambition to get some personal projects done. For much of the past twenty-two months, I've mostly worked on surviving. Twenty-two months ago my son was born, and my activities were immediately reduced to only the top few on my priority list.

1. Taking care of my son.
2. Working for a living.
3. Playing go.

It's not that I don't have time for anything else: I have a little bit of time at the end of the day, usually. But I don't have the energy. 9:30 rolls around, my son is finally asleep, and I'm fit for little more than rewatching a 30 Rock episode or two and falling asleep on the couch. I've been very lucky in terms of go, because I have a two-hour private lesson every two weeks, and an all-day group lesson one Sunday every month. My wife has generously gone out of her way to make sure I can keep doing my lessons. As a result, I've gotten stronger at a steady pace over the last two years: at the 2012 New Jersey Open, I went 3-2 as a 6 kyu, and at the 2014 New Jersey Open, I went 3-2 as a 2 kyu. Two stones a year is better than I deserve.

But it's been hard to get anything else of any kind done, not even the project I care most about, [Go Kibitz](http://gokibitz.com), a SGF player and editor I began almost a year go. Again: it's not that I lack the time. If I jumped to my feet the moment my boy was asleep, grabbed my computer, and got to work, I could probably fit in about two hours of work a night. If I were the kind of person who could get by on six hours of sleep, I could fit in four hours. Some people do that, you know: they write books, they get graduate degrees, they make whole video games. I hate those people.

But getting back to where we started: recently I've wanted to try to get some motion going again on some of my personal projects. But everything I want to do seems to lead to something else, and so many of the things I want to do involve learning non-trivial things I don't already know.

1. I want to get GoKibitz back in action. It was really close to being a usable project!
2. Well, sure, but you still didn't have a way to do the main thing you wanted it for: to let people add comments to SGF files. To do that, you need to set up a DB - something like [Mongo](https://www.mongodb.org/).
3. Good point: maybe I should set up Mongo. Of course, then I have to worry about setting up authorization if I'm going to write an API for it.
4. Speaking of APIs, you're going to have to actually learn [Express](http://expressjs.com/).
5. That shouldn't be too difficult. Aren't they bundling that together these days with the [MEAN stack](http://mean.io/)? And you've wanted to learn [Angular JS](https://angularjs.org/), too.
6. Perfect! There's even [a yeoman generator](http://addyosmani.com/blog/full-stack-javascript-with-mean-and-yeoman/) for the MEAN Stack. Add an item to my to-do list: make an app with the MEAN stack!
7. Aaugaugughghghghgh. I can't even figure out how to add a new page to this stupid app. Learning Express, Mongo, and Angular together is failing hard.
8. You know what? Screw this app. I'll just work on GoKibitz again.
9. Though, I should really write a new renderer for it... the old one was in HTML/CSS, which looked pretty, but was limited. I should be using something like [PaperJS](http://paperjs.org/).
10. But is PaperJS really the best framework to use? Why don't I try making something in it and WebGL.
11. [three.js](http://threejs.org/) looks like a fantastic framework for WebGL - hmm, and I should be able to make a stone-shaped disc pretty easily. Just have to read up on custom shape generators.
12. This is going to take a while. Maybe I should just work on blogging a little more about go while I'm doing this.
13. Aw, shit: I haven't upgraded the version of Ubuntu my VPS is running on in ages and now the upgrade script keeps failing.
14. Time to set up a new disk image and migrate everything from my old one.
15. But now I can't generate my blog, because Jekyll has different requirements now. Should I fix my site?
16. No! Times have changed. For one thing, Jekyll's liquid templates suck. I'm way more familiar with Node JS than I was when I set this blog up; I should pick a Node JS static site generator. [Wintersmith](http://wintersmith.io/) looks good.
17. You know, why go to the trouble of learning somebody else's system? How complicated is a static site generator? You should just write one yourself.
18. Now THAT'S a good idea. Let me just find a good model... [Rufio](https://github.com/wesleytodd/rufio) looks promising.
19. Several hours in, I'm beginning to think Rufio is pretty much exactly what I want my static site generator to be. Why don't I just use Rufio?
20. Great: with that decided, isn't it time to change the design of your homepage? It's kinda weak sauce, and wouldn't it be a good idea to focus more on go, since that's what you want to write more about?
21. Maybe: should I do that or should I turn my homepage into more of a landing portal with stuff about me that links to a separate, fully go-focused blog?
22. Not a bad idea. But how do I want to design it? Do I want a design inspired by Howard Pyle, like my old blog? Do I want a more early- to mid-20th-century modern style? Why don't I browse [Aisle One](http://www.aisleone.net/) for inspiration.
23. Oh, I don't know... it's so hard to pick a design direction. Why don't I download [that new design program](http://macaw.co) so that it's easier to experiment?
24. Damn it: it's going to take some time to get comfortable using this program. Why don't I just go with a simple design?
25. Why don't I just pick up where I left off with GoKibitz?

I pity anyone who took the time to actually read all of that. It's nothing more than the shameful record of a mind utterly incapable of setting out to actually do a single thing. It left me, somewhere last week, having what may have amounted to an actual anxiety attack. My head was pounding, I couldn't sit still, I was breathing heavily. So on the way home, I decided two things:

1. I will fix my old blog - get an old version of Jekyll, whatever it takes. I will not update a single thing about it.
2. I will break GoKibitz into pieces: the SGF parser, the game navigator, the renderer, etc. I will package them as NPM modules and I will work on them one at a time, not worrying about putting them together until later. The parser itself is worth making available.
3. I'll start blogging.

And that's it. And as soon as I post this, I'll have done all three of those things. The blog is fixed (I did, indeed, have to install an old version of Jekyll) and I've released my [SGF parser on NPM](https://www.npmjs.org/package/smartgame). I learned a lot in the course of putting together an NPM module: I set up my first mocha tests, I have the build passing through Travis CI, I wrote a method to turn parsed games back into SGFs, and I even found and discovered an important bug in the parser that had gone unnoticed before. Next up is writing a navigator for parsed SGF files that has an API for moving throughout a game.

It's not much, and even this much concerted effort has left me feeling pretty worn out, but it's something.
