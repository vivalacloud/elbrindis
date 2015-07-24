var $_CONFIG= new Array();

$_CONFIG["company_phone"] = "+34 886 131 361";
$_CONFIG["company_info_mail"] = "info@citious.com";
$_CONFIG["debug_mode"] = true;
$_CONFIG["restricted_page"] = false;

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-60745698-1', 'auto');
  ga('send', 'pageview');

check_session();

function session_destroy(){
  localStorage.removeItem('session_key');
}

function logout(){
  session_destroy();
  window.location.href = $_PATH+"access/login/";
}

function check_session(){
  var $_SESSION= new Array();
  if ((typeof localStorage.session_key == 'undefined')||(localStorage.session_key == null)||(localStorage.session_key == "null")){
    $.ajax({
      type: "POST",
      dataType: 'json',
      url: "http://ip-api.com/json",
      error: function(data, textStatus, jqXHR) {
        $_SESSION["country"]="";
        $_SESSION["countryCode"]="";
        $_SESSION["region"]="";
        $_SESSION["regionName"]="";
        $_SESSION["city"]="";
        $_SESSION["zip"]="";
        $_SESSION["lat"]="";
        $_SESSION["lon"]="";
        $_SESSION["isp"]="";
      },
      success: function(response) {
        if(response.status=="success"){
          $_SESSION["country"]=response.country;
          $_SESSION["countryCode"]=response.countryCode;
          $_SESSION["region"]=response.region;
          $_SESSION["regionName"]=response.regionName;
          $_SESSION["city"]=response.city;
          $_SESSION["zip"]=response.zip;
          $_SESSION["lat"]=response.lat;
          $_SESSION["lon"]=response.lon;
          $_SESSION["isp"]=response.isp;
        }else{
          $_SESSION["country"]="";
          $_SESSION["countryCode"]="";
          $_SESSION["region"]="";
          $_SESSION["regionName"]="";
          $_SESSION["city"]="";
          $_SESSION["zip"]="";
          $_SESSION["lat"]="";
          $_SESSION["lon"]="";
          $_SESSION["isp"]="";
        }
      },
      complete: function(){
        $.ajax({
          type: "POST",
          dataType: 'json',
          url: "http://localhost:8888/citious/server/1.1/plugins/citious/models/model.php",
          data: {
            "action":"add_session",
            "title":document.title,
            "URL":document.URL,
            "referrer":document.referrer,
            "appName":navigator.appName,
            "userAgent":navigator.userAgent,
            "cookieEnabled":navigator.cookieEnabled,
            "language":navigator.language,
            "platform":navigator.platform,
            "colorDepth":screen.colorDepth,
            "height":screen.height,
            "width":screen.width,
            "innerHeight":window.innerHeight,
            "innerWidth":window.innerWidth,
            "country":$_SESSION["country"],
            "countryCode":$_SESSION["countryCode"],
            "region":$_SESSION["region"],
            "regionName":$_SESSION["regionName"],
            "city":$_SESSION["city"],
            "zip":$_SESSION["zip"],
            "lat":$_SESSION["lat"],
            "lon":$_SESSION["lon"],
            "isp":$_SESSION["isp"]
          },
          error: function(data, textStatus, jqXHR) {

          },
          success: function(response) {
            if(response.result){
              localStorage.session_key=response.data.session_key;
              $_SESSION["session_key"]=response.data.session_key;
            }else{

            }
          }
        });
      }
    });
  }else{
    $_SESSION["session_key"]=localStorage.session_key;
    $.ajax({
      type: "POST",
      dataType: 'json',
      url: "http://localhost:8888/citious/server/1.1/plugins/citious/models/model.php",
      data: {
        "action":"check_session",
        "session_key":$_SESSION["session_key"],
        "title":document.title,
        "URL":document.URL,
        "referrer":document.referrer
      },
      error: function(data, textStatus, jqXHR) {

      },
      success: function(response) {
        if(response.result){

        }else{
          localStorage.session_key=null;
          $_SESSION["session_key"]=localStorage.session_key;
          check_session();
        }
      }
    });
  }

}



function debugLog($_message){

  if($_CONFIG["debug_mode"]){
    $.ajax({
      type: "POST",
      dataType: 'json',
      url: "http://localhost:8888/citious/server/1.1/plugins/citious/models/model.php",
      data: {
        "action":"javascript_debug_log",
        "message":$_message
      },
      error: function(data, textStatus, jqXHR) {
      },
      success: function(response) {
      }
    });
    console.error("["+$_PAGE+"] "+$_message);
  }

}

function include($_script) {
  $.ajax({
    url: $_script,
    dataType: "script",
    async: false,
    success: function () {
    },
    error: function () {
    }
  });
}


function time() {
  return Math.floor(new Date()
    .getTime() / 1000);
}

function timestampToStr($_timestamp){

  $_from_now = time() - $_timestamp;
  if ($_from_now < 1){
    return '0 seconds';
  }

  $_s["pre_time_str"] = "Hace";
  $_s["post_time_str"] = "";
  $_timestamp_to_str ="Ahora";

  $_d = $_from_now / (60);
  if ($_d >= 1){
    $_timestamp_to_str=$_s["pre_time_str"];
    $_r = Math.round($_d);
    $_timestamp_to_str+=" "+$_r;
    if($_r > 1){
      $_timestamp_to_str+=" segundos";
    }else{
      $_timestamp_to_str+=" segundo";
    }
  }

  $_d = $_from_now / (60*60);
  if ($_d >= 1){
    $_timestamp_to_str=$_s["pre_time_str"];
    $_r = Math.round($_d);
    $_timestamp_to_str+=" "+$_r;
    if($_r > 1){
      $_timestamp_to_str+=" minutos";
    }else{
      $_timestamp_to_str+=" minuto";
    }
  }

  $_d = $_from_now / (24 * 60 * 60);
  if ($_d >= 1){
    $_timestamp_to_str=$_s["pre_time_str"];
    $_r = Math.round($_d);
    $_timestamp_to_str+=" "+$_r;
    if($_r > 1){
      $_timestamp_to_str+=" días";
    }else{
      $_timestamp_to_str+=" día";
    }
  }

  $_d = $_from_now / (30*24*60*60);
  if ($_d >= 1){
    $_timestamp_to_str=$_s["pre_time_str"];
    $_r = Math.round($_d);
    $_timestamp_to_str+=" "+$_r;
    if($_r > 1){
      $_timestamp_to_str+=" meses";
    }else{
      $_timestamp_to_str+=" mes";
    }
  }

  $_d = $_from_now / (365*24*60*60);

  if ($_d >= 1){
    $_timestamp_to_str=$_s["pre_time_str"];
    $_r = Math.round($_d);
    $_timestamp_to_str+=" "+$_r;
    if($_r > 1){
      $_timestamp_to_str+=" años";
    }else{
      $_timestamp_to_str+=" año";
    }
  }

  return $_timestamp_to_str;

}
