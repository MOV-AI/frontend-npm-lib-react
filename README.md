# MOVAI-Lib-React

![Movai](https://www.mov.ai/wp-content/uploads/2021/06/MOV.AI-logo-3.png)

# Troubleshooting

## Invalid hook 

When running the lib-react locally from IDE or another app, you might have an issue with invalid hooks with the following message: "Error: Invalid hook call. Hooks can only be called inside of the body of a function component."

To fix it, stop the development server of IDE (or the other app), stop the buildDev of lib-react and run the following command in lib-react repository root:

`sudo npm link ../frontend-npm-lib-react/node_modules/react`
