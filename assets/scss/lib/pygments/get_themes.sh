# Generate theme .scss files for pygments
themes=(monokai manni rrt perldoc borland colorful default murphy vs trac tango fruity autumn bw emacs vim pastie friendly native)
for theme in "${themes[@]}"; do
    echo "Generating _${theme}.scss"
    pygmentize -f html -S ${theme} -a .highlight > _${theme}.scss
done
