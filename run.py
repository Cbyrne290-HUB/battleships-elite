import random
import os
import json
from colorama import init, Fore, Style

# Initialise colorama for cross-platform terminal colour support
init(autoreset=True)

# --- Constants ---

SCORES_FILE = "scores.json"
ROW_LABELS = "ABCDEFGHIJ"

SHIPS = {
    "Carrier": 5,
    "Battleship": 4,
    "Submarine": 3,
    "Destroyer": 3,
    "Patrol Boat": 2,
}

BOARD_SIZE = 10


# --- Scores / Data ---


def load_scores():
    """
    Load scores from the local JSON file.
    Returns a list of score records, or empty list if file
    doesn't exist.
    """
    if not os.path.exists(SCORES_FILE):
        return []
    try:
        with open(SCORES_FILE, "r") as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError):
        return []


def save_score(player_name, result, turns):
    """
    Append a new score record to the local JSON file.
    Each record stores the player name, result, and turns.
    """
    scores = load_scores()
    scores.append({
        "player": player_name,
        "result": result,
        "turns": turns
    })
    try:
        with open(SCORES_FILE, "w") as f:
            json.dump(scores, f, indent=2)
        print(Fore.GREEN + "\n✓ Score saved to leaderboard!")
    except IOError as e:
        print(Fore.YELLOW + f"[INFO] Could not save score: {e}")


def get_leaderboard():
    """
    Load and display all scores from the JSON file.
    Sorted by turns ascending so fewest turns shows first.
    """
    scores = load_scores()
    if not scores:
        print(Fore.YELLOW + "\nNo scores yet. Play a game first!\n")
        return
    sorted_scores = sorted(scores, key=lambda x: x["turns"])
    print(Fore.CYAN + "\n── LEADERBOARD ──────────────────────")
    print(f"{'Player':<15} {'Result':<10} {'Turns'}")
    print("─" * 35)
    for record in sorted_scores:
        colour = Fore.GREEN if record["result"] == "WIN" else Fore.RED
        print(
            colour +
            f"{record['player']:<15} "
            f"{record['result']:<10} "
            f"{record['turns']}"
        )
    print(Fore.CYAN + "─" * 35 + "\n")


# --- Board Helpers ---


def make_board():
    """Create and return a blank 10x10 board as a nested list."""
    return [["~"] * BOARD_SIZE for _ in range(BOARD_SIZE)]


def print_board(board, hide_ships=False):
    """
    Print a board to the terminal with coloured cells.
    Rows are labelled A-J, columns 0-9.
    If hide_ships is True, ship cells shown as water.
    """
    col_labels = "     " + "   ".join(
        str(i) for i in range(BOARD_SIZE)
    )
    print(Fore.CYAN + col_labels)
    print(Fore.CYAN + "   " + "-" * 39)
    for idx, row in enumerate(board):
        display = []
        for cell in row:
            if hide_ships and cell == "S":
                display.append(Fore.BLUE + "~")
            elif cell == "S":
                display.append(Fore.GREEN + "S")
            elif cell == "X":
                display.append(Fore.RED + "X")
            elif cell == "O":
                display.append(Fore.WHITE + "O")
            else:
                display.append(Fore.BLUE + "~")
        print(
            Fore.CYAN + f" {ROW_LABELS[idx]} | " +
            "   ".join(display)
        )
    print(Fore.CYAN + "   " + "-" * 39)


def print_both_boards(player_board, computer_board):
    """Print player and computer boards in the terminal."""
    os.system("cls" if os.name == "nt" else "clear")
    print(Fore.GREEN + "\n-- YOUR BOARD --")
    print_board(player_board)
    print(Fore.RED + "\n-- ENEMY WATERS --")
    print_board(computer_board, hide_ships=True)
    print()


# --- Ship Placement ---


def validate_coordinates(row, col):
    """
    Validate that row and col are within board boundaries.
    Returns True if valid, False otherwise.
    """
    return 0 <= row < BOARD_SIZE and 0 <= col < BOARD_SIZE


def can_place_ship(board, row, col, length, horizontal):
    """
    Check whether a ship of given length fits at (row, col).
    Returns True if placement is valid.
    """
    for i in range(length):
        r = row if horizontal else row + i
        c = col + i if horizontal else col
        if not validate_coordinates(r, c):
            return False
        if board[r][c] != "~":
            return False
    return True


