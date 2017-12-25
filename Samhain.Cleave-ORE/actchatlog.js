function ActXivLogLineRead(e)
{
	this.logtime = new Date();

	// flag
	this.data = e.split("|");
	// 
	this.flag = this.data[0];
	this.time = this.data[1];
	this.type = this.data[2];
	this.person = this.getUNI(this.data[3]);
	this.message = this.getUNI(this.data[4]);

	this.originText = e;
	this.chatlog = "";
	this.blockTypes = [];
	this.types = {
		"0001":"unknown",
		"0002":"unknown",
		"0003":"이벤트",
		"0004":"unknown",
		"0005":"unknown",
		"0006":"unknown",
		"0007":"unknown",
		"0008":"unknown",
		"0009":"unknown",
		"000a":"말하기",
		"000b":"외치기",
		"000c":"귓속말 (from)",
		"000d":"귓속말 (to)",
		"000e":"파티",
		"000f":"unknown",
		"0010":"1",
		"0011":"2",
		"0012":"3",
		"0013":"4",
		"0014":"5",
		"0015":"6",
		"0016":"7",
		"0017":"8",
		"0018":"자유부대",
		"0019":"unknown",
		"001a":"unknown",
		"001b":"초보자",
		"001c":"자신만의 감정 표현",
		"001d":"감정 표현",
		"001e":"떠들기",
		"001f":"unknown",
		"0020":"unknown",
		"0021":"unknown",
		"0022":"unknown",
		"0023":"unknown",
		"0024":"unknown",
		"0025":"unknown",
		"0026":"unknown",
		"0027":"unknown",
		"0028":"unknown",
		"0029":"unknown",
		"002a":"unknown",
		"002b":"unknown",
		"002c":"unknown",
		"002d":"unknown",
		"002e":"unknown",
		"002f":"unknown",
		"0030":"unknown",
		"0031":"unknown",
		"0032":"unknown",
		"0033":"unknown",
		"0034":"unknown",
		"0035":"unknown",
		"0036":"unknown",
		"0037":"unknown",
		"0038":"unknown",
		"0039":"시스템",
		"003a":"unknown",
		"003b":"unknown",
		"003c":"unknown",
		"003d":"unknown",
		"003e":"unknown",
		"003f":"unknown",
	};
	
	if(this.type.length == 4 && this.blockChat())
	{
		$("body").append("<div title=\""+this.join(this.data[4])+"\">["+this.getType()+"] "+this.person+" : "+this.message+"</div>");
		$("body").scrollTop($("body").height());
	}
}

ActXivLogLineRead.prototype.blockChat = function()
{
	for(var i in this.blockTypes)
		if(this.blockTypes[i] == this.type) return false;
	return true;
}

ActXivLogLineRead.prototype.getType = function()
{
	if(this.types[this.type] == undefined)
		return this.type;
	else
		return this.types[this.type];
}

ActXivLogLineRead.prototype.convert = function(e)
{
	var bytes = [];
	var unicode = [];

	for(var i = 0; i < e.length; i++)
	{
		var char = e.charCodeAt(i);
		bytes.push(char >>> 8);
		bytes.push(char & 0xFF);
	}
	
	for(i=0;i<bytes.length;i++)
	{
		var cv = (bytes[i]*256) + bytes[++i];
		if(cv != 65533 && cv != 0)
			unicode.push( cv );
	}

	return unicode;
}

ActXivLogLineRead.prototype.join = function(e)
{
	return this.convert(e).join(",");
}

ActXivLogLineRead.prototype.getUNI = function(e)
{
	//
	var worked = this.join(e);

	// nickname
	worked = worked.replace(/2,39,[0-9]*?,1,1,1,1,[0-9]*?,(.*?)(?:,3,)(?:.*?)(?:,2,)39,[0-9]*?,1,1,1,1,3/mg,"$1,");

	// Item Link
	var matchitem = /2,19,6,(?:|89,)(?:|3,)[0-9]*?,[0-9]*?,[0-9]*?,[0-9]*?,[0-9]*?,[0-9]*?,([0-9]*?),1,3,2,19,6,123,26,3,57531,2,19,2,3,(.*?)(?:,2,)39,7,1,1,1,1,3,2,19,2,3/im;
	try
	{
		var matches = worked.match(matchitem);
		console.log(matches);
		worked = worked.replace(matches[0], this.join("<span data-id=\"\" class=\"itemlv"+matches[1]+"\">")+","+matches[2]+","+this.join("</span>"));
	}
	catch(ex)
	{ }

	// newbiechat
	worked = worked.replace(/2,18,2,(.*?),3,2,39,.*?,1,.*?,1,1,.*?,(.*?)(?:,3,)(?:.*?)(?:,2,)39,7,1,1,1,1,3/mg,"$2,");

	// Map Link
	worked = worked.replace(/2,39,(?:18|17|16|15),4,(?:.*?)(?:2,19,2,3,)(.*?)(?:,2,39,7,1,1,1,1,3)/mg, "$1,");

	var result = "";
	var worked_split = worked.split(",");

	for(var i in worked_split)
		result += String.fromCharCode(parseInt(worked_split[i]));

	return result;
}
