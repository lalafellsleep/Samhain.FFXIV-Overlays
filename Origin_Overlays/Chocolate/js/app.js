/* ACT Overlay Global Script (Rework Combatant data) */
$(".datachange").click(function(){
    curopt++;
    if(curopt >= options.length) curopt = 0;
    $(this).find(".option").each(function(){$(this).hide();});
    $(".datachange .option[v="+curopt+"]").show();
    combatCalculator();
});

$(".combatdatas").click(function(){
    $(this).attr("toggle", $(this).attr("toggle")=="on"?"off":"on");
    if($(this).attr("toggle") == "on")
    {
        $("section.data").css("top", "100%");
        $("section.combatlog").css("left", "5px");
    }
    else
    {
        $("section.data").css("top", "71px");
        $("section.combatlog").css("left", "105%");
    }
});

var combatlog = [];
var curopt = 0;
var lang = new Language("ko");
var sortKey = "encdps";
var underDot = 1;

function checkboxMove(obj)
{
    if($(obj).attr("checked")=="checked"?true:false)
    {
        $(obj).find(".checkActive").css("margin-left","-24px");
        $(obj).find(".checkboxActor").css("margin-left","0px");
        $(obj).find(".checkInactive").css("margin-left","0px");
        
        switch($(obj).attr("data-id"))
        {
            case "1":
                $(".data div").each(function()
                {
                    $(this).find(".i").css("-webkit-filter", "");
                });
                break;
            case "2":
                $("section.data").removeClass("qhd");
                combatCalculator();
                break;
        }
    }
    else
    {
        $(obj).find(".checkActive").css("margin-left","0px");
        $(obj).find(".checkboxActor").css("margin-left","24px");
        $(obj).find(".checkInactive").css("margin-left","38px");

        switch($(obj).attr("data-id"))
        {
            case "1":
                $(".data div").each(function()
                {
                    var name = $(this).attr("data-id");
                    if( name != "YOU" && name != "Limit Break" )
                        $(".data div[data-id=\""+name+"\"] .i").css("-webkit-filter", "blur(4px)");
                });
                break;
            case "2":
                $("section.data").addClass("qhd");
                combatCalculator();
                break;
        }
    }
}

$(".checkbox").click(function()
{
    var val = $(this).attr("checked")=="checked"?true:false;
    if($(this).attr("data-id") == "1")
    {
        localStorage.setItem("metro_nameview", !val);
    }
    else if($(this).attr("data-id") == "2")
    {
        localStorage.setItem("metro_qhd", !val);
    }
    $(this).attr("checked", !val);
    checkboxMove(this);
});

var lastCombat = null;

Storage.prototype.get = function(c)
{
    return JSON.parse(this.getItem(c));
}

Storage.prototype.set = function(c, value)
{
    localStorage.setItem(c, JSON.stringify(value));
}

$(document).ready(function()
{
    document.addEventListener('onOverlayDataUpdate', onOverlayDataUpdate);
    
    $(".checkbox[data-id=1]").attr("checked", localStorage.getItem("metro_nameview")=="true"?true:false);
    $(".checkbox[data-id=2]").attr("checked", localStorage.getItem("metro_qhd")=="true"?true:false);
    $(".checkbox").each(function(){
        checkboxMove(this);
    });
    $(this).find(".option").each(function(){$(this).hide();});
    $(".datachange .option[v="+curopt+"]").show();
    guageSizer();
});

$(window).resize(function(){
    guageSizer();
});

function guageSizer()
{
    $(".data div").each(function(){
        var obj = $(".data div[data-id=\""+$(this).attr("data-id")+"\"]");
        var size = $(obj).find(".value").width();
        if(size !== null)
        {
            size += 34;
            $(obj).find(".name").width($(this).width() - size);
        }
    });
}

function onOverlayDataUpdate(e)
{
    var d =  new Combatant(e, sortKey);
    lastCombat = d;
    combatCalculator();
}

function existsCombatlog(key)
{
    var r = false;
    for(var i in combatlog)
    {
        if(combatlog[i].key == key) r = true; 
    }
    return r;
}

function getrecalc(obj)
{
    lastCombat = getCombatlog(obj);

    $("section.data").css("top", "71px");
    $("section.combatlog").css("left", "105%");
    $(".combatdatas").attr("toggle","off");
    
    combatCalculator();
}

function getCombatlog(key)
{
    for(var i in combatlog)
    {
        if(combatlog[i].key == key) return combatlog[i].value;
    }
}

function addcombatlog(c)
{
    combatlog.push({key:c.combatKey, value:c});
    $("section.combatlog .cover").prepend("<div onclick=\"getrecalc('"+c.combatKey+"');\">"+c.Encounter.title+" ("+c.Encounter.encdps+"D, "+c.Encounter.enchps+"H)</div>");
}

