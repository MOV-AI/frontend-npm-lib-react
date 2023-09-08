#!/bin/sh
test -z "$PREF" && PREF=../../apps
test -z "$APP" && APP=ide
npm link ../core $PREF/$APP/node_modules/react $PREF/$APP/node_modules/react-virtualized
