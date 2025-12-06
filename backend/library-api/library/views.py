from rest_framework import viewsets
from rest_framework.response import Response
from .models import Book
from .serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class UpdateViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def update(self, request, pk=None):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'})

        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class DeleteViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def delete(self, request, pk=None):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'})
        
        book.delete()
        return Response({'message': 'Student deleted successfully'})

