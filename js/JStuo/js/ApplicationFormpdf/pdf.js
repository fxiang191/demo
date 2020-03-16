// ajax获取填写数据

// 模拟登录上线需注释
// base.requestJson({ type: "POST", url: base.remotePath + "auth/login?username=industrycd&password=123456&type=0", data: {} },
//     function (res) {

base.requestJson({ type: "post", url: base.interfaceObj.finishInformation.getFinishData, data: {} },
    function (res) {

        // console.log( JSON.stringify(res))
        var lastList = res.data.enterpriseBaseinfo;
        var lastList1 = res.data.enterpriseContactinfo;
        var lastList2 = res.data.applyFile;
        // console.log(lastList)
        if (lastList != null & lastList != "") {
            // 企业基本信息
            $("#qymc").text(lastList.enterpriseName)

            $("#qymc").attr("title", lastList.enterpriseName)

            $("#tyshxxydm").text(lastList.creditCode)

            $("#qyclsj").text(lastList.establishTime)

            $("#qyzzc").text(lastList.totalAssets + "万元")

            $("#qysshy").text(lastList.enterpriseIndustry)

            $("#qyfzl").text(lastList.debtratio + "%")

            lastList.businessType == "0" ? lastList.businessType = '离散行业' : lastList.businessType = '流程行业'
            $("#ywlx").text(lastList.businessType)

            $("#qyzrs").text(lastList.totalNumber)

            $("#qylx").text(lastList.enterpriseType)

            $("#qyzycp").text(lastList.enterpriseProduct)

            $("#qyzycp").attr("title", lastList.enterpriseProduct)
            $("#qyxydj").text(lastList.creditrating)

            lastList.isListed == "0" ? lastList.isListed = '是' : lastList.isListed = '否'
            $("#sex1").text(lastList.isListed)

            lastList.isnearlythreeyearsprofit == "0" ? lastList.isnearlythreeyearsprofit = '是' : lastList.isnearlythreeyearsprofit = '否'
            $("#sex3").text(lastList.isnearlythreeyearsprofit)

            lastList.enterpriseMake == "1" ? lastList.enterpriseMake = 'OEM贴牌生产' : (lastList.enterpriseMake == "2" ? lastList.enterpriseMake = 'ODM产品自研自制' : lastList.enterpriseMake = 'OBM不做研发，仅制造销售')
            $("#sex2").text(lastList.enterpriseMake)

            lastList.istopten == "0" ? lastList.istopten = '是前十强' : lastList.istopten = '不是前十强'
            $("#qythysp").text(lastList.occupancylevel + "%" + ',' + lastList.istopten)

            if (lastList.enterpriseTurnover == "0") {
                lastList.enterpriseTurnover = '2000万以下'
            } else if (lastList.enterpriseTurnover == "1") {
                lastList.enterpriseTurnover = '2000万至5000万'
            } else if (lastList.enterpriseTurnover == "2") {
                lastList.enterpriseTurnover = '5000万至1个亿'
            } else if (lastList.enterpriseTurnover == "3") {
                lastList.enterpriseTurnover = '1个亿至5个亿'
            } else if (lastList.enterpriseTurnover == "4") {
                lastList.enterpriseTurnover = '5个亿至10个亿'
            } else if (lastList.enterpriseTurnover == "5") {
                lastList.enterpriseTurnover = '10个亿以上'
            } else {
                lastList.enterpriseTurnover = '100个亿以上'
            }
            $("#qynyye").text(lastList.enterpriseTurnover)

            lastList.iscleardevstrategy == "0" ? lastList.iscleardevstrategy = '是' : lastList.iscleardevstrategy = '否'
            $("#sex5").text(lastList.iscleardevstrategy)

            $("#qysnsj").text(lastList.lastyeartaxes + "万元")

            $("#qyyfzb").text(lastList.rdratio + "%")

            $("#qysnlr").text(lastList.lastyearprofit + "万元")


            // 企业联系信息
            $("#frdb").text(lastList1.corporaterepresentative)
            $("#lxrxm").text(lastList1.contactname)
            $("#ssxq").text(lastList1.belongprovince + lastList1.belongcity + lastList1.belongarea)
            $("#qyxxdz").text(lastList1.detailadress)
            $("#qyxxdz").attr("title", lastList1.detailadress)
            $("#dblxdh").text(lastList1.corporaterepresentativephone)
            $("#bm").text(lastList1.department)
            $("#lxrsjhm").text(lastList1.contactphone)
            $("#lxrgddh").text(lastList1.contacttelephone)
            $("#zw").text(lastList1.position)
            $("#lxrdzyx").text(lastList1.contactemail)
            $("#lxrcz").text(lastList1.contactfax)



            // 获取营业执照url地址
            $.ajax({
                type: 'GET',
                async: false,
                url: base.remotePath + 'files/urldown',
                // data: { fileName: 'tmp1581320312153.png' },
                data: { fileName: lastList2.licenseFilepath },
                success: function (data) {
                    $("#imgurl").attr("src", data)
                }
            });



            var lastfile = lastList2.financeFilepath
            // console.log(lastfile)
            var index = lastfile.lastIndexOf(".");
            var isimage = lastfile.substring(index + 1, lastfile.length)
            console.log()
            // function showorhide() {
            if (isimage == "jpg" || isimage == "png" || isimage == "gif" || isimage == 'jpeg') {
                $("#img_file").show()
                // 获取图片url  
                $.ajax({
                    type: 'GET',
                    async: false,
                    url: base.remotePath + 'files/urldown',
                    // data: { fileName: '1581081670060.png' },
                    data: { fileName: lastfile },
                    success: function (data) {
                        img_url0 = data
                        $("#imgurl_0").attr("src", data)
                        // console.log(data)
                    }
                });

            } else {
                $("#other_file").show()
                // console.log(lastfile)
               var reallyname=lastfile.substring(36)
                $("#bgfile").text(reallyname)
            }


        }


    })

