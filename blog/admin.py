from django.contrib import admin
from django.db import models
from tinymce.widgets import TinyMCE
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'is_published', 'created_at')
    list_filter = ('is_published', 'created_at')
    search_fields = ('title', 'content', 'subtitle')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'created_at'
    
    formfield_overrides = {
        models.TextField: {'widget': TinyMCE()},
    }
