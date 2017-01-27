function Setting()
{
    this.setDefault(false);
};

Setting.prototype.setDefault = function(b)
{
    this.useanim = false;
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
        "DPS":{label:"DPS", data:"{encdps} DPS", sort:"encdps"},
        "HPS":{label:"HPS", data:"{enchps} HPS", sort:"enchps"},
    };
    this.customcss = ".custom.PLD.bar {background:rgb(186,224,234);}.custom.PLD.bar:after {border-right-color:rgb(186,224,234);}.custom.PLD.bar:before {border-left-color:rgb(186,224,234);}.custom.NIN.bar {background:rgb(236,178,186);}.custom.NIN.bar:after {border-right-color:rgb(236,178,186);}.custom.NIN.bar:before {border-left-color:rgb(236,178,186);}.custom.BLM.bar {background:rgb(182,151,198);}.custom.BLM.bar:after {border-right-color:rgb(182,151,198);}.custom.BLM.bar:before {border-left-color:rgb(182,151,198);}.custom.WAR.bar {background:rgb(192,76,76);}.custom.WAR.bar:after {border-right-color:rgb(192,76,76);}.custom.WAR.bar:before {border-left-color:rgb(192,76,76);}.custom.MCH.bar {background:rgb(140,228,209);}.custom.MCH.bar:after {border-right-color:rgb(140,228,209);}.custom.MCH.bar:before {border-left-color:rgb(140,228,209);}.custom.WHM.bar {background:rgb(226,219,211);}.custom.WHM.bar:after {border-right-color:rgb(226,219,211);}.custom.WHM.bar:before {border-left-color:rgb(226,219,211);}.custom.AST.bar {background:rgb(239,178,124);}.custom.AST.bar:after {border-right-color:rgb(239,178,124);}.custom.AST.bar:before {border-left-color:rgb(239,178,124);}.custom.BRD.bar {background:rgb(183,219,136);}.custom.BRD.bar:after {border-right-color:rgb(183,219,136);}.custom.BRD.bar:before {border-left-color:rgb(183,219,136);}.custom.DRK.bar {background:rgb(150,90,90);}.custom.DRK.bar:after {border-right-color:rgb(150,90,90);}.custom.DRK.bar:before {border-left-color:rgb(150,90,90);}.custom.SMN.bar {background:rgb(123,183,130);}.custom.SMN.bar:after {border-right-color:rgb(123,183,130);}.custom.SMN.bar:before {border-left-color:rgb(123,183,130);}.custom.SCH.bar {background:rgb(124,144,229);}.custom.SCH.bar:after {border-right-color:rgb(124,144,229);}.custom.SCH.bar:before {border-left-color:rgb(124,144,229);}.custom.MNK.bar {background:rgb(198,172,93);}.custom.MNK.bar:after {border-right-color:rgb(198,172,93);}.custom.MNK.bar:before {border-left-color:rgb(198,172,93);}.custom.DRG.bar {background:rgb(103,166,255);}.custom.DRG.bar:after {border-right-color:rgb(103,166,255);}.custom.DRG.bar:before {border-left-color:rgb(103,166,255);}.custom.LMB.bar {background:rgb(255,198,0);}.custom.LMB.bar:after {border-right-color:rgb(255,198,0);}.custom.LMB.bar:before {border-left-color:rgb(255,198,0);}";
    if (b)
    {
        localStorage.setItem("crystalparticle_setting", JSON.stringify(this));
    }
}

Setting.prototype.getFirstTab = function()
{
    for(var i in this.tab)
        return i;
}

Setting.prototype.getFixed = function()
{
    return parseInt(this.decimal.replace("v", ""));
}

Setting.prototype.set = function(key, val)
{
    this[key] = val;
    
    switch(key)
    {
        case "useanim":
            $("body").attr("data-anim", val);
            break;
        case "style":
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
                if (i == this.getFirstTab()) 
                {
                    var first = " selected";
                    globalsortkey = val[i].sort;
                }
                else var first = "";

                $(".menu>.tabs").append("<div class=\"tab"+first+"\" data-key=\""+val[i].sort+"\">"+i+"</div>");
            }

            $(".menu>.tabs>.tab").click(function()
            {
                $(".menu>.tabs>.tab").removeClass("selected");
                $(this).addClass("selected");
                selectedtab = $(this).html();
                if (lastCombat != null)
                {
                    sortKey = activeSort($(this).attr("data-key"));
                    lastCombat.resort($(this).attr("data-key"), true);
                    onOverlayDataUpdate();
                }
            });
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
            $(".data>.combatants").html("");
            break;
    }

    if (typeof(val) != "object")
    {
        try
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
        catch(ex)
        {
            console.log(key);
        }
    }

    localStorage.setItem("crystalparticle_setting", JSON.stringify(this));
    if (lastCombat != null)
        onOverlayDataUpdate();
}

var globalsortkey = "encdps";