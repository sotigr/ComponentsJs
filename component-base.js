
//===================================
// Initializing css keyframe hack
//===================================

var keyframes_and_styles = `
<style>
    @keyframes nodeInserted {  
        from {  
            outline-color: #fff; 
        }
        to {  
            outline-color: #000;
        } 
    }

    @-moz-keyframes nodeInserted {  
        from {  
            outline-color: #fff; 
        }
        to {  
            outline-color: #000;
        }  
    }

    @-webkit-keyframes nodeInserted {  
        from {  
            outline-color: #fff; 
        }
        to {  
            outline-color: #000;
        }  
    }

    @-ms-keyframes nodeInserted {  
        from {  
            outline-color: #fff; 
        }
        to {  
            outline-color: #000;
        } 
    }

    @-o-keyframes nodeInserted {  
        from {  
            outline-color: #fff; 
        }
        to {  
            outline-color: #000;
        }  
    } 

    component {
        padding: 50px;
        animation-duration: 0.01s;
        -o-animation-duration: 0.01s;
        -ms-animation-duration: 0.01s;
        -moz-animation-duration: 0.01s;
        -webkit-animation-duration: 0.01s;
        animation-name: nodeInserted;
        -o-animation-name: nodeInserted;
        -ms-animation-name: nodeInserted;        
        -moz-animation-name: nodeInserted;
        -webkit-animation-name: nodeInserted;
    }
</style>
`;
$(document.head).prepend(keyframes_and_styles);

var _component_type_list = [];
var _component_object_list = []; 

class ComponentBindings{
    static BindToElement(elementtype, componentClass)
    { 
        _component_type_list[elementtype] = componentClass;
        $("component[type='"+elementtype+"']").each(function(){
            ComponentBindings.Render({target : this}, elementtype);
        });
    }
    static Render(e)
    { 
        let element_type = e.target.getAttribute("type");   
        let cls = _component_type_list[element_type];
        if (cls!=undefined){
            let obj = new cls(e.target.attributes);
            let pid = e.target.getAttribute("id");
            if (pid != null){
                obj.body.setAttribute("id", pid);
                _component_object_list[pid] = obj;
            }
            if (obj.existingElementRenderMode=="prepend"){
                $(e.target).children().each(function(){
                    $(obj.existingElementTatget).prepend(this);
                });
            }
            else if (obj.existingElementRenderMode=="append")
            {
                $(e.target).children().each(function(){
                    $(obj.existingElementTatget).append(this);
                });   
            }
            $(e.target).replaceWith(obj.body);
            obj.Loaded();
            return obj;
        } 
        return null;
    }
}

function getComponentById (compid){
    return _component_object_list[compid];
}; 

class ComponentBase {
    constructor(attrs) {
        this.body = document.createElement("div");
        this._original_display_state = [];
        this.components = [];
        if (attrs!=undefined)
        { 
            for (var i = 0;i<attrs.length;i++)
            {
                this.body.setAttribute(attrs[i].name, attrs[i].value);
            } 
        }
        this.existingElementRenderMode="append";
        this.existingElementTatget = this.body;
        //$(this.body).css("opacity","0");
        //$(this.body).animate({"opacity": "1"}, 1000);
    }
    Loaded(){};
    DisableSelect()
    {
        this.body.style.userSelect = "none";
        this.body.style.msUserSelect = "none";
        this.body.style.webkitUserSelect = "none";
    }
    Register(template)
    {
        $(this.body).append(template);
        let Instance = this;
        $(this.body).find('[eid]').each(function(){
            Instance[this.getAttribute("eid")] = this; 
        });
        $(this.body).find('[cid]').each(function(){
            var component = ComponentBindings.Render({target: this});
            Instance.components[this.getAttribute("cid")] = component;
            Instance[this.getAttribute("cid")] = component;
        });
    }  
    Element(eid) {
        return $(this.body).find('[eid="' + eid + '"]')[0];
    }
    HideElement(eid) {
        this._original_display_state[eid] =  this.Element(eid).style.display;
        this.Element(eid).style.display = "none";
    }
    ShowElement(eid) {
        this.Element(eid).style.display = this._original_display_state[eid];
    }
    Destroy()
    {
        $(this.body).remove();    
    }
}

$(window).ready(function(){
    document.dispatchEvent(new Event("RegisterCustomElements")); 

    document.addEventListener('animationstart', ComponentBindings.Render , true);
    document.addEventListener('MSAnimationStart', ComponentBindings.Render, true);
    document.addEventListener('webkitAnimationStart', ComponentBindings.Render, true);
     
    document.dispatchEvent(new Event("ComponentsReady"));
});
