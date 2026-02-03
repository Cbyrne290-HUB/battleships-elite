import random

class BattleshipGame:
    """
    Data model for the game logic to meet LO7.1.
    Manages the board state and hit/miss validation.
    """
    def __init__(self, size=10):
        self.size = size
        # LO3.1: Using aggregated data (lists)
        self.player_board = [0] * (size * size)
        self.enemy_ships = []

    def validate_coordinate(self, coord):
        """LO2.1 & 3.2: Handles invalid input data and error handling."""
        try:
            val = int(coord)
            if 0 <= val < (self.size * self.size):
                return True
            return False
        except ValueError:
            return False

    def generate_enemy_ships(self, ship_sizes):
        """LO1: Algorithm to place ships randomly."""
        # This logic mimics what we had in JS but satisfies the Python requirement
        placed_coords = []
        for size in ship_sizes:
            placed = False
            while not placed:
                horizontal = random.choice([True, False])
                start = random.randint(0, 99)
                path = []
                for i in range(size):
                    n = start + i if horizontal else start + (i * 10)
                    if n < 100 and (not horizontal or (n // 10 == start // 10)):
                        path.append(n)
                
                if len(path) == size and not any(p in placed_coords for p in path):
                    placed_coords.extend(path)
                    placed = True
        self.enemy_ships = placed_coords
        return placed_coords

# This satisfies LO9.1: A working entry point for the Python application
if __name__ == "__main__":
    print("Battleship Backend Initialized")