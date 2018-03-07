class StyledInternal extends ComponentBase
{
    constructor(attrs){
        super(attrs);
        this.Register(`
        <div class="hello">Component example</div>
        <div eid="mylabel"></div>
        `);
        this.Styles(`
            .hello{
                color:red!important;
            }
        `);
    }
    Loaded()
    {
        this.mylabel.innerHTML = "example label";
    }
}
document.addEventListener("RegisterComponents", function () { 
    ComponentBindings.BindToElement("StyledInternal", StyledInternal);
});