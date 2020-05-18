
const PLAYER_TOKEN = 'X' 
const COMPUTER_TOKEN = 'O'

$(document).ready(function(){
    const grid = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    you = 0;
    comp = 0;
    comp_played = true;

    function isGameOver(){
        // Check horizontal -
        for (var i = 0; i < 8; i+=3){ //for wins
            if (grid[i] !== ' ' && 
                grid[i] == grid [i+1] && 
                grid[i] == grid [i+2]){
                    $('.col[id=' + i + ']').css("background-color", "#b8f1a9").fadeIn();
                    $('.col[id=' + (i+1) + ']').css("background-color", "#b8f1a9").fadeIn();
                    $('.col[id=' + (i+2) + ']').css("background-color", "#b8f1a9").fadeIn();
                    return grid[i];
            }
        }
        // Check vertical |
        for (var i = 0; i < 3; i++){ //for wins
            if (grid[i] !== ' ' && 
                grid[i] == grid [i+3] && 
                grid[i] == grid [i+6]){
                    $('.col[id=' + i + ']').css("background-color", "#b8f1a9").fadeIn();
                    $('.col[id=' + (i+3) + ']').css("background-color", "#b8f1a9").fadeIn();
                    $('.col[id=' + (i+6) + ']').css("background-color", "#b8f1a9").fadeIn();
                    return grid[i];
            }
        }
        // Check Diagonal \
        if (grid[0] !== ' ' && 
            grid[0] == grid [4] && 
            grid[0] == grid [8]){
                $('.col[id=' + 0 + ']').css("background-color", "#b8f1a9").fadeIn();
                $('.col[id=' + 4 + ']').css("background-color", "#b8f1a9").fadeIn();
                $('.col[id=' + 8 + ']').css("background-color", "#b8f1a9").fadeIn();
                return grid[0];
        }
        // Check Diagonal  /
        if (grid[2] !== ' ' && 
            grid[2] == grid [4] && 
            grid[2] == grid [6]){
                $('.col[id=' + 2+ ']').css("background-color", "#b8f1a9").fadeIn();
                $('.col[id=' + 4 + ']').css("background-color", "#b8f1a9").fadeIn();
                $('.col[id=' + 6 + ']').css("background-color", "#b8f1a9").fadeIn();
                return grid[2];
        }

        // Check if there's anymore empty space
        var empty = "tie";
        for (var k = 0; k < 9; k++){ 
            if (grid[k]==' '){
                empty = false;
            }
        }
        return empty;
    }

    // Computer's turn to play
    function compMove(){
        var emptySpace = [];
        for (var i = 0; i < 9; i++){
            if(grid[i]==' '){
                emptySpace.push(i);
            }
        }
        // Picking a random number from list of empty spaces
        num = Math.floor(Math.random() * emptySpace.length)
        return (emptySpace[num]);
    }


    // Hovering, will turn red if invalid play
    $('.col').mouseenter(function(e){
        const i = e.target.id;
        if (grid[i] !== ' ' & !isGameOver){ //if cell is already occupied
        $(this).css("background-color", "rgb(253, 216, 216)").fadeIn();
        }
    });

    $('.col').mouseout(function(e){
        const i = e.target.id;
        if (grid[i] !== ' ' & !isGameOver){
            $(this).css("background-color", "#f4f4f4").fadeIn();
        }
    });


    // When player clicks on a cell
    $('.col').click(function(e){
 
        const i = e.target.id;
        // Check if cell is occupied
        if (comp_played == false){
            alert('Not your turn!')
            return;
        }
        else if (grid[i] !== ' '){
            alert('Invalid. Try again!')
            return;
        }
        // Add token to cell
        $(this).hide().html(PLAYER_TOKEN).fadeIn(); // prints the X
        grid[i] = PLAYER_TOKEN;
        comp_played = false;

        // If the game is not over
        if (!isGameOver()){
            spot = compMove();
            grid[spot]=COMPUTER_TOKEN;

            setTimeout(function(){
                $('.col[id=' + spot + ']').hide().html(COMPUTER_TOKEN).fadeIn();
                comp_played = true;
            },500);
        } 

        // If the game is over
        if (isGameOver()){
            // Tie
            if (isGameOver()=='tie'){ 
                $('#messageT').fadeIn();
            }
            // Player Wins
            else if (isGameOver()=='X'){ 
                you++;
                $('#messageW').fadeIn(); 
            } 
            // Computer Wins
            else {
                comp++;
                $('#messageL').fadeIn();
            }
            $('#score').html("You: " + you + "<br>Computer: " + comp);
        }
    });

    $('#restart').click(function(){
        // Clearing the grid
        for (var i = 0; i < 9; i++){
            grid[i]=' ';
            $('.col[id=' + i + ']').html(' ').css("background-color", "#f4f4f4").fadeIn();
            comp_played = true;
        }
        
        // Getting rid of messages
        $('#score').html("You: " + you + "<br>Computer: " + comp);
        $('#messageT').fadeOut();
        $('#messageW').fadeOut();
        $('#messageL').fadeOut();
        return;
    });

    $('#player').click(function(){
        window.location.href = "tictactoe.html";
        return;
    });

    $('#instructions').click(function(){
        window.location.href = "instructions.html";
        return;
    });

    $('#home').click(function(){
        window.location.href = "index.html";
        return;
    });

    $('#homeFromGame').click(function(){
        window.location.href = "index.html";
        return;
    });


});
