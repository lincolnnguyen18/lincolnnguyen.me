def convert_maze_to_array(maze_text):
    # Split the maze text into lines
    lines = maze_text.split('\n')
    
    # Extract the starting position from the first line and convert to integers
    start_row, start_col = map(int, lines[0].split())
    
    # Initialize an empty list to store the 2D array
    maze_array = []
    
    # Create a variable to keep track of the actual row index in the maze array
    actual_row_index = 0
    
    # Iterate over the lines starting from the third line to convert the maze to 2D array
    for line in lines[2:]:
        # Initialize an empty list to store each row
        row = []
        for _, char in enumerate(line):
            if char == 'H':
                row.append('H')
            else:
                row.append(' ')
        # Append the row to the maze array if it is non-empty
        if row:
            maze_array.append(row)
            # Increment the actual row index
            actual_row_index += 1
    
    return maze_array

class MapReader:
    """
    A class used to parse a text file representing a map

    Attributes
    ----------
    map_file_path : str
        The path to the map file.

    Methods
    -------
    read_map()
        Reads the map file and returns a tuple of the maze, start_row, start_col, and max_water

    """

    def __init__(self, map_file_path):
        self.map_file_path = map_file_path

    def read_map(self):
        """
        Reads the map file and returns a tuple of the maze, start_row, start_col, and max_water

        Returns
        -------
        tuple
            A tuple containing the maze, start_row, start_col, and max_water
            - maze (2D list): The maze represented as a 2D list.
            - start_row (int): The starting row of the walker.
            - start_col (int): The starting column of the walker.
            - max_water (int): The maximum amount of water the walker can hold.
        """
        # Open the map file
        with open(self.map_file_path, 'r') as map_file:
            # Read the map text
            map_text = map_file.read()
            # Convert the map text to a 2D array
            maze_array = convert_maze_to_array(map_text)
            # Extract the starting position from the first line and convert to integers
            start_row, start_col = map(int, map_text.split('\n')[0].split())
            # Extract the max water from the second line and convert to integers
            max_water = int(map_text.split('\n')[1])
            # Return the maze, start_row, start_col, and max_water
            return maze_array, start_row, start_col, max_water