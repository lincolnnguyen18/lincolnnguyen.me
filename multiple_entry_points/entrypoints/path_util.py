import sys
from pathlib import Path

def add_project_root_to_sys_path():
    project_root = Path(__file__).resolve().parents[1]
    print("Adding project root to sys.path:", project_root)
    if str(project_root) not in sys.path:
        sys.path.append(str(project_root))
