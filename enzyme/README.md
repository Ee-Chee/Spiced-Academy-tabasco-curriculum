# Enzyme

[Enzyme](https://airbnb.io/enzyme/) is a utility created by Airbnb that aids in testing React components. It allows you to do [shallow rendering](https://airbnb.io/enzyme/docs/api/shallow.html) of components so that you can test them individually. With shallow rendering, you create an instance of a component without its child components. You can inspect the element tree that the component produces using a jQuery-like syntax. You can also simulate DOM events and manually set and reset props and state properties.

Suppose that you want to write tests for the following component:

```js
export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name
        };
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.setState({
            name: null
        });
    }
    render() {
        const {name} = this.state;
        return (
            <div className="hello" onClick={this.onClick}>
                Hello, <Greetee name={name || 'World'} />!
                <p>It is nice to see you.</p>
            </div>
        );
    }
}
```

The first thing you would do in your tests is call Enzyme's `shallow` method to create a wrapper object containing the element tree your component renders.

```js
import { shallow } from 'enzyme';

const wrapper = shallow(<Hello name="Kitty" />);
```

`shallow` returns a "wrapper" object that contains the rendered output of the component. You can call [numerous methods](https://airbnb.io/enzyme/docs/api/shallow.html) on this wrapper to find nodes and confirm that the output is what you expect.

```js
test('Hello renders as expected', () => {
    expect(
        wrapper.find('.hello').length
    ).toBe(1);

    expect(
        wrapper.find('Greetee').length
    ).toBe(1);
});
```

The `prop` method allows you to test the values of props passed to nodes.

```js
test('Hello renders as expected', () => {
    expect(
        wrapper.find('Greetee').prop('name')
    ).toBe('Kitty');

    expect(
        wrapper.first().prop('className')
    ).toBe('hello');
});
```

The `contains` method lets you test for the presence of nodes.

```js
test('Hello renders as expected', () => {
    expect(
        wrapper.contains(<p>It is nice to see you</p>)
    ).toBe(true);
});
```

Calling the `simulate` method causes event handlers to run so you can confirm that the expected changes take place.

```js
test('Clicking works as expected', () =>
    expect(
        wrapper.find('Greetee').prop('name')
    ).toBe('Kitty');

    wrapper.first().simulate('click');

    expect(
        wrapper.find('Greetee').prop('name')
    ).toBe('World');
});
```

The `instance` method of the wrapper object gives you access to the component instance itself, allowing you to call its methods directly.

```js
test('onClick method works as expected', () => {
    wrapper.instance().onClick();

    expect(
        wrapper.find('Greetee').prop('name')
    ).toBe('World');
});
```

See the [Enzyme docs](https://airbnb.io/enzyme/docs/api/shallow.html) for the full list of available methods.

## Exercise

Write tests for your [BioEditor](../social_network4#2-bioeditor) component. Be sure to confirm that

1. When no bio is passed to it, an "Add" button is rendered.

2. When a bio is passed to it, an "Edit" button is rendered.

3. Clicking either the "Add" or "Edit" button causes a textarea and a "Save" button to be rendered.

4. Clicking the "Save" button causes an ajax request. The request should not actually happen during your test. To prevent it from actually happening, you should [mock axios](../jest#mocking-dependencies).

5. When the mock request is successful, the function that was passed as a prop to the component gets called.
