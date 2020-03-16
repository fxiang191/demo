document.writeln("		<div class=\"myDaohanglan\">");
document.writeln("			<div>");
document.writeln("			    <ul>");
document.writeln("					<a id=\"myLixuan01\" class=\"myAclass\" href=\"\"><li class=\"navClass myLiClass li active\">企业报名</li></a>");
document.writeln("					<a id=\"myLixuan02\" class=\"myAclass\" href=\"\"><li class=\"navClass myLiClass li\">企业自评估</li></a>");
document.writeln("					<a id=\"myLixuan03\" class=\"myAclass\" href=\"\"><li class=\"navClass myLiClass li\">职能部门推荐/遴选</li></a>");
// document.writeln("					<li class=\"navClass myLiClass li\"><a class=\"myAclass\" href=\"\">在线诊断服务</a></li>");
// document.writeln("					<li class=\"navClass myLiClass li\"><a class=\"myAclass\" href=\"\">查看诊断报告</a></li>");
document.writeln("					<li class=\"myLiClass\"><div><img class=\"imgClass\" ><span class='username'></span></div><div class='logout' style='cursor: pointer;'>退出登录</div></li>");
document.writeln("				</ul>");
document.writeln("			</div>");
document.writeln("		</div>");

// 图片路径判定加载 
$('.imgClass').each(function(){
    var query = window.location.pathname.split("/");
        query.splice(0,1);
    if(query.length == 2){
        $(this).attr('src','../images/Industrial/touxiang.png')
    }else{
        $(this).attr('src','../../images/Industrial/touxiang.png')
    }
})
// 导航栏判定选中
$(".li").each(function () {
  $('.active').removeClass('active')
  $('.li').eq(getUrlParams('nav')).addClass('active')
})
// $(".li").click(function () {
  // console.log($(this).index())
//   nav = $(this).index()
  // ajax
// })

$.ajax({
    type : 'get',
    url : ajaxUrl + "apply/main",
    dataType: 'json',
    xhrFields: {
    withCredentials: true
    },
    crossDomain: true,
    success : function(res) {
        console.log(res)
        var query = window.location.pathname.split("/");
        query.splice(0,1);
        if (res.code == 200) {
          if(query.length == 2){
            
            if(res.auth == 0){
              // if( res.data.length > 0){
              //   $('#myLixuan02').attr('href','./qiyeTishi.html?nav=1')
              // }else{
              // }
              //  企业报名完成状态
              $('#myLixuan01').attr('href','./enterpriseInformation.html?nav=0')
              $('#myLixuan02').attr('href','./xuanzeShijuan.html?nav=1')
              $('#myLixuan03').attr('href','./companyApprovalResult/approvalResult.html?nav=2')
            } else if ( res.auth == 1 ){
              //  企业报名未完成状态
              $('#myLixuan01').attr('href','./enroll.html?nav=0')
              $('#myLixuan02').attr('href','./sorryTips.html?nav=1')
              $('#myLixuan03').attr('href','./companyApprovalResult/approvalResult.html?nav=2')
            }else if( res.auth == 2 ){
              //  企业报名完成状态 , 试卷完成
              $('#myLixuan01').attr('href','./enterpriseInformation.html?nav=0')
              $('#myLixuan02').attr('href','./zipingWeikaishi.html?nav=1')
              $('#myLixuan03').attr('href','./companyApprovalResult/approvalResult.html?nav=2')
            }else{
              //  其他状态 , 
              $('#myLixuan01').attr('href','./enterpriseInformation.html?nav=0')
              $('#myLixuan02').attr('href','./zipingWeikaishi.html?nav=1')
              $('#myLixuan03').attr('href','./companyApprovalResult/approvalResult.html?nav=2')
            }

          }else {

          if(res.auth == 0){
            // if( res.data.length > 0){
            //   $('#myLixuan02').attr('href','./qiyeTishi.html?nav=1')
            // }else{
            // }
              //  企业报名完成状态
            $('#myLixuan01').attr('href','../enterpriseInformation.html?nav=0')
            $('#myLixuan02').attr('href','../xuanzeShijuan.html?nav=1')
            $('#myLixuan03').attr('href','./approvalResult.html?nav=2')
          } else if ( res.auth == 1 ){
            //  企业报名未完成状态
            $('#myLixuan01').attr('href','../enroll.html?nav=0')
            $('#myLixuan02').attr('href','../sorryTips.html?nav=1')
            $('#myLixuan03').attr('href','./approvalResult.html?nav=2')
          }else if( res.auth == 2 ){
            //  企业报名完成状态 , 试卷完成
            $('#myLixuan01').attr('href','../enterpriseInformation.html?nav=0')
            $('#myLixuan02').attr('href','../zipingWeikaishi.html?nav=1')
            $('#myLixuan03').attr('href','./approvalResult.html?nav=2')
          }else{
            //  其他状态 , 
            $('#myLixuan01').attr('href','../enterpriseInformation.html?nav=0')
            $('#myLixuan02').attr('href','../zipingWeikaishi.html?nav=1')
            $('#myLixuan03').attr('href','./approvalResult.html?nav=2')
          }
        }
      }else if(res.code == 5001001 ){
        if(query.length == 2){
            alert('登录过期请您重新登录')
            window.open('./jqLogin.html','_self')
        }else{
          alert('登录过期请您重新登录')
          window.open('../jqLogin.html','_self')
        }
      } 
    },
      error : function(err) {
              alert("请求失败");
      }
})


// 用户名
// console.log(sessionStorage.getItem('username'))
if( sessionStorage.getItem('username').length > 9 ){
  var username = sessionStorage.getItem('username').substring(0,9)+'...'
  $('.username').html(username)
} else {
  $('.username').html( sessionStorage.getItem('username') )
}
$('.username').attr('title',sessionStorage.getItem('username'))
// 退出登陆
$('.logout').click(function () {
    $.ajax({
        type : 'get',
        url : ajaxUrl + "auth/logout?type=0",
        dataType: 'json',
        xhrFields: {
        withCredentials: true
        },
        crossDomain: true,
        success : function(res) {
            if (res.code == 200) {
                // layer.msg('正在退出，请稍后...');
                setTimeout(function () {
                    // 退出到登陆页
                    sessionStorage.removeItem('username')
                    var query = window.location.pathname.split("/");
                    query.splice(0,1);
                    if(query.length == 2){
                      window.location.href = './jqLogin.html'
                  }else{
                        window.location.href = '../jqLogin.html'
                    }
                }, 1000)
            } else {
                alert('请求错误');
            }
        },
        error : function(err) {
            alert('请求错误');
        }
    })
})
