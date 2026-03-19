import random
import os
import gspread
from google.oauth2.service_account import Credentials

# ─── Google Sheets Setup ───────────────────────────────────────────────────────

SCOPE = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
]

SHIPS = {
    "Carrier": 5,
    "Battleship": 4,
    "Submarine": 3,
    "Destroyer": 3,
    "Patrol Boat": 2,
}

BOARD_SIZE = 10


def connect_to_sheets():
    """
    Connect to Google Sheets using service account credentials.
    Returns the worksheet or None if connection fails.
    """
    try:
        creds = Credentials.from_service_account_file("creds.json", scopes=SCOPE)
        client = gspread.authorize(creds)
        sheet = client.open("battleships_scores").sheet1
        return sheet
    except Exception as e:
        print(f"[INFO] Could not connect to Google Sheets: {e}")
        return None


def log_score(sheet, player_name, result, turns):
    """
    Log the game result to Google Sheets.
    Appends a row with player name, result, and number of turns taken.
    """
    if sheet is None:
        return
    try:
        sheet.append_row([player_name, result, turns])
        print("\n✓ Score saved to leaderboard!")
    except Exception as e:
        print(f"[INFO] Could not save score: {e}")


def get_leaderboard(sheet):
    """
    Fetch and display all scores from Google Sheets.
    """
    if sheet is None:
        print("Leaderboard unavailable (no Sheets connection).")
        return
    try:
        records = sheet.get_all_values()
        if not records:
            print("No scores yet.")
            return
        print("\n── LEADERBOARD ──────────────────────")
        print(f"{'Player':<15} {'Result':<10} {'Turns'}")
        print("─" * 35)
        for row in records:
            if len(row) >= 3:
                print(f"{row[0]:<15} {row[1]:<10} {row[2]}")
        print("─" * 35)
    except Exception as e:
        print(f"[INFO] Could not fetch leaderboard: {e}")


# ─── Board Helpers ─────────────────────────────────────────────────────────────


def make_board():
    """Create and return a blank 10x10 board as a nested list."""
    return [["~"] * BOARD_SIZE for _ in range(BOARD_SIZE)]


def print_board(board, hide_ships=False):
    """
    Print a board to the terminal.
    If hide_ships is True, ship cells ('S') are shown as water ('~').
    """
    col_labels = "  " + " ".join(str(i) for i in range(BOARD_SIZE))
    print(col_labels)
    for idx, row in enumerate(board):
        display = []
        for cell in row:
            if hide_ships and cell == "S":
                display.append("~")
            else:
                display.append(cell)
        print(f"{idx} " + " ".join(display))


def print_both_boards(player_board, computer_board):
    """Print player and computer boards side by side."""
    os.system("cls" if os.name == "nt" else "clear")
    print("\n── YOUR BOARD ───────────────────────")
    print_board(player_board)
    print("\n── ENEMY WATERS ─────────────────────")
    print_board(computer_board, hide_ships=True)
    print()


# ─── Ship Placement ────────────────────────────────────────────────────────────


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


def place_ship_on_board(board, row, col, length, horizontal, marker="S"):
    """Place a ship on the board by marking cells with the given marker."""
    for i in range(length):
        r = row if horizontal else row + i
        c = col + i if horizontal else col
        board[r][c] = marker


def place_computer_ships(board):
    """
    Randomly place all ships for the computer.
    Uses a while loop to retry until each ship is placed successfully.
    """
    for ship_name, length in SHIPS.items():
        placed = False
        while not placed:
            horizontal = random.choice([True, False])
            row = random.randint(0, BOARD_SIZE - 1)
            col = random.randint(0, BOARD_SIZE - 1)
            if can_place_ship(board, row, col, length, horizontal):
                place_ship_on_board(board, row, col, length, horizontal)
                placed = True


def get_orientation():
    """
    Prompt the player to choose ship orientation.
    Returns True for horizontal, False for vertical.
    """
    while True:
        choice = input("Orientation? (h)orizontal / (v)ertical: ").strip().lower()
        if choice in ("h", "horizontal"):
            return True
        elif choice in ("v", "vertical"):
            return False
        else:
            print("Invalid input. Enter 'h' or 'v'.")


def get_placement_coordinates(ship_name, length, horizontal):
    """
    Prompt the player for valid row and column to place a ship.
    Validates input type and range.
    """
    while True:
        try:
            row = int(input(f"  Row (0-9): ").strip())
            col = int(input(f"  Col (0-9): ").strip())
            if not validate_coordinates(row, col):
                print("  ✗ Out of range. Row and col must be between 0 and 9.")
                continue
            return row, col
        except ValueError:
            print("  ✗ Invalid input. Please enter numbers only.")


