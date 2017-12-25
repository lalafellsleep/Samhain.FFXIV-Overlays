// actwebsoket 에서 사용합니다.
// This function using ACTWebSocket ( Refer https://github.com/ZCube/ACTWebSocket )
function connectWebSocket(uri)
{
	websocket = new WebSocket(uri);

	websocket.onmessage = function(evt) 
	{
		if (evt.data == ".") 
		{
			if(!requestonce)
			{
				setTimeout(function(){requestonce=true; websocket.send("RequestLastCombat");}, 1000);
			}
			
			websocket.send(".");
		}
		else 
		{
			onMessage(evt);
		}
	};

	websocket.onclose = function(evt) 
	{ 
		setTimeout(function(){connectWebSocket(uri)}, 5000);
	};

	websocket.onerror = function(evt) 
	{
		websocket.close();
	};
}

try
{
	if(wsUri !== undefined)
		connectWebSocket(wsUri);
}
catch(ex) { }

// string : StringObject.format(ObjectArray a)
// 사용예 : "{abc}{def}".format({abc:"wow", def:" awesome!"}); => return "wow awesome!";
String.prototype.format = function(a)
{
	var reg = /(\{([^}]+)\})/im;
	var matches = this.match(reg);
	var result = this;

	for(var i in a)
		result = result.replace("{"+i+"}", a[i]);

	return result;
}

String.prototype.newElement = function(a,b,c)
{
	var result = this;
	result = result.concat("<=".replace("=",a.toLowerCase()));
	for(var i in b)
	{
		result = result.concat(" ").concat(b[i].name.concat("=\"").concat(b[i].value.replace(/\"/ig, "\\\""))).concat("\"");
	}
	result = result.concat(">");
	result = result.concat(c);
	result = result.concat("</=>".replace("=", a.toLowerCase()));

	return result;
}

String.prototype.contains = function(a)
{
	if(this.indexOf(a) > -1) return true;
	else return false;
}

String.prototype.replaceArray = function(a)
{
	var r = this;
	for(var i in a)
		while(r.contains(a[i].target))
			r = r.replace(a[i].target, a[i].replacement);

	return r;
}

Number.prototype.nanFix = function()
{
	return (isNaN(this)?0:this);
}

// language 객체 입니다.
function Language(l)
{
	if(l == undefined) var l = "ko";
	this.ln = l;
	this.jp = {
		"PLD":"ナイト",
		"GLD":"剣術士",
		"WAR":"戦",
		"MRD":"斧術士",
		"DRK":"暗",
		"MNK":"モンク",
		"PGL":"格闘士",
		"DRG":"竜",
		"LNC":"槍術士",
		"NIN":"忍",
		"ROG":"双剣士",
		"BRD":"吟",
		"ARC":"弓術士",
		"MCH":"機",
		"SMN":"召",
		"THM":"呪術士",
		"BLM":"黒",
		"WHM":"白",
		"CNJ":"幻術士",
		"SCH":"学",
		"ACN":"巴術士",
		"AST":"占",
		"LMB":"リミット",
		"FAIRY":"FAIRY",
		"AUTOTURRET":"AUTOTURRET",
		"EGI":"EGI",
		"CHOCOBO":"CHOCOBO",
	};
	this.en = {
		"PLD":"PLD",
		"GLD":"GLD",
		"WAR":"WAR",
		"MRD":"MRD",
		"DRK":"DRK",
		"MNK":"MNK",
		"PGL":"PGL",
		"DRG":"DRG",
		"LNC":"LNC",
		"NIN":"NIN",
		"ROG":"ROG",
		"BRD":"BRD",
		"ARC":"ARC",
		"MCH":"MCH",
		"SMN":"SMN",
		"THM":"THM",
		"BLM":"BLM",
		"WHM":"WHM",
		"CNJ":"CNJ",
		"SCH":"SCH",
		"ACN":"ACN",
		"AST":"AST",
		"LMB":"LMB",
		"FAIRY":"FAIRY",
		"AUTOTURRET":"AUTOTURRET",
		"EGI":"EGI",
		"CHOCOBO":"CHOCOBO",
	};
	this.ko = {
		"PLD":"나이트",
		"GLD":"검술사",
		"WAR":"전사",
		"MRD":"도끼술사",
		"DRK":"암흑기사",
		"MNK":"몽크",
		"PGL":"격투사",
		"DRG":"류상",
		"LNC":"창술사",
		"NIN":"닌자",
		"ROG":"쌍검사",
		"BRD":"음유시인",
		"ARC":"궁술사",
		"MCH":"기공사",
		"SMN":"소환사",
		"THM":"주술사",
		"BLM":"흑마도사",
		"WHM":"백마도사",
		"CNJ":"환술사",
		"SCH":"학자",
		"ACN":"비술사",
		"AST":"점성술사",
		"LMB":"리미트",
		"FAIRY":"요정",
		"AUTOTURRET":"포탑",
		"EGI":"에기",
		"CHOCOBO":"초코보",
	};
}

