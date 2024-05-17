[![Landing Page Engine Course Thumbnail](https://static.codingforentrepreneurs.com/media/courses/reactify-django-landing-page-engine/77f15bd6-9369-4b16-aabb-63049bb92ce1.jpg)](https://www.codingforentrepreneurs.com/courses/reactify-django-landing-page-engine/)

# Landing Page Engine with Django, React.js, and TinyMCE

Be sure to grab the student bonus from TinyMCE [https://kirr.co/uhvya9](https://kirr.co/uhvya9).

## Clone Project

```bash
mkdir ~/dev/landing-page-engine
cd ~/dev/landing-page-engine
git clone https://github.com/codingforentrepreneurs/landing-page-engine-django-react-tinymce .
```

## Setup Environment Variables

Create an account on:

- [Tiny Cloud](https://kirr.co/xvnpsj)
- [OpenAI](https://openai.com)

Create API Keys at:

- [My Account on Tiny](https://kirr.co/okifco)
- [OpenAI API Keys](https://platform.openai.com/api-keys)

Create `.env`:
    
```bash
cd ~/dev/landing-page-engine
echo "" >> .env
```

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
