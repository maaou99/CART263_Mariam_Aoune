# Tic Tac Toe with p5.js

This program allows two players to play tic tac toe

## Strategy and deconstruction of the code 

1. The computer draws a 3x3 grid or, in other words, nine squares. 
<img src="https://user-images.githubusercontent.com/53101129/212801673-6f6b6a56-2487-4c9b-8517-7608496ca6cd.png" width="150" height="150">

2. The x and y coordinate representing the center of each of the nine squares are stored in an object called squareXY
<img src="https://user-images.githubusercontent.com/53101129/212802322-fe46b4ea-f2c0-4df8-8ccb-9583843feeb6.png" width="500" height="100">

For exemple, at the index 4, the x and y coordinates (250,250) is stored. In other words, the center of the fourth square (middle row second square) has a center situated at (250,250). 
<img src="https://user-images.githubusercontent.com/53101129/212802651-947418ef-8350-4ba4-a688-fc9cf10c928e.png" width="150" height="100"
                                                                                                                                        ![image]()


## Persisting Problems 
1. After the game has resarted, meaning it has already been played once, the program does not always 
identify the winner. 
2. Currently, player 1 must double click to start the game. Ideally, the game starts after one click
3. There is no counter.
