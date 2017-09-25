# Redux DevTools

[Redux DevTools](https://github.com/gaearon/redux-devtools#browser-extension) can give you insights into how your Redux app is working when it is not working as you expect it to. You can inspect your state object, see actions as they happen, and even jump back to previous actions and states, a feature known as _time travelling_.

![Bill and Ted](billandted.gif)

![Tardis](tardis.gif)

![Back to the Future](backtothefuture.gif)

![Superman](superman.gif)

![Cher](cher.gif)

The easiest and least invasive way to get Redux DevTools working is to use the [Chrome extension](https://github.com/zalmoxisus/redux-devtools-extension), which can be installed from the [Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd). In addition to the extension itself, you should install the `redux-devtools-extension` package into your project.

```
npm install redux-devtools-extension --save
```

To be able to see what is going on with your Redux app in the extension, require the `composeWithDevTools` function, pass to it the the value returned from your call to `applyMiddleWare`, and pass the value it returns to `createStore`.

```js
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));
```

The extension's button in Chrome's toolbar should now light up when you view your site or any site configured to work with the extension. Click the button to launch the UI and start time travelling.
