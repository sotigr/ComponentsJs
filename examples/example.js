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
document.addEventListener("RegisterCustomElements", function () { 
    ComponentBindings.BindToElement("Example", Example);
});