def place_ship_on_board(board, row, col, length, horizontal,
                        marker="S"):
    """Place a ship on the board by marking cells with marker."""
    for i in range(length):
        r = row if horizontal else row + i
        c = col + i if horizontal else col
        board[r][c] = marker


def place_computer_ships(board):
    """
    Randomly place all ships for the computer.
    Uses a while loop to retry until each ship is placed.
    """
    for ship_name, length in SHIPS.items():
        placed = False
        while not placed:
            horizontal = random.choice([True, False])
            row = random.randint(0, BOARD_SIZE - 1)
            col = random.randint(0, BOARD_SIZE - 1)
            if can_place_ship(board, row, col, length, horizontal):
                place_ship_on_board(
                    board, row, col, length, horizontal
                )
                placed = True


def get_orientation():
    """
    Prompt the player to choose ship orientation.
    Returns True for horizontal, False for vertical.
    """
    while True:
        choice = input(
            "  Orientation? (h)orizontal / (v)ertical: "
        ).strip().lower()
        if choice in ("h", "horizontal"):
            return True
        elif choice in ("v", "vertical"):
            return False
        else:
            print(Fore.RED + "  ✗ Invalid. Enter 'h' or 'v'.")


def get_placement_coordinates():
    """
    Prompt the player for valid row and column to place a ship.
    Row is entered as A-J, column as 0-9.
    """
    while True:
        try:
            row_input = input("  Row (A-J): ").strip().upper()
            if row_input not in ROW_LABELS:
                print(
                    Fore.RED +
                    "  ✗ Invalid row. Enter a letter A to J."
                )
                continue
            row = ROW_LABELS.index(row_input)
            col = int(input("  Col (0-9): ").strip())
            if not validate_coordinates(row, col):
                print(
                    Fore.RED +
                    "  ✗ Out of range. Col must be 0 to 9."
                )
                continue
            return row, col
        except ValueError:
            print(
                Fore.RED +
                "  ✗ Invalid. Letter for row, number for col."
            )


def player_place_ships(board):
    """
    Walk the player through placing all 5 ships manually.
    Validates each placement before confirming.
    The game cannot begin until all ships are placed.
    """
    print(Fore.CYAN + "\n── PLACE YOUR FLEET ─────────────────")
    print("Row: A-J  |  Col: 0-9\n")

    for ship_name, length in SHIPS.items():
        placed = False
        while not placed:
            print_board(board)
            print(
                Fore.YELLOW +
                f"\nPlacing: {ship_name} (length {length})"
            )
            horizontal = get_orientation()
            row, col = get_placement_coordinates()

            if can_place_ship(board, row, col, length, horizontal):
                place_ship_on_board(
                    board, row, col, length, horizontal
                )
                print(Fore.GREEN + f"  ✓ {ship_name} placed!\n")
                placed = True
            else:
                print(
                    Fore.RED +
                    "  ✗ Cannot place there — overlap or "
                    "out of bounds. Try again.\n"
                )

    print(Fore.GREEN + "\n✓ All ships placed. Preparing...\n")


# --- Combat ---


def get_shot_coordinates(shots_taken):
    """
    Prompt the player for a valid shot coordinate.
    Row entered as A-J, column as 0-9.
    Rejects invalid input and duplicate shots.
    """
    while True:
        try:
            row_input = input(
                "Fire at row (A-J): "
            ).strip().upper()
            if row_input not in ROW_LABELS:
                print(
                    Fore.RED +
                    "✗ Invalid row. Enter a letter A to J."
                )
                continue
            row = ROW_LABELS.index(row_input)
            col = int(input("Fire at col (0-9): ").strip())
            if not validate_coordinates(row, col):
                print(
                    Fore.RED +
                    "✗ Out of range. Col must be 0 to 9."
                )
                continue
            if (row, col) in shots_taken:
                print(
                    Fore.RED +
                    "✗ Already fired there. Choose another."
                )
                continue
            return row, col
        except ValueError:
            print(
                Fore.RED +
                "✗ Invalid. Letter for row, number for col."
            )


