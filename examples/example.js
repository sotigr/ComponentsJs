class Example extends ComponentBase
{
    constructor(attrs)
    {
        super(attrs);
        this.Register(`
            <div>Component example</div>
            <div eid="mylabel"></div> 
        `);
    }
    Loaded()
    {
        this.mylabel.innerHTML = "example label";
    }
}
document.addEventListener("RegisterComponents", function () { 
    ComponentBindings.BindToElement("Example", Example);
});