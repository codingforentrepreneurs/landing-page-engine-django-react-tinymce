from functools import lru_cache
from pathlib import Path
from decouple import Config, RepositoryEnv
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
PROJ_ROOT = BASE_DIR.parent
ENV_FILE = BASE_DIR / ".env"

@lru_cache
def get_config():
    if ENV_FILE.exists():
        return Config(RepositoryEnv(str(ENV_FILE)))
    from decouple import config
    return config

config = get_config()