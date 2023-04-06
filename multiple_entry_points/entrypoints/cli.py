from entrypoints.path_util import add_project_root_to_sys_path
add_project_root_to_sys_path()
from core.calculator import add, subtract
from utils.helper import greet

def main():
    greet("User")
    result = add(3, 4)
    print("Addition result:", result)
    result = subtract(9, 4)
    print("Subtraction result:", result)

if __name__ == "__main__":
    main()
