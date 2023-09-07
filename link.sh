#!/bin/sh
test -z "$APP" && APP=ide
npm link ../sub ../core ../styles ../../apps/$APP/node_modules/react ../../apps/$APP/node_modules/react-virtualized

