Storage.prototype.get = function(c)
{
	return JSON.parse(this.getItem(c));
}

Storage.prototype.set = function(c, value)
{
	localStorage.setItem(c, JSON.stringify(value));
}

Number.prototype.nanFix = function()
{
	return (isNaN(this)?0:this);
}

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

function Language(l)
{
	this.ln = l;
	this.en = {};
	this.ko = {
		"PLD":"나이트",
		"GLD":"검술사",
		"WAR":"전사",
		"MRD":"도끼술사",
		"DRK":"암흑기사",
		
		"MNK":"몽크",
		"PUD":"격투사",
		"DRG":"류상",
		"LNC":"창술사",
		"NIN":"닌자",
		"ROG":"쌍검사",
		"BRD":"음유시인",
		"ARC":"궁술사",
		"MCH":"기공사",
		"SMN":"소환사",
		"THM":"주술사",
		"BLM":"메구밍",
		
		"WHM":"백마도사",
		"CNJ":"환술사",
		"SCH":"학자",
		"ACN":"비술사",
		"AST":"점성술사",
		"LMB":"리미트",
		"Fairy":"요정",
		"AutoTurret":"포탑",
		"Egi":"에기",
		"Chocobo":"초코보",
	};
}

Language.prototype.get = function(v)
{
	if(this[this.ln] !== undefined && this[this.ln][v] !== undefined)
	{
		return this[this.ln][v];
	}
	else
	{
		return v;
	}
}

function Person(e, c)
{
	this.isPet = false;
	this.encounter = e.encounter;
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
	this.Last10DPS = parseInt(char.Last10DPS).nanFix();
	this.Last30DPS = parseInt(char.Last30DPS).nanFix();
	this.Last60DPS = parseInt(char.Last60DPS).nanFix();
	this.Job = char.Job.toUpperCase();
	this.Class = char.Job.toUpperCase();
	this.ParryPct = parseInt(char.ParryPct.replace("%", "")).nanFix();
	this.BlockPct = parseInt(char.BlockPct.replace("%","")).nanFix();
	this.OverHealPct = parseInt(char.OverHealPct.replace("%","")).nanFix();
	this.damagetaken = parseInt(char.damagetaken).nanFix();
	this.healstaken = parseInt(char.healstaken).nanFix();
	this.healedPct = 0;
	this.invalidheal = parseInt(this.healed / 100 * this.OverHealPct).nanFix();
	this.validheal = parseInt(this.healed - this.invalidheal);

	this.mergedDamage = this.damage;
	this.mergedHealed = this.healed;
	this.mergedHits = this.hits;
	this.mergedMisses = this.misses;
	this.mergedSwings = this.swings;
	this.mergedHeals = this.heals;
	this.mergedCrithits = this.crithits;
	this.mergedCritheals = this.critheals;
	this.mergedLast10DPS = this.Last10DPS;
	this.mergedLast30DPS = this.Last30DPS;
	this.mergedLast60DPS = this.Last60DPS;
	this.mergedDamagetaken = this.damagetaken;
	this.mergedHealstaken = this.healstaken;
	this.validHeal = this.validheal;
	this.invalidHeal = this.invalidheal;
	this.OverHPct = this.OverHealPct;

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
		if(matches.length > 1)
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

	this.R = colors[this.Class][0];
	this.G = colors[this.Class][1];
	this.B = colors[this.Class][2];

	if(this.petType != "Chocobo")
	{
		this.R+= parseInt(this.R/4);
		this.G+= parseInt(this.G/4);
		this.B+= parseInt(this.B/4);
	}

	//calcValues
	this.recalc();
	if(this.Job == "") this.isPet = true;
}

