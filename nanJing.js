// 基础路径
var basePath = 'http://172.16.40.37:9101/cms';
// 本地环境
// var basePath = 'http://localhost:8090/cms';
// 测试环境
// var basePath = 'http://139.9.172.71:9102/cms';
// 分页器 参数
var pageLimit = 20;

// 下拉函数 type判断加载不同ul片段
function a(data, type) {
    // debugger
    var html01 = ''
    if(type === 1){
        for (let i=0;i<data.length;i++) {
            html01 += `<li><a href="./Industry.html?${data[i].id}">${data[i].name}</a></li>`
        }
        $('#myUl01').append(html01);

    }else if (type === 2){
        for (let i=0;i<data.length;i++) {
            if(i < 4 ){                
                html01 += `<li class="switchNav myLi01"  myIndex="${data[i].id}"><a href="javascript:;">${data[i].name}</a></li>`
            }
        }
        $('#myUl02').append(html01);
            $('.myLi01').eq(0).addClass("active")
        $('.myLi01').click(function(){
            $(this).addClass("active").siblings().removeClass("active")
            $('#myUl04').empty()
            nanJing02(1,5,1,$(this).attr('myIndex'),1)
                var id=$(this).attr('myIndex');
                $('#myA').attr('href',`./Industry.html?${id}`)
            })
    }else if(type===3){
        for (let i=0;i<data.length;i++) {
            html01 += `<li class="njTitle activeClass myLi01"  myIndex="${data[i].id}"><span class="njSpan">${data[i].name}</span></li>`
        }
        $('#myUl02').append(html01);
        $('.myLi01').each(function (index,value) {
            var id=$(this).attr('myIndex');
            // console.log(id+'.......'+window.location.href.split('?')[1])
            if( id == window.location.href.split('?')[1]){
                $(this).addClass("activeClass").siblings().removeClass("activeClass") 
            }
        })

        // $('.myLi01').eq(0).addClass("activeClass")
        $('.myLi01').click(function(){
            // $('#myUl03').empty();
            $('#gengDuo').attr( "myType", $(this).attr('myIndex'))
            $('#gengDuo').attr( "myPage", 1)
            $('#gengDuo').attr( "myStart", 1)
            // type = $(this).attr('myIndex')
            // window.location.href = window.location.href.split('?')[0] +'?'+ $(this).attr('myIndex')
            $(this).addClass("activeClass").siblings().removeClass("activeClass")
            $('#myUl03').empty();
            nanJing02(1,10,1,$(this).attr('myIndex'))
        })
    }else if (type === 4){
        for (let i=0;i<data.length;i++) {
            html01 += `<li><a href="./Industry.html?${data[i].id}">${data[i].name}</a></li>`
        }
        $('#myUl001').append(html01);
    }
}


// 下拉请求 type判断加载不同的片段
function nanJing01(callback){
    // debugger
    let url = `${basePath}/news/news_category/white.do`;
    $.support.cors=true;
    $.ajax({
        type:'GET',
        url:url,
        dataType : "jsonp",
        jsonp:"callback",
        jsonpCallback:"success_jsonpCallback",
        success: function(data){
            console.log
            callback(data);
        },
        error:function(exception){
            alert('您请求的页面跑丢了，请重试！');
        }
    })
}

