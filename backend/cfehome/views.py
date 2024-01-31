import json
from django.http import JsonResponse


def landing_page_create_view(request):
    # print(request.POST)
    # print(request.headers)
    # print(request.headers.get('content-type') == 'application/json')
    # print(request.body)
    print(json.loads(request.body).get('content'))
    return JsonResponse({'data': 'done'})