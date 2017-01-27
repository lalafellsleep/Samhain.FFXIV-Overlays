var style = "pastell";

var setting = new Setting();
var load = localStorage.getItem("crystalparticle_setting");
if (load != undefined)
{
    load = JSON.parse(load);
    for(var i in load)
    {
        setting.set(i, load[i]);
    }
}

function playWAV(file)
{
    if (!setting.soundplay) return;
    var audio = new Audio("./"+file);
    audio.volume = 0.2;
    audio.play();
}

$(".icons").click(function()
{
    $(".left>.icons").removeClass("selected");
    $(this).addClass("selected");

    var tab = $(this).attr("data-tab-id");
    $(".content").hide();
    $(".content[data-tab="+tab+"]").show();
});

$(".winclose").click(function()
{
    playWAV("wav/conf.wav");
    setTimeout(function(){playWAV("wav/closewin.wav");}, 50);
});

$(".setting, .combobox, .tab, .icons").click(function()
{
    playWAV("wav/conf.wav");
});

$(".checkbox, .setting, .combobox, .tab, .icons, .winclose").mouseenter(function()
{
    playWAV("wav/hover.wav");
});

$(document).click(function(e)
{
    if (e.toElement.className != null)
    {
        if (e.toElement.className != "")
        if (e.toElement.className.indexOf("combobox") > -1 || e.toElement.className.indexOf("comboboxitems") > -1 || e.toElement.parentElement.className.indexOf("comboboxitems") > -1) return;
    }
    
    $(".comboboxitems").hide();
    $(".combobox>span").html("▶");
});

function openSet()
{
    if ($(".settingwindow").css("display") == "none")
    {
        $(".settingwindow").show();
    }
    else
    {
        $(".settingwindow").hide();
    }
}

