// window.publish_api = window.publish_api || false;
// window.hoeny_api = window.hoeny_api || "https://nanjingdevelop.zhizaoyun.com/industrial-diagnosis/";
// window.hoeny_api = "http://121.36.154.101:8080/industrial-diagnosis-0.0.1-SNAPSHOT/";
// window.hoeny_api = "../";

$(function () {
	// 客户端显示
	if (checkObjExist() == true) {
		$(".header_cont_khd").css("display", "block");
	}
	// 下拉
	$(".nav_box ul li.nav-dl").hover(function () {
		$(this).find('a.nav-dt').addClass('nav-dt-hover').end().find('.sub-zy').css("display", "block");
	},
		function () {
			$(this).find('a.nav-dt').removeClass('nav-dt-hover').end().find('.sub-zy').css("display", "none");
		});
	$(".nav_box ul li.nav-dl2").hover(function () {
		$(this).find('a.nav-dt').addClass('nav-dt-hover').end().find('.sub-zy2').css("display", "block");
	},
		function () {
			$(this).find('a.nav-dt').removeClass('nav-dt-hover').end().find('.sub-zy2').css("display", "none");
		});


	// 侧边悬浮窗
	$(".fixed_li_wx").hover(function () {
		$(".fixed_gzh").show();
	}, function () {
		$(".fixed_gzh").hide();
	});
	$(".fixed_li_contact").hover(function () {
		$(".fixed_contact").show();
	}, function () {
		$(".fixed_contact").hide();
	});

});

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

base.isPublished = false;
//base.remotePath = "../"; //发布到服务端的请求地址前缀
// base.remotePath = "http://192.168.1.130:8080/";//本地
// base.remotePath = "https://nanjingdevelop.zhizaoyun.com/industrial-diagnosis/";//临时前缀
//base.remotePath = "https://nanjingtesting.zhizaoyun.com/industrial-diagnosis/";//临时前缀
base.remotePath = "https://iid.zhizaoyun.com/industrial-diagnosis/";//临时前缀
base.remotePath = "https://diagnosis.zhizaoyun.com/industrial-diagnosis/";
base.localPath = "../../json/";

