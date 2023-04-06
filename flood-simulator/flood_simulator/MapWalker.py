def print_2d_array(array_2d):
	# Convert each element in the 2D array to string and format rows as strings
	formatted_rows = [' '.join(map(str, row)) for row in array_2d]

	# Join the rows with newline characters to create the final formatted string
	formatted_string = '\n'.join(formatted_rows)
	print(formatted_string)


def is_within_bounds(row, col, array):
	if not array:  # If the array is empty
		return False
	num_rows = len(array)
	num_cols = len(array[0])
	return 0 <= row < num_rows and 0 <= col < num_cols


def flood_fill(maze, row, col, start_water, used_water=0, has_empty_space=False):
	# If the current position is outside the maze, return
	if row < 0 or row >= len(maze) or col < 0 or col >= len(maze[0]):
		return used_water, has_empty_space

	# If the current position is not ' ', return
	if maze[row][col] != ' ':
		return used_water, has_empty_space

	# If flooding the current cell would exceed the maximum allowed water, return
	if used_water + 1 > start_water:
		has_empty_space = True
		return used_water, has_empty_space

	# Mark the current position as flooded
	maze[row][col] = '~'
	used_water += 1

	# Recursively flood fill adjacent cells in the order: up, right, down, left
	used_water, has_empty_space = flood_fill(
		maze, row - 1, col, start_water, used_water, has_empty_space)  # Up
	used_water, has_empty_space = flood_fill(
		maze, row, col + 1, start_water, used_water, has_empty_space)  # Right
	used_water, has_empty_space = flood_fill(
		maze, row + 1, col, start_water, used_water, has_empty_space)  # Down
	used_water, has_empty_space = flood_fill(
		maze, row, col - 1, start_water, used_water, has_empty_space)  # Left

	return used_water, has_empty_space


class MapWalker:
	def __init__(self, maze, start_row, start_col, start_water):
		self.maze = maze
		self.start_row = start_row
		self.start_col = start_col
		self.start_water = start_water

	def simulate(self):
		# Check if the starting position is out of bounds
		if not is_within_bounds(self.start_row, self.start_col, self.maze):
			print("Invalid starting position")
			return

		# Check if coordinate is == ' ', else return "Invalid starting position"
		if self.maze[self.start_row][self.start_col] != ' ':
			print("Invalid starting position")
			return

		# Print the size of the map and the starting position
		print(f"Size: {len(self.maze)},{len(self.maze[0])}")
		print(f"Starting position: {self.start_row},{self.start_col}")

		# Calculate the final state of the maze using flood_fill
		used_water, has_empty_space = flood_fill(
			self.maze, self.start_row, self.start_col, self.start_water)

		# Print the final state of the maze
		print_2d_array(self.maze)

		# Print a message indicating the final state
		if used_water == self.start_water and has_empty_space:
			print("Flood ran out of water.")
		else:
			print("Flood complete.")