def player_place_ships(board):
    """
    Walk the player through placing all 5 ships manually.
    Validates each placement before confirming.
    Ships must all be placed before the game can begin.
    """
    print("\n── PLACE YOUR FLEET ─────────────────")
    print("Coordinates: row 0-9, col 0-9\n")

    for ship_name, length in SHIPS.items():
        placed = False
        while not placed:
            print_board(board)
            print(f"\nPlacing: {ship_name} (length {length})")
            horizontal = get_orientation()
            row, col = get_placement_coordinates(ship_name, length, horizontal)

            if can_place_ship(board, row, col, length, horizontal):
                place_ship_on_board(board, row, col, length, horizontal)
                print(f"  ✓ {ship_name} placed!\n")
                placed = True
            else:
                print("  ✗ Cannot place ship there — overlap or out of bounds. Try again.\n")

    print("\n✓ All ships placed. Preparing for battle...\n")


# ─── Combat ────────────────────────────────────────────────────────────────────


def get_shot_coordinates(shots_taken):
    """
    Prompt the player for a valid shot coordinate.
    Rejects non-integer input, out-of-range values, and duplicate shots.
    """
    while True:
        try:
            row = int(input("Fire at row (0-9): ").strip())
            col = int(input("Fire at col (0-9): ").strip())
            if not validate_coordinates(row, col):
                print("✗ Out of range. Enter values between 0 and 9.")
                continue
            if (row, col) in shots_taken:
                print("✗ You already fired there. Choose a different target.")
                continue
            return row, col
        except ValueError:
            print("✗ Invalid input. Numbers only.")


def player_turn(computer_hidden_board, computer_display_board, shots_taken):
    """
    Handle the player's turn.
    Updates both the hidden board (for ship tracking) and display board.
    Returns True if all computer ships are sunk.
    """
    print("── YOUR TURN ────────────────────────")
    row, col = get_shot_coordinates(shots_taken)
    shots_taken.add((row, col))

    if computer_hidden_board[row][col] == "S":
        print("💥 HIT!")
        computer_hidden_board[row][col] = "X"
        computer_display_board[row][col] = "X"
    else:
        print("🌊 MISS!")
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

    if player_board[row][col] == "S":
        print(f"💥 Enemy hit your ship at ({row}, {col})!")
        player_board[row][col] = "X"
    else:
        print(f"🌊 Enemy missed at ({row}, {col}).")
        player_board[row][col] = "O"

    return all(
        player_board[r][c] != "S"
        for r in range(BOARD_SIZE)
        for c in range(BOARD_SIZE)
    )


# ─── Game Flow ─────────────────────────────────────────────────────────────────


def get_player_name():
    """Prompt for and return a non-empty player name."""
    while True:
        name = input("Enter your name, commander: ").strip()
        if name:
            return name
        print("✗ Name cannot be empty.")


def play_game(sheet):
    """
    Main game loop. Manages turn order, win conditions, and score logging.
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

    print("\n⚓ BATTLE STATIONS! The fight begins...\n")

    while True:
        print_both_boards(player_board, computer_display_board)
        turns += 1

        # Player turn
        player_won = player_turn(
            computer_hidden_board, computer_display_board, player_shots
        )
        if player_won:
            print_both_boards(player_board, computer_display_board)
            print(f"\n🏆 VICTORY, {player_name}! You sank the enemy fleet in {turns} turns!\n")
            log_score(sheet, player_name, "WIN", turns)
            break

        # Computer turn
        computer_won = computer_turn(player_board, computer_shots)
        if computer_won:
            print_both_boards(player_board, computer_display_board)
            print(f"\n💀 DEFEAT, {player_name}. The enemy sank your fleet.\n")
            log_score(sheet, player_name, "LOSS", turns)
            break


def main_menu(sheet):
    """
    Display the main menu and handle user selection.
    Loops until the player chooses to quit.
    """
    while True:
        print("\n══════════════════════════════════════")
        print("         BATTLESHIPS ELITE CLI        ")
        print("══════════════════════════════════════")
        print("  1. New Game")
        print("  2. Leaderboard")
        print("  3. Quit")
        print("──────────────────────────────────────")

        choice = input("Select an option (1-3): ").strip()

        if choice == "1":
            play_game(sheet)
        elif choice == "2":
            get_leaderboard(sheet)
        elif choice == "3":
            print("\nFarewell, commander. ⚓\n")
            break
        else:
            print("✗ Invalid option. Enter 1, 2, or 3.")


# ─── Entry Point ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    sheet = connect_to_sheets()
    main_menu(sheet)