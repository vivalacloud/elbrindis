<?php

  error_log("[Brindis][SendEmail] START");
  $response=array();
  $user_subject="Elbrindisdelaño: ".$_POST["name"];

  $user_content="";
  $user_content.="<h3 class=''>".$_POST["name"]."</h3>
    <h4 class=''>".$_POST["email"]."</h4>
    <p class=''>".$_POST["comments"]."</p>";

  $mail_header="MIME-Version: 1.0\r\nContent-type: text/html\r\nFrom: no-reply@xn--elbrindisdelao-2nb.com";
  error_log($user_content);

  mail("bustibri@gmail.com",$user_subject,$user_content,$mail_header);
  //mail("pablo@citious.com",$user_subject,$user_content,$mail_header);
  error_log("[Brindis][SendEmail] Email sent (bustibri@gmail.com)");
  mail($_POST["email"],$user_subject,$user_content,$mail_header);
  error_log("[Brindis][SendEmail] Email sent (".$_POST["email"].")");
  $response["result"]=true;
  echo json_encode($response);
  error_log("[Brindis][SendEmail] END");
  die();

?>
