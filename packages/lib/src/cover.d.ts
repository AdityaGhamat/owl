import { IAuth } from "@repo/types/src/database";
export declare function userCover(user: IAuth): {
    name: string | undefined;
    email: string;
    role: "Employee" | "Manager" | "Admin" | "Other" | undefined;
    twoFactorEnabled: boolean;
    isDeleted: boolean;
};
//# sourceMappingURL=cover.d.ts.map