/*接口列表*/
base.interfaceObj = {
	// 登录认证
	login: {
		// 登录传递userId
		getUserInfo: { localUrl: base.localPath + "login.json", remoteUrl: base.remotePath + "user/getUserInfo" },
		// 登录用户判定
		userCertificate: { localUrl: base.localPath + "login1.json", remoteUrl: base.remotePath + "user/userCertificate" },
		// 企业认证码
		companyCertificate: { localUrl: base.localPath + "login2.json", remoteUrl: base.remotePath + "user/companyCertificate" },
		// 地图获取城市
		getProvinceCityInfo: { localUrl: base.localPath + "getProvinceCityInfo.json", remoteUrl: base.remotePath + "users/getProvinceCityInfo" },
	},
	//专家服务
	service: {
		// 查询企业名称
		enterpriseInfo: { localUrl: base.localPath + "qyname.json", remoteUrl: base.remotePath + "enterprise/enterpriseInfo" },
		// 人员查询
		enterpriseUsers: { localUrl: base.localPath + "personlist.json", remoteUrl: base.remotePath + "enterprise/enterpriseUsers" },
		// 模型查询
		enterpriseUserDiaModel: { localUrl: base.localPath + "modellist.json", remoteUrl: base.remotePath + "enterprise/enterpriseUserDiaModel" },
		// 查询列表
		getResultList: { localUrl: base.localPath + "qyuserlist.json", remoteUrl: base.remotePath + "diagnosis/getResultList" },
		// 查看结果
		diagnosisResInfo: { localUrl: base.localPath + "result.json", remoteUrl: base.remotePath + "diagnosisResult/diagnosisResInfo" },
		//查看pdf报告
		getPdfData: { localUrl: base.localPath + "Test.json", remoteUrl: base.remotePath + "report/getReport" },
		//获取表单初次渲染
		diagnosisResult: { localUrl: base.localPath + "result.json", remoteUrl: base.remotePath + "diagnosisResult/diagnosisResInfo" },
		// 表单提交
		insertNewDiagResult: { localUrl: base.localPath + "insertNewDiagResult.json", remoteUrl: base.remotePath + "diagnosisResult/insertNewDiagResult" },
		// 生成报告
		generateReport: { localUrl: base.localPath + "generateReport.json", remoteUrl: base.remotePath + "diagnosisResult/generateReport" }
	},
	// 诊断服务
	diagnosticServices: {
		// 获取诊断服务list
		getTextList: { localUrl: base.localPath + "serviceIndex.json", remoteUrl: base.remotePath + "user/getTextList" },
		// 开始诊断
		beginDiagnostic: { localUrl: base.localPath + "serviceDiagnostic.json", remoteUrl: base.remotePath + 'user/generateForHc' },
		// 登录过期重新授权
		returnLogin: { localUrl: '', remoteUrl: base.remotePath + 'user/userCertificate' }
	},
	resultReport: {
		// 结果报告
		matchReport: { localUrl: base.localPath + "result1.json", remoteUrl: base.remotePath + "diagnosisResult/matchReport" },

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
						window.parent.location.href = "../../index.html";
					} else {
						window.location.href = "../../index.html";
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
		error: function () {
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

/*svg radar
* xData @array (name)
* sData @array (value)
* size @string (缩放比例)
* num @number (文字截取长度)*/
base.createRadar = function (domID, xData, sData, size, num, maginArr) {
	var sizeData = size || '80%';
	var numData = num || 100;
	var marginData = maginArr || [0, 0, 0, 0];
	var chart = Highcharts.chart(domID, {
		chart: {
			polar: true,
			type: 'area',
			backgroundColor: 'rgba(0,0,0,0)',
			margin: marginData
		},
		title: {
			text: '',
			enabled: false
		},
		pane: {
			size: sizeData
		},
		xAxis: {
			categories: xData,
			labels: {
				formatter: function () {
					var tempStr = "";
					if ((numData) && (this.value.length > numData)) {
						for (var i = 0; i < this.value.length; i++) {
							if ((i !== 0) && !((i + 1) % numData)) {
								tempStr += this.value[i] + "<br/>";
							} else {
								tempStr += this.value[i];
							}
						}
					} else {
						tempStr = this.value;
					}
					return tempStr;
				}
			},
			tickmarkPlacement: 'on',
			lineWidth: 0
		},
		yAxis: {
			gridLineInterpolation: 'polygon',
			lineWidth: 0,
			min: 0,
			labels: {
				enabled: false
			}
		},
		tooltip: {
			shared: true,
			pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:.0f}</b><br/>'
		},
		credits: {
			enabled: false
		},
		series: [{
			showInLegend: false,
			type: 'area',
			name: '分数',
			data: sData,
			pointPlacement: 'on'
		}]
	});
};

/*svg bar
* barData @array (data)
* colorIndex @number (高亮下标)*/
base.createBar = function (domID, barData, colorIndex) {
	//柱子颜色
	var colorArray = [
		[0, Highcharts.Color('#587cbe').setOpacity(1).get('rgba')],
		[1, Highcharts.Color('#2989c9').setOpacity(1).get('rgba')]
	], colorActiveArray = [
		[0, Highcharts.Color('#2f94d1').setOpacity(1).get('rgba')],
		[1, Highcharts.Color('#00b8f0').setOpacity(1).get('rgba')]
	];
	//设置每一个数据点的颜色值
	function SetEveryOnePointColor(chart) {
		//获得第一个序列的所有数据点
		var pointsList = chart.series[0].points;
		//遍历设置每一个数据点颜色
		for (var i = 0; i < pointsList.length; i++) {
			chart.series[0].points[i].update({
				color: {
					linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 }, //横向渐变效果 如果将x2和y2值交换将会变成纵向渐变效果
					stops: i === colorIndex ? colorActiveArray : colorArray
				}
			});
		}
	}

	var chart = Highcharts.chart(domID, {
		chart: {
			type: 'column'
		},
		title: {
			text: '',
			enabled: false
		},
		xAxis: {
			type: 'category',
			lineWidth: 2,
			lineColor: 'grey',
			gridLineWidth: 1,
			labels: {
				rotation: 0  // 设置轴标签旋转角度
			}
		},
		yAxis: {
			min: 0,
			lineWidth: 2,
			lineColor: 'grey',
			gridLineWidth: 1,
			title: {
				text: '',
				enabled: false
			}
		},
		legend: {
			enabled: false
		},
		tooltip: {
			pointFormat: '<b>{point.y:.0f}</b>'
		},
		credits: {
			enabled: false
		},
		series: [{
			name: '总人口',
			data: barData
		}]
	}, function (chart) {
		SetEveryOnePointColor(chart);
	});
};
