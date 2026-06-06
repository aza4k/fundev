from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.http import HttpResponse
from .models import Post

def index(request):
    posts = Post.objects.filter(is_published=True)[:4]
    return render(request, 'index.html', {'posts': posts})

def all_posts(request):
    posts_list = Post.objects.filter(is_published=True)
    paginator = Paginator(posts_list, 10)  # Show 10 posts per page
    
    page = request.GET.get('page')
    page_obj = paginator.get_page(page)
    
    return render(request, 'all_posts.html', {'page_obj': page_obj})

def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug, is_published=True)
    return render(request, 'blog_detail.html', {'post': post})

def robots_txt(request):
    content = """User-agent: *
Allow: /
Sitemap: https://fundev.uz/sitemap.xml
"""
    return HttpResponse(content, content_type="text/plain")