// 해당하는 언어의 값을 가져옵니다.
// string : LanguageObject.get(string v)
Language.prototype.get = function(v)
{
	try
	{
		return this[this.ln][v];
	}
	catch(ex)
	{
		return v;
	}
}

// 일반적으로는 호출하지 않습니다.
// new Person(Combatant e, string c)
function Person(e, c)
{
	this.isPet = false;
	this.combatant = e;
	this.maxdamage = 0;
	this.encounter = this.combatant.encounter;
	var char = e.combatants[c];
	this.name = char.name;
	this.duration = char.duration;
	this.DURATION = parseInt(char.DURATION).nanFix();
	this.damage = parseInt(char.damage).nanFix();
	this.hits = parseInt(char.hits).nanFix();
	this.crithits = parseInt(char.crithits).nanFix();
	this.misses = parseInt(char.misses).nanFix();
	this.hitfailed = parseInt(char.hitfailed).nanFix();
	this.swings = parseInt(char.swings).nanFix();
	this.maxhit = char.maxhit.substr(0, char.maxhit.indexOf("-"));
	this.maxHit = parseInt(char.MAXHIT.replace(/,/im, "")).nanFix();
	this.healed = parseInt(char.healed).nanFix();
	this.critheals = parseInt(char.critheals).nanFix();
	this.heals = parseInt(char.heals).nanFix();
	this.cures = parseInt(char.cures).nanFix();
	this.maxheal = char.maxheal.substr(0,char.maxheal.indexOf("-"));
	this.maxHeal = parseInt(char.MAXHEAL.replace(/,/im, "")).nanFix();
	this.damagetaken = parseInt(char.damagetaken).nanFix();
	this.healstaken = parseInt(char.healstaken).nanFix();
	this.powerdrain = parseInt(char.powerdrain).nanFix();
	this.powerheal = parseInt(char.powerheal).nanFix();
	this.kills = parseInt(char.kills).nanFix();
	this.deaths = parseInt(char.deaths).nanFix();
	this.Job = char.Job.toUpperCase();
	this.Class = char.Job.toUpperCase();
	this.ParryPct = parseInt(char.ParryPct.replace("%", "")).nanFix();
	this.BlockPct = parseInt(char.BlockPct.replace("%","")).nanFix();
	this.damagetaken = parseInt(char.damagetaken).nanFix();

	this.Last10DPS = parseFloat(char.Last10DPS).nanFix().toFixed(2);
	this.Last30DPS = parseFloat(char.Last30DPS).nanFix().toFixed(2);
	this.Last60DPS = parseFloat(char.Last60DPS).nanFix().toFixed(2);
	this.Last180DPS = parseFloat(char.Last180DPS).nanFix().toFixed(2);
	
	this.overHeal = parseInt(char.overHeal);
	this.damageShield = parseInt(char.damageShield);
	this.healstaken = parseInt(char.healstaken).nanFix();
	this.healedPct = 0;
	this.OverHealPct = parseInt(char.OverHealPct.replace("%","")).nanFix();

	this.mergedDamage = this.damage;
	this.mergedHits = this.hits;
	this.mergedMisses = this.misses;
	this.mergedSwings = this.swings;
	this.mergedCrithits = this.crithits;
	this.mergedDamagetaken = this.damagetaken;

	// heals
	this.mergedHeals = this.heals;
	this.mergedHealed = this.healed;
	this.mergedCritheals = this.critheals;
	this.mergedHealstaken = this.healstaken;
	this.mergedDamageShield = this.damageShield;
	this.mergedOverHeal = this.overHeal;

	// lastdps
	this.mergedLast10DPS = this.Last10DPS;
	this.mergedLast30DPS = this.Last30DPS;
	this.mergedLast60DPS = this.Last60DPS;
	this.mergedLast180DPS = this.Last180DPS;

	this.petOwner = "";
	this.petOwnerExists = false;
	this.petData = [];

	this.rank = 0;
	this.petType = "Chocobo";

	this.role = "DPS";

	if(this.Class != "")
	{
		switch(this.Class)
		{
			case "SCH": case "WHM": case "AST": this.role = "Healer"; break;
			case "PLD": case "WAR": case "DRK": this.role = "Tanker"; break;
		}
	}

	// globalization
	if(this.Class == "")
	{
		if(
			this.name.indexOf("에기") > -1 || this.name.indexOf("카벙클") > -1|| // KOR
			this.name.toUpperCase().indexOf("EGI") > -1|| this.name.toUpperCase().indexOf("CARBUNCLE") > -1|| // ENG
			this.name.indexOf("エギ") > -1|| this.name.indexOf("カーバンクル")> -1 // JPN
		)
		{
			this.Job = "AVA";
			this.Class = "SMN";
			this.isPet = true;
			this.petType = "Egi";
		}
		
		if(this.name.indexOf("요정") > -1 || // KOR
			this.name.toUpperCase().indexOf("EOS") > -1|| this.name.toUpperCase("SELENE") > -1 || // ENG
			this.name.indexOf("フェアリー") > -1 // JPN
		)
		{
			this.Job = "AVA";
			this.Class = "SCH";
			this.isPet = true;
			this.role = "Healer";
			this.petType = "Fairy";
		}

		if(this.name.indexOf("자동포탑") > -1 || // KOR 
			this.name.toUpperCase().indexOf("AUTOTURRET") > -1 || // ENG
			this.name.indexOf("オートタレット") > -1 // JPN
		)
		{
			this.Job = "AVA";
			this.Class = "MCH";
			this.isPet = true;
			this.petType = "AutoTurret";
		}

		if(this.name.toUpperCase().indexOf("LIMIT BREAK") > -1|| this.name.indexOf("リミット") > -1)
		{
			this.Job = "LMB";
			this.Class = "LMB";
		}
	}
	
	if(this.isPet)
	{
		var regex = /(?:.*?)\((.*?)\)/im;
		var matches = this.name.match(regex);
		if(regex.test(this.name)) // do not use Array.length 
		{
			this.petOwner = matches[1];
		}
	}

	switch(this.Job)
	{
		case "GLD" : this.Class = "PLD"; break;
		case "MRD" : this.Class = "WAR"; break;
		case "PUG" : this.Class = "MNK"; break;
		case "LNC" : this.Class = "DRG"; break;
		case "ROG" : this.Class = "NIN"; break;
		case "ARC" : this.Class = "BRD"; break;
		case "THM" : this.Class = "BLM"; break;
		case "ACN" : this.Class = "SMN"; break;
		case "CNJ" : this.Class = "WHM"; break;
	}

	this.R = this.getColor().R;
	this.G =  this.getColor().G;
	this.B =  this.getColor().B;

	if(this.petType != "Chocobo")
	{
		this.R+= parseInt(this.R/4);
		this.G+= parseInt(this.G/4);
		this.B+= parseInt(this.B/4);
	}

	//calcValues
	this.recalc();
	if(this.Job == "") 
	{
		this.isPet = true;
		this.Class = "Chocobo";
	}
	this.classname = this.combatant.langpack.get(this.Class.toUpperCase());
}

