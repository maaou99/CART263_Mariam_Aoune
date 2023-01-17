# Tic Tac Toe with p5.js

This program allows two players to play tic tac toe

## Strategy and deconstruction of the code 

1. The computer draws a 3x3 grid or, in other words, nine squares. 
<img src="https://user-images.githubusercontent.com/53101129/212801673-6f6b6a56-2487-4c9b-8517-7608496ca6cd.png" width="150" height="150">

2. The x and y coordinate representing the center of each of the nine squares are stored in an object called squareXY
![image](https://user-images.githubusercontent.com/53101129/212803590-f7358e33-5ed8-4b93-9744-5cda6c97df21.png)

For exemple, at the index 4, the x and y coordinates (250,250) is stored. In other words, the center of the fourth square (middle row second square) has a center situated at (250,250). 
<img src="https://user-images.githubusercontent.com/53101129/212803283-0f9306ad-4545-4030-8c58-9361b6e0fc60.png" width="250" height="200">
                                                                                                                                        
3. Initially each square is represented by the value false, stored within the array squareContains 
![image](https://user-images.githubusercontent.com/53101129/212803481-b3333d9d-d79d-4f37-9018-f226cbc120f7.png)

If all the values in that array are equal to false, the game has not started yet. 
If all the values evaluate to true, a symbol appears on each square

4. To identify all the possibilities of winning, each square is represented by a number. 
<img src="https://user-images.githubusercontent.com/53101129/212804546-7f0d6b7f-c4ee-4bb0-83b7-0152d5f89c15.png" width="250" height="250">

5. When one player clicks on any square, the square will be given a value of true at index i and the symbol (equals true) will be inserted at index i. 

For example, the player has clicked on the third square (I am counting starting from the top left corner). Therefore, at index 2, the value false will be replaced by a symbol, evaluating to true. 
<img src="https://user-images.githubusercontent.com/53101129/212805258-2b34a5aa-4772-43ec-9ae9-85eef9a55c93.png" width="400" height="50">



## Persisting Problems 
1. After the game has resarted, meaning it has already been played once, the program does not always 
identify the winner. 
2. Currently, player 1 must double click to start the game. Ideally, the game starts after one click
3. There is no counter.
