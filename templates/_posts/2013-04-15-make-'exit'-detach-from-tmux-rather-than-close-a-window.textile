---
layout: bit
title: "Make 'exit' detach from tmux rather than close a window"
---
I use tmux (formerly screen - goodbye, old friend) to keep multiple workflows open on my VPS. Too frequently, I'll come back to my terminal window after working on something else and type "exit" to log off. But, wait! I hadn't detached from my tmux session. Instead of logging off, I killed one of my tmux windows, which is irritating because it represented something I wanted to keep open. And, because my fingers work faster than my brain, more often than not I'll just type "exit" again before I realize why it didn't work the first time. BAM. Now I have to try to put back together my tmux session when all I wanted to do was log off.

I decided to stop suffering this morning and wrote an exit function (placedin my .zshrc) that will either detatch if inside a tmux session, or exit like normal if not.


{% highlight js %}
exit() {
    if [[ -z $TMUX ]]; then
        builtin exit
    else
        tmux detach
    fi
}
{% endhighlight %}

It checks for "the presence of the $TMUX environment variable":http://unix.stackexchange.com/questions/10689/how-can-i-tell-if-im-in-a-tmux-session-from-a-bash-script (or, more accurately, checks "the length of the string $TMUX":http://www.cs.elte.hu/zsh-manual/zsh_12.html); if $TMUX is not set, it exits normally. Note the use of the builtin keyword, which references the original exit command rather than the function of the same name that this creates. If $TMUX is set, it detatches from the tmux session.
