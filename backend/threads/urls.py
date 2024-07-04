from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ThreadViewSet, ContributionViewSet, GenreViewSet

router = DefaultRouter()
router.register(r'', ThreadViewSet, basename='thread')
router.register(r'genres', GenreViewSet)


contribution_list = ContributionViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

contribution_detail = ContributionViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('', include(router.urls)),
    path('<int:thread_id>/contributions/', contribution_list, name='contribution-list'),
    path('<int:thread_id>/contributions/<int:pk>/', contribution_detail, name='contribution-detail'),
    path('<int:thread_id>/contributions/<int:pk>/upvote/', ContributionViewSet.as_view({'post': 'upvote'}), name='contribution-upvote'),
    path('<int:thread_id>/contributions/<int:pk>/downvote/', ContributionViewSet.as_view({'post': 'downvote'}), name='contribution-downvote'),
    path('genre/<str:genre_name>/', ThreadViewSet.as_view({'get': 'list_by_genre'}), name='threads-by-genre'),
]