// 해당 유저의 직업에 따른 기본 지정 소울 크리스탈 색을 가져옵니다. 재정의하여 사용할 수도 있습니다.
// object : PersonObject.getColor(int r, int g, int b)
Person.prototype.getColor = function(r, g, b)
{
	if(jobColors[this.Class] != undefined)
	{
		if(r==undefined) var r = 0;
		if(g==undefined) var g = 0;
		if(b==undefined) var b = 0;
		return {"R":(jobColors[this.Class][0]+r), "G":(jobColors[this.Class][1]+g), "B":(jobColors[this.Class][2]+b)};
	}
	else
	{
		return {"R":240, "G":220, "B":110};
	}
}

// 일반적으로는 강제로 호출하지 않습니다.
// void : PersonObject.recalc()
Person.prototype.recalc = function()
{
	this.dmgPct = parseFloat(this.mergedDamage / parseInt(this.encounter.damage) * 100).nanFix().toFixed(underDot);
	this.dps = parseFloat(this.mergedDamage / this.DURATION).nanFix().toFixed(underDot);
	this.encdps = parseFloat(this.mergedDamage / parseInt(this.encounter.DURATION)).nanFix().toFixed(underDot);
	this.crithitPct = parseFloat(this.mergedCrithits / this.mergedHits * 100).nanFix().toFixed(underDot);
	this.tohit = parseFloat(this.mergedHits / this.mergedSwings * 100).nanFix().toFixed(underDot);
	this.enchps = parseFloat(this.mergedHealed / parseInt(this.encounter.DURATION)).nanFix().toFixed(underDot);
	this.crithealPct = parseFloat(this.mergedCritheals / this.mergedHeals * 100).nanFix().toFixed(underDot);
	this.healedPct = parseFloat(this.mergedHealed / this.encounter.healed * 100).nanFix().toFixed(underDot);
}

