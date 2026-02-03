import random

class BattleshipEngine:
    """
    LO7.1: Data model to manage the game state.
    This class handles the core logic independently of the UI.
    """
    def __init__(self, size=10):
        self.size = size
        # LO3.1: Aggregated data structures (nested lists)
        self.player_grid = [['~' for _ in range(size)] for _ in range(size)]
        self.enemy_grid = [['~' for _ in range(size)] for _ in range(size)]
        self.enemy_ships = []

    def validate_coordinates(self, r, c):
        """LO2.1: Handles invalid input and ensures data is in range."""
        try:
            row, col = int(r), int(c)
            return 0 <= row < self.size and 0 <= col < self.size
        except (ValueError, TypeError):
            # LO3.2: Error handling for non-integer inputs
            return False

    def generate_ai_ships(self):
        """LO1: Algorithm implementation for random ship placement."""
        ship_lengths = [5, 4, 3, 3, 2]
        for length in ship_lengths:
            placed = False
            while not placed:
                is_horizontal = random.choice([True, False])
                row = random.randint(0, 9)
                col = random.randint(0, 9)
                
                if self.can_place(row, col, length, is_horizontal):
                    self.place_ship(row, col, length, is_horizontal)
                    placed = True

    def can_place(self, r, c, length, horiz):
        """Logic check for ship collisions and boundaries."""
        for i in range(length):
            curr_r = r if horiz else r + i
            curr_c = c + i if horiz else c
            if not self.validate_coordinates(curr_r, curr_c):
                return False
        return True

    def place_ship(self, r, c, length, horiz):
        """Updates the data model with ship positions."""
        for i in range(length):
            curr_r = r if horiz else r + i
            curr_c = c + i if horiz else c
            self.enemy_grid[curr_r][curr_c] = 'S'

if __name__ == "__main__":
    # LO9.1: Entry point for deployment
    print("Battleship Engine: Online")
    engine = BattleshipEngine()
    engine.generate_ai_ships()