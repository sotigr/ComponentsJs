class StyledInternal extends ComponentBase
{
    constructor(attrs){
        super(attrs);
        this.Register(`
        <div class="hello">Component example</div>
        <div eid="mylabel"></div>
        `);
        this.Styles(`
            class hello{
                color:red!important;
            }
        `);
        let inst = this;
        setTimeout(function() {
            inst.UpdateStyles(`
                class hello{
                    color:blue!important;
                }
            `);
        }, 3000);
     
    }
    Loaded()
    {
        this.mylabel.innerHTML = "example label";
    }
}
document.addEventListener("RegisterComponents", function () { 
    ComponentBindings.BindToElement("StyledInternal", StyledInternal);
});