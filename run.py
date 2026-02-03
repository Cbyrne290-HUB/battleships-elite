import random
import os

class BattleshipGame:
    """
    LO7.1: Data model to manage game logic.
    Handles board state and ship coordination.
    """
    def __init__(self, size=10):
        self.size = size
        # LO3.1: Aggregated data (nested lists)
        self.board = [["~"] * size for _ in range(size)]
        self.ships = []

    def validate_coordinate(self, row, col):
        """LO2.1 & 3.2: Handles invalid input and errors gracefully."""
        try:
            r, c = int(row), int(col)
            return 0 <= r < self.size and 0 <= c < self.size
        except (ValueError, TypeError):
            return False

    def generate_enemy_ships(self):
        """LO1: Algorithm implementation for ship placement."""
        ship_sizes = [5, 4, 3, 3, 2]
        for size in ship_sizes:
            placed = False
            while not placed:
                horizontal = random.choice([True, False])
                start_row = random.randint(0, 9)
                start_col = random.randint(0, 9)
                
                path = []
                for i in range(size):
                    r = start_row if horizontal else start_row + i
                    c = start_col + i if horizontal else start_col
                    if self.validate_coordinate(r, c):
                        path.append((r, c))
                
                if len(path) == size and not any(p in self.ships for p in path):
                    self.ships.extend(path)
                    placed = True

def main():
    """LO9.1: Entry point for the CLI application."""
    print("--- BATTLESHIP CORE INITIALIZED ---")
    game = BattleshipGame()
    game.generate_enemy_ships()
    print("Enemy fleet deployed. System ready for Web Interface.")

if __name__ == "__main__":
    main()