// })









// 打印pdf后台接口
$("#pdf_url").attr("action", base.remotePath + "htmltopdf/downloadpdf")

// 三张试卷内容
// var url = location.search
// var urlid = url.split("enterpriseId=")[1]

base.requestJson({ type: "GET", url: base.interfaceObj.threeTestPaper.testPaper, data: {} },
    function (res) {
        var listOne = res.data.maturity
        var listTwo = res.data.capability
        var listThree = res.data.cloud
        if (listOne == null) {
            $("#paperone").hide()
            $("#fileone").hide()
        }
        if (listTwo == null) {
            $("#papertwo").hide()
            $("#filetwo").hide()
        }
        if (listThree == null) {
            $("#paperthree").hide()
            $("#filethree").hide()
        }

        // console.log(listOne)
        // 试卷一赋值

        if (listOne != null & listOne != "") {
            // 边缘接入能力
            $("#platformDescription").text(listOne.platformDescription)
            $("#a1").text(listOne.a1)
            $("#a2").text(listOne.a2)
            // showOrhide(listOne.a2, $(".hide0"))
            $("#a3").text(listOne.a3)
            $("#a4").text(listOne.a4)
            $("#a5").text(listOne.a5)
            $("#a6").text(listOne.a6)
            $("#a7").text(listOne.a7)
            showOrhide(listOne.a7, $(".hide1"))
            $("#a8").text(listOne.a8)
            $("#a9").text(listOne.a9)
            $("#a10").text(listOne.a10)
            $("#a11").text(listOne.a11)


            // 基础设施服务能力
            $("#b1").text(listOne.b1)
            $("#b2").text(listOne.b2)
            showOrhide(listOne.b2, $('.hide3'))

            if (listOne.b3 != "" & listOne.b3 != null) {
                var reallyb3 = listOne.b3.substring(36)
                $("#b3").text(reallyb3)
                $("#b3").attr('title', reallyb3)
            }

            $("#b4").text(listOne.b4)
            $("#b5").text(listOne.b5)
            // showOrhide(listOne.b5, $(".hide4"))
            $("#b6").text(listOne.b6)
            $("#b7").text(listOne.b7)
            showOrhide(listOne.b7, $(".hide5"))
            $("#b8").text(listOne.b8)
            $("#b9").text(listOne.b9)
            showOrhide(listOne.b9, $(".hide6"))
            $("#b10").text(listOne.b10)
            $("#b11").text(listOne.b11)

            // 应用服务能力
            $("#c1").text(listOne.c1)
            $("#c2").text(listOne.c2)
            $("#c3").text(listOne.c3)
            $("#c4").text(listOne.c4)
            $("#c5").text(listOne.c5)
            // showOrhide(listOne.c5, $(".hide7"))
            $("#c6").text(listOne.c6)
            $("#c7").text(listOne.c7)
            $("#c8").text(listOne.c8)
            $("#c9").text(listOne.c9)
            $("#c10").text(listOne.c10)
            $("#c11").text(listOne.c11)
            // showOrhide(listOne.c11, $(".hide8"))
            $("#c12").text(listOne.c12)
            $("#c13").text(listOne.c13)
            $("#c14").text(listOne.c14)
            $("#c15").text(listOne.c15)

            // 设备接入能力
            $("#d1").text(listOne.d1)
            $("#d2").text(listOne.d2)
            $("#d3").text(listOne.d3)
            $("#d4").text(listOne.d4)
            $("#d5").text(listOne.d5)
            $("#d6").text(listOne.d6)
            // showOrhide(listOne.d6, $(".hide9"))
            $("#d7").text(listOne.d7)
            $("#d8").text(listOne.d8)

            // 行业软件部署能力
            $("#e1").text(listOne.e1)
            $("#e2").text(listOne.e2)
            $("#e3").text(listOne.e3)
            $("#e4").text(listOne.e4)
            $("#e5").text(listOne.e5)
            $("#e6").text(listOne.e6)
            $("#e7").text(listOne.e7)
            $("#e8").text(listOne.e8)
            $("#e9").text(listOne.e9)

            // 机理
            $("#f1").text(listOne.f1)
            $("#f2").text(listOne.f2)
            $("#f3").text(listOne.f3)
            $("#f4").text(listOne.f4)
            $("#f5").text(listOne.f5)
            $("#f6").text(listOne.f6)
            $("#f7").text(listOne.f7)
            $("#f8").text(listOne.f8)
            $("#f9").text(listOne.f9)

            // 行业用户覆盖能力
            if (listOne.g1 != null & listOne.g1 != "") {
                $("#g1").text(listOne.g1)
            }
            if (listOne.g2 != null & listOne.g2 != "") {
                $("#g2").text(listOne.g2)
            }
            if (listOne.g3 != null & listOne.g3 != "") {
                $("#g3").text(listOne.g3)
            }
            if (listOne.g3 != null & listOne.g3 != "") {
                $("#g3").text(listOne.g3)
            }
            if (listOne.g4 != null & listOne.g4 != "") {
                 var reallg4 = listOne.g4.substring(36)
                $("#g4").text(reallg4)
                $("#g4").attr('title', reallg4)
            } else {
                $(".hide9").hide()
            }
            if (listOne.g5 != null & listOne.g5 != "") {
                $("#g5").text(listOne.g5)
            } else {
                $(".hide10").hide()
            }

            // 内容根据是否隐藏
            function showOrhide(aa, bb) {
                if (aa == '否') {
                    bb.hide()
                }
            }

            isfile(listOne.hiApplyFile, $("#torf1"), $("#torf01"))


        }


        // paper二

        // 项目类型信息
        if (listTwo != null & listTwo != "") {
            $("#h1").text(listTwo.h1)
            $("#h2").text(listTwo.h2)
            $("#h3").text(listTwo.h3)
            $("#h4").text(listTwo.h4)
            $("#h5").text(listTwo.h5)
            $("#h6").text(listTwo.h6)
            $("#h7").text(listTwo.h7)
            $("#h8").text(listTwo.h8)

            isfile(listTwo.hiApplyFile, $("#torf2"), $("#torf02"))
        }




        // paper三

        if (listThree != null & listThree != "") {
            // istrue(接收值, 是否节点, 内容节点)
            function istrue(cc, dd, ee) {
                if (cc == '0') {
                    dd.text("否")
                    ee.hide()
                } else {
                    dd.text("是")
                    ee.text(cc)
                }
            }

            $("#j1").text(listThree.j1)
            istrue(listThree.j2, $("#j2"), $("#j02"))
            istrue(listThree.j3, $("#j3"), $("#j03"))
            istrue(listThree.j4, $("#j4"), $("#j04"))
            istrue(listThree.j5, $("#j5"), $("#j05"))
            istrue(listThree.j6, $("#j6"), $("#j06"))
            istrue(listThree.j7, $("#j7"), $("#j07"))
            istrue(listThree.j8, $("#j8"), $("#j08"))
            istrue(listThree.j9, $("#j9"), $("#j09"))
            istrue(listThree.j10, $("#j10"), $("#j010"))
            istrue(listThree.j11, $("#j11"), $("#j011"))
            istrue(listThree.j12, $("#j12"), $("#j012"))
            istrue(listThree.j13, $("#j13"), $("#j013"))
            istrue(listThree.j14, $("#j14"), $("#j014"))
            istrue(listThree.j15, $("#j15"), $("#j015"))
            istrue(listThree.j16, $("#j16"), $("#j016"))
            istrue(listThree.j17, $("#j17"), $("#j017"))
            istrue(listThree.j18, $("#j18"), $("#j018"))
            istrue(listThree.j19, $("#j19"), $("#j019"))
            istrue(listThree.j20, $("#j20"), $("#j020"))
            istrue(listThree.j21, $("#j21"), $("#j021"))
            istrue(listThree.j22, $("#j22"), $("#j022"))
            istrue(listThree.j23, $("#j23"), $("#j023"))
            istrue(listThree.j24, $("#j24"), $("#j024"))
            istrue(listThree.j25, $("#j25"), $("#j025"))
            istrue(listThree.j26, $("#j26"), $("#j026"))
            istrue(listThree.j27, $("#j27"), $("#j027"))
            istrue(listThree.j28, $("#j28"), $("#j028"))
            istrue(listThree.j29, $("#j29"), $("#j029"))
            istrue(listThree.j30, $("#j30"), $("#j030"))
            istrue(listThree.j31, $("#j31"), $("#j031"))
            istrue(listThree.j32, $("#j32"), $("#j032"))
            istrue(listThree.j33, $("#j33"), $("#j033"))
            istrue(listThree.j34, $("#j34"), $("#j034"))
            istrue(listThree.j35, $("#j35"), $("#j035"))
            istrue(listThree.j36, $("#j36"), $("#j036"))
            istrue(listThree.j37, $("#j37"), $("#j037"))
            istrue(listThree.j38, $("#j38"), $("#j038"))
            istrue(listThree.j39, $("#j39"), $("#j039"))
            istrue(listThree.j40, $("#j40"), $("#j040"))
            istrue(listThree.j41, $("#j41"), $("#j041"))
            istrue(listThree.j42, $("#j42"), $("#j042"))
            istrue(listThree.j43, $("#j43"), $("#j043"))
            istrue(listThree.j44, $("#j44"), $("#j044"))
            istrue(listThree.j45, $("#j45"), $("#j045"))
            istrue(listThree.j46, $("#j46"), $("#j046"))
            istrue(listThree.j47, $("#j47"), $("#j047"))


            isfile(listThree.hiApplyFile, $("#torf3"), $("#torf03"))
        }

        // 往年文件显示判断
        function isfile(cc, dd, ee) {
            if (cc == '') {
                dd.text("否")
                ee.hide()
            } else {
                dd.text("是")
                var ff = cc.substring(36)
                ee.text(ff)
                ee.attr("title", ff)
            }
        }





    })