$(".combobox").click(function()
{
    if ($(this).find("*[data=cur]").html() == "▼")
    {
        $(".comboboxitems").hide();
        $(this).find("*[data=cur]").html("▶");
        return;
    }
    
    $(".comboboxitems").show();
    $(this).find("*[data=cur]").html("▼");
    var left = $(this).offset().left+9;
    var top = $(this).offset().top+22;
    $(".comboboxitems").html("");
    
    var jdata = JSON.parse($(this).attr("data-items").replace(/'/ig, "\""));

    $(".comboboxitems").attr("data-target", $(this).attr("data-id"));

    for(var i in jdata)
    {
        var issel = "";
        if (i == setting[$(this).attr("data-id")])
        {
            issel = "selected";
        }

        if (jdata[i]["d"] != undefined)
        {
            $(".comboboxitems").append("<div data='"+i+"' class='"+issel+"'>"+jdata[i].d+"</div>");
        }
        else
        {
            $(".comboboxitems").append("<div data='"+i+"' class='"+issel+"'>"+jdata[i][setting.lang]+"</div>");
        }
    }
    $(".comboboxitems>div").mouseenter(function(){playWAV("wav/hover.wav");});

    $(".comboboxitems>div").click(function()
    {
        setting.set($(this).parent().attr("data-target"), $(this).attr("data"));
        $(this).parent().hide();
        playWAV("wav/conf.wav");
        if (lastCombat != null)
            onOverlayDataUpdate();
    });

    if (top + $(".comboboxitems").height() + 42> $(window).height())
    {
        $(".comboboxitems").css({"left":left+"px", "top":"auto", "bottom":"42px"});
    }
    else
    {
        $(".comboboxitems").css({"left":left+"px", "top":top+"px", "bottom":"auto"});
    }
});

$(".checkbox").click(function()
{
    $(this).attr("data-checked", ($(this).attr("data-checked")=="true"?"false":"true"));
    playWAV("wav/conf.wav");

    setting.set($(this).attr("data-id"), ($(this).attr("data-checked")=="true"?true:false));
});

$(document).ready(function()
{
    $(".checkbox").each(function(){
        if ($(this).attr("data-checked") != "true")
            $(this).attr("data-checked", "false");
    });
    document.addEventListener('onCharacterNameRecive', onCharacterNameRecive);

    selectedtab = setting.getFirstTab();
});

function onCharacterNameRecive(e)
{
    lastCombat.Combatant["YOU"].displayName = e.detail.charName;

    if(setting.usename)
        $("*[data-id=usename]>span").html(setting.usename?e.detail.charName:"YOU");
    else
        lastCombat.Combatant["YOU"].displayName = "YOU";

    onOverlayDataUpdate();
}

function onOverlayDataUpdate(e)
{
    $(".encounter").html("["+lastCombat.Encounter.duration+"] "+lastCombat.Encounter.title+" ("+lastCombat.Encounter.encdps+" DPS / "+lastCombat.Encounter.enchps+" HPS) <span></span>");

    if (lastarea != lastCombat.Encounter.CurrentZoneName)
    {
        $(".combatants").html("");
    }

    if (this.mergepet)
        lastCombat.AttachPets();
    else
        lastCombat.DetachPets();

    lastarea = lastCombat.Encounter.CurrentZoneName;
    lastCombat.rerank(sortKey, true);

    var rank = 99;

    for(var i in lastCombat.Combatant)
    {
        var c = lastCombat.Combatant[i];
        console.log(c.rank);

        if (c.isPet && lastCombat.summonerMerge) continue;

        if ($("div[data-uid=\""+c.name+"\"] .bar").length == 0)
        {
            var html = "<div style=\"top:"+(c.rank*21)
            +"px;\" data-uid=\""
            +c.name
            +"\" class=\""
            +setting.style
            +"\" data-role=\""+c.role+"\"><div data=\"bar\" class=\"bar "
            +c.Class
            +" "
            +setting.style
            +"\"><div class=\"add\"><div></div></div></div><div class=\"dat\"><div class=\"class\"><img src=\"./img/"
            +c.Class
            +".png\" /></div><div class=\"name\">";

            if (setting.usename)
                html += c.displayName;
            else
                html += c.name;
            
            html += "</div><div class=\"val\"></div></div>"
            +"</div>";

            $(".combatants").append(html);
        }
        
        var add = 0;
        var obj = "div[data-uid=\""+c.name+"\"] ";
        var toppx = 21;

        if (setting.backstyle == "fancy") 
        {
            add = 4;
            toppx = 24;
        }
        var rgbget = $(obj+" div[data=bar]").css("background");
        var regex = /(rgb\((.*?),(.*?),(.*?)\)|rgba\((.*?),(.*?),(.*?),(.*?)\))/ig;
        var match = rgbget.match(regex);
        var color = "";
        var breakc = false;
        for(var i in match)
        {
            if (match[i] != "rgba(0, 0, 0, 0)" && match[i] != "rgb(0, 0, 0)")
            {
                color = match[i];
                breakc = true;
                break;
            }
        }

        if (!breakc)
        {
            color = "rgba(0, 0, 0, .25)";
        }

        $(obj+" div[data=bar]>.add").css({"border-color":color});
        $(obj+" div[data=bar]>.add>div").css({"border-color":color});

        $(obj).removeClass();
        $(obj).addClass(setting.style);
        $(obj).css({"top":((c.rank * toppx)+add)+"px", "z-index":(rank - c.rank)});
        $(obj+" div[data=bar]").removeClass();
        $(obj+" div[data=bar]").addClass("bar");
        $(obj+" div[data=bar]").addClass(c.Class);
        $(obj+" div[data=bar]").addClass(setting.style);
        $(obj+" .class>img").attr("src", "./img/"+c.Class+".png");
        $(obj+" .rank").html(c.rank + 1 +". ");
        $(obj+" .name").html(setting.usename?c.displayName:c.name);
        $("div[data-uid=\""+c.name+"\"] .name").css({"-webkit-filter":"none"});

        if (setting.backstyle == "modern")
        {
            if (c[lastCombat.sortkey] == 0)
                $(obj).css({"opacity":"0"});
            else
                $(obj).css({"opacity":"1"});
        }
        else
            $(obj).css({"opacity":"1"});

        if (typeof(setting.tab[selectedtab].data) == "object")
        {
            $(obj+" .val").html("");
            $(".labels>.cont").html("");
            $(".labels>.cont").append("<div style=\"width:20px; position:fixed; left:0px; height:16px;\">JOB</div>");
            for(var r in setting.tab[selectedtab].data)
            {
                var reg = /(\{([^}]+)\})/im;
                var matches = setting.tab[selectedtab].data[r].data.match(reg);
                var result = setting.tab[selectedtab].data[r].data;

                var vf = setting.getFixed();
                if (typeof(setting.tab[selectedtab].data[r].fixed) == "number")
                {
                    vf = setting.tab[selectedtab].data[r].data.fixed;
                }
                $(".labels>.cont").append("<div style=\"width:"+setting.tab[selectedtab].data[r].width+"px;\">"+setting.tab[selectedtab].data[r].tag+"</div>");

                for(var i in c)
                    result = result.replace("{"+i+"}", (typeof(c[i]) == "number"?c[i].toFixed(vf):c[i]));

                $(obj+" .val").append("<div class=\"dat\" style=\"width:"+(setting.tab[selectedtab].data[r].width)+"px; "+(setting.tab[selectedtab].data[r].style!==undefined?setting.tab[selectedtab].data[r].style:"")+"\">"+result+"</div>");
            }
        }
        else
        {
            $(".labels>.cont").html("");
            $(".labels>.cont").append("<div style=\"width:20px; position:fixed; left:0px; height:16px;\">JOB</div>");
            $(".labels>.cont").append("<div style=\"width:80px;\">"+setting.tab[selectedtab].label+"</div>");
            var reg = /(\{([^}]+)\})/im;
            var matches = setting.tab[selectedtab].data.match(reg);
            var result = setting.tab[selectedtab].data;

            for(var i in c)
                result = result.replace("{"+i+"}", (typeof(c[i]) == "number"?c[i].toFixed(setting.getFixed()):c[i]));

            $(obj+" .val").html(result);
        }


        if (c.name == "YOU" || c.name == "Limit Break" || c.name == myName || !setting.nickblur)
        {

        }
        else
        {
            $("div[data-uid=\""+c.name+"\"] .name").css({"-webkit-filter":"blur(3px)"});
        }
        
        var width = (c.get(lastCombat.sortkey)/lastCombat.maxValue*100);
        $("div[data-uid=\""+c.name+"\"] .bar").css({"width":width.toFixed(2)+"%"});

        resizeName();
    }

    $(".combatants>*").each(function()
    {
        var remove = true;
        var name = $(this).attr("data-uid");
        for(var i in lastCombat.Combatant)
        {
            var c = lastCombat.Combatant[i];
            if (c.name == name)
            {
                if (c.isPet == false)
                {
                    remove = false;
                }
                else if (c.isPet && !lastCombat.summonerMerge)
                {
                    remove = false;
                }
            }
        }

        if (remove)
            $(this).remove();
    });
}

function getItems(id)
{
    return JSON.parse($("*[data-id=\""+id+"\"]").attr("data-items").replace(/'/ig,"\""));
}

function resizeName()
{
    $(".combatants>*").each(function()
    {
        var mid = $(this).find(".class").width();
        var w = $(this).width();

        if (setting.backstyle == "fancy")
        {
            $(this).find(".name").width(w - ($(this).find(".val").width()));
        }
        else
        {
            $(this).find(".name").width(w - ($(this).find(".val").width() + 24));
        }
    });
}

$(window).resize(function(){resizeName()});

var lastarea = "";
var selectedtab = "";