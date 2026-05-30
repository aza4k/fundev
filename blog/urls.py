from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('blog/', views.all_posts, name='all_posts'),
    path('blog/<slug:slug>/', views.post_detail, name='post_detail'),
]
