from django.conf import settings
from cfehome.env import config

def reactjs_assets_paths(request):
    root_reactjs_dir = settings.BASE_DIR / "staticfiles"
    assets_dir = settings.REACT_INDEX_DIR / "assets"
    return {
        "reactjs_assets_js_paths":[str(x.relative_to(root_reactjs_dir)) for x in assets_dir.glob("*.js")],
        "reactjs_assets_css_paths":[str(x.relative_to(root_reactjs_dir)) for x in assets_dir.glob("*.css")],
    }

def tiny_api_key(request):
    return {
        "tiny_api_key": config("TINY_API_KEY", default="", cast=str)
    }