<?php
error_log("[Brindis][SendEmail] START");
    $response=array();
    $user_subject="Elbrindisdelaño: ".$_POST["name"];

     $user_content="";
     $user_content.="
      <h3 class=''>Invitación</h3>
      <h4 class=''>".$_POST["name"]."</h3>
      <p class=''>".$_POST["comments"]."</p>
     ";

     $mail_header="MIME-Version: 1.0\r\nContent-type: text/html\r\nFrom: no-reply@elbrindiselaño.com";

     mail("pablo@citious.com",$user_subject,$user_content,$mail_header);
    error_log("[Brindis][SendEmail] Email sent (pablo@citious.com)");
$response["result"]=true;
     echo json_encode($response);
error_log("[Brindis][SendEmail] END");

    die();

?>