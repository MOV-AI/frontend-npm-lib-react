#!/bin/sh
#pnpm link ../../node_modules/.pnpm/react-i18next@12.2.2_i18next@21.10.0_react-dom@18.2.0_react@18.2.0/node_modules/react-i18next/
#pnpm link ../../node_modules/.
cd node_modules
# these two are required even when using pnpm on the project if we want to use react-scripts
ln -sf ../../../node_modules/.pnpm/react-i18next@12.2.2_i18next@21.10.0_react-dom@18.2.0_react@18.2.0/node_modules/react-i18next
ln -sf ../../../node_modules/.pnpm/notistack@3.0.1_csstype@3.1.2_react-dom@18.2.0_react@18.2.0/node_modules/notistack
# These can be avoided if we're at least using pnpm on the parent project
ln -sf ../../../node_modules/.pnpm/styled-components@5.3.10_react-dom@18.2.0_react-is@18.2.0_react@18.2.0/node_modules/styled-components
ln -sf ../../../node_modules/.pnpm/react-virtualized@9.22.5_react-dom@18.2.0_react@18.2.0//node_modules/react-virtualized
ln -sf ../../../node_modules/.pnpm/react-i18next@11.18.6_i18next@22.4.15_react-dom@18.2.0_react@18.2.0/node_modules/react-virtualized
ln -sf ../../../node_modules/.pnpm/@mui+material@5.12.2_@emotion+react@11.10.8_@emotion+styled@11.10.8_react-dom@18.2.0_react@18.2.0/node_modules/@mui/material
ln -sf ../../../node_modules/.pnpm/@mui+icons-material@5.11.16_@mui+material@5.12.2_@types+react@17.0.58_react@18.2.0/node_modules/@mui/icons-material
cd -
