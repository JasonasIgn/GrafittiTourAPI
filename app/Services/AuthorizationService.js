const Role = use("App/Models/Role");
const ForbiddenException = use("App/Exceptions/ForbiddenException");
const NotFoundException = use("App/Exceptions/NotFoundException");

class AuthorizationService {
  verifyPermission(resource, user) {
    if (resource.user_id !== user.id) {
      throw new ForbiddenException();
    }
  }

  async verifyRole(user, role) {
    const { rows } = await user
      .roles()
      .where("title", role)
      .fetch();
    if (rows.length === 0) {
      throw new ForbiddenException();
    }
  }

  async getRoleId(roleTitle) {
    const role = await Role.findBy("title", roleTitle);
    if (!role)
      throw new NotFoundException(
        "Role not found. Please seed them into database"
      );
    return role.id;
  }
}

module.exports = new AuthorizationService();