// 일반적으로는 강제로 호출하지 않습니다.
// void : PersonObject.merge(Person p)
Person.prototype.merge = function(p)
{
	//sum target data
	this.mergedDamage += p.damage;
	this.mergedHealed +=  p.healed;
	this.mergedHits += + p.hits;
	this.mergedMisses += p.misses;
	this.mergedSwings += p.swings;
	this.mergedHeals += p.heals;
	this.mergedCrithits += p.crithits;
	this.mergedCritheals += p.critheals;
	this.mergedLast10DPS += p.Last10DPS;
	this.mergedLast30DPS += p.Last30DPS;
	this.mergedLast60DPS += p.Last60DPS;
	this.mergedLast180DPS += p.Last180DPS;
	this.mergedDamagetaken += p.damagetaken;
	this.mergedHealstaken += p.healstaken;
	this.mergedOverHeal += p.overHeal;
	this.mergedDamageShield += p.damageShield;

	this.recalc();
};

var oStaticPersons = [];

function staticPerson(e)
{
	var d = new Date();
	this.createTime = d.getTime();
	this.person = e;
	this.last180ARR = [];
	this.last180Copy = [];
	this.polygonPoints = [];
}

// Combatant 객체 입니다. onOverlayDataUpdate 의 EventArgs 를 넣어주면 됩니다.
// new Combatant(onOverlayDataUpdateEventArgs e, string sortkey = "encdps", string lang = "ko")
function Combatant(e, sortkey, lang)
{
	if(sortkey === null || sortkey === undefined) var sortkey = "encdps";
	if(lang === null || lang === undefined) var sortkey = "ko";

	this.staticPersons = [];

	this.summonerMerge = true;
	this.sortkey = sortkey;
	this.combatants = e.detail.Combatant;
	this.encounter = e.detail.Encounter;
	this.persons = [];
	this.duration = this.encounter.duration;
	this.maxdamage = 0; // for old versions
	this.maxValue = 0; // please use this value
	this.zone = this.encounter.CurrentZoneName;
	this.title = this.encounter.title;
	this.noPetPersons = [];
	this.sortvector = true;
	this.data = e;
	this.langpack = new Language(lang);

	this.combatKey = this.encounter.title.concat(this.encounter.damage).concat(this.encounter.healed);

	if(!e.detail.isActive)
	{
		for(var i in oStaticPersons)
		{
			this.staticPersons.push(oStaticPersons[i]);
		}
		oStaticPersons = [];
	}

	for(var p in e.detail.Combatant)
	{
		this.persons[p] = new Person(this, p);
		var findStaticPersons = false;
		var find = null;

		for(var i in oStaticPersons)
		{
			if(oStaticPersons[i].person.name == p)
			{
				findStaticPersons = true;
				find = oStaticPersons[i];
			} 
		}

		if(!findStaticPersons)
		{
			var static = new staticPerson(this.persons[p]);
			oStaticPersons.push(static);
		}
		else
			find.person = this.persons[p];
	}

	for(var p in this.persons)
	{
		if(!this.persons[p].isPet)
			this.noPetPersons = new staticPerson(this.persons[p].name);
	}

	for(var i in this.persons)
	{
		var p = this.persons[i];
		if(this.summonerMerge)
		{
			if(p.isPet && p.petOwner != "" && p.petType != "Chocobo")
			{
				if(this.persons[p.petOwner] !== null)
				{
					if(this.noPetPersons.indexOf(p.petOwner) > -1)
					{
						this.persons[p.petOwner].merge(p);
					}
					else
					{
						if(this.persons["YOU"].Class == p.Class)
						{
							p.petOwner = "YOU";
							this.persons["YOU"].merge(p);
						}
					}
				}
				this.persons[i].recalc();
			}
		}
	}
	this.rerank(this.sortvector);

	if(this.encounter.title != "Encounter")
	{
		saveLog(this);
	}
}

