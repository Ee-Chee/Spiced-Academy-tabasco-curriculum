# Making Your Own Hooks

Making your own hooks is easy since they are just functions. The reason you would choose to make your own hook (as opposed to writing a plain, non-hook function) is that hooks can use other hooks. When you write your own hook, you are writing a function that can use state and respond to rendering and re-rendering. What's more, you can reuse this function across multiple components.

For example, we've written several components that display form fields and add to them event handlers that put the current value of each form field into state whenever the user changes it. This behavior can be moved into a hook that can be reused repeatedly.

```js
function useStatefulFields() {
    const [values, setValues] = useState({});

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    return [values, handleChange];
}
```

This hook can be used by any component that wants this behavior.

```js
function Hello() {
    const [{greetee='World'}, handleChange] = useStatefulFields();

    return (
        <div>
            <p>
                Hello, <strong>{greetee}</strong>
            </p>
            <input onChange={handleChange} name="greetee" value={greetee} />
        </div>
    );
}
```
![useStatefulFields](state.gif)

If your `Login` and `Registration` components are function components, you could use the `useStatefulFields` hook in them to eliminate a chunk of duplicated code without having to wrap them in a component whose only job is to pass this behavior to them. There would still be duplication, but this too can be moved into a hook.

```js
function useAuthSubmit(url, values) {
    const [error, setError] = useState();

    const submit = () => {
        axios.post(url, values).then(
            ({data}) => {
                if (data.success) {
                    location.replace('/');
                } else {
                    setError(true);
                }
            }
        );
    }

    return [submit, error];
}
```

This would allow your `Login` component to look like this:

```js
function Login() {
    const [values, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit('/login', values);

    return (
        <div>
            {error && <div className="error">Something went wrong!</div>}
            <input name="email" type="email" onChange={handleChange} />
            <input name="password" type="password" onChange={handleChange} />
            <button onClick={submit}>submit</button>
        </div>
    );
}
```

And your `Registration` component would look exactly the same except that it would pass a different url to `useAuthSubmit` and show different `<input>` elements. However, neither `Login` nor `Registration` would have to be nested in anything in particular in order for them to share this common functionality.
