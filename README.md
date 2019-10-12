# lit-project-template
Example of [lit-element](https://lit-element.polymer-project.org/) project powered by [stringify-jsx](https://github.com/TargetTaiga/stringify-jsx).

## stringify-jsx configuration
To be able to use ``@event``, ``.value`` and ``?boolean`` bindings that are not valid in JSX the following configuration has been used:
```js
stringifyJsx({
    parserOptions: { sourceType: 'module', plugins: ['jsx', 'dynamicImport'] },
    customAttributeReplacementFn: (nodePath, defaultReplacement) => {
        if (defaultReplacement) {
            return defaultReplacement;
        }
        const attribute = nodePath.node.name;
        if (attribute.startsWith('a-')) {
            return '@' + attribute.slice(2);
        }
        if (attribute.startsWith('d-')) {
            return '.' + attribute.slice(2);
        }
        if (attribute.startsWith('q-')) {
            return '?' + attribute.slice(2);
        }
        return attribute;
    }
})
```
Thus this code:
```jsx harmony
<input a-input={this.handleInput}/>
``` 
Will be transformed into
```
<input @input="${this.handleInput}"/>
``` 