// window.publish_api = window.publish_api || false;
// window.hoeny_api = window.hoeny_api || "https://nanjingdevelop.zhizaoyun.wang/industrial-diagnosis/";
// window.hoeny_api = "http://121.36.154.101:8080/industrial-diagnosis-0.0.1-SNAPSHOT/";
// window.hoeny_api = "../";

// 接口地址
// var ajaxUrl = 'http://121.36.154.101:8082/'
// var ajaxUrl = 'http://121.36.154.101:8082/'
// var ajaxUrl = 'http://121.36.154.101:8083/'
// 开发环境
// var ajaxUrl = '/'
var ajaxUrl = 'https://jsnanjingtesting.zhizaoyun.com/'
var lopUrl = 'https://nanjingtesting.zhizaoyun.com/'

// 获取url参数  getUrlParams('enterpriseId')
function getUrlParams(param) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == param) { return pair[1]; }
	}
	return false;
}


/*客户端判断*/
function checkObjExist() {
	try {
		var status = window.external.isIEViewer();
		if (status == 1) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		return false;
	}
}

var base = {};
// base.isPublished = false;
base.isPublished = true;
//base.remotePath = "../"; //发布到服务端的请求地址前缀
base.remotePath = ajaxUrl;//测试服务地址
// 开发环境
base.localPath = "../../json/";