function combatCalculator()
{
    if(lastCombat === null) return;
    var d = lastCombat;
    if(curopt == 1 || curopt == 2)
        d["summonerMerge"] = false;
    else
        d["summonerMerge"] = true;

    d.sortkeyChange(options[curopt].k);
    $("header .zonearea").html(d.zone + " - " + parseFloat(d.Encounter.encdps).toFixed(0) + " RD / " + parseFloat(d.Encounter.enchps).toFixed(0) + " RH");
    $("header .wordarea").html("[--:--] ".concat(d.title).replace("--:--", d.duration));

    $(".data>div").each(function()
    {
        var remove = true;
        for(var i in d.persons)
        {
            var a = d.persons[i];
            if(a.name == $(this).attr("data-id"))
            {
                remove = false;
                break;
            }
        }

        if(d["summonerMerge"] && $(this).attr("class") == "AVA")
            remove = true;

        if(remove) {$(this).remove(); }
    });

    d.rerank();

    for(var p in d.persons)
    {
        var a = d.persons[p];
        if(a.Job == "AVA" && a.petType != "Chocobo" && d["summonerMerge"]) continue;

        var name = " "+(a.rank+1)+". ";
        var top = a.rank*22;
        if(!(localStorage.getItem("metro_qhd")=="true"?true:false))
            top = a.rank*30;
        var job = a.Job;
        var alpha = 0.8;
        var value = options[curopt].v.format(a);
        var aclass = a.Class;
        if(a.isPet)
            aclass = a.petType;

        var meperc = parseFloat(a.damage/a.maxdamage*100).toFixed(underDot);
        var petperc = parseFloat(Math.abs(a.damage - a.mergedDamage)/a.maxdamage*100).toFixed(underDot);
        if(options[curopt].k == "encdps" || options[curopt].k == "mergedDamage")
        {
            meperc = parseFloat(a.damage/a.maxdamage*100).toFixed(underDot);
            petperc = parseFloat(Math.abs(a.damage - a.mergedDamage)/a.maxdamage*100).toFixed(underDot);
        }
        else if(options[curopt].k == "enchps" || options[curopt].k == "mergedHealed")
        {
            meperc = parseFloat(a.healed/a.maxdamage*100).toFixed(underDot);
            petperc = parseFloat(Math.abs(a.healed - a.mergedHealed)/a.maxdamage*100).toFixed(underDot);
        }
        else
        {
            meperc = parseFloat(a[options[curopt].k]/a.maxdamage*100).toFixed(underDot);
            petperc = 0;
        }

        if($(".data div[data-id=\""+a.name+"\"]").length > 0)
        {
            console.log(a.maxdamage);
            $(".data div[data-id=\""+a.name+"\"]").css("top", top+"px");
            $(".data div[data-id=\""+a.name+"\"]").find("i").html(name);
            $(".data div[data-id=\""+a.name+"\"]").find(".job").html(lang.get(aclass));
            $(".data div[data-id=\""+a.name+"\"]").attr("data-rank", a.rank);
            $(".data div[data-id=\""+a.name+"\"]").find(".bar").css({"width":meperc+"%", "background":"rgba("+a.color.R+","+a.color.G+","+a.color.B+","+alpha+")"});
            $(".data div[data-id=\""+a.name+"\"]").find(".petbar").css({"width":petperc+"%", "background":"rgba("+(a.color.R+(a.color.R/5))+","+(a.color.G+(a.color.G/5))+","+(a.color.B+(a.color.B/5))+","+alpha+")"});
            $(".data div[data-id=\""+a.name+"\"]").find(".content span.value").html(value);
            $(".data div[data-id=\""+a.name+"\"]").find("div.content").css("background-image","url(img/"+a.Job+".png)");
        }
        else
        {
            $(".data").append("<div style=\"top:"+top+"px;\" class=\""+job+"\" data-id=\""+a.name+"\" data-rank=\""+a.rank+"\"><div class=\"bar\" style=\"background:rgba("+a.color.R+","+a.color.G+","+a.color.B+","+alpha+"); width:"+meperc+"%;\"></div><div class=\"petbar\" style=\"background:rgba("+(a.color.R+(a.color.R/5))+","+(a.color.G+(a.color.G/5))+","+(a.color.B+(a.color.B/5))+","+alpha+"); width:"+petperc+"%;\"></div><div class=\"content\" style=\"background-image:url(img/"+a.Job+".png);\"><span class=\"name\"><span class=\"namecover\"><i>"+name+"</i><span class=\"i\">"+a.name+"</span><span class=\"job\">"+lang.get(aclass)+"</span></span></span><span class=\"value\">"+value+"</span></div></div>");
        }
    
        if(!(localStorage.getItem("metro_nameview")=="true"?true:false) && a.name != "YOU" && a.name != "Limit Break")
        {
            $(".data div[data-id=\""+a.name+"\"] .i").css("-webkit-filter", "blur(4px)");
        }
    }
    guageSizer();

    if(!existsCombatlog(d.combatKey) && d.Encounter.title != "Encounter")
    {
        addcombatlog(lastCombat);
    }
}