// 详情列表请求  type01判断加载新闻不同的详情片段
function nanJing02(page,limit,start,myType,type01){
    // debugger
    let url = `${basePath}/news/news_news/white.do`;
    // debugger
    $.ajax({
        data:{page:page,limit:limit,start:start,type:myType},
        type:'GET',
        url:url,
        dataType : "jsonp",
        jsonp:"callback",
        jsonpCallback:"success_jsonpCallback",
        success: function(data){
            // debugger 
            console.log(data)
            var html = ''
            var html01 = ''
            if(data.data.length == 0){
                // $('#myUl03').empty();
                html += `<li style="text-align: center;margin-top:30px">无更多数据...</li>`
                $('#myUl03').append(html);
                $('#myUl04').append(html);
                $('#gengDuo').hide();

            }else{
                // $('#myUl03').empty();
                $('#gengDuo').show()
                if( type01 === 1 ) {            
                            for (let i=0;i<data.data.length;i++) {
                                html+= `<li>
                                            <p>
                                                <a class="myA01" maxWidth="${data.data[i].title.length}" href="IndustryDetails.html?${data.data[i].id}" target="_self">
                                                    <i></i>${data.data[i].title.substring(0,50)}
                                                </a>
                                                <span id="mySpan01">${data.data[i].updateTimeStr.substring(0,10)}</span>
                                            </p>
                                        </li>`
                            }
                            $('#myUl04').append(html);
                            $(".myA01").each(function(index,value){
                                var maxwidth = $(this).attr('maxWidth');
                                // console.log(maxwidth)
                                // console.log($(".myA01").html())
                                if(maxwidth>50){
                                    $(this).html($(this).html()+'...');
                                }
                            })                        
                    } else{
                        // debugger
                        // console.log(data.data)
                        for (let i=0;i<data.data.length;i++) {
                            html += `<a href="IndustryDetails.html?${data.data[i].id}" style="color: #000;">
                                        <li class="njLi01">
                                            <div class="njLi02">
                                                <div class="njLi03">
                                                    <img src="${data.data[i].image}">
                                                </div>
                                                <div class="njLi04">
                                                    <p>${data.data[i].title}</p>
                                                    <p>${data.data[i].updateTimeStr.substring(0,10)}</p>
                                                    <p>${data.data[i].introduce}</p>
                                                </div>
                                            </div>
                                            <hr class="njH02">
                                        </li>
                                    </a>`
                        }
                        $('#myUl03').append(html);
                    }
                        if(data.data.length > 0 && data.data.length < 10){
                            html01 += `<li style="text-align: center;margin-top:30px">已经到底啦....</li>`;
                            $('#gengDuo').hide();
                            $('#myUl03').append(html01);
                        }                    
                }
            },
        error:function(exception){
            alert('您请求的页面跑丢了，请重试！');
        }
    })
}

// 企业详情请求
function nanJing03(){
    var myId = window.location.href.split('?')[1]
    let url = `${basePath}/news/news_detail/white.do?id=${myId}`;
    $.ajax({
        type:'GET',
        url:url,
        dataType : "jsonp",
        jsonp:"callback",
        jsonpCallback:"success_jsonpCallback",
        success: function(data){
            // debugger
            console.log(data)
            if(data.type){
                switch(data.type) {
                    case "1":
                    $('.myClass03').html('行业新闻')
                    $('.myClass03').attr('href',"./Industry.html?1")
                       break;
                    case "2":
                    $('.myClass03').html('专家视点')   
                    $('.myClass03').attr('href',"./Industry.html?2")   
                       break;
                   case "3":
                    $('.myClass03').html('行业新闻')
                    $('.myClass03').attr('href',"./Industry.html?3")
                       break;
                   case "4":
                    $('.myClass03').html('行业新闻')
                    $('.myClass03').attr('href',"./Industry.html?4")
                       break;
               } 
            }else{
                $('.myClass03').html('行业新闻')
            }
            $('#myDiv01').append(`
            <div class="myTitle">
            <p class="myText">${data.title}</p>
       
            <p class="myText01">发布时间：${data.updateTimeStr}</p>
        
            </div>${data.content}`);
            // debugger
            if(data.prev){
                $('#topNews').html(data.prev.title)
                $('#topNews').attr('href',`./IndustryDetails.html?${data.prev.id}`)
            }else{
                $('#mySpan01').hide()
            }
            if(data.next){
                $('#nextNews').html(data.next.title)
                $('#nextNews').attr('href',`./IndustryDetails.html?${data.next.id}`)
            }else{
                $('#mySpan02').hide()
            }
        },
        error:function(exception){
            alert('您请求的页面跑丢了，请重试！');
        }
    })
}

