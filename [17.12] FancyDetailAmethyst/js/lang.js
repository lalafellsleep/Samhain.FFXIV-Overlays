var userLang = "en";
userLang = navigator.language || navigator.userLanguage; 

if(userLang == "ko" || userLang == "ko-KR" || userLang == "ko-Kr")
{
	userLang = "en"; // ah... ffxiv kr ha daijina koto wo hikeki dakara anataha mo sekutu dekinaindesu...
	//
}

var languagePack = {
	"ko":{
		"lang":"한국어 (자동 감지)",
		"settings":{
			"glapld":"검술사, 나이트 배경색",
			"mrdwar":"도끼술사, 전사 배경색",
			"drk":"암흑기사 배경색",
			"cnjwhm":"환술사, 백마도사 배경색",
			"sch":"학자 배경색",
			"ast":"점성술사 배경색",
			"pglmnk":"격투사, 몽크 배경색",
			"lncdrg":"창술사, 용기사 배경색",
			"rognin":"쌍검사, 닌자 배경색",
			"sam":"사무라이 배경색",
			"arcbrd":"궁술사, 음유시인 배경색",
			"mch":"기공사 배경색",
			"thmblm":"주술사, 흑마도사 배경색",
			"acnsmn":"비술사, 소환사 배경색",
			"rdm":"적마도사 배경색",
			"glapldf":"글자색",
			"mrdwarf":"글자색",
			"drkf":"글자색",
			"cnjwhmf":"글자색",
			"schf":"글자색",
			"astf":"글자색",
			"pglmnkf":"글자색",
			"lncdrgf":"글자색",
			"rogninf":"글자색",
			"samf":"글자색",
			"arcbrdf":"글자색",
			"mchf":"글자색",
			"thmblmf":"글자색",
			"acnsmnf":"글자색",
			"rdmf":"글자색",
			"lmb":"리미트 브레이크 배경색",
			"lmbf":"글자색",
			"bgcolor":"배경색",
			"advancedset":"고급",
			"user":"사용자",
			"ui":"표시",
			"data":"데이터",
			"language":"언어",
			"nickhide":"자신 이외의 닉네임 블러",
			"rankanim":"순위변경 효과 사용",
			"numbanim":"숫자변경 효과 사용",
			"hpsallview":"힐러 영역에 힐러 외 직업 숨김",
			"opacity":"막대 투명도",
			"displayhps":"힐러 영역 표시",
			"image":"배경 이미지",
			"imgalign":"이미지 정렬",
			"imgsizeopt":"이미지 크기",
			"nickshorter":"이름 줄이기 (글로벌용)",
			"tankers":"방어 역할",
			"healers":"회복 역할",
			"dealers":"공격 역할",
			"rolecolor":"역할 색상",
			"c_tanker":"방어 역할",
			"c_healer":"회복 역할",
			"c_dps":"공격 역할",
			"etcicon":"막대 일반 설정",
			"overhealcolor":"오버힐 색상",
			"iconglow":"직업 아이콘 글로우 색",
			"fonts":"폰트 스타일",
			"fontsize":"폰트 크기",

			"columnset":"항목 설정",
			"setting-in-out":"설정 내보내기/들여오기"
		},
		"html":{
			"lang-setting":"설정"
		},
		"label":{
			"donate":"기부",
			"issue":"문의",
			"setting":"설정",
			"cssfilter":"CSS필터",
			"widthfit":"좌우에 맞게",
			"heightfit":"상하에 맞게",
			"original":"원본",
			"notuse":"Aquamarin Diamond (사용 안 함)",
			"nameval1":"Aquamarin D. (뒷 이름 줄이기)",
			"nameval2":"A. Diamond (앞 이름 줄이기)",
			"nameval3":"A. D. (모두 줄이기)",
			
			"setexport":"Copy textbox content, you can save and share this.",
			"setimport":"Or, if you have Setting JSON. Paste that below textbox and press Allow button.",

			"set-gen":"일반",
			"set-bgs":"배경 이미지",
			"set-col":"표시 항목 설정",
			"set-gnb":"막대 일반 설정",
			"set-adb":"막대 상세 설정",
			"set-xim":"설정 내보내기/들여오기"
		},
		"columns":{
			"encdps":"DPS",
			"enchps":"HPS",
			"damage":"딜량",
			"crithit%":"극대%",
			"maxhit":"최대딜",
			"swings":"타격",
			"misses":"빗나감",
			"deaths":"죽음",
			"healed":"힐량",
			"dps":"P.DPS",
			"hps":"P.HPS",
			"overHeal":"오버힐",
			"overHeal%":"오버힐%",
			"damageShield":"보호량",
			"effectiveHeal":"유효힐"
		}
	},
	"en":{
		"lang":"English (Auto detect)",
		"settings":{
			"glapld":"GLA, PLD Back Color",
			"mrdwar":"MRD, WAR Back Color",
			"drk":"Drk Back Color",
			"cnjwhm":"GLA, PLD Back Color",
			"sch":"SCH Back Color",
			"ast":"AST Back Color",
			"pglmnk":"PGL, MNK Back Color",
			"lncdrg":"LNC, DRG Back Color",
			"rognin":"ROG, NIN Back Color",
			"sam":"SAM Back Color",
			"arcbrd":"ARC, BRD Back Color",
			"mch":"MCH Back Color",
			"thmblm":"THM, BLM Back Color",
			"acnsmn":"ACN, SMN Back Color",
			"rdm":"RDM Back Color",
			"glapldf":"Font Color",
			"mrdwarf":"Font Color",
			"drkf":"Font Color",
			"cnjwhmf":"Font Color",
			"schf":"Font Color",
			"astf":"Font Color",
			"pglmnkf":"Font Color",
			"lncdrgf":"Font Color",
			"rogninf":"Font Color",
			"samf":"Font Color",
			"arcbrdf":"Font Color",
			"mchf":"Font Color",
			"thmblmf":"Font Color",
			"acnsmnf":"Font Color",
			"rdmf":"Font Color",
			"lmb":"Limit Break Back Color",
			"lmbf":"Font Color",
			"bgcolor":"Back Color",
			"advancedset":"Advanced",
			"user":"User",
			"ui":"Display",
			"data":"Data",
			"language":"Language",
			"nickhide":"Blur User Names (exclude YOU)",
			"rankanim":"Use Ranking Animation",
			"numbanim":"Use RDPS & RHPS Number Animation",
			"hpsallview":"Display Only Healer on HPS Area",
			"opacity":"Bar Opacity",
			"displayhps":"Display HPS Area",
			"image":"Background Image",
			"imgalign":"Image Align",
			"imgsizeopt":"Image Size",
			"nickshorter":"Use Initial Name",
			"tankers":"Tanker",
			"healers":"Healer",
			"dealers":"DPS",
			"rolecolor":"Role Color",
			"c_tanker":"Tanker",
			"c_healer":"Healer",
			"c_dps":"DPS",
			"etcicon":"Bar General Setting",
			"overhealcolor":"Overheal Color",
			"iconglow":"Icon Glow Color",
			"fonts":"General Font Style",
			"fontsize":"General Font Size",
			
			"columnset":"Column Setting",
			"setting-in-out":"Set Export/Import",
			"overlayinfo":"Overlay Information",
			"topbgcolor":"Header Color"
		},
		"html":{
			"lang-setting":"Setting"
		},
		"label":{
			"donate":"DONATE",
			"issue":"OPEN ISSUE",
			"setting":"SET AND INFO",
			"cssfilter":"CSS Filter",
			"widthfit":"Width fit",
			"heightfit":"Height fit",
			"original":"Original",
			"notuse":"Aquamarin Diamond",
			"nameval1":"Aquamarin D.",
			"nameval2":"A. Diamond",
			"nameval3":"A. D.",

			"setexport":"Copy textbox content, you can save and share this.",
			"setimport":"Or, if you have Setting JSON. Paste that below textbox and press Allow button.",
			
			"set-gen":"General Set",
			"set-bgs":"BG &amp; Header Edit",
			"set-col":"Columns Edit",
			"set-gnb":"General Bar Set",
			"set-adb":"Advanced Bar Set",
			"set-xim":"Set Export/Import",
			"set-inf":"Overlay Information"
		},
		"columns":{
			"encdps":"DPS",
			"encdps":"DPS",
			"enchps":"HPS",
			"damage":"Damage",
			"crithit%":"D.Crit%",
			"maxhit":"Max Hit",
			"swings":"Swing",
			"misses":"Miss",
			"deaths":"D",
			"healed":"Healed",
			"dps":"P.DPS",
			"hps":"P.HPS",
			"overHeal":"Ov.H",
			"overHeal%":"Ov.H%",
			"damageShield":"D.Shield",
			"effectiveHeal":"Eff.H"
		}
	}
};

var curLang = languagePack[userLang.substring(0, 2)];

$(".item[data-id=language]").html(curLang.lang);

if(curLang != undefined)
{
	$("[data-id]").each(function()
	{
		if(curLang.settings[$(this).attr("data-id")] != undefined)
		{
			$(this).attr("label", curLang.settings[$(this).attr("data-id")]);
		}
	});

	for(var i in curLang.html)
	{
		var $element = $("#" + i );
		$element.text(curLang.html[i]);
	}

	for(var i in curLang.label)
	{
		$("[data-label]").each(function()
		{
			if($(this).attr("data-label") == i)
				$(this).html(curLang.label[i]);
		});
	}
}

var option = {
	displayhps:true,
	nickhide:true,
	rankanim:true,
	numbanim:true,
	hpsallview:true,
	opacity:100,
	backgroundimg:"",
	fonts:"Noto Sans KR",
	fontsize:12
};

var origopt = option;