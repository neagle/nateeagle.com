---
layout: bit
title: "Save directory-specific ls settings"
---
!(l-full){max-width:693px}/images/posts/custom-ls.png!

One of the nice things OS X does is retain way you sort individual directories. This helps the Downloads folder, in particular, which I always want sorted reverse chronologically by date modified so that I can see what I just downloaded at the top.

I wanted my shell to do something similar: I changed my ls command to check for the existence of an @.lsrc@ file in the current directory. The @.lsrc@ file should be nothing but a set of arguments to be passed to the @ls@ command. For example, my @~/Downloads@ folder has this @.lsrc@:

{% highlight bash %}
-ltr
{% endhighlight %}

* -l: use a long listing format
* -t: sort by modification time
* -r: reverse order while sorting

Then I added this function to my @.zshrc@ file:

{% highlight bash %}
ls() {
    if [[ -f ./.lsrc ]]; then
        /bin/ls `cat .lsrc` $*
    else
        /bin/ls $*
    fi
}
{% endhighlight %}

The @ls@ command works normally everywhere else, but anywhere I want it to have specific default behavior, I just drop an @.lsrc@ file.