// 获取html页面文档流
function myFunction() {
    // window.print()
    var domReady = '<!DOCTYPE html\n' +
        '        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' +
        '<html lang="en">\n' +
        '    <head>\n' +
        '        <title>PDF</title>\n' +
        '        <meta http-equiv="Access-Control-Allow-Origin" content="*" />\n' +
        '        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n' +
        '       <link rel="stylesheet" href="' + base.remotePath + 'js/layui/css/layui.css">\n' +
        '        <link rel="stylesheet" href="' + base.remotePath + 'css/enterpriseApplicationForm.css"></link>\n' +
        '    </head><body>';
    domReady += document.body.innerHTML;
    domReady = domReady.replace('<input name="submit" class="layui-btn layui-btn-normal button_0" type="submit" value="导出pdf">', '');
    domReady = domReady.replace('<script type="text/javascript" src="../js/jquery.min.js"></script>', '');
    domReady = domReady.replace('<script type="text/javascript" src="../js/layui/layui.all.js"></script>', '');
    domReady = domReady.replace('<script type="text/javascript" src="../js/common.js"></script>', '');
    domReady = domReady.replace('<script type="text/javascript" src="../js/ApplicationFormpdf/pdf.js"></script>', '');

    domReady += "</body></html>";
    // console.log(domReady)
    $("#input_0").val(domReady);


    // base.openLoading("PDF下载中...");

    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', base.interfaceObj.postPdf.pdf, true);//生产环境
    // xhr.responseType = 'blob'; //arraybuffer
    // xhr.contentType = "application/pdf;charset=utf-8";
    // xhr.send({html:domReady,pdfname:"企业申报信息"});
    // xhr.onload = function() {
    //     if (this.status === 200) {
    //         var type = xhr.getResponseHeader('Content-Type');

    //         var blob = new Blob([this.response], {type: type})
    //         if (typeof window.navigator.msSaveBlob !== 'undefined') {
    //             window.navigator.msSaveBlob(blob, fileName);
    //         } else {
    //             var URL = window.URL || window.webkitURL;
    //             var objectUrl = URL.createObjectURL(blob);
    //             if (fileName) {
    //                 var a = document.createElement('a');
    //                 if (typeof a.download === 'undefined') {
    //                     window.location = objectUrl;
    //                 } else {
    //                     a.href = objectUrl;
    //                     a.download = fileName;
    //                     document.body.appendChild(a);
    //                     a.click();
    //                     a.remove();
    //                 }
    //             } else {
    //                 window.location = objectUrl;
    //             }
    //         }
    //         base.closeLoading();
    //     }
    // };



}
