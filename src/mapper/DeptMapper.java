package mapper;

import entity.Dept;

public interface DeptMapper {
	public Dept getDeptByDepeNo(Integer deptno);
	public void insert(Dept dept);
	public void update(Dept dept);
	public void delete(Integer deptno);
}
