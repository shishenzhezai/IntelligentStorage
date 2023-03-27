import { getRoleList } from '@/services/SysManage/role';
import { useRequest } from 'ahooks';
export default function Page() {
  const { data: role, loading: loading } = useRequest(async () => {
    const res = await getRoleList();
    if (res) {
      return res;
    }
    return {};
  });

  return {
    role,
    loading,
  };
}
