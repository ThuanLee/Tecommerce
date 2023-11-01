from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class ProductPagination(PageNumberPagination):
    page_size = 36
    page_query_param = 'page'

    def get_paginated_response(self, data):
        return Response({
            'page': self.page.number,
            'last_page': self.page.paginator.num_pages,
            'data': data
        })