// 地域分类 行业分类 请求
function nanJing04(){
    let url = `${basePath}/enterprise/eehClassArea/white.do`
    $.ajax({
        type:'GET',
        url:url,
        dataType : "jsonp",
        jsonp:"callback",
        jsonpCallback:"success_jsonpCallback",
        success: function(data){  
            // console.log(data)
            var html = ''
            var html1 = ''
            for (let i=0;i<data.areaList.length;i++) {
                html += `<li class="switchNav myLi01" myIndex="${data.areaList[i].aorder}"><a href="javascript:;">${data.areaList[i].area_name}</a></li>`
            }
            $('#myUl01').append(html);
            $('.myLi01').eq(0).addClass("active")
            $('.myLi01').click(function(){
                var id=$(this).attr('myIndex')
                $('#myA').attr('href',`enterprise.html?areaId=${id}`)
                $(this).addClass("active").siblings().removeClass("active")
                // $('#myUl03').empty()
                $('#myUl03 li:last-child').siblings().remove();
                nanJing05(1,7,$(this).attr('myIndex'))
            })
            for (let i=0;i<data.industryClassList.length;i++) {
                html1 += `<li class="switchNav myLi02"  myIndex="${data.industryClassList[i].class_id}"><a href="javascript:;">${data.industryClassList[i].class_name}</a></li>`
            }
            $('#myUl02').append(html1);
            $('.myLi02').eq(0).addClass("active")
            $('.myLi02').click(function(){
                var id=$(this).attr('myIndex')
                $(this).addClass("active").siblings().removeClass("active")
                $('#myA01').attr('href',`enterprise.html?classId=${id}`)
                // $('#myUl04').empty()
                $('#myUl04 li:last-child').siblings().remove();
                nanJing06(1,7,$(this).attr('myIndex'))
            })
        
        },
        error:function(exception){
            alert('您请求的页面跑丢了，请重试！');
        }
    })
}
// 地域列表 接口
function nanJing05(page,limit,areaId){
    // debugger
    let url = `${basePath}/enterprise/eehList/white.do`
    $.ajax({
        data:{page:page,limit:limit,areaId:areaId},
        type:'GET',
        url:url,
        dataType : "jsonp",
        jsonp:"callback",
        jsonpCallback:"success_jsonpCallback",
        success: function(data){  
            // console.log(data)
            var html01 = ''
            if(data.data.length === 0){
                // $('#myUl03 li:last-child').hide();
                // html01 += `<li style="margin-left: 50%;">没有更多数据了</li>`
                // $('#myUl03').prepend(html01);

            }else{
            $('#myUl03 li:last-child').show();
            for(let i=0;i<data.data.length;i++){
                html01 +=`<li>
                            <a href="http://www.jstongmeng.com/" target="_blank">
                                <div class="box_zhanting">
                                    <div class="img_zhanting"><img src="${basePath}${data.data[i].productPic}"></div>
                                    <div class="info_zhanting">
                                        <p class="tit_zhanting">${data.data[i].name}</p>
                                        <p class="ms_zhanting">${data.data[i].mainBusiness}</p>
                                    </div>
                                    <div class="logo_zhanting nanJingDiv"><img class="nanJingImg" src="${basePath}${data.data[i].logo}"></div>
                                </div>
                            </a>
                        </li>`
            }
                $('#myUl03').prepend(html01);
            }
        },
        error:function(exception){
            alert('您请求的页面跑丢了，请重试！');
        }
    })
}
// 行业列表 接口
function nanJing06(page,limit,classId){
    let url = `${basePath}/enterprise/eehList/white.do`
    $.ajax({
        data:{page:page,limit:limit,classId:classId},
        type:'GET',
        url:url,
        dataType : "jsonp",
        jsonp:"callback",
        jsonpCallback:"success_jsonpCallback",
        success: function(data){  
            // console.log(data)
            var html01 = '' 
            if(data.data.length == 0){
                // $('#myUl04 li:last-child').hide();
                // html01 += `<li style="margin-left: 50%;">没有更多数据了</li>`
                // $('#myUl04').prepend(html01);
            }else{
                $('#myUl04 li:last-child').show();
            for(let i=0;i<data.data.length;i++){
                html01 += `<li>
                            <a href="http://www.nongji1688.com/com/jsym/" target="_blank">
                                <div class="box_zhanting">
                                    <div class="img_zhanting"><img src="${basePath}${data.data[i].productPic}"></div>
                                    <div class="info_zhanting">
                                        <p class="tit_zhanting">${data.data[i].name}</p>
                                        <p class="ms_zhanting">${data.data[i].mainBusiness}</p>
                                    </div>
                                    <div class="logo_zhanting nanJingDiv"><img class="nanJingImg" src="${basePath}${data.data[i].logo}"></div>
                                </div>
                            </a>
                        </li>`
            }
                $('#myUl04').prepend(html01);
            }
        },
        error:function(exception){
            alert('您请求的页面跑丢了，请重试！');
        }
    })
}

