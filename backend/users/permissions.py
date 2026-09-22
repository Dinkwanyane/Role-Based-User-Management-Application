from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """
    Allows access only to authenticated users with role == 'admin'.
    Enforced server-side — this is the actual security boundary,
    not just a hidden button in Angular.
    """
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == 'admin'
        )