/*接口列表*/
base.interfaceObj = {


	// .........jy........
	// 首页
	homeNumber: {
		// 申报企业完成诊断家数
		getHomes: { localUrl: base.localPath + "county.json", remoteUrl: base.remotePath + "count/totalCount" },
	},
	// 企业初次信息展示
	pageExhibition: {
		getTotalData: { localUrl: base.localPath + "totalData.json", remoteUrl: base.remotePath + "apply/enterprise/toRegist" },
	},
	// 填报第一页
	pageOne: {
		imgeUrl: { localUrl: base.localPath + "lastList.json", remoteUrl: base.remotePath + "files/urldown" },
		lastList: { localUrl: base.localPath + "lastList.json", remoteUrl: base.remotePath + "frontEBI/lookupBaseInfo" },
		postEnterpriseName: { localUrl: base.localPath + "enterpriseName.json", remoteUrl: base.remotePath + "frontEBI/seekIsExisEnterpriseName" },
		postCreditCode: { localUrl: base.localPath + "creditCode.json", remoteUrl: base.remotePath + "frontEBI/seekIsExiscreditCode" },
		enterpriseType: { localUrl: base.localPath + "type.json", remoteUrl: base.remotePath + "apply/enterprise/getEnterpriseType" },
		getEnterpriseIndustry: { localUrl: base.localPath + "enterpriseIndustry.json", remoteUrl: base.remotePath + "apply/enterprise/getIndustry" },
		postList: { localUrl: base.localPath + "getList.json", remoteUrl: base.remotePath + "apply/enterprise/submitRegistInfo" },
	},
	// 填报第二页
	pageTwo: {
		lastListTwo: { localUrl: base.localPath + "lastList1.json", remoteUrl: base.remotePath + "contactInfo/getContactInfo" },
		province: { localUrl: base.localPath + "province.json", remoteUrl: base.remotePath + "apply/enterprise/getArea" },
		contactInformation: { localUrl: base.localPath + "city.json", remoteUrl: base.remotePath + "contactInfo/postContactInfo" },
	},
	// 填报信息
	getEnterpriseDetail: {
		threeDetail: { localUrl: base.localPath + "totalData.json", remoteUrl: base.remotePath + "apply/enterprise/registResult" },
	},
	// 自评估跳转页权限判定
	changeAdress: {
		changeZpg: { localUrl: base.localPath + "totalData.json", remoteUrl: base.remotePath + "apply/main" },
	},

	// 企业完成信息展示
	finishInformation: {
		getFinishData: { localUrl: base.localPath + "totalData.json", remoteUrl: base.remotePath + "apply/enterprise/viewRegistInfo" },
	},
	// 提交完成页
	submitCompleted: {
		activeDetail: { localUrl: base.localPath + "submitCompleted.json", remoteUrl: base.remotePath + "contactInfo/getContactInfo" },
	},
	// 职能部门推荐/遴选结果展示
	companyApprovalResult: {
		approvalResult: { localUrl: base.localPath + "companyApprovalResult/approvalResult.json", remoteUrl: base.remotePath + "/apply/FindresultReport" },
	},
	// 获取三张试卷内容
	threeTestPaper: {
		testPaper: { localUrl: base.localPath + "testpaper.json", remoteUrl: base.remotePath + "rapply/report/info" },
	},
	// 打印pdf传流
	postPdf: {
		pdf: { localUrl: base.localPath + "pdf.json", remoteUrl: base.remotePath + "" },
	},

	// .........jy........



	// 企业自评估雷达图
	companySelfEvaluationResult: {
		// 企业云能力指标数据
		cloudRadar: { localUrl: base.localPath + "companySelfEvaluationResult/cloudRadar.json", remoteUrl: base.remotePath + "/rapply/report/cloudRadar" },
		// 工业互联网成熟度指标数据
		maturityRadar: { localUrl: base.localPath + "companySelfEvaluationResult/maturityRadar.json", remoteUrl: base.remotePath + "/rapply/report/maturityRadar" },
		// 智能制造能力指标数据
		capabilityRadar: { localUrl: base.localPath + "companySelfEvaluationResult/capabilityRadar.json", remoteUrl: base.remotePath + "/rapply/report/capabilityRadar" },
		// 加载自评估结果按钮
		loadPaperButton: { localUrl: base.localPath + "companySelfEvaluationResult/loadPaperButton.json", remoteUrl: base.remotePath + "/report/loadPaperButton" },
	},
	// 精益生产成熟度诊断
	leanMaturityDiagnosis: {
		// 获取试卷url
		getLeanMaturityDiagnosisUrl: { localUrl: base.localPath + "leanMaturityDiagnosis/getLeanMaturityDiagnosisUrl.json", remoteUrl: "https://nanjingtesting.zhizaoyun.com/tpi/openTheTestPaper" },
		// 提交精益生产成熟度诊断试卷
		submitLeanMaturityDiagnosis: { localUrl: base.localPath + "leanMaturityDiagnosis/submitLeanMaturityDiagnosis.json", remoteUrl: base.remotePath + "/report/saveDiagnosisInfo" }
	}


};
/*接口数据获取*/
base.requestJson = function (urlOrInterfaceObj, callBack) {
	var url,
		currentPage = window.location.hash;
	if (typeof urlOrInterfaceObj.url == "string") {
		url = urlOrInterfaceObj.url;
	} else {
		url = base.isPublished
			? urlOrInterfaceObj.url.remoteUrl
			: urlOrInterfaceObj.url.localUrl;
	}
	if (!base.isPublished) {
		urlOrInterfaceObj.type = "GET";
	}

	var config = {
		type: urlOrInterfaceObj.type,
		url: url,
		data: urlOrInterfaceObj.data,
		dataType: "json",
		contentType: 'application/json;charset=utf-8',
		async: urlOrInterfaceObj.async ? urlOrInterfaceObj.async : false,
		traditional: true,
		xhrFields: { withCredentials: true },
		crossDomain: true,
		beforeSend: function (xhr) {
			//debugger;
		},
		success: function (result) {
			if (result != null) {
				if (result.status && result.status == "302") {
					if (urlOrInterfaceObj.parent) {
						window.parent.location.href = "../../home.html";
					} else {
						window.location.href = "../../home.html";
					}
					return;
				}
				if (window.location.hash == currentPage && callBack) {
					callBack(result);
				}
			} else {
				console.log("无数据");
			}
			config = null;
		},
		error: function (data) {
			console.log("接口调用失败");
		}
	};
	$.ajax(config);
};

/*open loading*/
base.openLoading = function (content) {
	$(document.body).append("<div id='custom-shadow' style='position: fixed;width: 100%;height: 100%;background-color: rgba(0,0,0,0.1);top: 0;left: 0;z-index: 999999;color: #3093d0;text-align: center;padding-top: 250px;'>" + content + "</div>");
};

/*close loading*/
base.closeLoading = function () {
	$("#custom-shadow").remove();
};

/*dialog*/
base.alert = function (content) {
	layui.use('layer', function () {
		let layer = layui.layer;
		layer.open({
			type: 1,
			id: 'layerDemo' + Math.random(), //防止重复弹出,
			content: '<div style="padding: 20px 100px;">' + content + '</div>',
			offset: '200px',
			btn: '关闭全部',
			btnAlign: 'c', //按钮居中
			shade: 0,  //不显示遮罩,
			yes: function () {
				layer.closeAll();
			}
		});
	});
};