// combatant 객체가 사용할 Language 객체를 재선언합니다.
// void : Combatant.changeLang(string lang)
// onLanguageChange 이벤트를 발생시킵니다. 변경시 해야 할 작업을 정해주면 됩니다.
Combatant.prototype.changeLang = function(lang)
{
	this.langpack = new Language(lang);
	document.dispatchEvent(new CustomEvent('onLanguageChange', {detail:{language:lang, combatant:this}}));
}

// 소환수 합산 상태와 비합산 상태의 가져올 값을 변환해 줍니다.
// 일반적으로는 호출하지 않습니다.
// string : CombatantObject.activeSort()
Combatant.prototype.activeSort = function() 
{
	return activeSort(this.sortKey, this.summonerMerge);
}

// 랭크를 재지정합니다. 소환수와 분리/합산 했을 때 재호출을 해야 작동하는 Skin 들이 있습니다.
// 일반적으로는 호출하지 않고 sortkeyChange(e) 또는 sortkeyChangeDesc(e) 를 사용해주시기 바랍니다.
// void : CombatantObject.rerank (bool asc = true)
Combatant.prototype.rerank = function(asc)
{
	// sort methods
	if(asc == undefined || asc === null) var asc = true;

	var personNew = [];

	for(var i in this.persons)
	{
		personNew.push({kval:this.persons[i][this.sortkey], val:this.persons[i]});
	}
	
	if(asc)
		personNew.sort(function(a, b){return b.kval - a.kval;});
	else // descending
		personNew.sort(function(a, b){return a.kval - b.kval;});

	this.persons = [];
	for(var i in personNew)
	{
		this.persons.push(personNew[i].val);
	}

	// rework maxdamage to MaxValue
	var i = 0;
	this.maxValue = 0;
	for(var p in this.persons)
	{
		if(parseInt(this.persons[p][this.activeSort()]) > this.maxValue)
		{
			this.maxValue = parseInt(this.persons[p][this.activeSort()]);
		}

		if(this.persons[p].isPet && this.persons[p].petOwner != "" && this.persons[p].petType != "Chocobo" && this.summonerMerge) continue;
		this.persons[p].rank = i++;
	}

	this.maxdamage = this.maxValue;

	for(var p in this.persons)
		this.persons[p].maxdamage = this.maxValue;
}

// e 는 sort 할 key 값 입니다.
// SummonerMerge 상태에 따라 정렬할 값을 바꾸어 줍니다. merged 속성은 사용하지 않습니다.
// void : CombatantObject.sortkeyChange (string e)
Combatant.prototype.sortkeyChange = function(e)
{
	this.sortkey = e;
	this.rerank();
}

// e 는 sort 할 key 값 입니다.
// SummonerMerge 상태에 따라 정렬할 값을 바꾸어 줍니다. merged 속성은 사용하지 않습니다. 오름차순으로 정렬합니다.
// void : CombatantObject.sortkeyChangeDesc (string e)
Combatant.prototype.sortkeyChangeDesc = function(e)
{
	this.sortkey = e;
	this.rerank(false);
}

// 소환수 합산 상태와 비합산 상태의 가져올 값을 변환해 줍니다.
// 직접 호출하기 위한 함수로, 호출 시 소환수와 합산할 것인지 결정해야 합니다.
// 몇가지 ACT 플러그인 자체가 전달하는 data 가 추가/변경 되었으나 일부 유저가 혼동하지 않도록 바꾸어 준다.
// string : activeSort (string sortKey, bool summonerMerge)
function activeSort(sortKey, summonerMerge)
{
	var sortkey = sortKey;

	if (sortkey == "encdps") sortkey = "damage";
	if (sortkey == "enchps") sortkey = "healed";
	if (sortkey == "maxhit") sortkey = "maxHit";
	if (sortkey == "maxheal") sortkey = "maxHeal";

	switch(sortkey)
	{
		case "damage" : 
			sortkey = "mergedDamage"; break;
		case "healed" : 
			sortkey = "mergedHealed"; break;
		case "hits" : 
			sortkey = "mergedHits"; break;
		case "misses" : 
			sortkey = "mergedHits"; break;
		case "swings" : 
			sortkey = "mergedSwings"; break;
		case "heals" : 
			sortkey = "mergedHeals"; break;
		case "crithits" : 
			sortkey = "mergedCrithits"; break;
		case "critheals" : 
			sortkey = "mergedCritheals"; break;
		case "damagetaken" : 
			sortkey = "mergedDamagetaken"; break;
		case "healstaken" : 
			sortkey = "mergedHealstaken"; break;
		case "Last10DPS" : 
			sortkey = "mergedLast10DPS"; break;
		case "Last30DPS" : 
			sortkey = "mergedLast30DPS"; break;
		case "Last60DPS" : 
			sortkey = "mergedLast60DPS"; break;
		case "Last180DPS" : 
			sortkey = "mergedLast180DPS"; break;
		case "damage%":
			sortkey = "dmgPct"; break;
		case "crithit%":
			sortkey = "crithitPct"; break;
		case "critheal%":
			sortkey = "crithealPct"; break;
		case "healed%":
			sortkey = "healedPct"; break;
		case "overHeal%":
		case "overHealPct":
			sortkey = "OverHealPct"; break;
	}

	return sortkey;
}

