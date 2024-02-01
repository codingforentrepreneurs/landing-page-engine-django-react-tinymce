import json
from cfehome.env import config
from django.http import JsonResponse
from openai import OpenAI

OPENAI_API_KEY = config('OPENAI_API_KEY', default=None)



client = OpenAI(
    # This is the default and can be omitted
    api_key=OPENAI_API_KEY,
)


def ai_completion_view(request):
    data = json.loads(request.body)
    model = 'gpt-3.5-turbo'
    chat_completion = client.chat.completions.create(
        **data,
        model=model
    )
    content = chat_completion.choices[0].message.content
    return JsonResponse({'content': content})