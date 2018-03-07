# ComponentsJs

# Description
ComponentsJS is a tool that makes it easier to create custom HTML Elements with Javascript, or combine multiple elements and create bundles to modularize a project

# Usage

Linking the scripts:
```html
<script src="components-base.js" type="text/javascript"></script>
```

Example component:
```javascript
class Example extends ComponentBase
{
    constructor(attrs)
    {
        //Any element attributes must be passed to ComponentBase 
        super(attrs);

        //Register a template for your component
        this.Register(`
            <div>Component example</div>
            <div eid="mylabel"></div> 
        `);
    }
    //After the component is ready
    Loaded()
    {
        //You can safely make changes to its elements
        this.mylabel.innerHTML = "example label";
    }
}
```

Component binding:
```javascript
//Choose a type name for your component and bind it
document.addEventListener("RegisterComponents", function () { 
    ComponentBindings.BindToElement("Example", Example);
});
```

Use the component in HTML:
```html
<!--Render your component in HTML-->
<component type="Example"></component>
```
