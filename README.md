# Landing Page Engine with Django, React.js, and TinyMCE



## Clone Project

```bash
mkdir ~/dev/landing-page-engine
cd ~/dev/landing-page-engine
git clone https://github.com/codingforentrepreneurs/landing-page-engine-django-react-tinymce .
```

## Setup Environment Variables

Create an account on:

- https://tiny.cloud
- https://openai.com

Create API Keys at:

- https://www.tiny.cloud/my-account/dashboard/
- https://platform.openai.com/api-keys

Save API Keys to `.env` with:

```bash
DEBUG=true
SECRET_KEY=your-django-secret
TINY_API_KEY=your-tiny-cloud-api-key
OPENAI_API_KEY=your-openai-api-key
```
(View `.env.sample` if you need a reference)


## Setup Python-Django Backend

```
# mac/linux
python3.12 -m venv venv

# windows
C:\Python312\python.exec -m venv venv

# mac/linux
source venv/bin/activate

# windows
.\venv\Scripts\activate
```

Install requirements.txt
```
(venv) pip install -r backend/requirements.txt
```

Run Django
```
cd backend
python manage.py runserver
```


## Setup ReactJS Frontend

```
npm install
npm run dev
```
