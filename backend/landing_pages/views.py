import json
from django.shortcuts import render, get_object_or_404
from django.template import Template, Context
from django.http import JsonResponse

from .models import LandingPage
from .forms import LandingPageForm


def landing_page_create_view(request):
    # print(request.POST)
    # print(request.headers)
    # print(request.headers.get('content-type') == 'application/json')
    # print(request.body)
    data = json.loads(request.body)
    object_id = data.get('object_id') or None
    try:
        instance = LandingPage.objects.get(id=object_id)
    except:
        instance = None
    form = LandingPageForm(data, instance=instance)
    if form.is_valid():
        obj = form.save() #obj= LandingPage instance
        return JsonResponse({'id': obj.id}, status=201)
    if form.has_error:
        print(form.errors)
        # content = data.get('content')
        # if content:
        #     LandingPage.objects.create(
        #         content=content
        #     )
        return JsonResponse({'data': 'done'}, status=400)
    
def landing_page_detail_view(request, id=None):
    is_json = request.headers.get('content-type') == 'application/json'
    if is_json:
        try:
            instance = LandingPage.objects.get(id=id)
        except:
            instance = None
        if instance is None:
             return JsonResponse({}, status=404)
        return JsonResponse({'content': instance.content}, status=200)

    return render(request, 'landing_pages/detail.html', {"object_id": id})

def landing_page_live_view(request, id=None):
    instance = get_object_or_404(LandingPage, id=id, active=True)
    inline_template = instance.content
    t = Template(inline_template)
    # request.user.username
    c = Context({"username": "AABVC".title(), "request": request})
    content = t.render(c)
    return render(request, 'live/lp.html', {"content": content})