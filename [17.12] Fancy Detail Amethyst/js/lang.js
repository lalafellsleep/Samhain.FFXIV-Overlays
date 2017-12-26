var userLang = "en";
userLang = navigator.language || navigator.userLanguage;
userLang = userLang.substring(0, 2);

var Languages = {
	"lang":{
		"ko":"한국어",
		"en":"English"
	},
	"data":[
		"settings", "html", "label", "columns"
	],
	"settings":{
		"glapld":{
			"ko":"검술사, 나이트 배경색",
			"en":"GLA, PLD BackColor"
		},
		"mrdwar":{
			"ko":"도끼술사, 전사 배경색",
			"en":"MRD, WAR BackColor"
		},
		"drk":{
			"ko":"암흑기사 배경색",
			"en":"DRK BackColor"
		},
		"cnjwhm":{
			"ko":"환술사, 백마도사 배경색",
			"en":"CNJ, WHM BackColor"
		},
		"sch":{
			"ko":"학자 배경색",
			"en":"SCH BackColor"
		},
		"ast":{
			"ko":"점성술사 배경색",
			"en":"ACT BackColor"
		},
		"pglmnk":{
			"ko":"격투사, 몽크 배경색",
			"en":"PGL, MNK BackColor"
		},
		"lncdrg":{
			"ko":"창술사, 용기사 배경색",
			"en":"LNC, DRG BackColor"
		},
		"rognin":{
			"ko":"쌍검사, 닌자 배경색",
			"en":"ROG, NIN BackColor"
		},
		"sam":{
			"ko":"사무라이 배경색",
			"en":"SAM BackColor"
		},
		"arcbrd":{
			"ko":"궁술사, 음유시인 배경색",
			"en":"ARC, BRD BackColor"
		},
		"mch":{
			"ko":"기공사 배경색",
			"en":"MCH BackColor"
		},
		"thmblm":{
			"ko":"주술사, 흑마도사 배경색",
			"en":"THM, BLM BackColor"
		},
		"acnsmn":{
			"ko":"비술사, 소환사 배경색",
			"en":"ACN, SMN BackColor"
		},
		"rdm":{
			"ko":"적마도사 배경색",
			"en":"RDM BackColor"
		},
		"glapldf":{
			"ko":"글자색",
			"en":"Font Color"
		},
		"mrdwarf":{
			"ko":"글자색",
			"en":"Font Color"
		},
		"drkf":{
			"ko":"글자색",
			"en":"Font Color"
		},
		"cnjwhmf":{
			"ko":"글자색",
			"en":"Font Color"
		},
		"schf":{
			"ko":"글자색",
			"en":"Font Color"
		},
		"astf":{
			"ko":"글자색",
			"en":"Font Color"
		},
		"pglmnkf":{
			"ko":"글자색",
			"en":"Font Color"
		},
		"lncdrgf":{
			"ko":"글자색",
			"en":"Font Color"
		},
		"rogninf":{
			"ko":"글자색",
			"en":"Font Color"
		},
		"samf":{
			"ko":"글자색",
			"en":"Font Color"
		},
		"arcbrdf":{
			"ko":"글자색",
			"en":"Font Color"
		},
		"mchf":{
			"ko":"글자색",
			"en":"Font Color"
		},
		"thmblmf":{
			"ko":"글자색",
			"en":"Font Color"
		},
		"acnsmnf":{
			"ko":"글자색",
			"en":"Font Color"
		},
		"rdmf":{
			"ko":"글자색",
			"en":"Font Color"
		},
		"lmb":{
			"ko":"리미트 브레이크 배경색",
			"en":"LMB BackColor"
		},
		"lmbf":{
			"ko":"글자색",
			"en":"Font Color"
		},
		"bgcolor":{
			"ko":"배경색",
			"en":"BackColor"
		},
		"advancedset":{
			"ko":"고급",
			"en":"Advanced"
		},
		"user":{
			"ko":"사용자",
			"en":"USER"
		},
		"ui":{
			"ko":"표시",
			"en":"Interface"
		},
		"data":{
			"ko":"데이터",
			"en":"Data"
		},
		"language":{
			"ko":"언어",
			"en":"Language"
		},
		"nickhide":{
			"ko":"자신 이외의 닉네임 블러",
			"en":"Blur User Names (exclude YOU)"
		},
		"rankanim":{
			"ko":"순위변경 효과 사용",
			"en":"Use Ranking Animation"
		},
		"numbanim":{
			"ko":"숫자변경 효과 사용",
			"en":"Use RDPS & RHPS Number Animation"
		},
		"hpsallview":{
			"ko":"힐러 영역에 힐러 외 직업 숨김",
			"en":"Display Only Healer on HPS Area"
		},
		"opacity":{
			"ko":"막대 투명도",
			"en":"Bar Opacity"
		},
		"displayhps":{
			"ko":"힐러 영역 표시",
			"en":"Display HPS Area"
		},
		"image":{
			"ko":"배경 이미지",
			"en":"Background Image"
		},
		"imgalign":{
			"ko":"이미지 정렬",
			"en":"Image Align"
		},
		"imgsizeopt":{
			"ko":"이미지 크기",
			"en":"Image Size"
		},
		"nickshorter":{
			"ko":"이름 줄이기 (글로벌용)",
			"en":"Use Initial Name"
		},
		"tankers":{
			"ko":"방어 역할",
			"en":"Tanker"
		},
		"healers":{
			"ko":"회복 역할",
			"en":"Healer"
		},
		"dealers":{
			"ko":"공격 역할",
			"en":"DPS"
		},
		"rolecolor":{
			"ko":"역할 색상",
			"en":"Role Color"
		},
		"c_tanker":{
			"ko":"방어 역할",
			"en":"Tanker"
		},
		"c_healer":{
			"ko":"회복 역할",
			"en":"Healer"
		},
		"c_dps":{
			"ko":"공격 역할",
			"en":"DPS"
		},
		"etcicon":{
			"ko":"막대 일반 설정",
			"en":"Bar General Setting"
		},
		"overhealcolor":{
			"ko":"오버힐 색상",
			"en":"Overheal Color"
		},
		"iconglow":{
			"ko":"직업 아이콘 글로우 색",
			"en":"Icon Glow Color"
		},
		"fonts":{
			"ko":"폰트 스타일",
			"en":"General Font Style"
		},
		"fontsize":{
			"ko":"폰트 크기",
			"en":"General Font Size"
		},
		"columnset":{
			"ko":"항목 설정",
			"en":"Column Setting"
		},
		"setting-in-out":{
			"ko":"설정 내보내기/들여오기",
			"en":"Set Export/Import"
		},
		"overlayinfo":{
			"ko":"오버레이 정보",
			"en":"Overlay Information"
		},
		"topbgcolor":{
			"ko":"헤더 색상",
			"en":"Header Color"
		}
	},
	"html":{
		"lang-setting":{
			"ko":"설정",
			"en":"Setting"
		}
	},
	"label":{
		"donate":{
			"ko":"기부",
			"en":"DONATE"
		},
		"issue":{
			"ko":"문의",
			"en":"OPEN ISSUE"
		},
		"setting":{
			"ko":"설정",
			"en":"SET AND INFO"
		},
		"cssfilter":{
			"ko":"CSS필터",
			"en":"CSS Filter"
		},
		"widthfit":{
			"ko":"좌우에 맞게",
			"en":"Width fit"
		},
		"heightfit":{
			"ko":"상하에 맞게",
			"en":"Height fit"
		},
		"original":{
			"ko":"원본",
			"en":"Original"
		},
		"notuse":{
			"ko":"Aquamarin Diamond (사용 안 함)",
			"en":"Aquamarin Diamond"
		},
		"nameval1":{
			"ko":"Aquamarin D. (뒷 이름 줄이기)",
			"en":"Aquamarin D."
		},
		"nameval2":{
			"ko":"A. Diamond (앞 이름 줄이기)",
			"en":"A. Diamond"
		},
		"nameval3":{
			"ko":"A. D. (모두 줄이기)",
			"en":"A. D."
		},
		"setexport":{
			"ko":"텍스트 상자를 복사하여 설정을 공유하거나 저장할 수 있습니다.",
			"en":"Copy textbox content, you can save and share this."
		},
		"setimport":{
			"ko":"혹은, 공유받거나 저장한 설정이 있으면 불러올 수 있습니다.",
			"en":"Or, if you have Setting JSON. Paste that below textbox and press Allow button."
		},
		"set-gen":{
			"ko":"일반",
			"en":"General Set"
		},
		"set-bgs":{
			"ko":"배경 및 헤더 설정",
			"en":"BG &amp; Header Edit"
		},
		"set-col":{
			"ko":"항목 설정",
			"en":"Columns Edit"
		},
		"set-gnb":{
			"ko":"전역 바 설정",
			"en":"General Bar Set"
		},
		"set-adb":{
			"ko":"상세 바 설정",
			"en":"Advanced Bar Set"
		},
		"set-xim":{
			"ko":"들여오기/내보내기",
			"en":"Set Export/Import"
		},
		"set-inf":{
			"ko":"오버레이 정보",
			"en":"Overlay Information"
		}
	},
	"columns":{
		"encdps":{
			"ko":"DPS",
			"en":"DPS"
		},
		"enchps":{
			"ko":"HPS",
			"en":"HPS"
		},
		"damage":{
			"ko":"딜량",
			"en":"Damage"
		},
		"crithit%":{
			"ko":"극대%",
			"en":"D.Crit%"
		},
		"maxhit":{
			"ko":"최대딜",
			"en":"Max Hit"
		},
		"swings":{
			"ko":"타격",
			"en":"Swing"
		},
		"misses":{
			"ko":"빗나감",
			"en":"Miss"
		},
		"deaths":{
			"ko":"사망",
			"en":"D"
		},
		"healed":{
			"ko":"힐량",
			"en":"Healed"
		},
		"dps":{
			"ko":"개인DPS",
			"en":"P.DPS"
		},
		"hps":{
			"ko":"개인HPS",
			"en":"P.HPS"
		},
		"overHeal":{
			"ko":"오버힐",
			"en":"Ov.H"
		},
		"overHeal%":{
			"ko":"오버힐%",
			"en":"Ov.H%"
		},
		"damageShield":{
			"ko":"보호막",
			"en":"D.Shield"
		},
		"effectiveHeal":{
			"en":"유효힐",
			"ko":"Eff.H"
		}
	}
};

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

var curLang = new function()
{
	this.lang = Languages.lang[userLang];
	for(var l in Languages.data)
	{
		for(var i in Languages[Languages.data[l]])
		{
			if(this[Languages.data[l]] == undefined)
				this[Languages.data[l]] = [];

			for(var i in Languages[Languages.data[l]])
			{
				this[Languages.data[l]][i] = Languages[Languages.data[l]][i][userLang];
			}
		}
	}
};

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
var origopt = option;