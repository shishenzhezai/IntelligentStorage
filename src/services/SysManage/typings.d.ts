declare namespace SysManage {
  type RoleItem = {
    Role_Id: number;
    CreateDate: Date;
    Creator: string;
    DeleteBy: string;
    DeptName: string;
    Dept_Id: number;
    Enable: number;
    Modifier: string;
    ModifyDate: Date;
    OrderNo: number;
    ParentId: number;
    RoleName: string;
  };

  type UserItem = {
    User_Id?: number;
    Role_Id?: number;
    RoleName?: string;
    PhoneNo?: string;
    Remark?: string;
    Tel?: string;
    UserName?: string;
    UserPwd?: string;
    UserTrueName?: string;
    DeptName?: string;
    Dept_Id?: number;
    Email?: string;
    Enable?: number;
    Gender?: number;
    HeadImageUrl?: string;
    IsRegregisterPhone?: number;
    LastLoginDate?: Date;
    LastModifyPwdDate?: Date;
    Address?: string;
    AppType?: number;
    AuditDate?: Date;
    AuditStatus?: number;
    Auditor?: string;
    OrderNo?: number;
    Token?: string;
    CreateID?: number;
    CreateDate?: Date;
    Creator?: string;
    Mobile?: string;
    Modifier?: string;
    ModifyDate?: Date;
    ModifyID?: number;
  };
}
