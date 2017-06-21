# #!/bin/bash

DIRECTORY=~/.atom

if [ -d "$DIRECTORY" ]; then
  printf "Backup Atom config...\n"
  cp ~/.atom/config.cson $(dirname $0)
  cp ~/.atom/snippets.cson $(dirname $0)
  cp ~/.atom/keymap.cson $(dirname $0)
  cp ~/.atom/styles.less $(dirname $0)
  printf "Compeleted\n"
else
  printf "Atom directory not found."
fi

sleep 2
