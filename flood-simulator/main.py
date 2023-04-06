from flood_simulator.MapWalker import MapWalker
from flood_simulator.MapReader import MapReader

def main():
  test_files = [
    "test_files/map.txt",
    "test_files/waterLimit.txt",
    "test_files/badStart.txt",
    "non_existent_file.txt",
    "test_files/tooSmall1.txt",
    "test_files/tooSmall2.txt",
  ]

  try:
    map_reader = MapReader(test_files[1])
    maze, start_row, start_col, max_water = map_reader.read_map()
    map_walker = MapWalker(maze, start_row, start_col, max_water)
    map_walker.simulate()
  except FileNotFoundError:
    print("File not found")

if __name__ == "__main__":
  main()