---
layout: post
title: "Update: Sass Directory Imports With Gulp"
summary: A simple way to get directory @imports in Sass using Gulp.
---
<img src="/images/posts/sass-directory-include.png" class="l-full" style="max-width: 674px;" alt="Screenshot of a directory import">

I like using [Sass](http://sass-lang.com/) so much for writing CSS that I have really only one complaint about the language: it does not, and will not, support [globbing](http://en.wikipedia.org/wiki/Glob_%28programming%29) for its [@imports](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#import). [Nathan Weizenbaum](https://twitter.com/nex3), the primary maintainer of Sass, [explains](https://github.com/hcatlin/libsass/issues/156#issuecomment-34229670):

> The reference implementation of Sass doesn't and will not support globbing&hellip; It makes the order that rules are emitted very difficult to reason about and contingent on non-local factors. There does exist [a Ruby plugin](https://github.com/chriseppstein/sass-globbing) for it, but I personally discourage its use.

Since it's not wise to speak ill of one's betters, I'm not going to waste pixels complaining about this decision. But I use directories of certain kinds of partials as part of my CSS in a way that does not rely on order of inclusion. I have a directory for [functions](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#defining_custom_sass_functions), [mixins](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins), and one for [modules](http://smacss.com/book/type-module). If any CSS from my modules affects elements outside of the container element it's targeting, that's a fault of mine, so order should never matter. It's great that the [sass-globbing](https://github.com/chriseppstein/sass-globbing) plugin exists, but it's for Ruby. I use the much-faster [libsass](https://github.com/hcatlin/libsass), which has a [node wrapper](https://github.com/andrew/node-sass), not just for the speed but also because it's nice not having any dependencies for projects that aren't taken care of by `npm install`.

Note: it's at least a little bit irrational how much work I'm willing to put in to avoid having to list things that I already have in a directory. Whether it's Angular, Express, or Sass, having to create a file and THEN tell some other file that I've added it is like nails on a blackboard for me: it's just not the kind of work I feel I should have to do as a developer. I don't ever want to add a module, go to my webpage, wonder why it's not showing up, and realize I forgot to add it to my list of module includes. Can I justify that in terms of actual time cost? Probably not. But I don't develop just to be efficient: I chose this life because it gives me pleasure to solve problems using code. And I'm perfectly willing to admit that I consider my own pleasure / annoyance when crafting the tools in my toolbox.

A year ago, I [wrote a simple Grunt plugin](/2013/03/30/import-a-whole-directory-with-sass-using-grunt/) to make it possible to import whole directories at once by adding an `_all.scss` file to any directory you want to import. The grunt task would find any `_all.scss` files and write `@import` statements to it for all the other [partials](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#partials) it found in that directory. This is an idiomatic hack, but it's worked really well for me, allowing me to forget that it exists while I develop projects, adding partials to my `modules` directory as I need them.

But I recently [switched to Gulp](/2014/05/08/gulp-pattern-lint/), so I needed a new solution. I considered writing a gulp plugin, but with Gulp's emphasis on just being JavaScript, I realized that it'd probably be trivially simple to just use some JS inside a Gulp task.

	var gulp = require('gulp');
	// We'll use the filesystem, path, and glob packages
	var fs = require('fs');
	var path = require('path');
	var glob = require('glob');

	...

	// Hack the ability to import directories in Sass
	// Find any _all.scss files and write @import statements
	// for all other *.scss files in the same directory
	//
	// Import the whole directory with @import "somedir/all";
	gulp.task('sass-includes', function (callback) {
		var all = '_all.scss';
		glob('./client/src/scss/**/' + all, function (error, files) {
			files.forEach(function (allFile) {
				// Add a banner to warn users
				fs.writeFileSync(allFile, '/** This is a dynamically generated file **/\n\n');

				var directory = path.dirname(allFile);
				var partials = fs.readdirSync(directory).filter(function (file) {
					return (
						// Exclude the dynamically generated file
						file !== all &&
						// Only include _*.scss files
						path.basename(file).substring(0, 1) === '_' &&
						path.extname(file) === '.scss'
					);
				});

				// Append import statements for each partial
				partials.forEach(function (partial) {
					fs.appendFileSync(allFile, '@import "' + partial + '";\n');
				});
			});
		});

		callback();
	});

This is inside `Gulpfile.js` in my project root. It accepts a callback and calls it when finished [to make the task synchronous](http://cameronspear.com/blog/handling-sync-tasks-with-gulp-js/). (So that other tasks can list it as a dependency and depend on it being completed before they execute.)

	gulp.task('sass', ['sass-includes'], function () {

The only other thing I had to account for was the `watch` task: I didn't want it to get stuck in an infinite loop when it wrote to an `*.scss` file in response to changes to an `*.scss` file. So I just excluded `_all` in the glob that triggered my `sass` task.

	gulp.watch('client/src/scss/**/!(_all).scss', ['sass']);

After that, I added `_all.scss` files to the three directories I wanted to be able to import, and including directories was as easy as this again:

	@import "functions/all";
	@import "mixins/all";
	@import "rules/modules/all";

A final note: this isn't exactly the most Gulpy way of doing things. I'm modifying source files rather than dealing with my Sass files as a stream, modifying them, and passing them on through a pipe to the next process. But since Sass doesn't just deal with the files in the stream, it grabs imported files from outside the stream, I can't just find `@import`s in the stream and expand them myself, because it wouldn't work on any imported files. But ideally, we'd have a nice `gulp-sass-glob` plugin that worked that way.
