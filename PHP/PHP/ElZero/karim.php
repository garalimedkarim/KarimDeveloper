<!DOCTYPE HTML>
<html>
    <head>
        <title>Example</title>
    </head>
    <body>

        <?php
            echo "Hi, I'm a PHP script! <br>";
            echo "<br>";
            echo "<br>";

            echo $_SERVER['HTTP_USER_AGENT'];
            echo "<br>";
            echo "<br>";

            print_r($_SERVER);
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
