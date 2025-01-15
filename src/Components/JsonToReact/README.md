# JsonToReact

## Introduction

The main motivation for JsonToReact component is to build forms in a easy way. The easy way is to create a function:Json -> Form.
This was implemented through a react component called JsonToReact. The whole concept and json semantics is based on [this project](https://github.com/rjsf-team/react-jsonschema-form).

## Json Semantics

In order to define the form you need 3 Json files:

- schema
- uiSchema
- formData

### Schema

Defines the main structure of the form. It has the following structure

```javascript
Root = {
  title: "A Title",
  description: "A description",
  type: "object",
  properties: {
    ObjectA: Root || Atom,
    ...
  }
};

Atom = {
    AtomName: {
      type: "a type",
      title: "a title"
    },
}
```

### UiSchema

Defines the types of objects.

```javascript
R = {
  ObjectName: {
    UiAtom || R
  }
  ...
}

UiAtom = {
  "ui:<type>": value
}

<type> := disable || widget || options
```

### Data

```javascript
R = {
    ObjectA: R || value,
    ...
}
```
