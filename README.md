# ComponentsJs

# Description
ComponentsJS is a tool that makes it easier to create custom HTML Elements with Javascript, or combine multiple elements and create bundles to modularize a project

# Usage

Linking the scripts:
```html
<!--Jquery is required-->
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="components-base.js" type="text/javascript"></script>
```

Example component:
```javascript
class Example extends ComponentBase
{
    constructor(attrs)
    {
        super(attrs);
        this.Register(`
            <div>Component example</div>
            <div eid="mylabel"></div>
        `);
        this.mylabel.innerHTML = "example label";
    }
}
```

Component binding:
```javascript
document.addEventListener("RegisterCustomElements", function () { 
    ComponentBindings.BindToElement("Example", Example);
});
```

Use the component in HTML:

```html
<component type="Example"></component>
```
