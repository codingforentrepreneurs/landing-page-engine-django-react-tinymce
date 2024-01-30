from django.conf import settings

def reactjs_assets_paths(request):
    root_reactjs_dir = settings.BASE_DIR / "staticfiles"
    assets_dir = settings.REACT_INDEX_DIR / "assets"
    return {
        "reactjs_assets_js_paths":[str(x.relative_to(root_reactjs_dir)) for x in assets_dir.glob("*.js")],
        "reactjs_assets_css_paths":[str(x.relative_to(root_reactjs_dir)) for x in assets_dir.glob("*.css")],
    }