// 企业展厅列表
/**
 * 地域分类 行业分类 请求
 */
function eehClassArea() {
    let url = basePath + '/enterprise/eehClassArea/white.do'
    $.ajax({
        type: 'GET',
        url: url,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "success_jsonpCallback",
        success: function (data) {
            let areaList = data.areaList;
            let divAreaObj = $("div.areaList");
            let spanobj = $('<span class="span_area_item span_active_item">全部</span>');
            spanobj.data("id_value", "");
            divAreaObj.append(spanobj)
            for (let i = 0; i < areaList.length; i++) {
                spanobj = $('<span class="span_area_item">' + areaList[i]['area_name'] + '</span>');
                spanobj.data("id_value", areaList[i]['id']);
                divAreaObj.append(spanobj)
            }
            let ic = data.industryClassList;
            let divIcObj = $("div.industryClassList");
            spanobj = $('<span class="span_ic_item span_active_item">全部</span>');
            spanobj.data("id_value", "");
            divIcObj.append(spanobj)
            for (let i = 0; i < ic.length; i++) {
                spanobj = $('<span class="span_ic_item">' + ic[i]['class_name'] + '</span>');
                spanobj.data("id_value", ic[i]['class_id']);
                divIcObj.append(spanobj)
            }

            /**
             * 搜索按钮
             */
            $("#search").click(function () {
                getEnterpriseList(1, pageLimit);
            });

            /**
             * 首次进入页面时 地区，行业分类选择状态
             */
            initAreaClassSelectStatus();

            /*
             * 点击地域分类 行业分类时
             * - 改变选择状态
             * - 刷新企业列表数据
             */
            $("span[class$='_item']").click(function () {
                var thisobj = $(this);
                // 改变选择样式
                thisobj.siblings().removeClass("span_active_item");
                thisobj.addClass("span_active_item");
                // selectAreaClass(thisobj, thisobj.data('id_value'));

                // 获取企业列表信息
                getEnterpriseList(1, pageLimit);
            });

            getEnterpriseList(1, pageLimit);
        },
        error: function (exception) {
            alert('调用失败！异常状态文本：' + exception.statusText);
        }
    })
}

/**
 * 选择地域分类 行业分类
 * @param spanobj
 * @param selval
 */
function selectAreaClass(spanobj, selval) {
    let siblings = spanobj.siblings();
    siblings.removeClass("span_active_item");
    for (var i = 0; i < siblings.length; i++) {
        let s = $(siblings[i]);
        if (s.data('id_value') == selval) {
            s.addClass("span_active_item");
        }
    }
}

