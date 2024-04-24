
import { UseGuards, applyDecorators } from "@nestjs/common";
import { ValidRoles } from "../interfaces/valid-roles";
import { RoleProtected } from "./role-protected.decorator";
import { UserRoleGuard } from "../guard/user-role.guard";
import { AuthGuard } from "../guard/auth.guard";

export function Auth(...roles:  ValidRoles[]){
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard, UserRoleGuard)
    )
}