def player_turn(computer_hidden_board, computer_display_board,
                shots_taken):
    """
    Handle the player's turn.
    Updates both the hidden board and display board.
    Returns True if all computer ships are sunk.
    """
    print(Fore.CYAN + "── YOUR TURN ────────────────────────")
    row, col = get_shot_coordinates(shots_taken)
    shots_taken.add((row, col))

    if computer_hidden_board[row][col] == "S":
        print(Fore.RED + "💥 HIT!")
        computer_hidden_board[row][col] = "X"
        computer_display_board[row][col] = "X"
    else:
        print(Fore.BLUE + "🌊 MISS!")
        computer_hidden_board[row][col] = "M"
        computer_display_board[row][col] = "O"

    return all(
        computer_hidden_board[r][c] != "S"
        for r in range(BOARD_SIZE)
        for c in range(BOARD_SIZE)
    )


def computer_turn(player_board, computer_shots):
    """
    Handle the computer's turn using random targeting.
    Avoids firing at already-shot coordinates.
    Returns True if all player ships are sunk.
    """
    while True:
        row = random.randint(0, BOARD_SIZE - 1)
        col = random.randint(0, BOARD_SIZE - 1)
        if (row, col) not in computer_shots:
            break

    computer_shots.add((row, col))
    row_label = ROW_LABELS[row]

    if player_board[row][col] == "S":
        print(
            Fore.RED +
            f"💥 Enemy hit your ship at {row_label}{col}!"
        )
        player_board[row][col] = "X"
    else:
        print(Fore.BLUE + f"🌊 Enemy missed at {row_label}{col}.")
        player_board[row][col] = "O"

    return all(
        player_board[r][c] != "S"
        for r in range(BOARD_SIZE)
        for c in range(BOARD_SIZE)
    )


# --- Game Flow ---


def get_player_name():
    """Prompt for and return a non-empty player name."""
    while True:
        name = input("Enter your name, commander: ").strip()
        if name:
            return name
        print(Fore.RED + "✗ Name cannot be empty.")


def play_game():
    """
    Main game loop.
    Manages turn order, win conditions, and score saving.
    """
    player_name = get_player_name()

    player_board = make_board()
    computer_hidden_board = make_board()
    computer_display_board = make_board()

    player_place_ships(player_board)
    place_computer_ships(computer_hidden_board)

    player_shots = set()
    computer_shots = set()
    turns = 0

    print(Fore.YELLOW + "\n⚓ BATTLE STATIONS! The fight begins...\n")

    while True:
        print_both_boards(player_board, computer_display_board)
        turns += 1

        player_won = player_turn(
            computer_hidden_board,
            computer_display_board,
            player_shots
        )
        if player_won:
            print_both_boards(player_board, computer_display_board)
            print(
                Fore.GREEN + Style.BRIGHT +
                f"\n🏆 VICTORY, {player_name}! "
                f"You sank the fleet in {turns} turns!\n"
            )
            save_score(player_name, "WIN", turns)
            break

        computer_won = computer_turn(player_board, computer_shots)
        if computer_won:
            print_both_boards(player_board, computer_display_board)
            print(
                Fore.RED + Style.BRIGHT +
                f"\n💀 DEFEAT, {player_name}. "
                f"The enemy sank your fleet.\n"
            )
            save_score(player_name, "LOSS", turns)
            break


def main_menu():
    """
    Display the main menu and handle user selection.
    Loops until the player chooses to quit.
    """
    while True:
        print(Fore.CYAN + Style.BRIGHT +
              "\n══════════════════════════════════════")
        print(Fore.CYAN + Style.BRIGHT +
              "         BATTLESHIPS ELITE CLI        ")
        print(Fore.CYAN + Style.BRIGHT +
              "══════════════════════════════════════")
        print(Fore.WHITE + "  1. New Game")
        print(Fore.WHITE + "  2. Leaderboard")
        print(Fore.WHITE + "  3. Quit")
        print(Fore.CYAN + "──────────────────────────────────────")

        choice = input("Select an option (1-3): ").strip()

        if choice == "1":
            play_game()
        elif choice == "2":
            get_leaderboard()
        elif choice == "3":
            print(Fore.YELLOW + "\nFarewell, commander. ⚓\n")
            break
        else:
            print(Fore.RED + "✗ Invalid option. Enter 1, 2, or 3.")


# --- Entry Point ---

if __name__ == "__main__":
    main_menu()
