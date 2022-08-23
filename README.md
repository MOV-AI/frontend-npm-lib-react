# MOVAI-Lib-React

![Movai](https://www.mov.ai/wp-content/uploads/2021/06/MOV.AI-logo-3.png)

## Developing Mov.ai React library

1. Git clone mov.ai lib-react

2. Create new branch from dev

3. Update mov.ai lib-react

4. Test updates

   - You can use `npm run storybook` for that.

5. Commit/Push changes

6. Create pull request
   - Make sure to include the code owners

## Troubleshooting

## Invalid hook

When running the lib-react locally from IDE, you might have an issue with invalid hooks with the following message: "Error: Invalid hook call. Hooks can only be called inside of the body of a function component"

To fix it, stop the development server of IDE, stop the buildDev of lib-react and run the following command in lib-react repository root:

`sudo npm link ../frontend-npm-ide/node_modules/react`
