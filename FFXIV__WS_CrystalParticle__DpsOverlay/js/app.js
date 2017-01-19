var style = "pastell";

function Setting()
{
    this.initialname = false;
    this.soundplay = true;
    this.nickblur = true;
    this.mergepet = true;
    this.usename = true;
    this.style = "pastell";
    this.lang = "en";
    this.decimal = "v2";
};

Setting.prototype.set = function(key, val)
{
    this[key] = val;
    
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

    if (key == "lang")
    {
        $("*").each(function(){
            if ($(this).attr("data-"+val) != "")
            {
                $(this).html($(this).attr("data-"+val));
            }
        });
    }
    else if (key == "decimal")
    {
        underDot = parseInt(setting.decimal.replace("v", ""));
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
    audio.volume = 0.15;
    audio.play();
}

$(document).click(function(e)
{
    if (e.toElement.className.indexOf("combobox") > -1 || e.toElement.className.indexOf("comboboxitems") > -1 || e.toElement.parentElement.className.indexOf("comboboxitems") > -1) return;
    
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

$(".setting, .combobox, .tab").click(function()
{
    playWAV("wav/conf.wav");
});

$(".checkbox, .setting, .combobox, .tab").mouseenter(function()
{
    playWAV("wav/hover.wav");
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
    $("*[data-id=usename]>span").html(e.detail.charName);
    onOverlayDataUpdate();
}

function onOverlayDataUpdate(e)
{
    $(".encounter").html("["+lastCombat.Encounter.duration+"] "+lastCombat.Encounter.title+" ("+lastCombat.Encounter.encdps+" DPS / "+lastCombat.Encounter.enchps+" HPS) <span>▼</span>");

    $(".combatants").html("");
    lastCombat.summonerMerge = setting.mergepet;

    for(var i in lastCombat.Combatant)
    {
        var c = lastCombat.Combatant[i];
        if (c.isPet && lastCombat.summonerMerge) continue;

        var html = "<div style=\"top:"+(c.rank*22)
        +"px;\" data-id=\""
        +c.name
        +"\" class=\""
        +setting.style
        +"\"><div class=\"bar "
        +c.Class
        +" "
        +setting.style
        +"\"></div><div class=\"border\"></div><div class=\"dat\"><div class=\"class\"><img src=\"./img/"
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
        if (c.name == "YOU" || c.name == "Limit Break" || c.name == myName || !setting.nickblur)
        {

        }
        else
        {
            $("div[data-id=\""+c.name+"\"] .name").css({"-webkit-filter":"blur(3px)"});
        }
        
        var width = (c.get(lastCombat.sortkey)/lastCombat.maxValue*100);
        $("div[data-id=\""+c.name+"\"] .bar").css({"width":width.toFixed(2)+"%"});
    }
}