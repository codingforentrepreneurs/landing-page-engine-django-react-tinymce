import json
from django.http import JsonResponse

from .models import LandingPage
from .forms import LandingPageForm


def landing_page_create_view(request):
    # print(request.POST)
    # print(request.headers)
    # print(request.headers.get('content-type') == 'application/json')
    # print(request.body)
    data = json.loads(request.body)
    form = LandingPageForm(data)
    if form.is_valid():
        obj = form.save() #obj= LandingPage instance
        return JsonResponse({'id': obj.id})
    if form.has_error:
        print(form.errors)
        # content = data.get('content')
        # if content:
        #     LandingPage.objects.create(
        #         content=content
        #     )
        return JsonResponse({'data': 'done'})