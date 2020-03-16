//  三张试卷内容




// var url = location.search
// var urlid = url.split("enterpriseId=")[1]
// enterpriseId:urlid
base.requestJson({ type: "GET", url: base.interfaceObj.threeTestPaper.testPaper, data: { } },
    function (res) {
        var listOne = res.data.maturity
        var listTwo = res.data.capability
        var listThree = res.data.cloud
        // console.log(listOne)
        // 试卷一赋值


        // 边缘接入能力
        if (listOne != null & listOne != "") {


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


            $("#b3").click(function () {
                $.ajax({
                    type: 'GET',
                    async: false,
                    url: base.remotePath + "files/urldown",
                    data: { fileName: listOne.b3 },
                    // data: { fileName: "1581163265550.png" },
                    success: function (data) {
                        window.location.href = data
                    }
                });
            })


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


            $("#g4").click(function () {
                $.ajax({
                    type: 'GET',
                    async: false,
                    url: base.remotePath + "files/urldown",
                    data: { fileName: listOne.g4 },
                    // data: { fileName: "1581163265550.png" },
                    success: function (data) {
                        window.location.href = data
                    }
                });
            })

            // 内容根据是否隐藏
            function showOrhide(aa, bb) {
                if (aa == '否') {
                    bb.hide()
                }
            }
        }

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
        }
        // 项目类型信息
        // istrue(接收值, 是否节点, 内容节点)
        if (listThree != null & listThree != "") {
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
        }

        // 文件下载显示隐藏
        function isfile(cc, dd, ee) {
            if (cc == '') {
                dd.text("否")
                ee.hide()
            } else {
                dd.text("是")
                var ff = cc.substring(36)
                ee.text(ff)
                ee.css({ color: 'blue', cursor: 'pointer' })
                ee.attr("title", ff)
                ee.click(function () {
                    // console.log(cc)
                    $.ajax({
                        type: 'GET',
                        async: true,
                        url: base.remotePath + "files/urldown",
                        data: { fileName: cc },
                        // data: { fileName: "1581081670060.png" },
                        success: function (data) {
                            window.location.href = data
                        }
                    });
                })
            }
        }
        if (listOne != null & listOne != "") {
            isfile(listOne.hiApplyFile, $("#torf1"), $("#torf01"))
        }
        if (listTwo != null & listTwo != "") {
            isfile(listTwo.hiApplyFile, $("#torf2"), $("#torf02"))
        }
        if (listThree != null & listThree != "") {
            isfile(listThree.hiApplyFile, $("#torf3"), $("#torf03"))

        }


    })
