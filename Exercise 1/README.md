# Tic Tac Toe with p5.js

This program allows two players to play tic tac toe.


## Strategy with example

1. The computer draws a 3x3 grid or, in other words, nine squares.
<img src="https://user-images.githubusercontent.com/53101129/212801673-6f6b6a56-2487-4c9b-8517-7608496ca6cd.png" width="150" height="150">
<br><br>
2. The x and y coordinate representing the center of each of the nine squares is stored in an object called squareXY.
<br>
<img src="https://user-images.githubusercontent.com/53101129/212807742-57b0dc0b-441a-42cb-913f-106cb3bc7953.png" width="450" height="50">

For example, at the index 4, the x and y coordinates (250,250) is stored.
In other words, the center of the fifth square (middle row second square) has a center situated at (250,250).
<br>
<img src="https://user-images.githubusercontent.com/53101129/212803283-0f9306ad-4545-4030-8c58-9361b6e0fc60.png" width="250" height="200">
 <br><br>  
 
3. Initially, each square is represented by the value false, stored within the array squareContains.
![image](https://user-images.githubusercontent.com/53101129/212803481-b3333d9d-d79d-4f37-9018-f226cbc120f7.png)

If all the values in that array are equal to false, the game has not started yet.
If all the values evaluate to true, a symbol appears on each square.
<br><br>

4. To identify all the possibilities of winning, each square is represented by a number.
<br>
<img src="https://user-images.githubusercontent.com/53101129/212804546-7f0d6b7f-c4ee-4bb0-83b7-0152d5f89c15.png" width="250" height="250">
<br>

For example, the combination 456 represents a win. If there is an 'x' on square number four, five and 6, the values in array squareContains (see step 3) will evaluate to true at index 3,4,5. The program has found the winner. 
<br><br>

5. When one player clicks on any square, the square will be given a value of true at index i and the symbol will be inserted at index i.

For example, the player has clicked on the third square.
Therefore, at index 2, the value false will be replaced by a symbol, evaluating to true.
<br>
<img src="https://user-images.githubusercontent.com/53101129/212805258-2b34a5aa-4772-43ec-9ae9-85eef9a55c93.png" width="400" height="50">
<br><br>

6. Suppose at least three elements in the array mentioned above evaluate to true. In that case, the program will check if the combination of these three values equals one of the combinations stored in possibleCombinations.
![image](https://user-images.githubusercontent.com/53101129/212806214-0afa1b3c-4aeb-41a1-919b-d7f27f4af840.png)
<br><br>


7. If the comparison evaluates true, the program has found a winner. It will display which winner won and initialize all global variables to restart the game.
 
<img src="https://user-images.githubusercontent.com/53101129/212806859-30f87445-e20f-4281-9259-079e2c5daf10.png" width="250" height="250">


## Persisting Problems
1. After the game has restarted, meaning it has already been played at least once, the program does not always
identify the winner.
2. Currently, player one must double click to start the game. Ideally, the game starts after one click
3. There is no counter.

## Reference 
1.  to check if two arrays are equal: https://flexiple.com/javascript/javascript-array-equality/
2.  to remove a value from a object: https://www.w3schools.com/howto/howto_js_remove_property_object.asp
3.  the split method: https://www.w3schools.com/jsref/jsref_split.asp
4. How to Split a Number into an Array in JavaScript: https://codingbeautydev.com/blog/javascript-split-number-into-array/
