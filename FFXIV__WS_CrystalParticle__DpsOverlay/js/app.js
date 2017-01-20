var style = "pastell";

function Setting()
{
    this.backstyle = "ffchat";
    this.initialname = false;
    this.soundplay = true;
    this.nickblur = true;
    this.mergepet = true;
    this.usename = true;
    this.style = "pastell";
    this.lang = "en";
    this.decimal = "v2";
    this.tab = {
        "DPS":{label:"DPS", data:"{encdps} DPS"},
        "HPS":{label:"HPS", data:"{enchps} HPS"},
    };
};

Setting.prototype.set = function(key, val)
{
    this[key] = val;
    
    switch(key)
    {
        case "style":
            console.log(val);
            $(".preview>div").removeClass();

            for(var i in getItems("style"))
            {
                $(".preview>div>.bar").removeClass(i);
            }

            $(".preview>div").addClass(val);
            $(".preview>div>.bar").addClass(val);
            break;
        case "tab":
            $(".menu>.tabs").html("");

            for(var i in val)
            {
                $(".menu>.tabs").append("<div class=\"tab\">"+i+"</div>");
            }
            break;
        case "lang":
            $("*").each(function(){
                if ($(this).attr("data-"+val) != "")
                {
                    $(this).html($(this).attr("data-"+val));
                }
            });
            break;
        case "decimal":
            //underDot = parseInt(setting.decimal.replace("v", ""));
            break;
        case "backstyle":
            $("body").removeClass().addClass(val);
            break;
    }

    if (typeof(val) != "object")
    {
        if ($("*[data-id="+key+"]").attr("class").indexOf("combobox") > -1)
        {
            var json = JSON.parse($("*[data-id="+key+"]").attr("data-items").replace(/'/ig, "\""));

            if (json[val].d != undefined)
            {
                $("*[data-id="+key+"]").html("<span data=\"cur\">▶</span>"+json[val].d);
            }
            else
            {
                $("*[data-id="+key+"]").html("<span data=\"cur\">▶</span>"+json[val][setting.lang]);
            }
        }
        else if ($("*[data-id="+key+"]").attr("class").indexOf("checkbox") > -1)
        {
            $("*[data-id="+key+"]").attr("data-checked", val);
        }
    }

    localStorage.setItem("crystalparticle_setting", JSON.stringify(this));
    
    if (lastCombat != null)
        onOverlayDataUpdate();
}

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
    if ($(".data").css("display") == "none")
    {
        $(".data").show();
        $(".settingwindow").hide();
    }
    else
    {
        $(".data").hide();
        $(".settingwindow").show();
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
});

function onCharacterNameRecive(e)
{
    lastCombat.Combatant["YOU"].displayName = e.detail.charName;
    if (setting.usename)
        $("*[data-id=usename]>span").html(e.detail.charName);
    onOverlayDataUpdate();
}

function onOverlayDataUpdate(e)
{
    $(".encounter").html("["+lastCombat.Encounter.duration+"] "+lastCombat.Encounter.title+" ("+lastCombat.Encounter.encdps+" DPS / "+lastCombat.Encounter.enchps+" HPS) <span></span>");

    if (lastarea != lastCombat.Encounter.CurrentZoneName)
    {
        $(".combatants").html("");
    }

    lastarea = lastCombat.Encounter.CurrentZoneName;
    
    lastCombat.summonerMerge = setting.mergepet;
    lastCombat.rerank();

    for(var i in lastCombat.Combatant)
    {
        var c = lastCombat.Combatant[i];
        if (c.isPet && lastCombat.summonerMerge) continue;

        if ($("div[data-uid=\""+c.name+"\"] .bar").length == 0)
        {
            var html = "<div style=\"top:"+(c.rank*21)
            +"px;\" data-uid=\""
            +c.name
            +"\" class=\""
            +setting.style
            +"\"><div data=\"bar\" class=\"bar "
            +c.Class
            +" "
            +setting.style
            +"\"></div><div class=\"dat\"><div class=\"class\"><img src=\"./img/"
            +c.Class
            +".png\" /></div><div class=\"rank\">"
            +(c.rank + 1)
            +". </div><div class=\"name\">";

            if (setting.usename)
                html += c.displayName;
            else
                html += c.name;
            
            html += "</div><div class=\"val\">"
            +c.get("encdps")
            +"</div></div>"
            +"</div>";

            $(".combatants").append(html);
        }
        else
        {
            var obj = "div[data-uid=\""+c.name+"\"] ";

            $(obj).removeClass();
            $(obj).addClass(setting.style);
            $(obj).css({"top":(c.rank * 21)+"px"});
            $(obj+" div[data=bar]").removeClass();
            $(obj+" div[data=bar]").addClass("bar");
            $(obj+" div[data=bar]").addClass(c.Class);
            $(obj+" div[data=bar]").addClass(setting.style);
            $(obj+" .class>img").attr("src", "./img/"+c.Class+".png");
            $(obj+" .rank").html(c.rank + 1 +". ");
            $(obj+" .name").html(setting.usename?c.displayName:c.name);
            $(obj+" .val").html(c.get("encdps"));
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

var lastarea = "";