// bool : getLog(string e)
// e : combatKey
function getLog(e)
{
	for(var i in CombatLog)
	{
		if(CombatLog[i].combatKey == e && lastCombat.encounter.title != "Encounter")
		{
			lastCombat = CombatLog[i];
			document.dispatchEvent(new CustomEvent('onSuccessGetLog', {detail:{ combatant:CombatLog[i] }}));
			return true;
		}
	}
	return false;
}

// void : saveLog(Combatant e)
function saveLog(e)
{
	var exists = false;
	for(var i in CombatLog)
	{
		if(CombatLog[i].combatKey == e.combatKey)
			exists = true;
	}

	if(!exists)
	{
		CombatLog.push(e);
		document.dispatchEvent(new CustomEvent('onSuccessSaveLog', {detail:{ combatant:e }}));
	}
}

// 이벤트 리스너를 자동으로 추가하도록 지정합니다.
// 사용할 스크립트의 맨 위에 선언해야 정상적으로 작동을 보장합니다.
if (document.addEventListener) 
{
	// Mozilla, Opera, Webkit 
	document.addEventListener("DOMContentLoaded", function () 
	{
		document.removeEventListener("DOMContentLoaded", arguments.callee, false);
		domReady();
	}, false);
}
else if (document.attachEvent) 
{
	// Internet Explorer
	document.attachEvent("onreadystatechange", function () 
	{
		if (document.readyState === "complete") 
		{
			document.detachEvent("onreadystatechange", arguments.callee);
			domReady();
		}
	});
}

function domReady() 
{
	// Before
	try { document.addEventListener('beforeLogLineRead', beforeLogLineRead); } catch (ex) { }

	// On
	try { document.addEventListener('onOverlayDataUpdate', onOverlayDataUpdate); } catch (ex) { console.log("Core Error : onOverlayUpdate is not defined."); }
	try { document.addEventListener('onOverlayStateUpdate', onOverlayStateUpdate); } catch (ex) { }
	try { document.addEventListener('onLogLineRead', onLogLineRead); } catch (ex) { }
	window.addEventListener('message', onMessage);

}

function onMessage(e) 
{
	var data = JSON.parse(e.data.replace(/'/, "\\'"));
	if(data["typeText"] !== undefined)
	{
		switch(data.typeText)
		{
			case "update":
				switch(data.detail.msgType)
				{
					case "ChangeZone":
						document.dispatchEvent(new CustomEvent("onChangeZone", data));
						break;
					case "SendCharName":
						document.dispatchEvent(new CustomEvent("onUpdatePlayerName", data));
						break;
					case "CombatantDataChange":
						document.dispatchEvent(new CustomEvent("onCombatantDataUpdate", data));
						break;
					case "CombatantsList":
						document.dispatchEvent(new CustomEvent("onCombatantListUpdate", data));
						break;
				}
				break;
			case "encounter":
				document.dispatchEvent(new CustomEvent("onOverlayDataUpdate", data));
				break;
			case "error":
				// do something
				break;
		}
	}
}

var requestonce = false;
var lastCombat = null;
var sortKey = "encdps";
var underDot = 1;
var delayOK = true;
var CombatLog = [];
var jobColors = {
	"PLD":[200, 255, 255],
	"WAR":[200, 40, 30],
	"DRK":[130, 40, 50],
	
	"MNK":[180, 140, 20],
	"DRG":[50, 90, 240],
	"NIN":[80, 70, 90],
	"BRD":[180, 200, 80],
	"MCH":[130, 255, 240],
	"SMN":[40, 150, 0],
	"BLM":[100, 70, 150],
	
	"WHM":[200, 195, 170],
	"SCH":[60, 60, 160],
	"AST":[200, 130, 90],
	"LMB":[255, 204, 0]
};