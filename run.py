import random

def build_board(size):
    """Creates a square board filled with water ('~')."""
    return [["~" for _ in range(size)] for _ in range(size)]

def print_board(board):
    """Prints the board to the console."""
    for row in board:
        print(" ".join(row))

def place_ship(size):
    """Randomly generates a ship location."""
    return random.randint(0, size - 1), random.randint(0, size - 1)

def play_game():
    """Main game logic."""
    print("--- WELCOME TO BATTLESHIPS ---")
    size = 5
    board = build_board(size)
    ship_row, ship_col = place_ship(size)
    turns = 5

    for turn in range(turns):
        print(f"\nTurn {turn + 1} of {turns}")
        print_board(board)
        
        try:
            guess_row = int(input(f"Guess Row (0-{size-1}): "))
            guess_col = int(input(f"Guess Col (0-{size-1}): "))
        except ValueError:
            print("Invalid input. Please enter numbers only.")
            continue

        if guess_row == ship_row and guess_col == ship_col:
            print("CONGRATULATIONS! You sank my battleship!")
            break
        else:
            if guess_row not in range(size) or guess_col not in range(size):
                print("Oops, that's not even in the ocean.")
            elif board[guess_row][guess_col] == "X":
                print("You guessed that one already.")
            else:
                print("You missed my battleship!")
                board[guess_row][guess_col] = "X"
            
            if turn == turns - 1:
                print(f"Game Over. The ship was at {ship_row},{ship_col}")

if __name__ == "__main__":
    play_game()