/**
 * 获取企业列表信息
 */
function getEnterpriseList(page, limit, pageInner) {
    let areaId = $(".areaList .span_active_item").data('id_value');
    let icId = $(".industryClassList .span_active_item").data('id_value');
    let name = $.trim($("#name").val());
    let url = basePath + '/enterprise/eehList/white.do'
    $.ajax({
        type: 'GET',
        url: url,
        data: {
            page: page,
            limit: limit,
            classId: icId,
            areaId: areaId,
            name: name
        },
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "success_jsonpCallback",
        success: function (data) {
            let eehs = data.data;
            $("#not_found_data").hide();
            if (data.count == 0) {  // 暂无数据
                $("#not_found_data").show();
                $(".cont_zhanting").hide();
                $("#page_div").hide();
                return;
            }
            $(".cont_zhanting").show();
            $("#page_div").show();

            /**
             * 遍历企业数据
             */
            let pageContainerHtml = '';
            for (let i = 0; i < eehs.length; i++) {
                pageContainerHtml +=
                    '<li>' +
                    ' <a href="' + eehs[i]['linkAddress'] + '" target="_blank">' +
                    '  <div class="box_zhanting">' +
                    '   <div class="img_zhanting"><img src="' + basePath + eehs[i]['productPic'] + '"></div>' +
                    '    <div class="info_zhanting">' +
                    '    <p class="tit_zhanting">' + eehs[i]['name'] + '</p>' +
                    '    <p class="ms_zhanting">' + eehs[i]['mainBusiness'] + '</p>' +
                    '   </div>' +
                    '   <div class="logo_zhanting imgDivClass"><img class="imgClass" src="' + basePath + eehs[i]['logo'] + '"></div>' +
                    '  </div>' +
                    ' </a>' +
                    '</li>';
            }
            $("#eehLis").html(pageContainerHtml);
            if (!pageInner) {
                initPagination(page, limit, data.count);
            }
        },
        error: function (exception) {
            alert('调用失败！异常状态文本：' + exception.statusText);
        }
    })
}

/**
 * 初始化分页插件
 */
function initPagination(page, limit, pageSize) {
    new CustomPagination('#page', {
        total: getTotalSize(limit, pageSize),//总页数
        changePage: function (pageNum) { // 切换页码成功回调
            getEnterpriseList(pageNum, limit, true);
        },
        next_prev_links: 'yes',//是否开启[上一页/下一页]
        inupt_forward: 'yes',//是否开启[输入跳转]
        count: 6 //显示的页码个数，多余页码会用...代替
    });
}

/**
 * 获取总页数
 * limit 每页大小
 * totalnum 总记录数
 */
function getTotalSize(limit, totalnum) {
    return totalnum > 0 ? ((totalnum < limit) ? 1 : ((totalnum % limit) ? (parseInt(totalnum / limit) + 1) : (totalnum / limit))) : 0;
}

/**
 * 首次进入页面时 地区，行业分类选择状态
 */
function initAreaClassSelectStatus() {
    let params = getQueryObject(window.location.href);
    // 名称
    $("#name").val($.trim(params.name));
    $("span.span_area_item").removeClass('span_active_item');
    $("span.span_area_item").each(function () {
        let that = $(this);
        if ($.trim(that.data('id_value')) == $.trim(params.areaId)) {
            that.addClass('span_active_item');
        }
    });

    $("span.span_ic_item").removeClass('span_active_item');
    $("span.span_ic_item").each(function () {
        let that = $(this);
        if ($.trim(that.data('id_value')) == $.trim(params.classId)) {
            that.addClass('span_active_item');
        }
    });
}

/**
 * 获取请求参数
 * @param url 当前地址
 */
function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    var search = url.substring(url.lastIndexOf("?") + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, function (rs, $1, $2) {
        var name = decodeURIComponent($1);
        var val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
    });
    return obj;
}