Person.prototype.recalc = function()
{
	this.dmgPct = parseFloat(this.mergedDamage / parseInt(this.encounter.damage) * 100).nanFix().toFixed(underDot);
	this.dps = parseFloat(this.mergedDamage / this.DURATION).nanFix().toFixed(underDot);
	this.encdps = parseFloat(this.mergedDamage / parseInt(this.encounter.DURATION)).nanFix().toFixed(underDot);
	this.crithitPct = parseFloat(this.mergedCrithits / this.mergedHits * 100).nanFix().toFixed(underDot);
	this.tohit = parseFloat(this.mergedHits / this.mergedSwings * 100).nanFix().toFixed(underDot);
	this.healedPct = parseFloat(this.mergedHealed / parseInt(this.encounter.healed) * 100).nanFix().toFixed(underDot);
	this.enchps = parseFloat(this.mergedHealed / parseInt(this.encounter.DURATION)).nanFix().toFixed(underDot);
	this.crithealPct = parseFloat(this.mergedCritheals / this.mergedHeals * 100).nanFix().toFixed(underDot);
	this.healedPct = parseFloat(this.mergedHealed / this.encounter.healed * 100).nanFix().toFixed(underDot);
	this.OverHPct = parseFloat(this.invalidHeal / this.validHeal * 100).nanFix().toFixed(underDot);
}

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
	this.mergedDamagetaken += p.damagetaken;
	this.mergedHealstaken += p.healstaken;
	this.validHeal += p.validheal;
	this.invalidHeal += p.invalidheal;

	this.recalc();
};

function Combatant(e, sortkey)
{
	if(sortkey === null || sortkey === undefined) var sortkey = "encdps";
	this.summonerMerge = true;
	this.sortkey = sortkey;
	this.combatants = e.detail.Combatant;
	this.encounter = e.detail.Encounter;
	this.persons = [];
	this.duration = this.encounter.duration;
	this.maxdamage = 0;
	this.zone = this.encounter.CurrentZoneName;
	this.title = this.encounter.title;
	this.noPetPersons = [];
	this.sortvector = true;
	this.data = e;

	this.combatKey = this.encounter.title.concat(this.encounter.damage).concat(this.encounter.healed);
	for(var p in e.detail.Combatant)
	{
		this.persons[p] = new Person(this, p);
	}

	for(var p in this.persons)
	{
		if(!this.persons[p].isPet)
			this.noPetPersons.push(this.persons[p].name);
	}

	// PET AUTOMERGE
	for(var i in this.persons)
	{
		var p = this.persons[i];
		if(this.summonerMerge)
		{
			if(p.isPet && p.petOwner != "" && p.petType != "Chocobo")
			{
				if(this.getData(p.petOwner) !== null)
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

		if(parseInt(this.persons[i].mergedDamage) > this.maxdamage)
		{
			this.maxdamage = parseInt(this.persons[i].mergedDamage);
		}
	}
	this.rerank(this.sortvector);
}

Combatant.prototype.rerank = function(asc)
{
	if(asc == undefined || asc === null) var asc = true;

	var personNew = [];
	var tmpPerson = [];
	for(var i in this.persons)
	{
		personNew.push({kval:this.persons[i][this.sortkey], val:this.persons[i]});
	}
	
	personNew.sort(function(a, b){return b.kval - a.kval;});

	this.persons = [];
	for(var i in personNew)
	{
		this.persons.push(personNew[i].val);
	}

	var i = 0;
	this.maxdamage = 0;
	for(var p in this.persons)
	{
		if(this.persons[p].isPet && this.persons[p].petOwner != "" && this.persons[p].petType != "Chocobo" && this.summonerMerge) continue;
		this.persons[p].rank = i++;
		if(parseInt(this.persons[p][this.sortkey]) > this.maxdamage)
		{
			this.maxdamage = parseInt(this.persons[p][this.sortkey]);
		}
	}
}

Combatant.prototype.personQuicksort = function(arr, type)
{
	if(type === undefined || type === null) var type = true;

	if(arr.length <= 1) return arr;
	var lte = []; //less than
	var gte = []; //greater than
	var pivot = arr[parseInt(arr.length / 2)];
	for (var i = arr.length - 1; i >= 0; i--) 
	{
		if (parseFloat(arr[i][this.sortkey]) < parseFloat(pivot[this.sortkey]))
		{
			if(type) 
				gte.push(arr[i]);
			else
				lte.push(arr[i]);
		} 
		else if (parseFloat(arr[i][this.sortkey]) > parseFloat(pivot[this.sortkey]))
		{
			if(type) 
				lte.push(arr[i]);
			else
				gte.push(arr[i]);
		}
	}
	return Array.prototype.concat(this.personQuicksort(lte), pivot, this.personQuicksort(gte));
}

Combatant.prototype.sortkeyChange = function(e)
{
	this.sortkey = e;
	this.rerank();
}

Combatant.prototype.getData = function(c)
{
	for(var i in this.persons)
	{
		if(this.persons[i].name == c)
			return this.persons[i];
	}
}