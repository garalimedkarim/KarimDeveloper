<!DOCTYPE HTML>
<html>
    <head>
        <title>Example</title>
    </head>
    <body>

        <?php
            echo htmlspecialchars("<strong>Karim</strong><br>");
            echo "<br>";
            echo "<br>";

            echo $_SERVER['HTTP_USER_AGENT'];
            echo "<br>";
            echo "<br>";

            print_r($_SERVER);
            echo "<br>";
            echo "<br>";            
            print_r($_REQUEST);
            //mkdir("TestFolder");
            echo "<br>";
            echo "<br>";

            echo __FILE__; 

            echo "<br>";
            echo "<br>";

            echo dirname(__FILE__);
            
        ?>

    </body>
</html>
